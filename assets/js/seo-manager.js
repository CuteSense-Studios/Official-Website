/**
 * CuteSense Studios - Centralized SEO Manager
 * Standardizes metadata across all pages.
 */

const SEO_CONFIG = {
    default: {
        title: "CuteSense Studios | Emotive Open Source Art",
        description: "High-quality, open-source art tools with a human-AI partnership. Empowering diverse voices through cute, meaningful design.",
        keywords: "open source art, cute design, AI tools, game dev, diversity in tech, indie game",
        image: "/assets/icons/companylogo.webp",
        twitterCard: "summary_large_image"
    },
    pages: {
        "index.html": {
            title: "CuteSense Studios | Emotive Open Source Art",
            description: "Quality art, openly created. Empowering creative new voices through high-quality open-source tools."
        },
        "projects.html": {
            title: "Projects & Creations | CuteSense Studios",
            description: "Explore our open-source tools, visual novels, creative software, and AI experiments rendered directly from source.",
            keywords: "CuteSense projects, open source, visual novels, tools, Sakura Calculator, AI, As You Are"
        },
        "mission.html": {
            title: "Our Mission | CuteSense Studios",
            description: "Meaningful Art, Boundless Creation. Discover how we build emotional, open, and inclusive digital experiences.",
            keywords: "CuteSense mission, open source art, diversity in tech, AI transparency"
        },
        "motto.html": {
            title: "Our Motto | CuteSense Studios",
            description: "Cuteness that makes sense!~ The philosophy behind our welcoming, emotionally resonant design and rigorous logic.",
            keywords: "CuteSense motto, cuteness that makes sense, philosophy, indie studio"
        },
        "business-model.html": {
            title: "How We Work | CuteSense Studios",
            description: "The Logic and the Lore. Discover our Open-Studio Ecosystem and Fractal scaling model.",
            keywords: "business model, fractal studio, open source licensing, indie economics"
        },
        "buisness-model.html": {
            title: "How We Work | CuteSense Studios",
            description: "The Logic and the Lore. Discover our Open-Studio Ecosystem and Fractal scaling model.",
            keywords: "business model, fractal studio, open source licensing, indie economics"
        },
        "contributing.html": {
            title: "Contributing | CuteSense Studios",
            description: "Join the community! Learn how to contribute code, art, and music to our open-source projects.",
            keywords: "contribute, open source, guidelines, game development, art"
        },
        "code-of-conduct.html": {
            title: "Code of Conduct | CuteSense Studios",
            description: "Our pledge to fostering an open, welcoming, and 'cute' environment for all creators.",
            keywords: "code of conduct, community pledge, inclusivity, diversity"
        },
        "404.html": {
            title: "404 - Lost in the Clouds? | CuteSense Studios",
            description: "The requested page floated away. Explore our open-source creations and community tools."
        }
    }
};

function applySEO() {
    const path = window.location.pathname;
    const fileName = path.split("/").pop() || "index.html";
    const pageConfig = SEO_CONFIG.pages[fileName] || SEO_CONFIG.default;
    const finalConfig = { ...SEO_CONFIG.default, ...pageConfig };

    // Resolve absolute URL for social sharing (crucial for GitHub Pages / subpaths)
    const resolveAbsoluteUrl = (relPath) => {
        if (!relPath) return "";
        if (/^https?:\/\//i.test(relPath)) return relPath;
        try {
            const isSubdir = path.includes('/pages/') || path.includes('/docs/');
            const clean = relPath.startsWith('/') ? relPath.slice(1) : relPath;
            const prefix = isSubdir ? '../' : './';
            return new URL(prefix + clean, window.location.href).href;
        } catch (e) {
            return relPath;
        }
    };

    const absoluteImage = resolveAbsoluteUrl(finalConfig.image);
    const cleanCanonicalUrl = window.location.origin + window.location.pathname;

    // 1. Update Document Title
    document.title = finalConfig.title;

    // 2. Helper to set or create meta tags
    const setMeta = (name, content, isProperty = false) => {
        if (!content) return;
        const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let element = document.querySelector(selector);
        
        if (!element) {
            element = document.createElement('meta');
            if (isProperty) element.setAttribute('property', name);
            else element.setAttribute('name', name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    // 3. Standard Meta Tags
    setMeta("description", finalConfig.description);
    setMeta("keywords", finalConfig.keywords);
    setMeta("author", "CuteSense Studios");

    // 4. Open Graph / Facebook
    setMeta("og:title", finalConfig.title, true);
    setMeta("og:description", finalConfig.description, true);
    setMeta("og:image", absoluteImage, true);
    setMeta("og:url", cleanCanonicalUrl, true);
    setMeta("og:type", "website", true);

    // 5. Twitter
    setMeta("twitter:title", finalConfig.title);
    setMeta("twitter:description", finalConfig.description);
    setMeta("twitter:image", absoluteImage);
    setMeta("twitter:card", finalConfig.twitterCard);

    // 6. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', cleanCanonicalUrl);
}

// Run immediately
applySEO();
