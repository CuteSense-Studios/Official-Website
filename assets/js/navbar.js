class CuteSenseNavbar extends HTMLElement {
    connectedCallback() {
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

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
            .dark .toggle-knob {
                transform: translateX(1rem);
            }
            @media (min-width: 640px) {
                .dark .toggle-knob {
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
            /* Toggle icon visibility fix */
            .icon-sun {
                display: block !important;
            }
            .icon-moon {
                display: none !important;
            }
            .dark .icon-sun {
                display: none !important;
            }
            .dark .icon-moon {
                display: block !important;
            }
            /* Ensure icons align properly */
            .github-btn svg, .github-btn i {
                display: inline-block;
                vertical-align: middle;
                flex-shrink: 0;
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[100] px-1 sm:px-4 pt-4">
            <div class="max-w-7xl mx-auto flex items-center justify-between md:justify-center relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-cs-lilac/20 rounded-[2rem] px-3 sm:px-6 h-14 sm:h-16 shadow-xl">
                
                <!-- LEFT -->
                <div class="flex items-center gap-1 sm:gap-4 md:absolute md:left-6 flex-shrink-0 z-10">
                    <button type="button" id="hamburger-btn" class="md:hidden p-2 text-cs-lilac dark:text-violet-400 active:scale-90 flex-shrink-0">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>

                    <div class="hidden md:flex gap-4 lg:gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <a href="${path}pages/mission.html" class="hover:text-cs-lilac transition-all whitespace-nowrap">Philosophy</a>
                        <a href="${path}pages/motto.html" class="hover:text-cs-lilac transition-all whitespace-nowrap">Motto</a>
                    </div>
                </div>

                <!-- CENTER: Logo -->
                <a href="${path}index.html" class="logo-container flex items-center gap-1 sm:gap-2 flex-shrink-0 hover:scale-105 active:scale-95 transition-transform md:mx-auto">
                    <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-5 sm:h-7 w-auto pixel-crisp flex-shrink-0">
                    <span class="logo-text text-base sm:text-xl gradient-text whitespace-nowrap pt-1" style="font-family: 'Borel', cursive;">CuteSense</span>
                </a>
                
                <!-- RIGHT -->
                <div class="flex items-center gap-1 sm:gap-4 md:absolute md:right-6 flex-shrink-0 z-10">
                    <a href="https://github.com/CuteSense-Studios" target="_blank" 
                       class="github-btn flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 hover:bg-cs-lilac/10 dark:hover:bg-cs-lilac/20 text-slate-700 dark:text-violet-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full border border-slate-200 dark:border-slate-700 active:scale-95">
                        <!-- INLINE GITHUB SVG - Always works, no library needed -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                            <path d="M9 18c-4.51 2-5-2-7-2"/>
                        </svg>
                        <span class="hidden sm:inline text-[10px] font-bold uppercase tracking-wider">GitHub</span>
                    </a>

                    <button type="button" id="theme-toggle-btn" class="w-8 h-5 sm:w-11 sm:h-6 bg-slate-200 dark:bg-cs-lilac/30 rounded-full relative shadow-inner border border-transparent dark:border-white/10 flex-shrink-0">
                        <div class="toggle-knob absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white dark:bg-cs-lilac rounded-full shadow-md flex items-center justify-center">
                            <i data-lucide="sun" class="w-2.5 h-2.5 text-orange-400 icon-sun"></i>
                            <i data-lucide="moon" class="w-2.5 h-2.5 text-white icon-moon"></i>
                        </div>
                    </button>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] bg-white dark:bg-slate-950 p-4 sm:p-8 flex-col md:hidden">
            <div class="flex justify-between items-center mb-10">
                <span class="text-2xl sm:text-3xl gradient-text" style="font-family: 'Borel', cursive;">CuteSense</span>
                <button type="button" id="mobile-close-btn" class="p-2 bg-cs-lilac/10 text-cs-lilac dark:text-violet-400 rounded-full">
                    <i data-lucide="x" class="w-7 h-7"></i>
                </button>
            </div>
            
            <div class="flex flex-col gap-8 text-2xl font-bold text-slate-900 dark:text-white">
                <a href="${path}pages/mission.html" class="mobile-nav-link hover:text-cs-lilac">Philosophy</a>
                <a href="${path}pages/motto.html" class="mobile-nav-link hover:text-cs-lilac">Motto</a>
                <a href="https://github.com/CuteSense-Studios" target="_blank" class="flex items-center gap-3 opacity-70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                    GitHub
                </a>
            </div>
        </div>
        `;

        // Initialize
        requestAnimationFrame(() => this.initAll());
    }

    initAll() {
        this.initIcons();
        this.attachEventListeners();
        // Retry for other icons
        [100, 500].forEach(delay => setTimeout(() => this.initIcons(), delay));
    }

    attachEventListeners() {
        const hamburgerBtn = this.querySelector('#hamburger-btn');
        const closeBtn = this.querySelector('#mobile-close-btn');
        const mobileLinks = this.querySelectorAll('.mobile-nav-link');
        const themeToggleBtn = this.querySelector('#theme-toggle-btn');

        if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => this.toggleMobileMenu());
        if (closeBtn) closeBtn.addEventListener('click', () => this.toggleMobileMenu());
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => { if (this.isMenuOpen()) this.toggleMobileMenu(); });
        });
        if (themeToggleBtn) themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    isMenuOpen() {
        const menu = this.querySelector('#mobile-menu');
        return menu ? menu.classList.contains('active') : false;
    }

    toggleMobileMenu() {
        const menu = this.querySelector('#mobile-menu');
        if (!menu) return;
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        if (menu.classList.contains('active')) setTimeout(() => this.initIcons(), 50);
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    initIcons() {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            try {
                lucide.createIcons();
            } catch (e) {
                console.warn('Lucide init error:', e);
            }
        }
    }
}

if (!customElements.get('cs-navbar')) {
    customElements.define('cs-navbar', CuteSenseNavbar);
}

window.toggleMenu = () => {
    const navbar = document.querySelector('cs-navbar');
    if (navbar) navbar.toggleMobileMenu();
};

window.toggleTheme = () => {
    const navbar = document.querySelector('cs-navbar');
    if (navbar) {
        navbar.toggleTheme();
    } else {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
};

(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
})();