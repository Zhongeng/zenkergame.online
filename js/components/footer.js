/**
 * Footer Component
 * Reusable footer with links and copyright
 */

const footerHTML = `
<footer class="bg-black/20 border-t border-white/10 mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
                <h3 class="text-lg font-semibold text-white mb-4">Zenkergame Online</h3>
                <p class="text-gray-400 text-sm">Your premier destination for free online games. Play instantly
                    without downloads.</p>
            </div>
            <div>
                <h4 class="text-md font-semibold text-gray-300 mb-3">Games</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="index.html#casual" class="text-gray-400 hover:text-cyan-400">🎮 Casual Games</a></li>
                    <li><a href="index.html#puzzle" class="text-gray-400 hover:text-cyan-400">🧩 Puzzle Games</a></li>
                    <li><a href="index.html#action" class="text-gray-400 hover:text-cyan-400">⚡ Action Games</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-md font-semibold text-gray-300 mb-3">Resources</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="guides.html" class="text-gray-400 hover:text-cyan-400">Game Guides</a></li>
                    <li><a href="reviews.html" class="text-gray-400 hover:text-cyan-400">Game Reviews</a></li>
                    <li><a href="about.html" class="text-gray-400 hover:text-cyan-400">About Us</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-md font-semibold text-gray-300 mb-3">Legal</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="privacy.html" class="text-gray-400 hover:text-cyan-400">Privacy Policy</a></li>
                    <li><a href="terms.html" class="text-gray-400 hover:text-cyan-400">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div class="border-t border-white/10 pt-6 text-center text-gray-400">
            <p>&copy; 2025 Zenkergame Online. All rights reserved.</p>
            <p class="mt-2 text-sm">Bringing you the best free online gaming experiences since 2025.</p>
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
