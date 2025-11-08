/**
 * Game page functionality
 * Handles individual game loading and display
 */

// Game data - centralized game definitions
const GAMES_DATA = [
    {id: '2048', title: '2048 Game', category: 'puzzle', image: 'images/2048_game.svg', src: 'https://www.crazygames.com/embed/2048'},
    {id: '2048-italian-brainrot', title: '2048 Italian Brainrot', category: 'puzzle', image: 'images/2048-italian-brainrot.svg', src: 'https://game.azgame.io/2048-italian-brainrot/'},
    {id: 'golf-hit', title: 'Golf Hit', category: 'sports', image: 'images/golf-hit.svg', src: 'https://game.azgame.io/golf-hit/'},
    {id: 'rocket-fortress', title: 'Rocket Fortress', category: 'strategy', image: 'images/rocket-fortress.svg', src: 'https://gamea.azgame.io/rocket-fortress/'},
    {id: 'mr-flip', title: 'Mr Flip', category: 'action', image: 'images/mr-flip.svg', src: 'https://gamea.azgame.io/mr-flip/'},
    {id: 'brain-lines', title: 'Brain Lines', category: 'puzzle', image: 'images/brain-lines.svg', src: 'https://game.azgame.io/brain-lines/'},
    {id: 'merge-brainrot', title: 'Merge Brainrot', category: 'puzzle', image: 'images/merge-brainrot.svg', src: 'https://game.azgame.io/merge-brainrot/'},
    {id: 'rocket-fortress', title: 'Rocket Fortress', category: 'action', image: 'images/rocket-fortress.svg', src: 'https://gamea.azgame.io/rocket-fortress/'},
        {id: '2048-drop', title: '2048 Drop', category: 'puzzle', image: 'images/2048-drop.svg', src: 'https://game.azgame.io/2048-drop/'},
    {id: 'slope-xtreme', title: 'Slope Xtreme', category: 'casual', image: 'images/slope-xtreme.svg', src: 'https://gamea.azgame.io/slope-xtreme/'},
    {id: 'moto-x3m', title: 'Moto X3M', category: 'action', image: 'images/moto-x3m.svg', src: 'https://azgames.io/moto-x3m.embed/'},
    {id: 'krunker', title: 'Krunker', category: 'action', image: 'images/krunker.svg', src: 'https://azgames.io/krunker.embed/'},
    {id: 'sugar-sugar', title: 'Sugar Sugar', category: 'puzzle', image: 'images/sugar-sugar.svg', src: 'https://azgames.io/sugar-sugar.embed'},
    {id: 'snow-road', title: 'Snow Road', category: 'action', image: 'images/snow-road.svg', src: 'https://game.azgame.io/snow-road/'},
    {id: 'traffic-road', title: 'Traffic Road', category: 'action', image: 'images/traffic-road.svg', src: 'https://azgames.io/traffic-road.embed/'},
    {id: 'wacky-flip', title: 'WACKY FLIP', category: 'casual', image: 'images/wacky-flip.svg', src: 'https://game.azgame.io/wacky-flip/'},
    {id: 'color-rush', title: 'Color Rush', category: 'casual', image: 'images/color-rush.svg', src: 'https://game.azgame.io/color-rush/'},
    {id: 'italian-brainrot-clicker-2', title: 'Italian Brainrot Clicker 2', category: 'casual', image: 'images/italian-brainrot-clicker-2.svg', src: 'https://game.azgame.io/italian-brainrot-clicker-2/'}
];

