/**
 * Header Component
 * Reusable navigation header with mobile menu support
 */

const headerHTML = `
<header class="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div class="flex justify-between items-center">
            <div class="text-2xl font-bold text-white font-['Poppins']">
                <a href="index.html" class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Zenkergame Online
                </a>
            </div>
            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-6">
                <a href="index.html" class="text-sm font-medium text-gray-300 hover:text-cyan-400 nav-link">🏠 Home</a>
                <div class="relative group">
                    <button class="text-sm font-medium text-gray-300 hover:text-cyan-400 nav-link">🎮 Games</button>
                    <div class="absolute top-full left-0 mt-2 w-48 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <a href="index.html#casual" class="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/10">🎮 Casual</a>
                        <a href="index.html#puzzle" class="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/10">🧩 Puzzle</a>
                        <a href="index.html#action" class="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/10">⚡ Action</a>
                    </div>
                </div>
                <a href="guides.html" class="text-sm font-medium text-gray-300 hover:text-cyan-400 nav-link">📖 Guides</a>
                <a href="reviews.html" class="text-sm font-medium text-gray-300 hover:text-cyan-400 nav-link">⭐ Reviews</a>
                <div class="relative group">
                    <button class="text-sm font-medium text-gray-300 hover:text-cyan-400 nav-link">ℹ️ More</button>
                    <div class="absolute top-full left-0 mt-2 w-40 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <a href="about.html" class="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/10">About Us</a>
                        <a href="privacy.html" class="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/10">Privacy</a>
                        <a href="terms.html" class="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/10">Terms</a>
                    </div>
                </div>
            </nav>

            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button type="button" id="mobile-menu-button"
                    class="text-gray-300 hover:text-cyan-400 focus:outline-none" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state -->
        <div id="mobile-menu" class="md:hidden hidden pt-2 pb-2">
            <div class="flex flex-col space-y-2">
                <a href="index.html" class="text-base font-medium text-gray-300 hover:text-cyan-400 block">🏠 Home</a>
                <div class="border-l-2 border-cyan-400 ml-2 pl-2">
                    <a href="index.html#casual" class="text-sm font-medium text-gray-300 hover:text-cyan-400 block py-1">🎮 Casual</a>
                    <a href="index.html#puzzle" class="text-sm font-medium text-gray-300 hover:text-cyan-400 block py-1">🧩 Puzzle</a>
                    <a href="index.html#action" class="text-sm font-medium text-gray-300 hover:text-cyan-400 block py-1">⚡ Action</a>
                </div>
                <a href="guides.html" class="text-base font-medium text-gray-300 hover:text-cyan-400 block">📖 Guides</a>
                <a href="reviews.html" class="text-base font-medium text-gray-300 hover:text-cyan-400 block">⭐ Reviews</a>
                <a href="about.html" class="text-base font-medium text-gray-300 hover:text-cyan-400 block">ℹ️ About</a>
                <a href="privacy.html" class="text-base font-medium text-gray-300 hover:text-cyan-400 block">🔒 Privacy</a>
                <a href="terms.html" class="text-base font-medium text-gray-300 hover:text-cyan-400 block">📄 Terms</a>
            </div>
        </div>
    </nav>
</header>
`;

function loadHeader() {
    const headerContainer = document.getElementById('header');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;

        // Add mobile menu functionality
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
}

// Auto-load if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}

// Export for manual loading
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadHeader, headerHTML };
}
