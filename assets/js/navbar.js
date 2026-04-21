class CuteSenseNavbar extends HTMLElement {
    constructor() {
        super();
        this._isMenuOpen = false;
        this._iconRetryCount = 0;
        this._maxIconRetries = 10;
        
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
            return (path.includes('/pages/') || path.includes('/docs/')) ? '../' : './';
        } catch (e) { return './'; }
    }

    _getActivePage() {
        const path = window.location.pathname;
        return path.split('/').pop().replace('.html', '') || 'index';
    }

    _render() {
        const rootPath = this._getPath();
        const active = this._getActivePage();
        
        const navItems = [
            { id: 'index', label: 'Home', href: `${rootPath}index.html` },
            { id: 'mission', label: 'Philosophy', href: rootPath.includes('..') ? 'mission.html' : 'pages/mission.html' },
            { id: 'motto', label: 'Motto', href: rootPath.includes('..') ? 'motto.html' : 'pages/motto.html' },
            { id: 'code-of-conduct', label: 'Conduct', href: rootPath.includes('..') ? 'code-of-conduct.html' : 'pages/code-of-conduct.html' },
            { id: 'contributing', label: 'Contributing', href: rootPath.includes('..') ? 'contributing.html' : 'pages/contributing.html' },
            { id: 'buisness-model', label: 'Business Model', href: rootPath.includes('..') ? 'buisness-model.html' : 'pages/buisness-model.html' }
        ];

        this.innerHTML = `
        <style>
            cs-navbar { display: block; height: 80px; z-index: 1000; position: relative; }
            .borel-font { font-family: 'Borel', cursive; }

            /* Fix: Ensure icons don't steal clicks from buttons */
            i[data-lucide] { pointer-events: none !important; }

            #hamburger-btn, #mobile-close-btn, #theme-toggle-btn {
                cursor: pointer !important;
                -webkit-tap-highlight-color: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* Responsive Visibility - Strict */
            #hamburger-btn { display: none !important; }
            .links-section { display: flex !important; gap: 4px; position: absolute; left: 50%; transform: translateX(-50%); }

            @media (max-width: 1150px) {
                #hamburger-btn { display: flex !important; }
                .links-section { display: none !important; }
            }

            #theme-toggle-btn {
                width: 48px; height: 26px; border-radius: 999px;
                position: relative; border: none; background: #f1f5f9;
                transition: all 0.3s ease;
            }
            .dark #theme-toggle-btn { background: #334155; }
            
            #theme-toggle-btn .toggle-knob {
                width: 20px; height: 20px; border-radius: 50%;
                position: absolute; left: 3px; background: #ffffff;
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .dark #theme-toggle-btn .toggle-knob { transform: translateX(22px); background: #c084fc; }

            .desktop-link {
                font-size: 0.85rem; font-weight: 600; padding: 0.45rem 0.8rem;
                border-radius: 0.8rem; color: #64748b; transition: all 0.2s ease;
                white-space: nowrap;
            }
            .dark .desktop-link { color: #94a3b8; }
            .nav-link-active { color: #F08DA1 !important; background: rgba(240, 141, 161, 0.1); }
            
            .nav-hidden { transform: translateY(-120%); }
            .nav-visible { transform: translateY(0); }

            /* Mobile Menu Layering */
            #mobile-menu {
                height: 100vh;
                height: 100dvh;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease-in-out;
            }
            #mobile-menu.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[1000] px-4 pt-4 transition-transform duration-500 nav-visible" data-navbar>
            <div class="max-w-7xl mx-auto flex items-center justify-between bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] h-16 shadow-xl px-5">
                
                <div class="flex items-center">
                    <button type="button" id="hamburger-btn" aria-label="Open Menu" class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>

                <div class="links-section">
                    ${navItems.map(item => `<a href="${item.href}" class="desktop-link ${active === item.id ? 'nav-link-active' : ''}">${item.label}</a>`).join('')}
                </div>
                
                <div class="flex items-center">
                    <button type="button" id="theme-toggle-btn" aria-label="Toggle theme">
                        <div class="toggle-knob" id="knob-icon-container"></div>
                    </button>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[1100] bg-white dark:bg-slate-950 flex flex-col p-8">
            <div class="flex justify-between items-center mb-10">
                <span class="text-2xl text-[#F08DA1] borel-font">Navigation</span>
                <button type="button" id="mobile-close-btn" aria-label="Close Menu" class="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            <div class="flex flex-col gap-6 text-2xl font-bold">
                ${navItems.map(item => `<a href="${item.href}" class="${active === item.id ? 'text-[#F08DA1]' : 'text-slate-600 dark:text-slate-400'}">${item.label}</a>`).join('')}
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
                ? `<i data-lucide="moon" class="w-3.5 h-3.5 text-white"></i>`
                : `<i data-lucide="sun" class="w-3.5 h-3.5 text-orange-500"></i>`;
            
            window.lucide.createIcons({
                root: knob,
                attrs: { 'stroke-width': '2' }
            });
        }
    }

    _initIcons() {
        const attemptIcons = () => {
            if (window.lucide) {
                this._updateThemeIcon();
                window.lucide.createIcons({
                    root: this,
                    attrs: { 'stroke-width': '2' }
                });
            } else if (this._iconRetryCount < this._maxIconRetries) {
                this._iconRetryCount++;
                setTimeout(attemptIcons, 150);
            }
        };
        attemptIcons();
    }

    _attachListeners() {
        // Use a single click listener on the component
        this.addEventListener('click', this._handleClick);
    }

    _handleClick(e) {
        const target = e.target;

        if (target.closest('#hamburger-btn')) {
            console.log('Hamburger Clicked'); // Debugging
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
        } else {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

if (!customElements.get('cs-navbar')) {
    customElements.define('cs-navbar', CuteSenseNavbar);
}