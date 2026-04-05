class CuteSenseNavbar extends HTMLElement {
    constructor() {
        super();
        this._lastScrollY = window.scrollY;
        this._isMenuOpen = false;
        this._isDark = false;
    }

    connectedCallback() {
        this._isDark = this._getInitialTheme();
        this._render();
        requestAnimationFrame(() => this._init());
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

    _getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    _getThemeIcon() {
        return this._isDark 
            ? `<i data-lucide="moon" class="w-3 h-3 text-white"></i>`
            : `<i data-lucide="sun" class="w-3 h-3 text-orange-500"></i>`;
    }

    _render() {
        const path = this._getPath();
        const active = this._getActivePage();
        const isMission = active === 'mission';
        const isMotto = active === 'motto';

        this.innerHTML = `
        <style>
            cs-navbar { display: block; height: 80px; z-index: 1000; position: relative; }
            
            /* Theme toggle styling (unchanged) */
            #theme-toggle-btn {
                width: 44px;
                height: 24px;
                border-radius: 9999px;
                position: relative;
                padding: 2px;
                cursor: pointer;
                border: none;
                outline: none;
                transition: background-color 0.3s ease;
                background: ${this._isDark ? '#1e293b' : '#e2e8f0'};
            }
            
            #theme-toggle-btn .toggle-knob {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                position: absolute;
                top: 2px;
                left: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s;
                background: ${this._isDark ? '#c084fc' : '#ffffff'};
                transform: translateX(${this._isDark ? '20px' : '0px'});
            }

            /* Active link styling */
            .nav-link { position: relative; transition: color 0.3s; }
            .nav-link-active { color: #F08DA1 !important; }
            .nav-link-active::after {
                content: '';
                position: absolute;
                bottom: -6px;
                left: 0;
                width: 100%;
                height: 2.5px;
                background: linear-gradient(90deg, #F08DA1, #4169E1);
                border-radius: 99px;
            }

            #mobile-menu.active { display: flex !important; opacity: 1; transform: translateY(0); }
            .nav-hidden { transform: translateY(-110%); }
            .nav-visible { transform: translateY(0); }

            /* ========== FIX: Prevent text clipping on small screens ========== */
            /* On tablet screens (768px – 1024px) ensure the brand doesn't overlap absolute side elements */
            @media (min-width: 768px) and (max-width: 1024px) {
                .brand-container {
                    max-width: calc(100% - 200px);
                    margin-left: auto;
                    margin-right: auto;
                }
            }
            /* On extra small screens (< 480px) reduce brand text size and gap */
            @media (max-width: 480px) {
                .brand-container span {
                    font-size: 1rem !important; /* text-base */
                }
                .brand-container {
                    gap: 0.25rem !important; /* gap-1 */
                }
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[1000] px-2 sm:px-4 pt-4 transition-transform duration-500 ease-out nav-visible" data-navbar>
            <div class="max-w-7xl mx-auto flex items-center justify-between md:justify-center relative bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-cs-lilac/20 rounded-[2rem] px-4 h-16 shadow-xl">
                
                <div class="flex items-center gap-4 md:absolute md:left-6 z-10">
                    <button id="hamburger-btn" class="md:hidden p-2 text-cs-lilac hover:bg-cs-lilac/10 rounded-full transition-colors" aria-label="Menu">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                    <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <a href="${path}pages/mission.html" class="nav-link ${isMission ? 'nav-link-active' : 'hover:text-cs-lilac transition-colors'}">Philosophy</a>
                        <a href="${path}pages/motto.html" class="nav-link ${isMotto ? 'nav-link-active' : 'hover:text-cs-lilac transition-colors'}">Motto</a>
                    </div>
                </div>

                <!-- Added class "brand-container" for responsive fixes -->
                <a href="${path}index.html" class="brand-container flex items-center gap-2 hover:scale-105 transition-transform duration-300 md:mx-auto group">
                    <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-7 w-auto pixel-crisp group-hover:rotate-12 transition-transform duration-300">
                    <span class="text-xl sm:text-2xl gradient-text borel-font pt-1">CuteSense</span>
                </a>
                
                <div class="flex items-center gap-3 md:absolute md:right-6 z-10">
                    <button type="button" id="theme-toggle-btn" aria-label="Toggle ${this._isDark ? 'light' : 'dark'} mode">
                        <div class="toggle-knob">
                            ${this._getThemeIcon()}
                        </div>
                    </button>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[1100] bg-white dark:bg-slate-950 hidden flex-col p-6 transition-all duration-300 opacity-0 translate-y-[-10px]">
            <div class="flex justify-between items-center mb-10">
                <span class="text-3xl gradient-text borel-font">CuteSense</span>
                <button id="mobile-close-btn" class="p-2 bg-cs-lilac/10 hover:bg-cs-lilac/20 rounded-full transition-colors">
                    <i data-lucide="x" class="w-6 h-6 text-slate-700 dark:text-slate-200"></i>
                </button>
            </div>
            <div class="flex flex-col gap-8 text-2xl font-bold">
                <a href="${path}pages/mission.html" class="mobile-nav-link ${isMission ? 'text-cs-lilac' : 'text-slate-700 dark:text-slate-200 hover:text-cs-lilac'} transition-colors">Philosophy</a>
                <a href="${path}pages/motto.html" class="mobile-nav-link ${isMotto ? 'text-cs-lilac' : 'text-slate-700 dark:text-slate-200 hover:text-cs-lilac'} transition-colors">Motto</a>
            </div>
        </div>
        `;
    }

    _init() {
        if (this._isDark) {
            document.documentElement.classList.add('dark');
        }
        this._attachListeners();
        this._initScroll();
        this._initIcons();
    }

    _initIcons() {
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    _initScroll() {
        const threshold = 10;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const nav = this.querySelector('[data-navbar]');
                    const current = window.scrollY;
                    
                    if (!nav || this._isMenuOpen) {
                        ticking = false;
                        return;
                    }
                    
                    if (Math.abs(current - this._lastScrollY) > threshold) {
                        if (current > this._lastScrollY && current > 100) {
                            nav.classList.replace('nav-visible', 'nav-hidden');
                        } else {
                            nav.classList.replace('nav-hidden', 'nav-visible');
                        }
                        this._lastScrollY = current;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    _attachListeners() {
        const themeBtn = this.querySelector('#theme-toggle-btn');
        const menuBtn = this.querySelector('#hamburger-btn');
        const closeBtn = this.querySelector('#mobile-close-btn');

        themeBtn?.addEventListener('click', () => {
            this._isDark = !this._isDark;
            
            if (this._isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            
            localStorage.setItem('theme', this._isDark ? 'dark' : 'light');
            this._updateToggleButton();
        });

        menuBtn?.addEventListener('click', () => this._toggleMenu(true));
        closeBtn?.addEventListener('click', () => this._toggleMenu(false));
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this._isMenuOpen) {
                this._toggleMenu(false);
            }
        });
    }

    _updateToggleButton() {
        const btn = this.querySelector('#theme-toggle-btn');
        if (!btn) return;
        
        btn.style.background = this._isDark ? '#1e293b' : '#e2e8f0';
        btn.setAttribute('aria-label', `Toggle ${this._isDark ? 'light' : 'dark'} mode`);
        
        const knob = btn.querySelector('.toggle-knob');
        knob.style.background = this._isDark ? '#c084fc' : '#ffffff';
        knob.style.transform = this._isDark ? 'translateX(20px)' : 'translateX(0px)';
        knob.innerHTML = this._getThemeIcon();
        
        if (window.lucide) {
            lucide.createIcons({ attrs: { 'stroke-width': 2.5 } });
        }
    }

    _toggleMenu(open) {
        this._isMenuOpen = open;
        const menu = this.querySelector('#mobile-menu');
        const body = document.body;
        
        if (open) {
            menu.classList.remove('hidden');
            menu.offsetHeight;
            menu.classList.add('active');
            body.style.overflow = 'hidden';
            this._initIcons();
        } else {
            menu.classList.remove('active');
            setTimeout(() => {
                if (!this._isMenuOpen) {
                    menu.classList.add('hidden');
                    body.style.overflow = '';
                }
            }, 300);
        }
    }
}

if (!customElements.get('cs-navbar')) {
    customElements.define('cs-navbar', CuteSenseNavbar);
}