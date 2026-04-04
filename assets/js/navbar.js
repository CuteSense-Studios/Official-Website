class CuteSenseNavbar extends HTMLElement {
    connectedCallback() {
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

        this.innerHTML = `
        <style>
            /* Reset any weird inherited heights */
            cs-navbar { display: block; height: 80px; }
            
            #mobile-menu {
                opacity: 0;
                pointer-events: none;
                transform: translateX(100%);
                transition: all 0.3s ease-in-out;
            }
            #mobile-menu.active {
                opacity: 1;
                pointer-events: auto;
                transform: translateX(0);
            }

            /* Smooth Toggle Movement */
            .toggle-inner {
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            html.dark .toggle-inner {
                transform: translateX(1rem);
            }
        </style>

        <nav class="fixed w-full z-[100] px-4 py-3">
            <div class="max-w-5xl mx-auto flex items-center justify-between bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-2 border-cs-lilac/20 rounded-2xl px-6 h-14 sm:h-16 shadow-lg overflow-hidden">
                
                <div class="flex-1 flex items-center justify-start">
                    <div class="hidden md:flex gap-6 text-sm font-bold text-cs-dark dark:text-slate-200">
                        <a href="${path}pages/mission.html" class="hover:text-cs-lilac transition-colors">Philosophy</a>
                        <a href="${path}pages/motto.html" class="hover:text-cs-lilac transition-colors">Motto</a>
                    </div>
                    <button onclick="toggleMenu()" class="md:hidden p-2 text-cs-lilac hover:bg-cs-lilac/10 rounded-lg transition-colors">
                        <i data-lucide="menu" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="flex-none flex items-center justify-center px-4">
                    <a href="${path}index.html" class="flex items-center gap-2.5 hover:scale-105 transition-transform">
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-7 sm:h-8 w-auto block">
                        <span class="text-xl sm:text-2xl gradient-text borel-font leading-none translate-y-0.5 whitespace-nowrap">CuteSense</span>
                    </a>
                </div>
                
                <div class="flex-1 flex items-center justify-end gap-3 sm:gap-4">
                    <div class="hidden sm:flex items-center">
                        <button onclick="toggleTheme()" class="w-9 h-5 bg-slate-200 dark:bg-cs-lilac rounded-full p-1 relative transition-colors shadow-inner">
                            <div class="toggle-inner w-3 h-3 bg-white rounded-full shadow-sm"></div>
                        </button>
                    </div>
                    <a href="https://github.com/CuteSense-Studios" target="_blank" class="p-1.5 text-cs-dark dark:text-cs-lilac hover:scale-110 transition-transform">
                        <i data-lucide="github" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] md:hidden bg-cs-cream dark:bg-cs-dark p-8 flex flex-col">
            <div class="flex justify-between items-center mb-10">
                <span class="text-2xl gradient-text borel-font">CuteSense</span>
                <button onclick="toggleMenu()" class="p-2 bg-cs-lilac/10 text-cs-lilac rounded-full">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            <nav class="flex flex-col gap-8 text-2xl font-bold text-cs-dark dark:text-slate-100">
                <a href="${path}pages/mission.html" onclick="toggleMenu()">Philosophy</a>
                <a href="${path}pages/motto.html" onclick="toggleMenu()">Motto</a>
                <div class="mt-4 pt-8 border-t border-cs-lilac/10 flex justify-between items-center">
                    <span class="text-sm font-bold uppercase tracking-widest opacity-50">Theme</span>
                    <button onclick="toggleTheme()" class="w-12 h-6 bg-cs-lilac rounded-full p-1 relative">
                        <div class="toggle-inner w-4 h-4 bg-white rounded-full"></div>
                    </button>
                </div>
            </nav>
        </div>
        `;

        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// Define the component once
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