/**
 * Main JavaScript file
 * Contains page-specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initGameSearch();
    initActiveNavigation();
    initImageLazyLoading();
});

/**
 * Game search functionality (index page)
 */
function initGameSearch() {
    const searchInput = document.getElementById('gameSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const gameCards = document.querySelectorAll('.game-card');

        gameCards.forEach(card => {
            const searchData = card.getAttribute('data-search') || '';
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';

            const isVisible = searchTerm === '' ||
                searchData.includes(searchTerm) ||
                title.includes(searchTerm) ||
                description.includes(searchTerm);

            if (isVisible) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide category sections
        const sections = document.querySelectorAll('#casual, #puzzle, #action');
        sections.forEach(section => {
            if (!section) return;
            const visibleCards = section.querySelectorAll('.game-card[style*="block"], .game-card:not([style*="none"])');
            if (searchTerm === '' || visibleCards.length > 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });

    // Add fadeIn animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Set active navigation link based on current page
 */
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Lazy loading for images
 */
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Utility: Smooth scroll to element
 */
function smoothScrollTo(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Utility: Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
