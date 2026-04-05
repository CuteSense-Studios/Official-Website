class CuteSenseNavbar extends HTMLElement {
    connectedCallback() {
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

        this.innerHTML = `
        <style>
            cs-navbar { 
                display: block; 
                height: 90px; 
                z-index: 100;
            }
            #mobile-menu {
                opacity: 0;
                pointer-events: none;
                transform: translateX(100%);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            #mobile-menu.active {
                opacity: 1;
                pointer-events: auto;
                transform: translateX(0);
            }
            .borel-font {
                padding-left: 0.25rem;
                padding-right: 0.25rem;
            }
            a, button {
                -webkit-tap-highlight-color: transparent;
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[100] px-4 pt-4">
            <div class="relative max-w-7xl mx-auto flex justify-between items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-cs-lilac/20 rounded-[2.5rem] px-5 sm:px-10 h-14 sm:h-16 shadow-xl">
                
                <div class="flex items-center justify-start z-10">
                    <div class="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest opacity-80">
                        <a href="${path}pages/mission.html" class="hover:text-cs-lilac active:scale-95 transition-all whitespace-nowrap">Philosophy</a>
                        <a href="${path}pages/motto.html" class="hover:text-cs-lilac active:scale-95 transition-all whitespace-nowrap">Motto</a>
                    </div>
                    <button onclick="toggleMenu()" class="md:hidden p-2 -ml-2 text-cs-lilac hover:bg-cs-lilac/10 active:scale-90 rounded-xl transition-all">
                        <i data-lucide="menu" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center z-10 pointer-events-none w-max">
                    <a href="${path}index.html" class="pointer-events-auto flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shrink-0">
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-5 sm:h-6 w-auto block drop-shadow-md pixel-crisp">
                        <span class="text-lg sm:text-xl gradient-text borel-font whitespace-nowrap inline-block pt-1 pb-1">CuteSense</span>
                    </a>
                </div>
                
                <div class="flex items-center justify-end gap-3 sm:gap-6 z-10">
                    <div class="flex items-center gap-2">
                        <i data-lucide="sun" class="hidden sm:block w-3.5 h-3.5 opacity-50 text-cs-lilac"></i>
                        
                        <button onclick="toggleTheme()" class="w-10 h-5 bg-slate-200 dark:bg-cs-lilac rounded-full relative active:scale-90 transition-all shadow-inner cursor-pointer block shrink-0 outline-none">
                            <div class="absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out translate-x-0 dark:translate-x-5"></div>
                        </button>
                        
                        <i data-lucide="moon" class="hidden sm:block w-3.5 h-3.5 opacity-50 text-cs-lilac"></i>
                    </div>
                    <a href="https://github.com/CuteSense-Studios" target="_blank" class="text-cs-dark dark:text-cs-lilac hover:rotate-12 active:scale-90 transition-transform">
                        <i data-lucide="github" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] bg-cs-cream dark:bg-cs-dark p-8 sm:p-10 flex flex-col md:hidden overscroll-contain">
            <div class="flex justify-between items-center mb-10">
                <span class="text-xl gradient-text borel-font inline-block py-2">CuteSense</span>
                <button onclick="toggleMenu()" class="p-2 bg-cs-lilac/10 text-cs-lilac active:scale-90 rounded-full transition-transform"><i data-lucide="x" class="w-6 h-6"></i></button>
            </div>
            
            <div class="flex flex-col gap-5 text-base font-bold cute-font">
                <a href="${path}pages/mission.html" onclick="toggleMenu()" class="active:text-cs-lilac active:translate-x-2 transition-all">Philosophy</a>
                <a href="${path}pages/motto.html" onclick="toggleMenu()" class="active:text-cs-lilac active:translate-x-2 transition-all">Motto</a>
                
                <div class="mt-auto pt-8 border-t-4 border-dotted border-cs-lilac/20 flex justify-between items-center">
                    <span class="text-[10px] uppercase tracking-widest opacity-50 font-sans transition-all">
                        <span class="inline dark:hidden">Dark Mode</span>
                        <span class="hidden dark:inline">Light Mode</span>
                    </span>
                    
                    <button onclick="toggleTheme()" class="w-12 h-6 bg-slate-200 dark:bg-cs-lilac rounded-full relative active:scale-95 transition-all shadow-inner cursor-pointer block shrink-0 outline-none">
                        <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out translate-x-0 dark:translate-x-6"></div>
                    </button>
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

// Theme Toggle Logic
window.toggleTheme = () => {
    // 1. Toggle the 'dark' class on the root <html> element
    const isDark = document.documentElement.classList.toggle('dark');
    
    // 2. Save the preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Apply theme on initial load to prevent flickering
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();