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
        </style>

        <nav class="fixed top-0 left-0 w-full z-[100] px-4 pt-4" style="position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; padding: 1rem 1rem 0 1rem;">
            <div class="max-w-7xl mx-auto grid grid-cols-3 items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-cs-lilac/20 rounded-[2.5rem] px-6 sm:px-10 h-16 sm:h-20 shadow-xl overflow-hidden"
                 style="display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; max-width: 80rem; margin: 0 auto; height: 5rem; padding: 0 2.5rem; overflow: hidden; border-radius: 2.5rem; box-sizing: border-box; background: rgba(255,255,255,0.95);">
                
                <div class="flex items-center justify-start" style="display: flex; align-items: center; justify-content: flex-start;">
                    <div class="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest opacity-80" style="display: flex; gap: 2rem; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8;">
                        <a href="${path}pages/mission.html" class="hover:text-cs-lilac transition-colors whitespace-nowrap" style="text-decoration: none; color: inherit;">Philosophy</a>
                        <a href="${path}pages/motto.html" class="hover:text-cs-lilac transition-colors whitespace-nowrap" style="text-decoration: none; color: inherit;">Motto</a>
                    </div>
                    <button onclick="toggleMenu()" class="md:hidden p-2 text-cs-lilac hover:bg-cs-lilac/10 rounded-xl" style="display: none;">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>

                <div class="flex justify-center" style="display: flex; justify-content: center; align-items: center;">
                    <a href="${path}index.html" class="flex items-center gap-3 sm:gap-5 hover:scale-105 transition-transform shrink-0" style="display: flex; align-items: center; gap: 1.25rem; text-decoration: none; color: inherit;">
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-10 sm:h-16 w-auto block drop-shadow-md pixel-crisp" style="height: 4rem; width: auto; display: block;">
                        <span class="text-3xl sm:text-5xl gradient-text borel-font translate-y-1.5 whitespace-nowrap" style="font-size: 3rem; transform: translateY(6px); white-space: nowrap;">CuteSense</span>
                    </a>
                </div>
                
                <div class="flex items-center justify-end gap-3 sm:gap-6" style="display: flex; align-items: center; justify-content: flex-end; gap: 1.5rem;">
                    <div class="flex items-center gap-2" style="display: flex; align-items: center; gap: 0.5rem;">
                        <i data-lucide="sun" class="hidden sm:block w-4 h-4 opacity-50 text-cs-lilac" style="width: 1rem; height: 1rem; opacity: 0.5;"></i>
                        <button onclick="toggleTheme()" class="w-12 h-6 bg-slate-200 dark:bg-cs-lilac rounded-full p-1 relative transition-colors shadow-inner flex items-center" style="width: 3rem; height: 1.5rem; background: #e2e8f0; border-radius: 9999px; border: none; cursor: pointer; display: flex; align-items: center; padding: 0.25rem;">
                            <div class="toggle-inner w-4 h-4 bg-white rounded-full shadow-md" style="width: 1rem; height: 1rem; background: white; border-radius: 50%;"></div>
                        </button>
                        <i data-lucide="moon" class="hidden sm:block w-4 h-4 opacity-50 text-cs-lilac" style="width: 1rem; height: 1rem; opacity: 0.5;"></i>
                    </div>
                    <a href="https://github.com/CuteSense-Studios" target="_blank" class="text-cs-dark dark:text-cs-lilac hover:rotate-12 transition-transform" style="display: flex; color: inherit;">
                        <i data-lucide="github" class="w-6 h-6" style="width: 1.5rem; height: 1.5rem;"></i>
                    </a>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] bg-cs-cream dark:bg-cs-dark p-10 flex flex-col md:hidden">
            <div class="flex justify-between items-center mb-12">
                <span class="text-4xl gradient-text borel-font">CuteSense</span>
                <button onclick="toggleMenu()" class="p-3 bg-cs-lilac/10 text-cs-lilac rounded-full"><i data-lucide="x" class="w-8 h-8"></i></button>
            </div>
            <div class="flex flex-col gap-10 text-3xl font-bold cute-font">
                <a href="${path}pages/mission.html" onclick="toggleMenu()">Philosophy</a>
                <a href="${path}pages/motto.html" onclick="toggleMenu()">Motto</a>
                <div class="mt-8 pt-10 border-t-4 border-dotted border-cs-lilac/20 flex justify-between items-center">
                    <span class="text-sm uppercase tracking-widest opacity-50 font-sans">Dark Mode</span>
                    <button onclick="toggleTheme()" class="w-14 h-8 bg-cs-lilac rounded-full p-1.5 relative">
                        <div class="toggle-inner w-5 h-5 bg-white rounded-full"></div>
                    </button>
                </div>
            </div>
        </div>
        `;

        if (window.lucide) lucide.createIcons();
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