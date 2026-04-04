class CuteSenseFooter extends HTMLElement {
    connectedCallback() {
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

        this.innerHTML = `
        <footer class="py-10 sm:py-12 border-t border-cs-lilac/10 px-6 w-full z-10 relative bg-cs-cream/50 dark:bg-cs-dark/50 backdrop-blur-sm mt-auto">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    
                    <div class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <img src="${path}assets/icons/companylogo.webp" alt="CuteSense Studios Logo" class="w-auto opacity-90" style="height: clamp(32px, 5vw, 36px);">
                        <div class="flex flex-col justify-center sm:translate-y-1 sm:pt-0.5">
                            <span class="text-xl sm:text-2xl gradient-text borel-font block leading-none">CuteSense Studios</span>
                            <p class="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-cs-lilac opacity-70 mt-1 sm:mt-2">Art with Heart • © 2026 • Built with Gemini</p>
                        </div>
                    </div>

                    <div class="flex gap-6 sm:gap-8">
                        <a href="https://github.com/CuteSense-Studios" target="_blank" class="text-cs-lilac hover:scale-125 hover:text-cs-pink transition-all">
                            <i data-lucide="github" class="w-6 h-6 sm:w-5 sm:h-5"></i>
                        </a>
                        <a href="#" class="text-cs-lilac hover:scale-125 hover:text-cs-blue transition-all">
                            <i data-lucide="twitter" class="w-6 h-6 sm:w-5 sm:h-5"></i>
                        </a>
                        <a href="#" class="text-cs-lilac hover:scale-125 hover:text-cs-pink transition-all">
                            <i data-lucide="mail" class="w-6 h-6 sm:w-5 sm:h-5"></i>
                        </a>
                    </div>
                </div>
                
                <div class="pt-6 border-t border-cs-lilac/10 flex items-center justify-center gap-2 text-cs-lilac opacity-60">
                    <i data-lucide="scale" class="w-4 h-4"></i>
                    <span class="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">GNU AGPL v3</span>
                </div>
            </div>
        </footer>
        `;

        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

customElements.define('cs-footer', CuteSenseFooter);