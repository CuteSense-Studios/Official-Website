/**
 * CuteSense Studios - Central Theme Controller
 * Handles light/dark mode persistence across all pages with system preference sync.
 */

(function() {
    'use strict';
    
    const STORAGE_KEY = 'theme';
    const DARK_CLASS = 'dark';
    const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';
    
    let systemPrefListener = null;
    let isSystemPreference = false;
    
    function getCurrentTheme() {
        return {
            isDark: document.documentElement.classList.contains(DARK_CLASS),
            saved: localStorage.getItem(STORAGE_KEY),
            systemPrefersDark: window.matchMedia(SYSTEM_DARK_QUERY).matches
        };
    }
    
    /**
     * Apply theme to document - this is the single source of truth
     */
    function applyTheme(isDark, source = 'manual') {
        if (isDark) {
            document.documentElement.classList.add(DARK_CLASS);
        } else {
            document.documentElement.classList.remove(DARK_CLASS);
        }
        
        if (source !== 'system' || !isSystemPreference) {
            localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        }
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { isDark, source } 
        }));
        
        // Refresh icons in all navbars
        refreshNavbars();
        updateMetaThemeColor(isDark);
    }
    
    function refreshNavbars() {
        setTimeout(() => {
            document.querySelectorAll('cs-navbar').forEach(navbar => {
                if (navbar._initIcons) {
                    try {
                        navbar._initIcons();
                    } catch (e) {
                        // Ignore errors
                    }
                }
            });
            
            // Also try global lucide refresh
            if (window.lucide && lucide.createIcons) {
                try {
                    lucide.createIcons();
                } catch (e) {}
            }
        }, 50);
    }
    
    function updateMetaThemeColor(isDark) {
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
        }
        meta.content = isDark ? '#0f172a' : '#ffffff';
    }
    
    function syncWithSystem() {
        const prefersDark = window.matchMedia(SYSTEM_DARK_QUERY).matches;
        isSystemPreference = true;
        applyTheme(prefersDark, 'system');
    }
    
    function initSystemListener() {
        if (!systemPrefListener && window.matchMedia) {
            const mediaQuery = window.matchMedia(SYSTEM_DARK_QUERY);
            
            systemPrefListener = (e) => {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (!saved) {
                    applyTheme(e.matches, 'system');
                }
            };
            
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', systemPrefListener);
            } else if (mediaQuery.addListener) {
                mediaQuery.addListener(systemPrefListener);
            }
        }
    }
    
    // Public API attached to window for cross-file communication
    window.CuteSenseTheme = {
        toggle: function() {
            const { isDark } = getCurrentTheme();
            isSystemPreference = false;
            applyTheme(!isDark, 'manual');
        },
        set: function(mode) {
            isSystemPreference = false;
            if (mode === 'dark') {
                applyTheme(true, 'manual');
            } else if (mode === 'light') {
                applyTheme(false, 'manual');
            } else if (mode === 'system') {
                syncWithSystem();
                initSystemListener();
            }
        },
        get: getCurrentTheme,
        apply: applyTheme
    };
    
    // Legacy support for window.toggleTheme
    window.toggleTheme = window.CuteSenseTheme.toggle;
    window.setTheme = window.CuteSenseTheme.set;
    window.getTheme = window.CuteSenseTheme.get;
    window.applyTheme = window.CuteSenseTheme.apply;
    
    // Immediate initialization to prevent FOUC
    (function init() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved === 'dark') {
                document.documentElement.classList.add(DARK_CLASS);
            } else if (saved === 'light') {
                document.documentElement.classList.remove(DARK_CLASS);
            } else {
                const systemDark = window.matchMedia(SYSTEM_DARK_QUERY).matches;
                if (systemDark) {
                    document.documentElement.classList.add(DARK_CLASS);
                }
                initSystemListener();
            }
            
            updateMetaThemeColor(document.documentElement.classList.contains(DARK_CLASS));
            
        } catch (e) {
            console.warn('Theme initialization failed:', e);
        }
    })();
})();