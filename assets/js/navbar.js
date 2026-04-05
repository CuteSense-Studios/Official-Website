class CuteSenseNavbar extends HTMLElement {
    constructor() {
        super();
        this._scrollHandler = null;
        this._resizeHandler = null;
        this._clickOutsideHandler = null;
        this._keydownHandler = null;
        this._lastScrollY = 0;
        this._isScrollingDown = false;
        this._navVisible = true;
        this._isMenuOpen = false;
    }

    connectedCallback() {
        this._render();
        requestAnimationFrame(() => this._init());
    }

    disconnectedCallback() {
        this._cleanup();
    }

    _cleanup() {
        if (this._scrollHandler) {
            window.removeEventListener('scroll', this._scrollHandler, { passive: true });
        }
        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
        }
        if (this._clickOutsideHandler) {
            document.removeEventListener('click', this._clickOutsideHandler);
        }
        if (this._keydownHandler) {
            document.removeEventListener('keydown', this._keydownHandler);
        }
        document.body.classList.remove('menu-open');
    }

    _getPath() {
        try {
            const path = window.location.pathname;
            if (path.includes('/pages/') || path.includes('/docs/')) {
                return '../';
            }
            return './';
        } catch (e) {
            return './';
        }
    }

    _getActivePage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    }

    _render() {
        const path = this._getPath();
        const activePage = this._getActivePage();
        
        const isMission = activePage === 'mission';
        const isMotto = activePage === 'motto';
        const isIndex = activePage === 'index' || activePage === '';

        this.innerHTML = `
        <style>
            cs-navbar { 
                display: block; 
                height: 80px; 
                z-index: 100;
            }
            a, button {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
            }
            #mobile-menu {
                opacity: 0;
                pointer-events: none;
                transform: translateY(-10px);
                transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: none;
            }
            #mobile-menu.active {
                opacity: 1;
                pointer-events: auto;
                transform: translateY(0);
                display: flex;
            }
            body.menu-open {
                overflow: hidden;
            }
            .gradient-text {
                background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .toggle-knob {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            /* FIX: Remove !important and use proper specificity for icon visibility */
            html:not(.dark) .icon-sun {
                display: block;
            }
            html:not(.dark) .icon-moon {
                display: none;
            }
            html.dark .icon-sun {
                display: none;
            }
            html.dark .icon-moon {
                display: block;
            }
            /* Toggle knob positioning */
            html.dark .toggle-knob {
                transform: translateX(1rem);
            }
            @media (min-width: 640px) {
                html.dark .toggle-knob {
                    transform: translateX(1.25rem);
                }
            }
            @media (max-width: 380px) {
                .logo-container .logo-text {
                    font-size: 0.85rem !important;
                }
                .github-btn span {
                    display: none;
                }
                .github-btn {
                    padding-left: 0.5rem !important;
                    padding-right: 0.5rem !important;
                }
            }
            /* Ensure icons align properly */
            .github-btn svg, .github-btn i {
                display: inline-block;
                vertical-align: middle;
                flex-shrink: 0;
            }
            /* Scroll behavior classes */
            .nav-hidden {
                transform: translateY(-100%);
            }
            .nav-visible {
                transform: translateY(0);
            }
            .nav-link-active {
                position: relative;
            }
            .nav-link-active::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
                border-radius: 2px;
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[100] px-1 sm:px-4 pt-4 transition-transform duration-300 ease-out nav-visible" data-navbar>
            <div class="max-w-7xl mx-auto flex items-center justify-between md:justify-center relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-cs-lilac/20 rounded-[2rem] px-3 sm:px-6 h-14 sm:h-16 shadow-xl">
                
                <!-- LEFT -->
                <div class="flex items-center gap-1 sm:gap-4 md:absolute md:left-6 flex-shrink-0 z-10">
                    <button type="button" id="hamburger-btn" class="md:hidden p-2 text-cs-lilac dark:text-violet-400 active:scale-90 flex-shrink-0" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>

                    <div class="hidden md:flex gap-4 lg:gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <a href="${path}pages/mission.html" class="hover:text-cs-lilac transition-all whitespace-nowrap ${isMission ? 'nav-link-active text-cs-lilac' : ''}" ${isMission ? 'aria-current="page"' : ''}>Philosophy</a>
                        <a href="${path}pages/motto.html" class="hover:text-cs-lilac transition-all whitespace-nowrap ${isMotto ? 'nav-link-active text-cs-lilac' : ''}" ${isMotto ? 'aria-current="page"' : ''}>Motto</a>
                    </div>
                </div>

                <!-- CENTER: Logo -->
                <a href="${path}index.html" class="logo-container flex items-center gap-1 sm:gap-2 flex-shrink-0 hover:scale-105 active:scale-95 transition-transform md:mx-auto" ${isIndex ? 'aria-current="page"' : ''}>
                    <img src="${path}assets/icons/companylogo.webp" alt="CuteSense Logo" class="h-5 sm:h-7 w-auto pixel-crisp flex-shrink-0" loading="eager" decoding="async" onerror="this.style.display='none'">
                    <span class="logo-text text-base sm:text-xl gradient-text whitespace-nowrap pt-1" style="font-family: 'Borel', cursive;">CuteSense</span>
                </a>
                
                <!-- RIGHT -->
                <div class="flex items-center gap-1 sm:gap-4 md:absolute md:right-6 flex-shrink-0 z-10">
                    <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer"
                       class="github-btn flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 hover:bg-cs-lilac/10 dark:hover:bg-cs-lilac/20 text-slate-700 dark:text-violet-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full border border-slate-200 dark:border-slate-700 active:scale-95 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" aria-hidden="true">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                            <path d="M9 18c-4.51 2-5-2-7-2"/>
                        </svg>
                        <span class="hidden sm:inline text-[10px] font-bold uppercase tracking-wider">GitHub</span>
                    </a>

                    <button type="button" id="theme-toggle-btn" class="w-8 h-5 sm:w-11 sm:h-6 bg-slate-200 dark:bg-cs-lilac/30 rounded-full relative shadow-inner border border-transparent dark:border-white/10 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-cs-lilac/50" aria-label="Toggle dark mode">
                        <div class="toggle-knob absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white dark:bg-cs-lilac rounded-full shadow-md flex items-center justify-center">
                            <i data-lucide="sun" class="w-2.5 h-2.5 text-orange-400 icon-sun" aria-hidden="true"></i>
                            <i data-lucide="moon" class="w-2.5 h-2.5 text-white icon-moon" aria-hidden="true"></i>
                        </div>
                    </button>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] bg-white dark:bg-slate-950 p-4 sm:p-8 flex-col md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div class="flex justify-between items-center mb-10">
                <span class="text-2xl sm:text-3xl gradient-text" style="font-family: 'Borel', cursive;">CuteSense</span>
                <button type="button" id="mobile-close-btn" class="p-2 bg-cs-lilac/10 text-cs-lilac dark:text-violet-400 rounded-full focus:outline-none focus:ring-2 focus:ring-cs-lilac/50" aria-label="Close menu">
                    <i data-lucide="x" class="w-7 h-7"></i>
                </button>
            </div>
            
            <div class="flex flex-col gap-8 text-2xl font-bold text-slate-900 dark:text-white" role="menubar">
                <a href="${path}pages/mission.html" class="mobile-nav-link hover:text-cs-lilac transition-colors ${isMission ? 'text-cs-lilac' : ''}" ${isMission ? 'aria-current="page"' : ''} role="menuitem">Philosophy</a>
                <a href="${path}pages/motto.html" class="mobile-nav-link hover:text-cs-lilac transition-colors ${isMotto ? 'text-cs-lilac' : ''}" ${isMotto ? 'aria-current="page"' : ''} role="menuitem">Motto</a>
                <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity" role="menuitem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                    GitHub
                </a>
            </div>
        </div>
        `;
    }

    _init() {
        this._initScrollBehavior();
        this._attachEventListeners();
        this._initIcons();
        this._adjustScrollPadding();
        
        [100, 500, 1000].forEach(delay => 
            setTimeout(() => this._initIcons(), delay)
        );
    }

    _initScrollBehavior() {
        let ticking = false;
        const threshold = 5;
        
        this._scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const nav = this.querySelector('[data-navbar]');
                    
                    if (!nav) return;
                    
                    if (Math.abs(currentScrollY - this._lastScrollY) > threshold) {
                        const isScrollingDown = currentScrollY > this._lastScrollY;
                        
                        if (isScrollingDown && currentScrollY > 100 && !this._isMenuOpen) {
                            nav.classList.add('nav-hidden');
                            nav.classList.remove('nav-visible');
                            this._navVisible = false;
                        } else {
                            nav.classList.remove('nav-hidden');
                            nav.classList.add('nav-visible');
                            this._navVisible = true;
                        }
                        
                        this._lastScrollY = currentScrollY;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', this._scrollHandler, { passive: true });
    }

    _attachEventListeners() {
        const hamburgerBtn = this.querySelector('#hamburger-btn');
        const closeBtn = this.querySelector('#mobile-close-btn');
        const mobileLinks = this.querySelectorAll('.mobile-nav-link');
        const themeToggleBtn = this.querySelector('#theme-toggle-btn');
        const githubLink = this.querySelector('.github-btn');

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this._isMenuOpen) this.toggleMobileMenu();
            });
        });

        // FIX: Properly bind theme toggle to avoid circular reference
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._handleThemeToggle();
            });
        }

        this._clickOutsideHandler = (e) => {
            const menu = this.querySelector('#mobile-menu');
            const hamburger = this.querySelector('#hamburger-btn');
            
            if (this._isMenuOpen && menu && !menu.contains(e.target) && !hamburger.contains(e.target)) {
                this.toggleMobileMenu();
            }
        };
        document.addEventListener('click', this._clickOutsideHandler);

        this._keydownHandler = (e) => {
            if (e.key === 'Escape' && this._isMenuOpen) {
                this.toggleMobileMenu();
            }
            
            if (this._isMenuOpen && e.key === 'Tab') {
                const menu = this.querySelector('#mobile-menu');
                const focusable = menu.querySelectorAll('a[href], button:not([disabled])');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', this._keydownHandler);

        let resizeTimeout;
        this._resizeHandler = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth >= 768 && this._isMenuOpen) {
                    this.toggleMobileMenu();
                }
                this._adjustScrollPadding();
            }, 250);
        };
        window.addEventListener('resize', this._resizeHandler);

        if (githubLink) {
            githubLink.addEventListener('mouseenter', () => {
                if (!document.querySelector('link[href="https://github.com/CuteSense-Studios"]')) {
                    const prefetch = document.createElement('link');
                    prefetch.rel = 'prefetch';
                    prefetch.href = 'https://github.com/CuteSense-Studios';
                    document.head.appendChild(prefetch);
                }
            }, { once: true });
        }
    }

    // FIX: Separate internal theme handler to avoid circular reference with window.toggleTheme
    _handleThemeToggle() {
        // Check if there's a global theme controller that isn't this component's method
        if (window.CuteSenseTheme && typeof window.CuteSenseTheme.toggle === 'function') {
            window.CuteSenseTheme.toggle();
        } else if (typeof window.applyTheme === 'function') {
            // Use theme.js applyTheme if available
            const isDark = !document.documentElement.classList.contains('dark');
            window.applyTheme(isDark);
        } else {
            // Fallback: toggle directly
            const isDark = !document.documentElement.classList.contains('dark');
            if (isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
        
        // Refresh icons after toggle
        setTimeout(() => this._initIcons(), 50);
    }

    _adjustScrollPadding() {
        const nav = this.querySelector('nav');
        if (nav) {
            const height = nav.offsetHeight + 20;
            document.documentElement.style.scrollPaddingTop = `${height}px`;
        }
    }

    _initIcons() {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            try {
                lucide.createIcons();
            } catch (e) {
                console.warn('Lucide init error:', e);
            }
        }
    }

    // Public API (maintaining backward compatibility)
    isMenuOpen() {
        return this._isMenuOpen;
    }

    toggleMobileMenu() {
        const menu = this.querySelector('#mobile-menu');
        const hamburgerBtn = this.querySelector('#hamburger-btn');
        const closeBtn = this.querySelector('#mobile-close-btn');
        
        if (!menu) return;
        
        this._isMenuOpen = !this._isMenuOpen;
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        if (hamburgerBtn) {
            hamburgerBtn.setAttribute('aria-expanded', this._isMenuOpen);
        }
        
        if (this._isMenuOpen) {
            setTimeout(() => {
                if (closeBtn) closeBtn.focus();
                this._initIcons();
            }, 50);
        } else {
            if (hamburgerBtn) hamburgerBtn.focus();
        }
    }

    // FIX: Deprecated - use _handleThemeToggle internally, keep for external compatibility
    toggleTheme() {
        this._handleThemeToggle();
    }

    setVisible(visible) {
        const nav = this.querySelector('[data-navbar]');
        if (!nav) return;
        
        if (visible) {
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        } else {
            nav.classList.add('nav-hidden');
            nav.classList.remove('nav-visible');
        }
        this._navVisible = visible;
    }
}

if (!customElements.get('cs-navbar')) {
    try {
        customElements.define('cs-navbar', CuteSenseNavbar);
    } catch (e) {
        console.error('Failed to define cs-navbar:', e);
    }
}

// FIX: Global functions that properly delegate without circular references
window.toggleMenu = () => {
    const navbar = document.querySelector('cs-navbar');
    if (navbar) navbar.toggleMobileMenu();
};

// FIX: Prevent circular reference by checking if we're calling ourselves
window.toggleTheme = () => {
    // If theme.js is loaded, let it handle everything
    if (window.CuteSenseTheme && typeof window.CuteSenseTheme.toggle === 'function') {
        window.CuteSenseTheme.toggle();
        return;
    }
    
    // Otherwise handle directly
    const isDark = !document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
    
    // Notify any navbars to refresh icons
    document.querySelectorAll('cs-navbar').forEach(nav => {
        if (nav._initIcons) setTimeout(() => nav._initIcons(), 50);
    });
};

// Initialize theme immediately to prevent FOUC
(function initTheme() {
    try {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        }
    } catch (e) {
        console.warn('Theme init error:', e);
    }
})();