/**
 * Footer Component - Neural Arcade Design
 * Modern dark theme footer with links
 */

const footerHTML = `
<footer class="footer-glass">
    <div class="container">
        <!-- Logo and links -->
        <div class="text-center mb-8">
            <a href="index.html" class="inline-flex items-center gap-3 mb-6 group">
                <div class="relative">
                    <img src="./favicon.svg" alt="Zenkergame" class="w-10 h-10 transition-transform group-hover:scale-110" onerror="this.style.display='none'">
                    <div class="absolute inset-0 bg-purple-500/10 rounded-lg blur-xl"></div>
                </div>
                <span class="text-2xl font-bold text-white font-display tracking-wide">ZENKERGAME</span>
            </a>
            <div class="footer-links">
                <a href="about.html">About Us</a>
                <a href="privacy.html">Privacy Policy</a>
                <a href="terms.html">Terms of Service</a>
                <a href="index.html">Home</a>
                <a href="guides.html">Guides</a>
                <a href="reviews.html">Reviews</a>
            </div>
        </div>

        <!-- Disclaimer -->
        <div class="footer-disclaimer">
            <p>Disclaimer: Zenkergame is an independent website. It is not affiliated with any organizations. All game content is embedded from third-party sources. All trademarks and copyrighted content belong to their respective owners.</p>
        </div>

        <!-- Copyright -->
        <div class="text-center mt-8 text-muted text-small">
            <p>&copy; 2025 Zenkergame. All rights reserved.</p>
        </div>
    </div>
</footer>
`;

function loadFooter() {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
}

// Auto-load if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}

// Export for manual loading
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadFooter, footerHTML };
}
