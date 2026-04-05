class CuteSenseFooter extends HTMLElement {
    connectedCallback() {
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

        this.innerHTML = `
        <footer class="py-10 border-t border-cs-lilac/10 px-6 w-full z-10 relative bg-cs-cream/50 dark:bg-cs-dark/50 backdrop-blur-sm mt-auto">
            <div class="max-w-6xl mx-auto">
                
                <div class="flex flex-col md:flex-row items-center justify-between gap-10">
                    
                    <div class="flex items-center gap-4 text-left">
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" 
                             class="h-10 w-auto opacity-90 pixel-crisp shrink-0">
                        
                        <div class="flex flex-col">
                            <span class="text-xl sm:text-2xl gradient-text borel-font leading-tight py-1">
                                CuteSense Studios
                            </span>
                            <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-cs-lilac/80">
                                Art with Heart • © 2026 • Built with Gemini
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-8 items-center">
                        <a href="https://github.com/CuteSense-Studios" target="_blank" class="text-cs-lilac hover:scale-110 transition-transform">
                            <i data-lucide="github" class="w-5 h-5"></i>
                        </a>
                        <a href="#" class="text-cs-lilac hover:scale-110 transition-transform">
                            <i data-lucide="mail" class="w-5 h-5"></i>
                        </a>
                    </div>
                </div>

                <div class="flex justify-center my-8">
                    <div class="w-12 h-[1px] bg-cs-lilac/20 rounded-full"></div>
                </div>

                <div class="flex justify-center items-center gap-2 opacity-30 hover:opacity-70 transition-opacity cursor-default">
                    <i data-lucide="scale" class="w-3 h-3 text-cs-lilac"></i>
                    <span class="text-[8px] uppercase tracking-[0.5em] font-bold text-cs-lilac">
                        GNU AGPL v3
                    </span>
                </div>
            </div>
        </footer>
        `;
        if (window.lucide) lucide.createIcons();
    }
}

if (!customElements.get('cs-footer')) {
    customElements.define('cs-footer', CuteSenseFooter);
}