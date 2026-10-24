/**
 * CuteSense Studios - Official Footer Web Component
 * Self-contained, accessible, zero-dependency, and responsive.
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
            const activeClasses = isActive
                ? 'text-cs-pink font-bold bg-cs-pink/15 dark:bg-cs-pink/20 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#F08DA1] hover:bg-cs-pink/10 dark:hover:bg-cs-pink/15';

            return `<a href="${link.href}" class="footer-link px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeClasses}">${link.label}</a>`;
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
                gap: 0.35rem 0.5rem !important;
            }
            .footer-link {
                display: inline-flex !important;
                align-items: center !important;
                white-space: nowrap !important;
            }
        </style>

        <footer class="py-7 sm:py-9 border-t border-cs-lilac/15 px-6 w-full z-10 relative bg-white/40 dark:bg-[#18131c]/60 backdrop-blur-md mt-auto" data-footer-root>
            <div class="max-w-6xl mx-auto">
                
                <!-- Main Header: Brand on left, Socials on right -->
                <div class="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
                    
                    <!-- Brand Identity -->
                    <a href="${path}index.html" class="flex items-center gap-3.5 group text-left transition-transform hover:opacity-95" aria-label="CuteSense Studios Home">
                        <div class="relative h-10 sm:h-11 w-auto shrink-0 flex items-center justify-center">
                            <img src="${path}assets/icons/companylogo.webp" alt="CuteSense Logo" 
                                 class="h-10 sm:h-11 w-auto opacity-95 pixel-crisp shrink-0 transition-transform duration-300 group-hover:scale-105"
                                 onerror="this.onerror=null; this.style.display='none';">
                        </div>
                        
                        <div class="flex flex-col justify-center">
                            <span class="text-lg sm:text-xl gradient-text borel-font leading-tight">
                                CuteSense Studios
                            </span>
                            <div class="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-cs-lilac dark:text-[#E2CBEB]/80 tracking-wider">
                                <span>Art with Heart • © ${year}</span>
                                <span class="opacity-40">•</span>
                                <span class="inline-flex items-center gap-1">
                                    <svg class="w-3 h-3 text-cs-pink shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span>India</span>
                                </span>
                            </div>
                        </div>
                    </a>

                    <!-- Social / Contact Links -->
                    <div class="flex items-center gap-3">
                        <a href="mailto:cutesensestudios@protonmail.com" 
                           class="w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800/80 border border-cs-lilac/30 flex items-center justify-center text-cs-lilac hover:text-cs-pink hover:border-cs-pink/40 hover:scale-105 shadow-xs transition-all"
                           aria-label="Email CuteSense Studios">
                            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </a>

                        <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" 
                           class="w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800/80 border border-cs-lilac/30 flex items-center justify-center text-cs-lilac hover:text-cs-pink hover:border-cs-pink/40 hover:scale-105 shadow-xs transition-all"
                           aria-label="CuteSense Studios GitHub Organization">
                            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                    </div>
                </div>

                <!-- Navigation Links Row -->
                <nav class="footer-links-container my-4 sm:my-5" aria-label="Footer navigation">
                    ${linksHtml}
                </nav>

                <!-- Subtle Decorative Divider -->
                <div class="flex justify-center my-3.5 sm:my-4">
                    <div class="w-12 h-[1px] bg-cs-lilac/30 rounded-full"></div>
                </div>

                <!-- Bottom License & Transparency Metadata -->
                <div class="flex justify-center items-center gap-2 opacity-75 hover:opacity-100 transition-opacity text-center px-4">
                    <svg class="w-3.5 h-3.5 text-cs-lilac shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                    <span class="text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] font-bold text-cs-lilac dark:text-[#E2CBEB]/90">
                        GNU AGPL v3 • Built with Gemini • Human Verified
                    </span>
                </div>
            </div>
        </footer>
        `;
    }
}

if (!customElements.get('cs-footer')) {
    customElements.define('cs-footer', CuteSenseFooter);
}
