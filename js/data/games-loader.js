/**
 * Game Data Loader
 * Provides utility functions for loading and querying game data
 * @version 1.0.0
 */

(function(window) {
    'use strict';

    // Game data cache
    let gamesData = null;
    let gamesById = null;
    let gamesByCategory = null;

    /**
     * Load games data from games-data.js or JSON file
     * @returns {Promise<Object>} Games data object
     */
    async function loadGamesData() {
        if (gamesData) {
            return gamesData;
        }

        try {
            // First check if gamesDatabase is already loaded (from games-data.js)
            if (typeof gamesDatabase !== 'undefined') {
                gamesData = gamesDatabase;

                // Build indexes
                gamesById = {};
                gamesByCategory = {};

                gamesData.games.forEach(game => {
                    gamesById[game.id] = game;

                    if (!gamesByCategory[game.category]) {
                        gamesByCategory[game.category] = [];
                    }
                    gamesByCategory[game.category].push(game);
                });

                return gamesData;
            }

            // Fallback to fetch if gamesDatabase is not available
            const response = await fetch('./js/data/games.json');
            if (!response.ok) {
                throw new Error(`Failed to load games data: ${response.status}`);
            }
            gamesData = await response.json();

            // Build indexes
            gamesById = {};
            gamesByCategory = {};

            gamesData.games.forEach(game => {
                gamesById[game.id] = game;

                if (!gamesByCategory[game.category]) {
                    gamesByCategory[game.category] = [];
                }
                gamesByCategory[game.category].push(game);
            });

            return gamesData;
        } catch (error) {
            console.error('Error loading games data:', error);
            return null;
        }
    }

    /**
     * Get all games
     * @returns {Promise<Array>} Array of all games
     */
    async function getAllGames() {
        await loadGamesData();
        return gamesData ? gamesData.games : [];
    }

    /**
     * Get game by ID
     * @param {string} id - Game ID
     * @returns {Promise<Object|null>} Game object or null if not found
     */
    async function getGameById(id) {
        await loadGamesData();
        return gamesById ? (gamesById[id] || null) : null;
    }

    /**
     * Get games by category
     * @param {string} category - Category name
     * @returns {Promise<Array>} Array of games in the category
     */
    async function getGamesByCategory(category) {
        await loadGamesData();
        return gamesByCategory ? (gamesByCategory[category] || []) : [];
    }

    /**
     * Get games by genre
     * @param {string} genre - Genre name
     * @returns {Promise<Array>} Array of games matching the genre
     */
    async function getGamesByGenre(genre) {
        const games = await getAllGames();
        return games.filter(game => game.genres && game.genres.includes(genre));
    }

    /**
     * Search games by title or description
     * @param {string} query - Search query
     * @returns {Promise<Array>} Array of matching games
     */
    async function searchGames(query) {
        const games = await getAllGames();
        const lowerQuery = query.toLowerCase();

        return games.filter(game => {
            return (
                game.title.toLowerCase().includes(lowerQuery) ||
                game.description.toLowerCase().includes(lowerQuery) ||
                (game.genres && game.genres.some(g => g.toLowerCase().includes(lowerQuery)))
            );
        });
    }

    /**
     * Get random games
     * @param {number} count - Number of games to return
     * @param {string} excludeId - Game ID to exclude (optional)
     * @returns {Promise<Array>} Array of random games
     */
    async function getRandomGames(count, excludeId = null) {
        const games = await getAllGames();
        let filtered = excludeId ? games.filter(g => g.id !== excludeId) : games;

        // Shuffle array
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    /**
     * Get popular games (sorted by plays)
     * @param {number} limit - Number of games to return
     * @returns {Promise<Array>} Array of popular games
     */
    async function getPopularGames(limit = 10) {
        const games = await getAllGames();
        return games
            .sort((a, b) => b.plays - a.plays)
            .slice(0, limit);
    }

    /**
     * Get top rated games
     * @param {number} limit - Number of games to return
     * @returns {Promise<Array>} Array of top rated games
     */
    async function getTopRatedGames(limit = 10) {
        const games = await getAllGames();
        return games
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    /**
     * Get new games (sorted by release date)
     * @param {number} limit - Number of games to return
     * @returns {Promise<Array>} Array of new games
     */
    async function getNewGames(limit = 10) {
        const games = await getAllGames();
        return games
            .sort((a, b) => new Date(b.released) - new Date(a.released))
            .slice(0, limit);
    }

    /**
     * Get games count by category
     * @returns {Promise<Object>} Object with category counts
     */
    async function getGamesCountByCategory() {
        await loadGamesData();

        const counts = {};
        Object.keys(gamesByCategory || {}).forEach(category => {
            counts[category] = gamesByCategory[category].length;
        });

        return counts;
    }

    /**
     * Get all categories
     * @returns {Promise<Object>} Categories object
     */
    async function getCategories() {
        await loadGamesData();
        return gamesData ? gamesData.categories : {};
    }

    /**
     * Format game rating as stars
     * @param {number} rating - Rating value
     * @returns {string} Star string
     */
    function formatRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

        let stars = '★'.repeat(fullStars);
        if (hasHalf) stars += '½';
        stars += '☆'.repeat(emptyStars);

        return stars;
    }

    /**
     * Format number with commas
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Get URL parameters
     * @returns {Object} URL parameters object
     */
    function getUrlParams() {
        try {
            const params = {};
            if (window.location && window.location.search) {
                const queryString = window.location.search.substring(1);
                const pairs = queryString.split('&');
                for (let i = 0; i < pairs.length; i++) {
                    const pair = pairs[i].split('=');
                    if (pair[0] && pair[1]) {
                        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                    }
                }
            }
            return params;
        } catch (error) {
            console.error('Error parsing URL parameters:', error);
            return {};
        }
    }

    /**
     * Create game card HTML
     * @param {Object} game - Game object
     * @returns {string} HTML string
     */
    function createGameCardHTML(game) {
        return `
            <div class="game-card" data-category="${game.category}" data-search="${game.title.toLowerCase()} ${game.genres.join(' ')}">
                <a href="game.html?id=${game.id}&title=${encodeURIComponent(game.title)}">
                    <div class="game-thumbnail">
                        <img src="${game.screenshots[0]}" alt="${game.title}" loading="lazy"
                            onerror="this.style.display='none'; this.parentElement.innerHTML='🎮';">
                        <div class="absolute top-2 right-2 game-stat-badge">⭐ ${game.rating}</div>
                    </div>
                    <div class="p-4">
                        <h3>${game.title}</h3>
                        <p>${game.description.substring(0, 60)}...</p>
                    </div>
                </a>
            </div>
        `;
    }

    // Export to window
    window.GamesLoader = {
        loadGamesData,
        getAllGames,
        getGameById,
        getGamesByCategory,
        getGamesByGenre,
        searchGames,
        getRandomGames,
        getPopularGames,
        getTopRatedGames,
        getNewGames,
        getGamesCountByCategory,
        getCategories,
        formatRating,
        formatNumber,
        getUrlParams,
        createGameCardHTML
    };

    // Auto-load for backward compatibility
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = window.GamesLoader;
    }

})(window);
