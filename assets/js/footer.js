class CuteSenseFooter extends HTMLElement {
    connectedCallback() {
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

        this.innerHTML = `
        <footer class="py-8 border-t border-cs-lilac/10 px-6 w-full z-10 relative bg-cs-cream/50 dark:bg-cs-dark/50 backdrop-blur-sm mt-auto">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                    
                    <div class="flex items-center gap-4 text-left">
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" 
                             class="h-9 sm:h-11 w-auto opacity-90 pixel-crisp shrink-0">
                        
                        <div class="flex flex-col justify-center">
                            <span class="text-xl sm:text-2xl gradient-text borel-font leading-tight py-1.5 inline-block overflow-visible">
                                CuteSense Studios
                            </span>
                            <p class="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-cs-lilac/80 -mt-1">
                                Art with Heart • © 2026 • Built with Gemini
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-7 items-center">
                        <a href="https://github.com/CuteSense-Studios" target="_blank" class="text-cs-lilac hover:text-cs-pink transition-all">
                            <i data-lucide="github" class="w-5 h-5"></i>
                        </a>
                        <a href="#" class="text-cs-lilac hover:text-cs-blue transition-all">
                            <i data-lucide="twitter" class="w-5 h-5"></i>
                        </a>
                        <a href="#" class="text-cs-lilac hover:text-cs-pink transition-all">
                            <i data-lucide="mail" class="w-5 h-5"></i>
                        </a>
                    </div>
                </div>
                
                <div class="mt-8 pt-6 border-t border-cs-lilac/5 flex items-center justify-center gap-2 text-cs-lilac/40">
                    <i data-lucide="scale" class="w-3.5 h-3.5"></i>
                    <span class="text-[9px] font-bold uppercase tracking-widest">GNU AGPL v3</span>
                </div>
            </div>
        </footer>
        `;

        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

if (!customElements.get('cs-footer')) {
    customElements.define('cs-footer', CuteSenseFooter);
}