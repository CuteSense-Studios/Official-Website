/**
 * CuteSense Studios - Universal Favicon Loader
 * Managed centrally to ensure brand consistency.
 */
(function() {
    const FAVICON_PATH = '/assets/icons/companylogo.webp'; //
    
    const iconConfigs = [
        { rel: 'icon', type: 'image/webp', href: FAVICON_PATH },
        { rel: 'apple-touch-icon', href: FAVICON_PATH },
        { rel: 'shortcut icon', href: FAVICON_PATH }
    ];

    iconConfigs.forEach(config => {
        // Check if the link tag already exists
        let link = document.querySelector(`link[rel*="${config.rel}"]`);
        
        if (!link) {
            link = document.createElement('link');
            document.head.appendChild(link);
        }
        
        // Apply attributes
        link.rel = config.rel;
        link.href = config.href;
        if (config.type) link.type = config.type;
    });

    // Optional: Log to confirm central management for CuteSense Studios
    console.log("CuteSense Brand Assets Loaded.");
})();