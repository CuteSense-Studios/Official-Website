class CuteSenseNavbar extends HTMLElement {
    constructor() {
        super();
        this._isMenuOpen = false;
        this._iconRetryCount = 0;
        this._maxIconRetries = 15;
        
        if (window.CuteSenseTheme) {
            this._isDark = window.CuteSenseTheme.get().isDark;
        } else {
            const savedTheme = localStorage.getItem('theme');
            this._isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        this._handleScroll = this._handleScroll.bind(this);
        this._handleThemeChange = this._handleThemeChange.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleResize = this._handleResize.bind(this);
    }

    connectedCallback() {
        if (!window.CuteSenseTheme) {
            document.documentElement.classList.toggle('dark', this._isDark);
        }
        this._render();
        this._init();
        window.addEventListener('themechange', this._handleThemeChange);
        window.addEventListener('resize', this._handleResize);
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this._handleScroll);
        window.removeEventListener('themechange', this._handleThemeChange);
        window.removeEventListener('resize', this._handleResize);
        this.removeEventListener('click', this._handleClick);
    }

    _getPath() {
        try {
            const path = window.location.pathname;
            const depth = (path.match(/\//g) || []).length - 1;
            return (path.includes('/pages/') || path.includes('/docs/') || depth > 1) ? '../' : './';
        } catch (e) { return './'; }
    }

    _getActivePage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        return page || 'index';
    }

    _render() {
        const root = this._getPath();
        const active = this._getActivePage();
        
        const navItems = [
            { id: 'index', label: 'Home', path: 'index.html', icon: 'home' },
            { id: 'projects', label: 'Projects', path: 'pages/projects.html', icon: 'folder-git-2' },
            { id: 'mission', label: 'Philosophy', path: 'pages/mission.html', icon: 'compass' },
            { id: 'motto', label: 'Motto', path: 'pages/motto.html', icon: 'quote' },
            { id: 'code-of-conduct', label: 'Conduct', path: 'pages/code-of-conduct.html', icon: 'heart-handshake' },
            { id: 'contributing', label: 'Contributing', path: 'pages/contributing.html', icon: 'users' },
            { id: 'buisness-model', label: 'Model', path: 'pages/buisness-model.html', icon: 'network' }
        ];

        this.innerHTML = `
        <style>
            cs-navbar { display: block; height: 80px; z-index: 1000; position: relative; }
            .borel-font { font-family: 'Borel', cursive; }

            i[data-lucide] { pointer-events: none !important; }

            #hamburger-btn, #mobile-close-btn, #theme-toggle-btn {
                cursor: pointer !important;
                display: flex; align-items: center; justify-content: center;
                transition: all 0.2s ease;
            }

            /* Responsive rules: Logo appears ONLY on mobile! */
            @media (min-width: 1151px) {
                .mobile-only-brand { display: none !important; }
                .desktop-nav-container { 
                    display: flex !important; 
                    align-items: center; 
                    gap: 6px; 
                    margin: 0 auto; 
                }
            }
            @media (max-width: 1150px) {
                .mobile-only-brand { display: flex !important; }
                .desktop-nav-container { display: none !important; }
            }

            #theme-toggle-btn {
                width: 48px; height: 26px; border-radius: 999px;
                position: relative; border: none; background: #f1f5f9;
                flex-shrink: 0;
            }
            .dark #theme-toggle-btn { background: #334155; }
            
            #theme-toggle-btn .toggle-knob {
                width: 20px; height: 20px; border-radius: 50%;
                position: absolute; left: 3px; background: #ffffff;
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: flex; align-items: center; justify-content: center;
            }
            .dark #theme-toggle-btn .toggle-knob { transform: translateX(22px); background: #c084fc; }

            .desktop-link {
                font-size: 0.85rem; font-weight: 600; padding: 0.45rem 0.85rem;
                border-radius: 0.8rem; color: #64748b; transition: all 0.2s ease;
                white-space: nowrap;
            }
            .dark .desktop-link { color: #94a3b8; }
            .desktop-link:hover { color: #F08DA1; background: rgba(240, 141, 161, 0.08); }
            .nav-link-active { color: #F08DA1 !important; background: rgba(240, 141, 161, 0.12) !important; font-weight: 700; }
            
            .nav-hidden { transform: translateY(-120%); }
            .nav-visible { transform: translateY(0); }

            #mobile-menu {
                height: 100dvh; opacity: 0; visibility: hidden;
                transform: translateX(100%);
                transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s;
            }
            #mobile-menu.active { 
                opacity: 1; 
                visibility: visible; 
                transform: translateX(0);
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[1000] px-4 pt-4 transition-transform duration-500 nav-visible" data-navbar>
            <div class="max-w-5xl mx-auto flex items-center justify-between bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] h-16 shadow-xl px-5">
                
                <!-- Mobile-Only Brand Header (Logo ONLY on mobile!) -->
                <div class="mobile-only-brand items-center gap-2.5">
                    <button type="button" id="hamburger-btn" aria-label="Open Menu" class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <i data-lucide="menu" class="w-6 h-6 shrink-0"></i>
                    </button>
                    <a href="${root}index.html" class="flex items-center gap-2 group" aria-label="CuteSense Studios Home">
                        <img src="${root}assets/icons/companylogo.webp" alt="CuteSense Logo" class="h-8 w-auto pixel-crisp drop-shadow-sm">
                        <span class="text-base font-bold gradient-text borel-font">CuteSense</span>
                    </a>
                </div>

                <!-- Desktop Navigation Links (Centered, clean, NO left logo) -->
                <div class="desktop-nav-container">
                    ${navItems.map(item => `
                        <a href="${root}${item.path}" class="desktop-link ${active === item.id ? 'nav-link-active' : ''}">
                            ${item.label}
                        </a>
                    `).join('')}
                </div>
                
                <!-- Right Controls: GitHub Link + Theme Toggle -->
                <div class="flex items-center gap-2 sm:gap-3">
                    <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" 
                       class="p-2 text-slate-500 hover:text-[#F08DA1] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:flex items-center justify-center"
                       aria-label="CuteSense GitHub">
                        <i data-lucide="github" class="w-4 h-4 shrink-0"></i>
                    </a>
                    <button type="button" id="theme-toggle-btn" aria-label="Toggle theme">
                        <div class="toggle-knob" id="knob-icon-container"></div>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Improved Mobile Navigation Drawer -->
        <div id="mobile-menu" class="fixed inset-0 z-[1100] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl flex flex-col p-6 sm:p-8 overflow-y-auto">
            <!-- Mobile Drawer Header with Logo -->
            <div class="flex justify-between items-center pb-6 border-b border-slate-100 dark:border-slate-800/80 mb-6 shrink-0">
                <a href="${root}index.html" class="flex items-center gap-3">
                    <img src="${root}assets/icons/companylogo.webp" alt="CuteSense Logo" class="h-10 w-auto pixel-crisp">
                    <div class="flex flex-col">
                        <span class="text-2xl text-[#F08DA1] borel-font leading-none">CuteSense</span>
                        <span class="text-[9px] uppercase tracking-[0.25em] font-bold text-cs-lilac mt-1">Studios</span>
                    </div>
                </a>
                <button type="button" id="mobile-close-btn" aria-label="Close Menu" class="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <i data-lucide="x" class="w-5 h-5 shrink-0"></i>
                </button>
            </div>

            <!-- Mobile Nav Items -->
            <div class="flex flex-col gap-2 font-bold pb-6">
                ${navItems.map(item => `
                    <a href="${root}${item.path}" class="${active === item.id ? 'text-[#F08DA1] bg-cs-pink/15 font-black border-l-4 border-[#F08DA1]' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'} px-4 py-3 rounded-2xl flex items-center justify-between transition-colors">
                        <div class="flex items-center gap-3">
                            <i data-lucide="${item.icon}" class="w-5 h-5 opacity-70"></i>
                            <span class="text-base">${item.label}</span>
                        </div>
                        <i data-lucide="chevron-right" class="w-4 h-4 opacity-40"></i>
                    </a>
                `).join('')}
            </div>

            <!-- Mobile Drawer Footer / Quick External Links -->
            <div class="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-4 text-xs font-semibold text-slate-400">
                <div class="flex items-center justify-center gap-6">
                    <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-cs-lilac hover:text-[#F08DA1] transition-colors">
                        <i data-lucide="github" class="w-4 h-4"></i>
                        <span>GitHub Org</span>
                    </a>
                    <a href="mailto:cutesensestudios@protonmail.com" class="flex items-center gap-1.5 text-cs-lilac hover:text-[#F08DA1] transition-colors">
                        <i data-lucide="mail" class="w-4 h-4"></i>
                        <span>Contact</span>
                    </a>
                </div>
                <div class="text-center text-[10px] uppercase tracking-wider text-slate-400">
                    Art with Heart • © ${new Date().getFullYear()} CuteSense Studios
                </div>
            </div>
        </div>
        `;
    }

    _init() {
        this._initIcons();
        this._attachListeners();
        this._initScroll();
    }

    _handleThemeChange(e) {
        this._isDark = e.detail.isDark;
        this._updateThemeIcon();
    }

    _handleResize() {
        if (window.innerWidth > 1150 && this._isMenuOpen) {
            this._toggleMenu(false);
        }
    }

    _updateThemeIcon() {
        const knob = this.querySelector('#knob-icon-container');
        if (knob && window.lucide) {
            knob.innerHTML = this._isDark 
                ? `<i data-lucide="moon" class="w-3.5 h-3.5 text-white shrink-0"></i>`
                : `<i data-lucide="sun" class="w-3.5 h-3.5 text-orange-500 shrink-0"></i>`;
            
            window.lucide.createIcons({
                root: knob,
                attrs: { 'stroke-width': '2.5' }
            });
        }
    }

    _initIcons() {
        const attemptIcons = () => {
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                this._updateThemeIcon();
                window.lucide.createIcons({
                    root: this,
                    attrs: { 'stroke-width': '2', 'class': 'shrink-0' }
                });
            } else if (this._iconRetryCount < this._maxIconRetries) {
                this._iconRetryCount++;
                setTimeout(attemptIcons, 100);
            }
        };
        attemptIcons();
    }

    _attachListeners() {
        this.addEventListener('click', this._handleClick);
    }

    _handleClick(e) {
        const target = e.target;

        if (target.closest('#hamburger-btn')) {
            this._toggleMenu(true);
            return;
        }

        if (target.closest('#mobile-close-btn')) {
            this._toggleMenu(false);
            return;
        }

        if (target.closest('#theme-toggle-btn')) {
            if (window.CuteSenseTheme) {
                window.CuteSenseTheme.toggle();
            } else {
                this._isDark = !this._isDark;
                document.documentElement.classList.toggle('dark', this._isDark);
                localStorage.setItem('theme', this._isDark ? 'dark' : 'light');
                this._updateThemeIcon();
                window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark: this._isDark } }));
            }
            return;
        }

        if (this._isMenuOpen && target.closest('#mobile-menu a')) {
            this._toggleMenu(false);
        }
    }

    _initScroll() {
        this.lastScroll = window.scrollY;
        window.addEventListener('scroll', this._handleScroll, { passive: true });
    }

    _handleScroll() {
        const nav = this.querySelector('[data-navbar]');
        const current = window.scrollY;
        if (!nav || this._isMenuOpen) return;

        if (current > this.lastScroll && current > 80) {
            nav.classList.add('nav-hidden');
            nav.classList.remove('nav-visible');
        } else if (current < this.lastScroll) {
            nav.classList.add('nav-visible');
            nav.classList.remove('nav-hidden');
        }
        this.lastScroll = current;
    }

    _toggleMenu(open) {
        const menu = this.querySelector('#mobile-menu');
        if (!menu) return;

        this._isMenuOpen = open;
        if (open) {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (window.lucide) lucide.createIcons({ root: menu });
        } else {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

if (!customElements.get('cs-navbar')) {
    customElements.define('cs-navbar', CuteSenseNavbar);
}
