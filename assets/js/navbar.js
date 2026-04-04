class CuteSenseNavbar extends HTMLElement {
    connectedCallback() {
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

        this.innerHTML = `
        <nav class="fixed w-full z-[100] px-4 md:px-8 py-4 sm:py-6">
            <div class="max-w-7xl mx-auto flex items-center justify-between bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b-4 border-cs-lilac/20 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 shadow-lg transition-all duration-300">
                
                <a href="${path}index.html" class="flex items-center gap-2 sm:gap-3 shrink-0 hover:scale-105 transition-transform duration-300">
                    <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="w-auto block" style="height: clamp(30px, 5vw, 40px);">
                    <span class="text-2xl sm:text-3xl gradient-text borel-font leading-relaxed py-1 block">CuteSense</span>
                </a>
                
                <div class="hidden md:flex items-center gap-6 lg:gap-8 font-semibold text-sm">
                    <a href="${path}index.html" class="hover:text-cs-lilac transition-colors">Home</a>
                    <a href="${path}pages/mission.html" class="hover:text-cs-lilac transition-colors">Philosophy</a>
                    <a href="${path}pages/motto.html" class="hover:text-cs-lilac transition-colors">Motto</a>
                </div>
                
                <div class="flex items-center gap-3 sm:gap-4">
                    <a href="https://github.com/CuteSense-Studios" target="_blank" class="hidden sm:flex items-center gap-2 bg-cs-dark dark:bg-cs-lilac text-white px-4 py-2 rounded-full hover:opacity-90 transition-all shadow-md text-sm font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                            <path d="M9 18c-4.51 2-5-2-7-2"/>
                        </svg>
                        <span>Repository</span>
                    </a>
                    
                    <div class="hidden md:flex items-center gap-2 ml-2">
                        <i data-lucide="sun" class="w-4 h-4 opacity-70 text-cs-lilac"></i>
                        <button onclick="toggleTheme()" class="relative inline-block w-10 h-5 sm:w-12 sm:h-6 align-middle select-none transition duration-200 ease-in bg-slate-200 dark:bg-cs-lilac rounded-full p-0">
                            <span class="toggle-inner block w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in ml-0.5 mt-0.5 sm:mt-0"></span>
                        </button>
                        <i data-lucide="moon" class="w-4 h-4 opacity-70 text-cs-lilac"></i>
                    </div>
                    <button id="menu-toggle" class="md:hidden p-2 text-cs-lilac ml-1" onclick="toggleMenu()"><i data-lucide="menu" class="w-6 h-6"></i></button>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] md:hidden flex flex-col p-8 sm:p-10 bg-cs-cream dark:bg-cs-dark transition-all">
            <div class="flex justify-between items-center mb-16">
                <span class="text-4xl sm:text-5xl gradient-text borel-font leading-relaxed">CuteSense</span>
                <button onclick="toggleMenu()" class="p-3 bg-cs-lilac/10 text-cs-lilac rounded-full"><i data-lucide="x"></i></button>
            </div>
            <div class="flex flex-col gap-8 text-xl sm:text-2xl font-bold cute-font">
                <a href="${path}index.html" onclick="toggleMenu()" class="hover:text-cs-lilac">Home</a>
                <a href="${path}pages/mission.html" onclick="toggleMenu()" class="hover:text-cs-lilac">Philosophy</a>
                <a href="${path}pages/motto.html" onclick="toggleMenu()" class="hover:text-cs-lilac">Motto</a>
                <a href="https://github.com/CuteSense-Studios" target="_blank" class="hover:text-cs-lilac flex items-center justify-between"><span>Repository</span><i data-lucide="external-link" class="w-5 h-5 opacity-50"></i></a>
                <button onclick="toggleTheme(); toggleMenu();" class="flex items-center justify-between w-full mt-4 pt-4 border-t border-cs-lilac/20"><span>Toggle Theme</span><i data-lucide="moon" class="dark:hidden"></i><i data-lucide="sun" class="hidden dark:block"></i></button>
            </div>
        </div>
        `;

        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

customElements.define('cs-navbar', CuteSenseNavbar);

window.toggleMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if(menu) {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        if (window.lucide) lucide.createIcons();
    }
};