/**
 * Header Component - Neural Arcade Design
 * Modern dark theme navigation with search functionality
 */

const headerHTML = `
<header class="header-glass">
    <nav class="container py-4">
        <div class="flex items-center justify-between gap-4">
            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-3 group">
                <div class="relative">
                    <img src="./favicon.svg" alt="Zenkergame" class="w-9 h-9 transition-transform group-hover:scale-110" onerror="this.style.display='none'">
                    <div class="absolute inset-0 bg-purple-500/20 rounded-lg blur-xl group-hover:bg-purple-500/30 transition-all"></div>
                </div>
                <span class="text-xl font-bold text-white font-display tracking-wide">ZENKERGAME</span>
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center gap-1">
                <a href="index.html" class="nav-link">Home</a>
                <a href="index.html#casual" class="nav-link">Casual</a>
                <a href="index.html#puzzle" class="nav-link">Puzzle</a>
                <a href="index.html#action" class="nav-link">Action</a>
                <a href="guides.html" class="nav-link">Guides</a>
                <a href="reviews.html" class="nav-link">Reviews</a>
            </div>

            <!-- Search -->
            <div class="hidden md:flex search-container">
                <input type="text" id="header-search" placeholder="Search games..." class="search-input" autocomplete="off">
                <button id="header-search-btn" class="search-btn" aria-label="Search">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile menu button -->
            <button type="button" id="mobile-menu-button" class="mobile-menu-btn lg:hidden" aria-expanded="false" aria-label="Toggle menu">
                <svg class="w-6 h-6 menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg class="w-6 h-6 close-icon hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Mobile menu -->
        <div id="mobile-menu" class="lg:hidden hidden pt-4">
            <div class="flex flex-col gap-1 mb-4">
                <a href="index.html" class="nav-link mobile-nav-link">Home</a>
                <a href="index.html#casual" class="nav-link mobile-nav-link">Casual</a>
                <a href="index.html#puzzle" class="nav-link mobile-nav-link">Puzzle</a>
                <a href="index.html#action" class="nav-link mobile-nav-link">Action</a>
                <a href="guides.html" class="nav-link mobile-nav-link">Guides</a>
                <a href="reviews.html" class="nav-link mobile-nav-link">Reviews</a>
                <a href="about.html" class="nav-link mobile-nav-link">About</a>
                <a href="privacy.html" class="nav-link mobile-nav-link">Privacy</a>
                <a href="terms.html" class="nav-link mobile-nav-link">Terms</a>
            </div>

            <!-- Mobile Search -->
            <div class="search-container" style="display: flex;">
                <input type="text" id="mobile-search" placeholder="Search games..." class="search-input" style="width: 100%;" autocomplete="off">
                <button id="mobile-search-btn" class="search-btn" aria-label="Search">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>
</header>
`;

function loadHeader() {
    const headerContainer = document.getElementById('header');
    if (!headerContainer) return;

    headerContainer.innerHTML = headerHTML;

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton?.querySelector('.menu-icon');
    const closeIcon = mobileMenuButton?.querySelector('.close-icon');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');

            // Toggle icons
            if (menuIcon && closeIcon) {
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }

            // Close menu when clicking a link
            mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    if (menuIcon && closeIcon) {
                        menuIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Search functionality
    const setupSearch = (inputId, btnId) => {
        const searchInput = document.getElementById(inputId);
        const searchBtn = document.getElementById(btnId);

        const performSearch = () => {
            const query = searchInput?.value.trim().toLowerCase();
            if (!query) {
                // Reset if empty
                document.querySelectorAll('.game-card').forEach(card => {
                    card.style.display = '';
                });
                return;
            }

            // Search for games
            const gameCards = document.querySelectorAll('.game-card');
            let found = false;

            gameCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                const searchData = card.getAttribute('data-search')?.toLowerCase() || '';

                if (title.includes(query) || desc.includes(query) || searchData.includes(query)) {
                    card.style.display = '';
                    found = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show message if no results
            const noResults = document.getElementById('no-search-results');
            if (noResults) {
                noResults.style.display = found ? 'none' : 'block';
            }
        };

        searchBtn?.addEventListener('click', performSearch);
        searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // Real-time search
        searchInput?.addEventListener('input', () => {
            const query = searchInput?.value.trim();
            if (query.length >= 2 || query.length === 0) {
                performSearch();
            }
        });
    };

    setupSearch('header-search', 'header-search-btn');
    setupSearch('mobile-search', 'mobile-search-btn');

    // Highlight active nav link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath === href || currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });
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
