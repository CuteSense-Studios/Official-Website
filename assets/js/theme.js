/**
 * CuteSense Studios - Central Theme Controller
 * Handles light/dark mode persistence across all pages.
 */

// 1. Immediate execution to prevent Flash of Unstyled Content (FOUC)
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && systemDark);
    
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

/**
 * Applies the theme and saves preference to localStorage.
 */
function applyTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
    
    // Refresh Lucide icons to handle sun/moon visibility classes
    if (window.lucide) {
        setTimeout(() => lucide.createIcons(), 50);
    }
}

/**
 * Toggle function to be called by your UI buttons.
 */
window.toggleTheme = () => {
    const isDark = !document.documentElement.classList.contains('dark');
    applyTheme(isDark);
};