/**
 * CuteSense Studios - Universal Favicon Loader
 * Dynamically calculates path to handle GitHub Pages subdirectories.
 */
(function() {
    // 1. Get the full URL of THIS script (e.g., .../assets/js/favicon.js)
    const scriptURL = document.currentScript.src;
    
    // 2. Derive the base 'assets' directory by removing '/js/favicon.js'
    const assetsBase = scriptURL.substring(0, scriptURL.lastIndexOf('/js/'));
    
    // 3. Construct the icon path relative to the assets folder
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

    console.log("CuteSense Brand Assets Loaded from: " + assetsBase);
})();