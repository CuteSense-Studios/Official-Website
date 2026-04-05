class CuteSenseNavbar extends HTMLElement {
    constructor() {
        super();
        this._lastScrollY = window.scrollY;
        this._isMenuOpen = false;
    }

    connectedCallback() {
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

    _render() {
        const path = this._getPath();
        const active = this._getActivePage();
        const isMission = active === 'mission';
        const isMotto = active === 'motto';

        this.innerHTML = `
        <style>
            cs-navbar { display: block; height: 80px; z-index: 1000; position: relative; }
            
            /* FIX: Absolute Centering for Toggle Knob */
            .toggle-knob { 
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                overflow: hidden;
            }
            html.dark .toggle-knob { transform: translateX(1.25rem); }

            /* FIX: Centering Lucide SVG Glitch */
            .toggle-knob svg, .toggle-knob i {
                width: 14px !important;
                height: 14px !important;
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                flex-shrink: 0;
            }
            
            /* Active Page Highlight */
            .nav-link { position: relative; transition: color 0.3s; }
            .nav-link-active { color: #a78bfa !important; }
            .nav-link-active::after {
                content: '';
                position: absolute;
                bottom: -6px;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(135deg, #F08DA1 0%, #7CB9D4 100%);
                border-radius: 2px;
            }

            #mobile-menu.active { display: flex !important; opacity: 1; transform: translateY(0); }
            .nav-hidden { transform: translateY(-110%); }
            .nav-visible { transform: translateY(0); }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[1000] px-2 sm:px-4 pt-4 transition-transform duration-500 ease-out nav-visible" data-navbar>
            <div class="max-w-7xl mx-auto flex items-center justify-between md:justify-center relative bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-cs-lilac/20 rounded-[2rem] px-4 h-16 shadow-xl">
                
                <div class="flex items-center gap-4 md:absolute md:left-6 z-10">
                    <button id="hamburger-btn" class="md:hidden p-2 text-cs-lilac" aria-label="Menu">
                        <i data-lucide="menu"></i>
                    </button>
                    <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <a href="${path}pages/mission.html" class="nav-link ${isMission ? 'nav-link-active' : 'hover:text-cs-lilac'}">Philosophy</a>
                        <a href="${path}pages/motto.html" class="nav-link ${isMotto ? 'nav-link-active' : 'hover:text-cs-lilac'}">Motto</a>
                    </div>
                </div>

                <a href="${path}index.html" class="flex items-center gap-2 hover:scale-105 transition-transform md:mx-auto">
                    <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-7 w-auto pixel-crisp" onerror="this.style.opacity='0'">
                    <span class="text-xl sm:text-2xl gradient-text borel-font pt-1">CuteSense</span>
                </a>
                
                <div class="flex items-center gap-3 md:absolute md:right-6 z-10">
                    <a href="https://github.com/CuteSense-Studios" target="_blank" class="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                         <i data-lucide="github" class="w-4 h-4"></i>
                         <span class="text-[9px] font-bold uppercase">GitHub</span>
                    </a>
                    
                    <button type="button" id="theme-toggle-btn" class="w-11 h-6 bg-slate-200 dark:bg-slate-800 rounded-full relative p-1 transition-colors flex items-center">
                        <div class="toggle-knob w-4 h-4 bg-white dark:bg-cs-lilac rounded-full shadow-md">
                            <i data-lucide="sun" class="text-orange-400 dark:hidden"></i>
                            <i data-lucide="moon" class="text-white hidden dark:block"></i>
                        </div>
                    </button>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[1100] bg-white dark:bg-slate-950 hidden flex-col p-6 transition-all duration-300">
            <div class="flex justify-between items-center mb-10">
                <span class="text-3xl gradient-text borel-font">CuteSense</span>
                <button id="mobile-close-btn" class="p-2 bg-cs-lilac/10 rounded-full"><i data-lucide="x"></i></button>
            </div>
            <div class="flex flex-col gap-8 text-2xl font-bold">
                <a href="${path}pages/mission.html" class="${isMission ? 'text-cs-lilac' : ''}">Philosophy</a>
                <a href="${path}pages/motto.html" class="${isMotto ? 'text-cs-lilac' : ''}">Motto</a>
                <a href="https://github.com/CuteSense-Studios" class="opacity-50">GitHub</a>
            </div>
        </div>
        `;
    }

    _init() {
        this._attachListeners();
        this._initScroll();
        this._initIcons();
    }

    _initIcons() {
        if (window.lucide) lucide.createIcons();
    }

    _initScroll() {
        const threshold = 10;
        window.addEventListener('scroll', () => {
            const nav = this.querySelector('[data-navbar]');
            const current = window.scrollY;
            if (!nav || this._isMenuOpen) return;
            
            if (Math.abs(current - this._lastScrollY) > threshold) {
                if (current > this._lastScrollY && current > 100) {
                    nav.classList.replace('nav-visible', 'nav-hidden');
                } else {
                    nav.classList.replace('nav-hidden', 'nav-visible');
                }
                this._lastScrollY = current;
            }
        }, { passive: true });
    }

    _attachListeners() {
        const themeBtn = this.querySelector('#theme-toggle-btn');
        const menuBtn = this.querySelector('#hamburger-btn');
        const closeBtn = this.querySelector('#mobile-close-btn');

        themeBtn?.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            this._initIcons(); 
        });

        menuBtn?.addEventListener('click', () => this._toggleMenu(true));
        closeBtn?.addEventListener('click', () => this._toggleMenu(false));
    }

    _toggleMenu(open) {
        this._isMenuOpen = open;
        const menu = this.querySelector('#mobile-menu');
        menu.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) this._initIcons();
    }
}

if (!customElements.get('cs-navbar')) customElements.define('cs-navbar', CuteSenseNavbar);