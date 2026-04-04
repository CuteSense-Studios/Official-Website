class CuteSenseFooter extends HTMLElement {
    connectedCallback() {
        // Automatically check if we are in a subdirectory (like /pages/) to fix image paths
        const inSubDir = window.location.pathname.includes('/pages/');
        const path = inSubDir ? '../' : './';

        this.innerHTML = `
        <footer class="py-12 border-t border-cs-lilac/10 px-6 w-full z-10 relative bg-cs-cream/50 dark:bg-cs-dark/50 backdrop-blur-sm mt-auto">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div class="flex items-center gap-4 text-center md:text-left">
                        <img src="${path}assets/icons/companylogo.webp" alt="CuteSense Studios Logo" class="h-10 w-auto">
                        <div>
                            <span class="text-2xl font-bold gradient-text borel-font block leading-none pb-1">CuteSense Studios</span>
                            <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-cs-lilac opacity-80 mt-1">Art with Heart • © 2026 • Built with Gemini</p>
                        </div>
                    </div>
                    <div class="flex gap-6">
                        <a href="https://github.com/CuteSense-Studios" target="_blank" class="text-cs-lilac hover:scale-125 transition-transform">
                            <i data-lucide="github" class="w-5 h-5"></i>
                        </a>
                        <a href="#" class="text-cs-lilac hover:scale-125 transition-transform">
                            <i data-lucide="twitter" class="w-5 h-5"></i>
                        </a>
                        <a href="#" class="text-cs-lilac hover:scale-125 transition-transform">
                            <i data-lucide="mail" class="w-5 h-5"></i>
                        </a>
                    </div>
                </div>
                <div class="pt-6 border-t border-cs-lilac/10 flex items-center justify-center gap-2 text-cs-lilac opacity-70">
                    <i data-lucide="scale" class="w-4 h-4"></i>
                    <span class="text-[10px] font-bold uppercase tracking-[0.2em]">GNU AGPL v3</span>
                </div>
            </div>
        </footer>
        `;

        // Re-initialize Lucide icons for the newly injected HTML
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// Define the custom HTML tag <cs-footer>
customElements.define('cs-footer', CuteSenseFooter);