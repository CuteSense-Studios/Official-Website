class CuteSenseFooter extends HTMLElement {
    constructor() {
        super();
        this._observer = null;
        this._resizeObserver = null;
        this._isVisible = false;
    }

    connectedCallback() {
        this._render();
        this._initializeSmartFeatures();
    }

    disconnectedCallback() {
        // Cleanup observers to prevent memory leaks
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
        }
    }

    _getPath() {
        // More robust path detection with fallback
        try {
            const path = window.location.pathname;
            const depth = (path.match(/\//g) || []).length - 1;
            
            // Check if we're in a subdirectory
            if (path.includes('/pages/') || path.includes('/docs/') || depth > 1) {
                return '../';
            }
            return './';
        } catch (e) {
            console.warn('CuteSenseFooter: Path detection failed, using default', e);
            return './';
        }
    }

    _getCurrentYear() {
        // Auto-updating year so you never have to manually update 2026 again
        try {
            return new Date().getFullYear();
        } catch (e) {
            return '2026'; // Fallback
        }
    }

    _render() {
        const path = this._getPath();
        const year = this.getAttribute('static-year') || this._getCurrentYear();
        
        // Preserve exact original structure and classes
        this.innerHTML = `
        <footer class="py-10 border-t border-cs-lilac/10 px-6 w-full z-10 relative bg-cs-cream/50 dark:bg-cs-dark/50 backdrop-blur-sm mt-auto transition-opacity duration-500 opacity-0" data-footer-root>
            <div class="max-w-6xl mx-auto" data-footer-content>
                
                <div class="flex flex-col md:flex-row items-center justify-between gap-10 transform translate-y-4 transition-transform duration-700 ease-out" data-animate="true">
                    
                    <div class="flex items-center gap-4 text-left">
                        <!-- Logo size increased from h-10 to h-12 for better visibility -->
                        <img src="${path}assets/icons/companylogo.webp" alt="Logo" 
                             class="h-12 w-auto opacity-90 pixel-crisp shrink-0 transition-transform duration-300 hover:scale-105"
                             loading="lazy"
                             decoding="async"
                             data-footer-logo
                             onerror="this.style.display='none'; this.nextElementSibling.style.marginLeft='0';">
                        
                        <div class="flex flex-col">
                            <span class="text-xl sm:text-2xl gradient-text borel-font leading-tight py-1">
                                CuteSense Studios
                            </span>
                            <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-cs-lilac/80">
                                Art with Heart • © ${year} • Built with Gemini
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-8 items-center" data-social-links>
                        <!-- Original GitHub icon -->
                        <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" 
                           class="text-cs-lilac hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-cs-lilac/50 rounded"
                           aria-label="Visit our GitHub">
                            <i data-lucide="github" class="w-5 h-5"></i>
                        </a>
                        <a href="mailto:contact@cutesense.studios" 
                           class="text-cs-lilac hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-cs-lilac/50 rounded"
                           aria-label="Send us an email">
                            <i data-lucide="mail" class="w-5 h-5"></i>
                        </a>
                        <!-- NEW second GitHub icon -->
                        <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" 
                           class="text-cs-lilac hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-cs-lilac/50 rounded"
                           aria-label="Visit our GitHub (additional link)">
                            <i data-lucide="github" class="w-5 h-5"></i>
                        </a>
                    </div>
                </div>

                <div class="flex justify-center my-8 opacity-0 transition-opacity duration-1000 delay-300" data-animate-divider>
                    <div class="w-12 h-[1px] bg-cs-lilac/20 rounded-full"></div>
                </div>

                <div class="flex justify-center items-center gap-2 opacity-30 hover:opacity-70 transition-opacity cursor-default focus-within:opacity-70"
                     tabindex="0" role="contentinfo" aria-label="License information">
                    <i data-lucide="scale" class="w-3 h-3 text-cs-lilac"></i>
                    <span class="text-[8px] uppercase tracking-[0.5em] font-bold text-cs-lilac">
                        GNU AGPL v3
                    </span>
                </div>
            </div>
        </footer>
        `;
    }

    _initializeSmartFeatures() {
        // Initialize Lucide icons with retry logic
        this._initIcons();
        
        // Intersection Observer for scroll-triggered fade-in animations
        this._initScrollAnimations();
        
        // Handle reduced motion preference
        this._respectMotionPreferences();
        
        // Prefetch links on hover for faster navigation
        this._initLinkPrefetch();
    }

    _initIcons() {
        const attemptIcons = (retries = 3) => {
            if (window.lucide) {
                try {
                    lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
                    this._isVisible = true;
                } catch (e) {
                    console.warn('CuteSenseFooter: Lucide initialization failed', e);
                }
            } else if (retries > 0) {
                setTimeout(() => attemptIcons(retries - 1), 100);
            }
        };
        
        // Small delay to ensure DOM is fully parsed
        requestAnimationFrame(() => attemptIcons());
    }

    _initScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers - show immediately
            this._revealFooter();
            return;
        }

        this._observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this._revealFooter();
                    this._observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        const footer = this.querySelector('[data-footer-root]');
        if (footer) this._observer.observe(footer);
    }

    _revealFooter() {
        const root = this.querySelector('[data-footer-root]');
        const content = this.querySelector('[data-animate="true"]');
        const divider = this.querySelector('[data-animate-divider]');
        
        if (root) {
            root.classList.remove('opacity-0');
            root.classList.add('opacity-100');
        }
        if (content) {
            content.classList.remove('translate-y-4');
            content.classList.add('translate-y-0');
        }
        if (divider) {
            setTimeout(() => {
                divider.classList.remove('opacity-0');
                divider.classList.add('opacity-100');
            }, 300);
        }
    }

    _respectMotionPreferences() {
        // Disable animations if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            const animatedElements = this.querySelectorAll('[data-animate], [data-animate-divider], [data-footer-root]');
            animatedElements.forEach(el => {
                el.style.transition = 'none';
                el.classList.remove('opacity-0', 'translate-y-4');
                el.classList.add('opacity-100', 'translate-y-0');
            });
        }
    }

    _initLinkPrefetch() {
        // Smart prefetch: preload GitHub on hover to make it feel instant
        const githubLinks = this.querySelectorAll('a[href*="github.com"]');
        githubLinks.forEach(link => {
            if (link && 'IntersectionObserver' in window) {
                link.addEventListener('mouseenter', () => {
                    const prefetch = document.createElement('link');
                    prefetch.rel = 'prefetch';
                    prefetch.href = 'https://github.com/CuteSense-Studios';
                    document.head.appendChild(prefetch);
                }, { once: true });
            }
        });
    }

    // Public API for manual refresh (if dynamic content changes)
    refresh() {
        this._render();
        this._initializeSmartFeatures();
    }

    // Public API to update year programmatically
    setYear(year) {
        const yearSpan = this.querySelector('p[class*="text-cs-lilac"]');
        if (yearSpan && year) {
            yearSpan.innerHTML = `Art with Heart • © ${year} • Built with Gemini`;
        }
    }
}

// Define with error handling
if (!customElements.get('cs-footer')) {
    try {
        customElements.define('cs-footer', CuteSenseFooter);
    } catch (e) {
        console.error('CuteSenseFooter: Failed to define custom element', e);
    }
}