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
            .toggle-inner {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            html.dark .toggle-inner {
                transform: translateX(1.5rem) !important;
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
            <div class="relative max-w-7xl mx-auto flex justify-between items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-cs-lilac/20 rounded-[2.5rem] px-5 sm:px-10 h-16 sm:h-20 shadow-xl">
                
                <div class="flex items-center justify-start z-10">
                    <div class="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest opacity-80">
                        <a href="${path}pages/mission.html" class="hover:text-cs-lilac active:scale-95 transition-all whitespace-nowrap">Philosophy</a>
                        <a href="${path}pages/motto.html" class="hover:text-cs-lilac active:scale-95 transition-all whitespace-nowrap">Motto</a>
                    </div>
                    <button onclick="toggleMenu()" class="md:hidden p-3 -ml-2 text-cs-lilac hover:bg-cs-lilac/10 active:scale-90 rounded-xl transition-all">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>

                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center z-10 pointer-events-none w-max">
                    <a href="${path}index.html" class="pointer-events-auto flex items-center gap-2 sm:gap-4 hover:scale-105 active:scale-95 transition-transform shrink-0">
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-8 sm:h-12 w-auto block drop-shadow-md pixel-crisp">
                        <span class="text-3xl sm:text-4xl gradient-text borel-font whitespace-nowrap inline-block pt-2 pb-1">CuteSense</span>
                    </a>
                </div>
                
                <div class="flex items-center justify-end gap-3 sm:gap-6 z-10">
                    <div class="flex items-center gap-2">
                        <i data-lucide="sun" class="hidden sm:block w-4 h-4 opacity-50 text-cs-lilac"></i>
                        <button onclick="toggleTheme()" class="w-12 h-6 bg-slate-200 dark:bg-cs-lilac rounded-full p-1 relative active:scale-90 transition-all shadow-inner flex items-center cursor-pointer">
                            <div class="toggle-inner w-4 h-4 bg-white rounded-full shadow-md"></div>
                        </button>
                        <i data-lucide="moon" class="hidden sm:block w-4 h-4 opacity-50 text-cs-lilac"></i>
                    </div>
                    <a href="https://github.com/CuteSense-Studios" target="_blank" class="text-cs-dark dark:text-cs-lilac hover:rotate-12 active:scale-90 transition-transform">
                        <i data-lucide="github" class="w-6 h-6"></i>
                    </a>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] bg-cs-cream dark:bg-cs-dark p-8 sm:p-10 flex flex-col md:hidden overscroll-contain">
            <div class="flex justify-between items-center mb-12">
                <span class="text-4xl gradient-text borel-font inline-block py-2">CuteSense</span>
                <button onclick="toggleMenu()" class="p-3 bg-cs-lilac/10 text-cs-lilac active:scale-90 rounded-full transition-transform"><i data-lucide="x" class="w-8 h-8"></i></button>
            </div>
            <div class="flex flex-col gap-8 text-3xl font-bold cute-font">
                <a href="${path}pages/mission.html" onclick="toggleMenu()" class="active:text-cs-lilac active:translate-x-2 transition-all">Philosophy</a>
                <a href="${path}pages/motto.html" onclick="toggleMenu()" class="active:text-cs-lilac active:translate-x-2 transition-all">Motto</a>
                
                <div class="mt-auto pt-10 border-t-4 border-dotted border-cs-lilac/20 flex justify-between items-center">
                    <span class="text-sm uppercase tracking-widest opacity-50 font-sans">Dark Mode</span>
                    <button onclick="toggleTheme()" class="w-16 h-8 bg-cs-lilac rounded-full p-1.5 relative active:scale-95 transition-transform">
                        <div class="toggle-inner w-5 h-5 bg-white rounded-full"></div>
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

window.toggleMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        if (window.lucide) lucide.createIcons();
    }
};