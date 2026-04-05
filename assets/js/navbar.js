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
            /* Smooth transitions for an "intuitive" theme swap */
            :host, * {
                transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease, transform 0.2s ease;
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
            /* Prevent text clipping on narrow screens */
            .nav-logo-text {
                white-space: nowrap;
                display: inline-block;
            }
            .gradient-text {
                background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            /* Visual feedback for mobile taps */
            .mobile-tap:active {
                transform: scale(0.9);
                opacity: 0.7;
            }
        </style>

        <nav class="fixed top-0 left-0 w-full z-[100] px-3 sm:px-4 pt-4">
            <div class="max-w-7xl mx-auto flex items-center justify-between bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b-2 border-cs-lilac/20 rounded-3xl px-4 h-14 sm:h-16 shadow-lg">
                
                <div class="flex-1 flex items-center justify-start gap-4">
                    <button onclick="toggleMenu()" class="md:hidden mobile-tap p-2 -ml-2 text-cs-lilac dark:text-violet-400 hover:bg-cs-lilac/10 rounded-xl">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                    
                    <div class="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-tighter opacity-80 dark:text-slate-200">
                        <a href="${path}pages/mission.html" class="hover:text-cs-lilac transition-all">Philosophy</a>
                        <a href="${path}pages/motto.html" class="hover:text-cs-lilac transition-all">Motto</a>
                    </div>
                </div>

                <div class="flex-none flex items-center justify-center">
                    <a href="${path}index.html" class="flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform">
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="h-5 sm:h-6 w-auto pixel-crisp">
                        <span class="text-base sm:text-xl gradient-text borel-font nav-logo-text pt-1">CuteSense</span>
                    </a>
                </div>
                
                <div class="flex-1 flex items-center justify-end gap-2 sm:gap-4">
                    <a href="https://github.com/CuteSense-Studios" target="_blank" class="mobile-tap p-1.5 text-slate-700 dark:text-violet-300 hover:text-cs-lilac">
                        <i data-lucide="github" class="w-5 h-5"></i>
                    </a>

                    <div class="flex items-center gap-1 sm:gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200 dark:border-slate-700">
                        <button onclick="toggleTheme()" class="relative flex items-center w-10 h-5 sm:w-12 sm:h-6 bg-white dark:bg-cs-lilac rounded-full shadow-inner transition-all">
                            <div class="absolute left-0.5 dark:left-auto dark:right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-cs-lilac dark:bg-white rounded-full shadow-md transform transition-all duration-300">
                                <div class="flex items-center justify-center h-full w-full">
                                    <i data-lucide="sun" class="w-2.5 h-2.5 text-white dark:hidden"></i>
                                    <i data-lucide="moon" class="w-2.5 h-2.5 text-cs-lilac hidden dark:block"></i>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl p-8 flex flex-col md:hidden transition-all duration-500">
            <div class="flex justify-between items-center mb-12">
                <span class="text-3xl gradient-text borel-font">CuteSense</span>
                <button onclick="toggleMenu()" class="p-3 bg-cs-lilac/10 text-cs-lilac dark:text-violet-400 rounded-full active:scale-90">
                    <i data-lucide="x" class="w-7 h-7"></i>
                </button>
            </div>
            
            <div class="flex flex-col gap-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
                <a href="${path}pages/mission.html" onclick="toggleMenu()" class="hover:text-cs-lilac">Philosophy</a>
                <a href="${path}pages/motto.html" onclick="toggleMenu()" class="hover:text-cs-lilac">Motto</a>
                <a href="https://github.com/CuteSense-Studios" target="_blank" class="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <i data-lucide="github" class="w-6 h-6"></i> GitHub
                </a>
                
                <div class="mt-auto p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl flex justify-between items-center border border-slate-200/50 dark:border-slate-800">
                    <span class="font-medium text-sm text-slate-500">Appearance</span>
                    <button onclick="toggleTheme()" class="flex items-center gap-3 px-4 py-2 bg-white dark:bg-cs-lilac rounded-2xl shadow-sm border border-slate-200 dark:border-transparent">
                        <i data-lucide="sun" class="w-5 h-5 text-orange-400 dark:hidden"></i>
                        <i data-lucide="moon" class="w-5 h-5 text-white hidden dark:block"></i>
                        <span class="text-sm dark:text-white">Switch Mode</span>
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

// Logic - Clean & Preserved
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
    if (window.lucide) lucide.createIcons(); // Refresh icons inside the toggle knob
};

(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
})();