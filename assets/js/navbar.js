class CuteSenseNavbar extends HTMLElement {
    connectedCallback() {
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

        this.innerHTML = `
        <style>
            /* 1. ANIMATIONS & TRANSITIONS */
            #mobile-menu {
                transform: translateX(100%);
                transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            #mobile-menu.active {
                transform: translateX(0);
            }
            
            /* 2. FONT ALIGNMENT (Borel & Icons) */
            .borel-font {
                line-height: 1.1;
                display: inline-flex;
                align-items: center;
                padding-bottom: 2px; /* Fixes baseline for script fonts */
            }

            /* 3. UNIVERSAL NAV GRID */
            .nav-container-grid {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                align-items: center;
                width: 100%;
            }

            /* 4. PC HOVER EFFECTS */
            .nav-link-pc {
                position: relative;
                font-weight: 700;
                letter-spacing: 0.05em;
                transition: all 0.3s ease;
            }
            .nav-link-pc::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 50%;
                width: 0;
                height: 2px;
                background: #B19CD9; /* cs-lilac */
                transition: all 0.3s ease;
                transform: translateX(-50%);
            }
            .nav-link-pc:hover::after {
                width: 100%;
            }

            /* 5. THEME TOGGLE ANIMATION */
            .toggle-dot {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .dark .toggle-dot {
                transform: translateX(20px);
            }
        </style>

        <nav class="fixed w-full z-[100] px-3 md:px-8 py-3 md:py-6">
            <div class="max-w-7xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-cs-lilac/10 rounded-3xl px-4 md:px-8 py-3 shadow-xl shadow-cs-lilac/5 transition-all duration-300 min-h-[70px] md:min-h-[85px] flex items-center">
                
                <div class="nav-container-grid">
                    <div class="hidden md:flex items-center gap-8">
                        <a href="${path}pages/mission.html" class="nav-link-pc text-slate-600 dark:text-slate-300 hover:text-cs-lilac text-xs uppercase">Philosophy</a>
                        <a href="${path}pages/motto.html" class="nav-link-pc text-slate-600 dark:text-slate-300 hover:text-cs-lilac text-xs uppercase">Motto</a>
                    </div>

                    <div class="flex justify-center">
                        <a href="${path}index.html" class="flex items-center gap-2 md:gap-3 shrink-0 hover:scale-105 transition-transform duration-300">
                            <img src="${path}assets/icons/companylogo.webp" alt="Logo" class="w-auto block h-[32px] md:h-[42px]">
                            <span class="text-2xl md:text-3xl gradient-text borel-font">CuteSense</span>
                        </a>
                    </div>
                    
                    <div class="flex items-center gap-3 justify-end">
                        <a href="https://github.com/CuteSense-Studios" target="_blank" class="hidden lg:flex items-center gap-2 bg-slate-900 dark:bg-cs-lilac text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all text-xs font-bold uppercase">
                            <i data-lucide="github" class="w-4 h-4"></i>
                            <span>Github</span>
                        </a>
                        
                        <button onclick="toggleTheme()" class="hidden md:flex items-center w-12 h-7 bg-slate-200 dark:bg-slate-700 rounded-full p-1 relative border border-cs-lilac/20" aria-label="Toggle Theme">
                            <div class="toggle-dot w-5 h-5 bg-white dark:bg-cs-lilac rounded-full shadow-sm flex items-center justify-center">
                                <i data-lucide="sun" class="w-3 h-3 text-orange-400 block dark:hidden"></i>
                                <i data-lucide="moon" class="
