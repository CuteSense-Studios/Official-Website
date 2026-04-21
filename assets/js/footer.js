class CuteSenseFooter extends HTMLElement {
    constructor() {
        super();
        this._observer = null;
        this._iconRetryCount = 0;
        this._maxIconRetries = 15;
    }

    connectedCallback() {
        this._render();
        this._initializeSmartFeatures();
    }

    disconnectedCallback() {
        if (this._observer) this._observer.disconnect();
    }

    _getPath() {
        try {
            const path = window.location.pathname;
            // Checks if we are in a subdirectory like /pages/ or /docs/
            const isSubdir = path.includes('/pages/') || path.includes('/docs/');
            return isSubdir ? '../' : './';
        } catch (e) { return './'; }
    }

    _render() {
        const path = this._getPath();
        const year = new Date().getFullYear();
        
        this.innerHTML = `
        <footer class="py-10 border-t border-cs-lilac/10 px-6 w-full z-10 relative bg-cs-cream/50 dark:bg-cs-dark/50 backdrop-blur-sm mt-auto transition-opacity duration-700 opacity-0" data-footer-root>
            <div class="max-w-6xl mx-auto">
                
                <div class="flex flex-col md:flex-row items-center justify-between gap-10 transform translate-y-4 transition-transform duration-700 ease-out" data-animate="true">
                    
                    <div class="flex items-center gap-4 text-left">
                        <div class="relative h-16 w-auto shrink-0 flex items-center justify-center">
                            <img src="${path}assets/icons/companylogo.webp" alt="CuteSense Logo" 
                                 class="h-16 w-auto opacity-90 pixel-crisp shrink-0 transition-transform duration-300 hover:scale-105"
                                 onerror="this.src='https://raw.githubusercontent.com/CuteSense-Studios/brand/main/logo.webp';">
                        </div>
                        
                        <div class="flex flex-col">
                            <span class="text-xl sm:text-2xl gradient-text borel-font leading-tight py-1">
                                CuteSense Studios
                            </span>
                            <div class="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-cs-lilac/80">
                                <span>Art with Heart • © ${year}</span>
                                <span class="hidden sm:inline">•</span>
                                <div id="location-container" class="flex items-center gap-1">
                                    <i data-lucide="map-pin" class="w-3 h-3"></i>
                                    <span id="gh-location">India</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-8 items-center">
                        <a href="mailto:cutesensestudios@protonmail.com" 
                           class="text-cs-lilac hover:scale-110 transition-transform"
                           aria-label="Email Us">
                            <i data-lucide="mail" class="w-5 h-5"></i>
                        </a>

                        <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" 
                           class="text-cs-lilac hover:scale-110 transition-transform"
                           aria-label="GitHub Organization">
                            <img src="${path}assets/icons/github.svg" 
                                 alt="GitHub" 
                                 class="w-5 h-5 opacity-90 dark:invert-[0.1]"
                                 onerror="this.src='https://cdn.simpleicons.org/github/64748b';">
                        </a>
                    </div>
                </div>

                <div class="flex justify-center my-8 opacity-0 transition-opacity duration-1000 delay-300" data-animate-divider>
                    <div class="w-12 h-[1px] bg-cs-lilac/20 rounded-full"></div>
                </div>

                <div class="flex justify-center items-center gap-2 opacity-30 hover:opacity-70 transition-opacity cursor-default">
                    <i data-lucide="scale" class="w-3 h-3 text-cs-lilac"></i>
                    <span class="text-[8px] uppercase tracking-[0.5em] font-bold text-cs-lilac">
                        GNU AGPL v3 • Built with Gemini • Human Verified
                    </span>
                </div>
            </div>
        </footer>
        `;
    }

    _initializeSmartFeatures() {
        this._initIcons();
        this._initScrollAnimations();
        this._fetchLocation();
    }

    async _fetchLocation() {
        const textEl = this.querySelector('#gh-location');
        if (!textEl) return;

        try {
            const response = await fetch('https://api.github.com/orgs/CuteSense-Studios');
            if (response.ok) {
                const data = await response.json();
                // Set to GitHub location, or fallback to India if location field is empty
                textEl.textContent = data.location || "India";
            } else {
                textEl.textContent = "India";
            }
        } catch (e) {
            textEl.textContent = "India";
        }
    }

    _initIcons() {
        const attemptIcons = () => {
            if (window.lucide) {
                window.lucide.createIcons({
                    root: this,
                    attrs: { 'stroke-width': '2', 'class': 'shrink-0' }
                });
            } else if (this._iconRetryCount < this._maxIconRetries) {
                this._iconRetryCount++;
                setTimeout(attemptIcons, 150);
            }
        };
        attemptIcons();
    }

    _initScrollAnimations() {
        const footer = this.querySelector('[data-footer-root]');
        if (!footer) return;

        this._observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this._reveal();
                    this._observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this._observer.observe(footer);
        
        // Safety timeout to ensure footer appears even if observer fails
        setTimeout(() => this._reveal(), 1000);
    }

    _reveal() {
        const root = this.querySelector('[data-footer-root]');
        const content = this.querySelector('[data-animate="true"]');
        const divider = this.querySelector('[data-animate-divider]');
        
        if (root) root.classList.replace('opacity-0', 'opacity-100');
        if (content) content.classList.replace('translate-y-4', 'translate-y-0');
        if (divider) divider.classList.replace('opacity-0', 'opacity-100');
    }
}

if (!customElements.get('cs-footer')) {
    customElements.define('cs-footer', CuteSenseFooter);
}