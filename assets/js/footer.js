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
            const baseTag = document.querySelector('base');
            if (baseTag && baseTag.href) return '';
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
            { id: 'business-model', label: 'Model', href: `${path}pages/business-model.html` }
        ];

        const linksHtml = navLinks.map(link => {
            const isModelMatch = link.id === 'business-model' && (active === 'buisness-model' || active === 'business-model');
            const isActive = active === link.id || (active === '' && link.id === 'index') || isModelMatch;
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
            .cs-footer-root {
                position: relative !important;
                width: 100% !important;
                padding: 2.25rem 1.25rem 1.75rem 1.25rem !important;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.72) 100%) !important;
                backdrop-filter: blur(14px) !important;
                -webkit-backdrop-filter: blur(14px) !important;
                overflow: visible !important;
                z-index: 10 !important;
            }
            .dark .cs-footer-root {
                background: linear-gradient(180deg, rgba(24, 19, 28, 0.55) 0%, rgba(24, 19, 28, 0.82) 100%) !important;
            }

            /* Smooth Gradient Top Starting Line (Fades smoothly at edges, no harsh cut) */
            .cs-footer-top-line {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                width: 100% !important;
                height: 1.5px !important;
                background: linear-gradient(90deg, transparent 0%, rgba(161, 120, 175, 0.4) 50%, transparent 100%) !important;
                pointer-events: none !important;
            }
            .dark .cs-footer-top-line {
                background: linear-gradient(90deg, transparent 0%, rgba(226, 203, 235, 0.28) 50%, transparent 100%) !important;
            }

            .cs-footer-inner {
                max-width: 56rem !important;
                margin-left: auto !important;
                margin-right: auto !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
                gap: 1.1rem !important;
            }

            /* Brand Block & Centered Optical Alignment */
            .cs-footer-brand-wrap {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                gap: 0.35rem !important;
            }

            .cs-footer-brand {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.625rem !important;
                text-decoration: none !important;
                transition: transform 0.25s ease !important;
            }
            .cs-footer-brand:hover {
                transform: scale(1.02) !important;
            }

            /* Bow Logo: Optical level with text and matched to navbar h-8 */
            .cs-footer-logo {
                height: 2rem !important; /* 32px - exactly matching navbar h-8 */
                width: auto !important;
                opacity: 0.95 !important;
                display: block !important;
                flex-shrink: 0 !important;
                image-rendering: -webkit-optimize-contrast !important;
                filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.08)) !important;
            }

            @media (min-width: 640px) {
                .cs-footer-logo {
                    height: 2.125rem !important; /* 34px on desktop */
                }
            }

            /* Brand Title: Proportionate size + generous vertical line-height so cursive ascenders/descenders never clip */
            .cs-footer-title {
                font-family: 'Borel', cursive !important;
                font-size: 1.25rem !important; /* 20px */
                line-height: 1.4 !important;
                padding: 0.15rem 0.35rem !important;
                margin: 0 !important;
                display: inline-block !important;
                user-select: none !important;
            }

            @media (min-width: 640px) {
                .cs-footer-title {
                    font-size: 1.35rem !important; /* 21.6px */
                }
            }

            .borel-font {
                font-family: 'Borel', cursive;
            }

            /* Subtext Slogan */
            .cs-footer-subtext {
                font-size: 0.8125rem !important; /* 13px */
                font-weight: 500 !important;
                color: #64748b !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.5rem !important;
                margin: 0 !important;
            }
            .dark .cs-footer-subtext {
                color: #94a3b8 !important;
            }
            .cs-footer-dot {
                color: rgba(161, 120, 175, 0.4) !important;
            }

            /* Navigation Links Row */
            .footer-links-container {
                display: flex !important;
                flex-wrap: wrap !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.25rem 0.6rem !important;
                margin: 0.25rem 0 !important;
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

            /* Soft Center Divider */
            .cs-footer-divider {
                width: 3.5rem !important;
                height: 1.5px !important;
                background-color: rgba(161, 120, 175, 0.25) !important;
                border-radius: 9999px !important;
                margin: 0.2rem auto !important;
            }
            .dark .cs-footer-divider {
                background-color: rgba(226, 203, 235, 0.2) !important;
            }

            /* Bottom Row: Socials & License */
            .cs-footer-bottom-row {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.75rem !important;
                font-size: 0.75rem !important;
            }
            @media (min-width: 640px) {
                .cs-footer-bottom-row {
                    flex-direction: row !important;
                    gap: 1rem !important;
                }
            }

            /* Social Button: Matching navbar p-2 / circular styling */
            .cs-footer-social-btn {
                width: 2rem !important; /* 32px */
                height: 2rem !important;
                border-radius: 9999px !important;
                background-color: rgba(161, 120, 175, 0.12) !important;
                color: #A178AF !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.2s ease !important;
                text-decoration: none !important;
            }
            .dark .cs-footer-social-btn {
                background-color: rgba(226, 203, 235, 0.15) !important;
                color: #E2CBEB !important;
            }
            .cs-footer-social-btn:hover {
                background-color: rgba(240, 141, 161, 0.22) !important;
                color: #F08DA1 !important;
                transform: scale(1.08) !important;
            }

            .cs-footer-bottom-separator {
                display: none !important;
                color: rgba(161, 120, 175, 0.4) !important;
            }
            @media (min-width: 640px) {
                .cs-footer-bottom-separator {
                    display: inline-block !important;
                }
            }

            .cs-footer-license {
                display: flex !important;
                align-items: center !important;
                gap: 0.375rem !important;
                color: #94a3b8 !important;
                cursor: default !important;
            }
            .dark .cs-footer-license {
                color: #64748b !important;
            }
            .cs-footer-license-text {
                font-size: 0.65rem !important;
                font-weight: 600 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.18em !important;
            }
            @media (min-width: 640px) {
                .cs-footer-license-text {
                    font-size: 0.6875rem !important;
                }
            }
        </style>

        <footer class="cs-footer-root" data-footer-root>
            <!-- Smooth Gradient Top Starting Line (Fades smoothly at edges, no harsh line) -->
            <div class="cs-footer-top-line" aria-hidden="true"></div>

            <div class="cs-footer-inner">
                
                <!-- Symmetrical Brand Block with Optical Alignment -->
                <div class="cs-footer-brand-wrap">
                    <a href="${path}index.html" class="cs-footer-brand group" aria-label="CuteSense Studios Home">
                        <img src="${path}assets/icons/companylogo.webp" alt="CuteSense Logo" 
                             class="cs-footer-logo pixel-crisp drop-shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105"
                             onerror="this.onerror=null; this.style.display='none';">
                        <span class="cs-footer-title gradient-text select-none">
                            CuteSense Studios
                        </span>
                    </a>
                    
                    <p class="cs-footer-subtext">
                        <span>Art with Heart</span>
                        <span class="cs-footer-dot select-none">•</span>
                        <span>© ${year}</span>
                        <span class="cs-footer-dot select-none">•</span>
                        <span class="inline-flex items-center gap-1">
                            <svg class="w-3.5 h-3.5 text-cs-pink shrink-0 -translate-y-[0.5px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>India</span>
                        </span>
                    </p>
                </div>

                <!-- Navigation Links Row (Delicate text links, NO harsh dark borders) -->
                <nav class="footer-links-container" aria-label="Footer navigation">
                    ${linksHtml}
                </nav>

                <!-- Soft Decorative Center Divider -->
                <div class="cs-footer-divider" aria-hidden="true"></div>

                <!-- Bottom Row: Social Icons + License (Integrated & Symmetrically Balanced) -->
                <div class="cs-footer-bottom-row">
                    <!-- Social Buttons (Matching Navbar GitHub & Circular Icon) -->
                    <div class="flex items-center gap-2.5">
                        <a href="mailto:cutesensestudios@protonmail.com" 
                           class="cs-footer-social-btn group"
                           aria-label="Email CuteSense Studios">
                            <svg class="w-4 h-4 text-cs-lilac dark:text-[#E2CBEB] group-hover:text-cs-pink transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </a>
                        <a href="https://github.com/CuteSense-Studios" target="_blank" rel="noopener noreferrer" 
                           class="cs-footer-social-btn group"
                           aria-label="CuteSense Studios GitHub Organization">
                            <img src="${path}assets/icons/github.svg" alt="GitHub" class="w-4 h-4 shrink-0 dark:brightness-125 transition-transform duration-200 group-hover:scale-110" onerror="this.src='https://cdn.simpleicons.org/github/64748b';">
                        </a>
                    </div>

                    <!-- Bullet separator on desktop -->
                    <span class="cs-footer-bottom-separator select-none">•</span>

                    <!-- License Metadata -->
                    <div class="cs-footer-license">
                        <svg class="w-3.5 h-3.5 text-cs-lilac shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                        <span class="cs-footer-license-text">
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
