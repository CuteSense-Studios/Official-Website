/**
 * CuteSense Studios - Universal Favicon Loader
 * Dynamically calculates path to handle GitHub Pages subdirectories safely.
 */
(function() {
    // 1. Get the base assets directory safely
    let assetsBase = './assets';
    const currentScript = document.currentScript;
    if (currentScript && currentScript.src && currentScript.src.includes('/js/')) {
        assetsBase = currentScript.src.substring(0, currentScript.src.lastIndexOf('/js/'));
    } else {
        const isSubdir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/docs/');
        assetsBase = isSubdir ? '../assets' : './assets';
    }
    
    // 2. Construct the icon path relative to the assets folder
    const FAVICON_PATH = `${assetsBase}/icons/companylogo.webp`;
    
    const iconConfigs = [
        { rel: 'icon', type: 'image/webp', href: FAVICON_PATH },
        { rel: 'apple-touch-icon', href: FAVICON_PATH },
        { rel: 'shortcut icon', href: FAVICON_PATH }
    ];

    iconConfigs.forEach(config => {
        let link = document.querySelector(`link[rel*="${config.rel}"]`);
        
        if (!link) {
            link = document.createElement('link');
            document.head.appendChild(link);
        }
        
        link.rel = config.rel;
        link.href = config.href;
        if (config.type) link.type = config.type;
    });
})();