// Game instructions - centralized game instructions
const GAME_INSTRUCTIONS = {
    '2048': 'Use arrow keys to move the tiles. When two tiles with the same number touch, they merge into one. Try to reach the 2048 tile!',
    '2048-italian-brainrot': 'Slide Italian Brainrot memes to merge them. Combine matching memes to create higher-tier characters and reach the ultimate Brainrot tile!',
    'golf-hit': 'Click and drag to set power and angle, release to hit the golf ball. Aim for maximum distance and collect coins for upgrades.',
    'rocket-fortress': 'Click or press space to fire holy missiles at demons and portals. Upgrade your missiles and recruit units to defeat waves of enemies and bosses.',
    'mr-flip': 'Master the art of flipping! Time your jumps perfectly to land on platforms and avoid obstacles. Flip your way to victory!',
    'brain-lines': 'Draw lines to guide the ball to the target. Use physics and creativity to solve each puzzle level.',
    'merge-brainrot': 'Drop and merge matching Brainrot memes to evolve them into higher-tier characters. Plan your moves strategically to create chain combos.',
    'rocket-fortress': 'Build and defend your fortress with powerful rockets! Strategically place rocket launchers, upgrade your defenses, and blast away incoming enemies. Master the art of explosive defense!',
        '2048-drop': 'Drop numbered tiles and merge them to reach 2048! Use strategy to combine tiles and create higher numbers. Plan your moves carefully to achieve the ultimate goal of 2048!',
    'slope-xtreme': 'Navigate a ball through an endless 3D slope! Control your speed and direction to avoid obstacles and stay on the track. Test your reflexes in this thrilling endless runner!',
    'moto-x3m': 'Perform crazy stunts on your motorcycle! Race through challenging obstacle courses, do flips and tricks, and reach the finish line as fast as possible. Master the physics and become a stunt legend!',
    'krunker': 'Fast-paced FPS multiplayer shooter! Use WASD to move, mouse to aim and shoot. Master different classes, weapons, and maps in this competitive online arena.',
    'sugar-sugar': 'Draw lines to guide the falling sugar into the cups. Use physics and creativity to solve each level.',
    'snow-road': 'Steer your sled down snowy slopes! Use arrow keys to dodge obstacles, jump over hazards, and collect gift boxes. Survive as long as possible in this endless winter adventure!',
    'traffic-road': 'Navigate through busy traffic! Control your vehicle to avoid collisions, switch lanes strategically, and reach your destination safely. Master the art of timing and reflexes!',
    'wacky-flip': 'Click and hold to charge your flip power, release to flip your character. Time your flips to land on platforms and reach the goal.',
    'color-rush': 'Navigate through colorful obstacles by matching colors! Switch your character color to pass through matching barriers and collect power-ups. Test your reflexes in this vibrant endless runner!',
    'italian-brainrot-clicker-2': 'Click rapidly to generate Italian Brainrot memes and characters! Upgrade your clicking power, unlock new memes, and build your ultimate Brainrot collection. The sequel to the popular clicker game!'
};

/**
 * Parse URL parameters
 */
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    return params;
}

/**
 * Load and display a game
 */
function loadGame() {
    const params = getUrlParams();
    const gameId = params.id || '';
    const gameTitle = params.title || 'Game';
    const gameSrc = params.src || '';

    // Set page title
    const pageTitleEl = document.getElementById('page-title');
    const gameTitleEl = document.getElementById('game-title');

    if (pageTitleEl) {
        pageTitleEl.textContent = `${gameTitle} - Zenkergame Online`;
    }

    if (gameTitleEl) {
        gameTitleEl.textContent = gameTitle;
    }

    // Set iframe source
    const gameFrame = document.getElementById('game-frame');
    if (gameFrame && gameSrc) {
        gameFrame.src = gameSrc;
        gameFrame.title = gameTitle;

        // Hide loader when game loads
        gameFrame.onload = function() {
            const loader = document.getElementById('game-loader');
            if (loader) {
                loader.style.display = 'none';
            }
        };
    }

    // Set game instructions
    setGameInstructions(gameId);

    // Load related games
    loadRelatedGames(gameId);
}

/**
 * Set game instructions text
 */
function setGameInstructions(gameId) {
    const instructionsEl = document.getElementById('game-instructions');
    if (instructionsEl) {
        const instructions = GAME_INSTRUCTIONS[gameId] || 'Use mouse and keyboard to play. Refer to in-game instructions for specific controls.';
        instructionsEl.textContent = instructions;
    }
}

/**
 * Load and display related games
 */
function loadRelatedGames(currentGameId) {
    // Filter out current game
    const relatedGames = GAMES_DATA.filter(game => game.id !== currentGameId);

    // Randomly select 4 games
    const shuffled = relatedGames.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);

    // Clear container
    const container = document.getElementById('related-games-container');
    if (!container) return;

    container.innerHTML = '';

    // Add related games
    selected.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card bg-white rounded-lg overflow-hidden shadow-md';
        gameCard.innerHTML = `
            <a href="game.html?id=${game.id}&title=${encodeURIComponent(game.title)}&src=${encodeURIComponent(game.src)}">
                <img src="${game.image}" alt="${game.title}" class="w-full h-32 object-cover" loading="lazy">
                <div class="p-3">
                    <h3 class="text-lg font-bold">${game.title}</h3>
                </div>
            </a>
        `;
        container.appendChild(gameCard);
    });
}

/**
 * Initialize game page
 */
function initGamePage() {
    loadGame();
}

// Auto-load on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGamePage);
} else {
    initGamePage();
}

// Export for manual loading
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initGamePage,
        loadGame,
        getUrlParams,
        GAMES_DATA,
        GAME_INSTRUCTIONS
    };
}
