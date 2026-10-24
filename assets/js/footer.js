/**
 * CuteSense Studios - Official Footer Web Component
 * Symmetrically balanced, zero-dependency, lightweight, and responsive.
 */
class CuteSenseFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._render();
    }

    _getPath() {
        try {
            const path = window.location.pathname;
            const isSubdir = path.includes('/pages/') || path.includes('/docs/');
            return isSubdir ? '../' : './';
        } catch (e) {
            return './';
        }
    }

    _getActivePage() {
        try {
            const path = window.location.pathname;
            const page = path.split('/').pop().replace('.html', '');
            return page || 'index';
        } catch (e) {
            return 'index';
        }
    }

    _render() {
        const path = this._getPath();
        const active = this._getActivePage();
        const year = new Date().getFullYear();

        const navLinks = [
            { id: 'index', label: 'Home', href: `${path}index.html` },
            { id: 'projects', label: 'Projects', href: `${path}pages/projects.html` },
            { id: 'mission', label: 'Philosophy', href: `${path}pages/mission.html` },
            { id: 'motto', label: 'Motto', href: `${path}pages/motto.html` },
            { id: 'code-of-conduct', label: 'Conduct', href: `${path}pages/code-of-conduct.html` },
            { id: 'contributing', label: 'Contributing', href: `${path}pages/contributing.html` },
            { id: 'buisness-model', label: 'Model', href: `${path}pages/buisness-model.html` }
        ];

        const linksHtml = navLinks.map(link => {
            const isActive = active === link.id || (active === '' && link.id === 'index');
            const activeClass = isActive ? 'active' : '';

            return `<a href="${link.href}" class="footer-link ${activeClass}">${link.label}</a>`;
        }).join('\n                    ');

        this.innerHTML = `
        <style>
            cs-footer {
                display: block !important;
                width: 100% !important;
                margin-top: auto !important;
            }
            .borel-font {
                font-family: 'Borel', cursive;
            }
            .footer-links-container {
                display: flex !important;
                flex-wrap: wrap !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.25rem 0.6rem !important;
            }
            .footer-link {
                display: inline-flex !important;
                align-items: center !important;
                white-space: nowrap !important;
                padding: 0.35rem 0.75rem !important;
                border-radius: 0.65rem !important;
                border: none !important;
                font-size: 0.8125rem !important;
                font-weight: 500 !important;
                color: #64748b !important;
                background: transparent !important;
                transition: all 0.2s ease !important;
                text-decoration: none !important;
            }
            .dark .footer-link {
                color: #94a3b8 !important;
            }
            .footer-link:hover {
                color: #F08DA1 !important;
                background-color: rgba(240, 141, 161, 0.08) !important;
            }
            .footer-link.active {
                color: #F08DA1 !important;
                font-weight: 700 !important;
                background-color: rgba(240, 141, 161, 0.12) !important;
            }
        </style>

        <footer class="py-8 sm:py-10 px-6 w-full z-10 relative bg-gradient-to-b from-white/30 via-white/50 to-white/70 dark:from-[#18131c]/40 dark:via-[#18131c]/60 dark:to-[#18131c]/80 backdrop-blur-md mt-auto overflow-hidden" data-footer-root>
            <!-- Smooth Gradient Top Starting Line (No harsh straight border) -->
            <div class="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cs-lilac/35 dark:via-cs-lilac/25 to-transparent pointer-events-none"></div>

            <div class="max-w-4xl mx-auto flex flex-col items-center text-center gap-4 sm:gap-5">
                
                <!-- Symmetrical Brand Block with Optical Alignment -->
                <div class="flex flex-col items-center gap-1.5 sm:gap-2">
                    <a href="${path}index.html" class="flex items-center justify-center gap-2.5 group transition-transform hover:scale-102" aria-label="CuteSense Studios Home">
                        <img src="${path}assets/icons/companylogo.webp" alt="CuteSense Logo" 
                             class="h-8 sm:h-8.5 w-auto opacity-95 pixel-crisp shrink-0 transition-transform duration-300 group-hover:scale-105"
                             onerror="this.onerror=null; this.style.display='none';">
                        <span class="text-2xl sm:text-[26px] gradient-text borel-font leading-tight select-none">
                            CuteSense Studios
                        </span>
                    </a>
                    
                    <p class="text-xs sm:text-[13px] font-medium text-slate-500 dark:text-slate-400 tracking-normal flex items-center justify-center gap-2">
                        <span>Art with Heart</span>
                        <span class="text-cs-lilac/40 select-none">•</span>
                        <span>© ${year}</span>
                        <span class="text-cs-lilac/40 select-none">•</span>
                        <span class="inline-flex items-center gap-1">
                            <svg class="w-3.5 h-3.5 text-cs-pink shrink-0 -translate-y-[0.5px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>India</span>
                        </span>
                    </p>
                </div>

                <!-- Navigation Links Row (Delicate text links, NO harsh dark borders) -->
                <nav class="footer-links-container my-0.5 sm:my-1" aria-label="Footer navigation">
                    ${linksHtml}
                </nav>

                <!-- Soft Decorative Divider -->
                <div class="w-16 h-[1.5px] bg-cs-lilac/25 dark:bg-cs-lilac/20 rounded-full mx-auto my-0.5"></div>

                <!-- Bottom Row: Social Icons + License (Integrated & Balanced) -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs">
                    <!-- Social Buttons (Delicate 28px circles) -->
                    <div class="flex items-center gap-2">
                        <a href="mailto:cutesensestudios@protonmail.com" 
                           class="w-7 h-7 rounded-full bg-cs-lilac/15 hover:bg-cs-pink/20 dark:bg-cs-lilac/25 dark:hover:bg-cs-pink/30 flex items-center justify-center text-cs-lilac hover:text-cs-pink transition-all duration-200 hover:scale-110 shadow-2xs"
                           aria-label="Email CuteSense Studios">
                            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </a>
                        <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" 
                           class="w-7 h-7 rounded-full bg-cs-lilac/15 hover:bg-cs-pink/20 dark:bg-cs-lilac/25 dark:hover:bg-cs-pink/30 flex items-center justify-center text-cs-lilac hover:text-cs-pink transition-all duration-200 hover:scale-110 shadow-2xs"
                           aria-label="CuteSense Studios GitHub Organization">
                            <svg class="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                    </div>

                    <!-- Bullet separator on desktop -->
                    <span class="hidden sm:inline-block text-cs-lilac/40 select-none">•</span>

                    <!-- License Metadata -->
                    <div class="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-cs-lilac dark:hover:text-[#E2CBEB] transition-colors cursor-default px-2">
                        <svg class="w-3.5 h-3.5 text-cs-lilac shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                        <span class="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
                            GNU AGPL v3 • Built with Gemini • Human Verified
                        </span>
                    </div>
                </div>

            </div>
        </footer>
        `;
    }
}

if (!customElements.get('cs-footer')) {
    customElements.define('cs-footer', CuteSenseFooter);
}
