class CuteSenseNavbar extends HTMLElement {
    constructor() {
        super();
        this._isMenuOpen = false;
        this._iconRetryCount = 0;
        this._maxIconRetries = 10; // Borrowed from your footer logic
        
        const savedTheme = localStorage.getItem('theme');
        this._isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    connectedCallback() {
        document.documentElement.classList.toggle('dark', this._isDark);
        this._render();
        this._init();
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
        return path.split('/').pop().replace('.html', '') || 'index';
    }

    _render() {
        const path = this._getPath();
        const active = this._getActivePage();
        
        const navItems = [
            { id: 'index', label: 'Home', href: `${path}index.html` },
            { id: 'mission', label: 'Philosophy', href: `${path}pages/mission.html` },
            { id: 'motto', label: 'Motto', href: `${path}pages/motto.html` },
            { id: 'code-of-conduct', label: 'Conduct', href: `${path}pages/code-of-conduct.html` },
            { id: 'contributing', label: 'Contributing', href: `${path}pages/contributing.html` },
            { id: 'buisness-model', label: 'Business Model', href: `${path}pages/buisness-model.html` }
        ];

        this.innerHTML = `
        <style>
            cs-navbar { display: block; height: 80px; z-index: 1000; position: relative; }
            
            /* Font Sync with footer.js */
            .borel-font {
                font-family: 'Borel', cursive;
            }

            #theme-toggle-btn {
                width: 48px;
                height: 26px;
                border-radius: 999px;
                position: relative;
                cursor: pointer;
                border: none;
                display: flex;
                align-items: center;
                background: #f1f5f9;
                transition: all 0.3s ease;
            }
            
            .dark #theme-toggle-btn { background: #334155; }
            
            #theme-toggle-btn .toggle-knob {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                position: absolute;
                left: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s;
                background: #ffffff;
            }

            .dark #theme-toggle-btn .toggle-knob {
                transform: translateX(22px);
                background: #c084fc; 
            }

            .desktop-link {
                font-size: 0.85rem;
                font-weight: 600;
                transition: all 0.2s ease;
                padding: 0.45rem 1rem;
                border-radius: 0.8rem;
                color: #64748b;
            }

            .dark .desktop-link { color: #94a3b8; }

            .nav-link-active { 
                color: #F08DA1 !important; /* Bubblegum Pink */
                background: rgba(240, 141, 161, 0.1);
            }

            .desktop-link:hover:not(.nav-link-active) {
                color: #4169E1; /* Royal Blue */
                background: rgba(65, 105, 225, 0.08);
            }
            
            .nav-hidden { transform: translateY(-120%); }
            .nav-visible { transform: translateY(0); }

            .nav-container {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                padding: 0 1.5rem;
            }

            .actions-section {
                position: absolute;
                right: 1.5rem;
                display: flex;
                align-items: center;
            }

            .links-section { display: flex; gap: 6px; }
            .brand-section { display: none; }

            @media (max-width: 1100px) {
                .nav-container { justify-content: space-between; }
                .links-section { display: none; }
                .brand-section { display: flex; align-items: center; gap: 0.5rem; }
                .brand-section a { font-weight: 700; font-size: 1.1rem; color: #1e293b; }
                .dark .brand-section a { color: white; }
                .actions-section { position: static; }
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[1000] px-4 pt-4 transition-transform duration-500 ease-out nav-visible" data-navbar>
            <div class="max-w-7xl mx-auto nav-container bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] h-16 shadow-xl">
                
                <div class="brand-section">
                    <button id="hamburger-btn" class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                    <a href="${path}index.html" class="borel-font">
                        <span class="text-[#F08DA1]">Cute</span>Sense
                    </a>
                </div>

                <div class="links-section">
                    ${navItems.map(item => `<a href="${item.href}" class="desktop-link ${active === item.id ? 'nav-link-active' : ''}">${item.label}</a>`).join('')}
                </div>
                
                <div class="actions-section">
                    <button type="button" id="theme-toggle-btn" aria-label="Toggle theme">
                        <div class="toggle-knob" id="knob-icon-container"></div>
                    </button>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[1100] bg-white dark:bg-slate-950 hidden flex-col p-8 transition-all duration-300 opacity-0 translate-y-[-20px]">
            <div class="flex justify-between items-center mb-10">
                <span class="text-2xl text-[#F08DA1] borel-font">Navigation</span>
                <button id="mobile-close-btn" class="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
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

    _initIcons() {
        const attemptIcons = () => {
            const knob = this.querySelector('#knob-icon-container');
            if (knob) {
                knob.innerHTML = this._isDark 
                    ? `<i data-lucide="moon" class="w-3.5 h-3.5 text-white"></i>`
                    : `<i data-lucide="sun" class="w-3.5 h-3.5 text-orange-500"></i>`;
            }

            if (window.lucide) {
                window.lucide.createIcons({
                    root: this,
                    attrs: { 'stroke-width': '2' }
                });
            } else if (this._iconRetryCount < this._maxIconRetries) {
                this._iconRetryCount++;
                setTimeout(attemptIcons, 100);
            }
        };
        attemptIcons();
    }

    _attachListeners() {
        this.querySelector('#theme-toggle-btn')?.addEventListener('click', () => {
            this._isDark = !this._isDark;
            document.documentElement.classList.toggle('dark', this._isDark);
            localStorage.setItem('theme', this._isDark ? 'dark' : 'light');
            this._initIcons();
        });

        // Hamburger Bug Fix: Target the specific rendered elements
        this.querySelector('#hamburger-btn')?.addEventListener('click', () => {
            this._toggleMenu(true);
        });

        this.querySelector('#mobile-close-btn')?.addEventListener('click', () => {
            this._toggleMenu(false);
        });
    }

    _initScroll() {
        let lastScroll = window.scrollY;
        window.addEventListener('scroll', () => {
            const nav = this.querySelector('[data-navbar]');
            const current = window.scrollY;
            if (!nav || this._isMenuOpen) return;

            if (current > lastScroll && current > 80) {
                nav.classList.replace('nav-visible', 'nav-hidden');
            } else if (current < lastScroll) {
                nav.classList.replace('nav-hidden', 'nav-visible');
            }
            lastScroll = current;
        }, { passive: true });
    }

    _toggleMenu(open) {
        const menu = this.querySelector('#mobile-menu');
        if (!menu) return;
        this._isMenuOpen = open;

        if (open) {
            menu.classList.remove('hidden');
            // Force a browser reflow to ensure the 'hidden' removal is processed before the transition
            void menu.offsetWidth; 
            menu.classList.add('opacity-100', 'translate-y-0');
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.remove('opacity-100', 'translate-y-0');
            setTimeout(() => {
                if (!this._isMenuOpen) {
                    menu.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }, 300);
        }
    }
}

if (!customElements.get('cs-navbar')) {
    customElements.define('cs-navbar', CuteSenseNavbar);
}
// Syntax Error Fixed: Removed extra closing brace