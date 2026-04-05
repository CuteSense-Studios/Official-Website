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
            #mobile-menu {
                opacity: 0;
                pointer-events: none;
                transform: translateY(-10px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            #mobile-menu.active {
                opacity: 1;
                pointer-events: auto;
                transform: translateY(0);
            }
            body.menu-open {
                overflow: hidden;
            }
            .borel-font {
                padding-left: 0.1rem;
                padding-right: 0.1rem;
            }
            /* Ensure the logo text doesn't wrap awkwardly on tiny screens */
            .nav-logo-text {
                white-space: nowrap;
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[100] px-3 sm:px-4 pt-4">
            <div class="max-w-7xl mx-auto flex items-center justify-between bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-cs-lilac/20 rounded-[2rem] px-4 sm:px-10 h-14 sm:h-16 shadow-xl">
                
                <div class="flex-1 flex items-center justify-start z-10">
                    <div class="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest opacity-80">
                        <a href="${path}pages/mission.html" class="hover:text-cs-lilac transition-all">Philosophy</a>
                        <a href="${path}pages/motto.html" class="hover:text-cs-lilac transition-all">Motto</a>
                    </div>
                    <button onclick="toggleMenu()" class="md:hidden p-2 -ml-2 text-cs-lilac hover:bg-cs-lilac/10 rounded-xl transition-all">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>

                <div class="flex-none flex justify-center z-10">
                    <a href="${path}index.html" class="flex items-center gap-1.5 hover:scale-105 transition-transform shrink-0">
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-5 sm:h-6 w-auto block pixel-crisp">
                        <span class="text-base sm:text-xl gradient-text borel-font nav-logo-text pt-1">CuteSense</span>
                    </a>
                </div>
                
                <div class="flex-1 flex items-center justify-end gap-3 sm:gap-5 z-10">
                    <div class="flex items-center gap-1.5 sm:gap-3">
                        <i data-lucide="sun" class="hidden xs:block w-3.5 h-3.5 text-cs-lilac opacity-50 dark:opacity-20 transition-opacity"></i>
                        <button onclick="toggleTheme()" class="w-8 h-4.5 sm:w-9 sm:h-5 bg-slate-200 dark:bg-cs-lilac rounded-full relative transition-all shadow-inner outline-none">
                            <div class="absolute top-0.5 left-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-md transition-transform duration-300 translate-x-0 dark:translate-x-3.5 sm:dark:translate-x-4"></div>
                        </button>
                        <i data-lucide="moon" class="hidden xs:block w-3.5 h-3.5 text-cs-lilac opacity-20 dark:opacity-100 transition-opacity"></i>
                    </div>
                    <a href="https://github.com/CuteSense-Studios" target="_blank" class="text-cs-dark dark:text-cs-lilac hover:rotate-12 transition-transform">
                        <i data-lucide="github" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] bg-cs-cream dark:bg-cs-dark p-8 flex flex-col md:hidden overscroll-contain">
            <div class="flex justify-between items-center mb-10">
                <span class="text-2xl gradient-text borel-font">CuteSense</span>
                <button onclick="toggleMenu()" class="p-2 bg-cs-lilac/10 text-cs-lilac rounded-full transition-transform">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            
            <div class="flex flex-col gap-6 text-xl font-bold cute-font">
                <a href="${path}pages/mission.html" onclick="toggleMenu()" class="active:text-cs-lilac transition-all">Philosophy</a>
                <a href="${path}pages/motto.html" onclick="toggleMenu()" class="active:text-cs-lilac transition-all">Motto</a>
                
                <div class="mt-auto pt-8 border-t-2 border-dotted border-cs-lilac/20 flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <i data-lucide="sun" class="w-5 h-5 text-cs-lilac opacity-100 dark:opacity-20"></i>
                        <button onclick="toggleTheme()" class="w-14 h-7 bg-slate-200 dark:bg-cs-lilac rounded-full relative transition-all shadow-inner outline-none">
                            <div class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 translate-x-0 dark:translate-x-7"></div>
                        </button>
                        <i data-lucide="moon" class="w-5 h-5 text-cs-lilac opacity-20 dark:opacity-100"></i>
                    </div>
                    <span class="text-[10px] uppercase tracking-widest opacity-50 font-sans">
                        <span class="dark:hidden">Dark Mode</span>
                        <span class="hidden dark:inline">Light Mode</span>
                    </span>
                </div>
            </div>
        </div>
        `;

        setTimeout(() => {
            if (window.lucide) lucide.createIcons();
        }, 0);
    }
}

if (!customElements.get('cs-navbar')) {
    customElements.define('cs-navbar', CuteSenseNavbar);
}

// Global UI Logic (Preserved exactly as provided)
window.toggleMenu = () => {
    const menu = document.getElementById('mobile-menu');
    const isOpening = !menu.classList.contains('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    if (isOpening && window.lucide) lucide.createIcons();
};

window.toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
})();