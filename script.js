// Game Configuration
const TILE_SIZE = 40;
const GRID_WIDTH = 20; // 800px / 40
const GRID_HEIGHT = 15; // 600px / 40

// Resources Data
const RESOURCES = {
    ironOre: { color: '#a1887f', name: 'Mineral de Hierro' },
    copperOre: { color: '#e67e22', name: 'Mineral de Cobre' },
    stone: { color: '#7f8c8d', name: 'Piedra' },
    coal: { color: '#2c3e50', name: 'Carbón' },
    // Products
    ironIngot: { color: '#b0bec5', name: 'Lingote de Hierro' },
    copperIngot: { color: '#e67e22', name: 'Lingote de Cobre' }, // Same as ore? maybe lighter
    gear: { color: '#7f8c8d', name: 'Engranaje' }, // Stoneish gray?
    wire: { color: '#d35400', name: 'Cable de Cobre' }
};

// Game State
const gameState = {
    inventory: {
        ironOre: 50, ironIngot: 0, gear: 0,
        copperOre: 0, copperIngot: 0, wire: 0,
        stone: 50, coal: 0 // Start with stone for generic building if needed
    },
    // Map is a 2D array of Tile Objects
    map: [],
    buildings: [],
    items: [], // Moving items on the map
    selection: null, // Current building to place
    selectionRotation: 0, // 0: Up, 1: Right, 2: Down, 3: Left
    deleteMode: false,
    hoverTile: null // Track tile under mouse
};

// Item Class
class Item {
    constructor(x, y, type) {
        this.x = x; // float for smooth movement
        this.y = y; // float
        this.type = type;
        this.progress = 0; // 0 to 1 movement progress
    }
}

// Tile Class
class Tile {
    constructor(x, y, resourceType = null) {
        this.x = x;
        this.y = y;
        this.resourceType = resourceType; // 'ironOre', 'copperOre', etc.
    }
}

// Building Class
class Building {
    constructor(x, y, type, direction = 0) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.direction = direction; // 0:N, 1:E, 2:S, 3:W
        this.lastOutput = 0;
        this.lastActive = 0;
        this.lastProduct = null;
        this.filter = null; // For filter inserters
    }
}

// Initialization
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function initGame() {
    // Generate Map
    for (let x = 0; x < GRID_WIDTH; x++) {
        gameState.map[x] = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            // Simple random resource generation
            let res = null;
            const rand = Math.random();
            if (rand < 0.05) res = 'ironOre';
            else if (rand < 0.10) res = 'copperOre';
            else if (rand < 0.15) res = 'stone';
            else if (rand < 0.20) res = 'coal';

            gameState.map[x][y] = new Tile(x, y, res);
        }
    }

    // Start Loop
    requestAnimationFrame(gameLoop);
    updateUI();
}

// UI & Interaction
function selectBuilding(type) {
    gameState.selection = type;
    gameState.deleteMode = false;
    document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('selected'));
    // Highlight logic would go here if we tracked button refs specifically
}

function toggleDeleteMode() {
    gameState.deleteMode = !gameState.deleteMode;
    gameState.selection = null;
    updateUI(); // In a real app we'd toggle button visual state
}

// Rotation
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        gameState.selectionRotation = (gameState.selectionRotation + 1) % 4;
        // Optional: Visual feedback for rotation
    }
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
    const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);

    if (x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT) {
        handleGridClick(x, y);
    }
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
    const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);

    if (x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT) {
        gameState.hoverTile = { x, y };
    } else {
        gameState.hoverTile = null;
    }
});

function handleGridClick(x, y) {
    // Check if building exists
    const existingIndex = gameState.buildings.findIndex(b => b.x === x && b.y === y);

    if (gameState.deleteMode) {
        if (existingIndex !== -1) {
            gameState.buildings.splice(existingIndex, 1);
        }
        return;
    }

    if (gameState.selection && existingIndex === -1) {
        // Place Building Logic
        const tile = gameState.map[x][y];
        const dir = gameState.selectionRotation;

        if (gameState.selection === 'drill') {
            if (!tile.resourceType) {
                alert("¡Debes colocar la Perforadora sobre un recurso!");
                return;
            }
            if (gameState.inventory.ironOre >= 10) {
                gameState.inventory.ironOre -= 10;
                gameState.buildings.push(new Building(x, y, 'drill', dir));
            } else {
                alert("¡Necesitas 10 de Mineral de Hierro!");
            }
        }
        else if (gameState.selection === 'furnace') {
            if (gameState.inventory.stone >= 10) {
                gameState.inventory.stone -= 10;
                gameState.buildings.push(new Building(x, y, 'furnace', dir));
            } else {
                alert("¡Necesitas 10 de Piedra!");
            }
        }
        else if (gameState.selection === 'assembler') {
            if (gameState.inventory.gear >= 10) {
                gameState.inventory.gear -= 10;
                gameState.buildings.push(new Building(x, y, 'assembler', dir));
            } else {
                alert("¡Necesitas 10 Engranajes!");
            }
        }
        else if (gameState.selection === 'belt') {
            if (gameState.inventory.ironOre >= 1) { // Cost 1 Iron
                gameState.inventory.ironOre -= 1;
                gameState.buildings.push(new Building(x, y, 'belt', dir));
            } else {
                alert("¡Necesitas 1 Mineral de Hierro!");
            }
        }
        else if (gameState.selection === 'inserter') {
            if (gameState.inventory.ironOre >= 5) { // Cost 5 Iron
                gameState.inventory.ironOre -= 5;
                gameState.buildings.push(new Building(x, y, 'inserter', dir));
            } else {
                alert("¡Necesitas 5 Mineral de Hierro!");
            }
        }
        else if (gameState.selection === 'filter_inserter') {
            if (gameState.inventory.copperOre >= 5) { // Cost 5 Copper
                gameState.inventory.copperOre -= 5;
                const b = new Building(x, y, 'filter_inserter', dir);
                // Prompt for filter? For now default to null or UI needed?
                // Let's just set it to handle clicks later OR simple prompt
                const type = prompt("Tipo de filtro (ironOre, copperOre, ironIngot, copperIngot, gear, wire):", "ironOre");
                if (type && RESOURCES[type]) {
                    b.filter = type;
                    gameState.buildings.push(b);
                }
            } else {
                alert("¡Necesitas 5 Mineral de Cobre!");
            }
        }

        updateUI();
    }
}

// Logic Loop
setInterval(() => {
    const now = Date.now();

    // 1. Buildings Logic (Production)
    gameState.buildings.forEach(b => {
        // Drills: Output ITEM to map instead of Global Inventory
        if (b.type === 'drill') {
            // Production rate limit (e.g. every 1 sec)
            if (now - b.lastActive > 1000) {
                const tile = gameState.map[b.x][b.y];
                if (tile.resourceType) {
                    // Try to place item on current tile (if belt) or adjacent?
                    // Standard: Drill outputs to its own tile (if no belt/box, it gets stuck? or implicitly outputs to neighbor?)
                    // For simplicity: Drill dumps item ON THE GROUND at (x,y)
                    // Check if item already there
                    const itemThere = gameState.items.find(i => Math.round(i.x) === b.x && Math.round(i.y) === b.y);
                    if (!itemThere) {
                        gameState.items.push(new Item(b.x, b.y, tile.resourceType));
                        b.lastActive = now;
                    }
                }
            }
        }

        // Inserters Logic
        if (b.type === 'inserter' || b.type === 'filter_inserter') {
            if (now - b.lastActive > 800) { // Speed
                // Calculate input and output positions based on direction
                // Direction 0: Up (Input: x, y+1 -> Output: x, y-1) ? 
                // Usually Inserter at (x,y) with Dir 0 (Up) takes from (x, y+1) [Behind] and puts at (x, y-1) [Front]
                // Let's normalize directions: 0:N, 1:E, 2:S, 3:W
                let dx = 0, dy = -1; // Default North
                if (b.direction === 1) { dx = 1; dy = 0; }
                if (b.direction === 2) { dx = 0; dy = 1; }
                if (b.direction === 3) { dx = -1; dy = 0; }

                const inX = b.x - dx;
                const inY = b.y - dy;
                const outX = b.x + dx;
                const outY = b.y + dy;

                // Try pick up
                // Check if item at inX, inY
                const itemIndex = gameState.items.findIndex(i => Math.round(i.x) === inX && Math.round(i.y) === inY && i.progress < 0.5);
                // progress < 0.5 means it's roughly in the center of that tile.

                if (itemIndex !== -1) {
                    const item = gameState.items[itemIndex];

                    // Check filter
                    if (b.type === 'filter_inserter' && b.filter && item.type !== b.filter) {
                        // Skip
                    } else {
                        // Check output clearance
                        const itemAtDest = gameState.items.find(i => Math.round(i.x) === outX && Math.round(i.y) === outY);
                        if (!itemAtDest) {
                            // Move item!
                            // For visual smoothness, we could animate "held" state, but for now teleport
                            item.x = outX;
                            item.y = outY;
                            item.progress = 0; // Reset progress on new tile
                            b.lastActive = now;
                        }
                    }
                }
            }
        }
    });

    // 2. Belts Logic (Move Items)
    gameState.items.forEach(item => {
        // Find if item is on a belt
        const tx = Math.floor(item.x);
        const ty = Math.floor(item.y);
        const belt = gameState.buildings.find(b => b.x === tx && b.y === ty && b.type === 'belt');

        if (belt) {
            let dx = 0, dy = -1;
            if (belt.direction === 1) { dx = 1; dy = 0; }
            if (belt.direction === 2) { dx = 0; dy = 1; }
            if (belt.direction === 3) { dx = -1; dy = 0; }

            // Move item
            const speed = 0.05; // Tiles per tick (approx)

            // Target is next tile center (tx + dx, ty + dy) or edge? 
            // Logic: Move towards center of current tile, then towards exit edge

            // Simple version: Adjust Item X/Y directly
            // Verify next tile isn't blocked?
            // Look ahead 0.5 distance
            const nextX = item.x + dx * speed;
            const nextY = item.y + dy * speed;

            // Collision check with other items
            // If another item is ahead within small distance, stop
            const blocked = gameState.items.some(other => {
                if (other === item) return false;
                const dist = Math.abs(other.x - nextX) + Math.abs(other.y - nextY);
                // If on same belt/path and close
                return dist < 0.6 && (
                    (dx !== 0 && Math.sign(other.x - item.x) === Math.sign(dx)) ||
                    (dy !== 0 && Math.sign(other.y - item.y) === Math.sign(dy))
                );
            });

            if (!blocked) {
                // Only move if we haven't exited the tile yet, OR if next tile accepts us
                // If we are at edge (item.x approx tx + 0.5 + 0.5*dx)
                // Check if centered: 
                // Let's allow free movement for now
                item.x = nextX;
                item.y = nextY;
            }
        }
    });

    // Cleanup: Remove items that go off grid
    // gameState.items = gameState.items.filter(...)

    updateUI();
}, 50); // Faster tick for smooth movement

// Render Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            const tile = gameState.map[x][y];

            // Draw Resource
            if (tile.resourceType) {
                ctx.fillStyle = RESOURCES[tile.resourceType].color;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }

            // Draw Grid Lines representing tiles
            ctx.strokeStyle = '#222';
            ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }

    // Draw Buildings
    gameState.buildings.forEach(b => {
        const px = b.x * TILE_SIZE;
        const py = b.y * TILE_SIZE;

        if (b.type === 'drill') {
            ctx.fillStyle = '#e74c3c'; // Red Drill
            ctx.fillRect(px + 5, py + 5, TILE_SIZE - 10, TILE_SIZE - 10);
        } else if (b.type === 'furnace') {
            ctx.fillStyle = '#f39c12'; // Orange Furnace
            ctx.fillRect(px + 5, py + 5, TILE_SIZE - 10, TILE_SIZE - 10);
        } else if (b.type === 'assembler') {
            ctx.fillStyle = '#3498db'; // Blue Assembler
            ctx.fillRect(px + 5, py + 5, TILE_SIZE - 10, TILE_SIZE - 10);
        }

        // Production Indicator
        if (b.lastActive && Date.now() - b.lastActive < 800) {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE / 2, py + TILE_SIZE / 2, 5, 0, Math.PI * 2);
            ctx.fill();

            // Optional: Draw product color
            if (b.lastProduct && RESOURCES[b.lastProduct]) {
                // But wait, Products are in RESOURCES but maybe not with color?
                // Let's just use a generic flash for now or specific if defined.
                // Actually PRODUCTS like ironIngot are in RESOURCES but no color defined in the top object for them?
                // Let's check lines 7-17 of script.js again.
            }
        }
    });

    // Draw Cursor Selection Ghost
    // (Optional enhancement)

    // Draw Tooltip
    if (gameState.hoverTile) {
        const hx = gameState.hoverTile.x;
        const hy = gameState.hoverTile.y;
        const tile = gameState.map[hx][hy];

        if (tile.resourceType && RESOURCES[tile.resourceType]) {
            const text = RESOURCES[tile.resourceType].name;
            const px = hx * TILE_SIZE;
            const py = hy * TILE_SIZE;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(px, py - 25, ctx.measureText(text).width + 10, 20);

            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.fillText(text, px + 5, py - 10);
        }
    }

    requestAnimationFrame(gameLoop);
}

function updateUI() {
    document.querySelector('#res-iron-ore span').innerText = Math.floor(gameState.inventory.ironOre);
    document.querySelector('#res-iron-ingot span').innerText = Math.floor(gameState.inventory.ironIngot);
    document.querySelector('#res-gear span').innerText = Math.floor(gameState.inventory.gear);

    document.querySelector('#res-copper-ore span').innerText = Math.floor(gameState.inventory.copperOre);
    document.querySelector('#res-copper-ingot span').innerText = Math.floor(gameState.inventory.copperIngot);
    document.querySelector('#res-wire span').innerText = Math.floor(gameState.inventory.wire);
    document.querySelector('#res-stone span').innerText = Math.floor(gameState.inventory.stone);
    document.querySelector('#res-coal span').innerText = Math.floor(gameState.inventory.coal);
}

// Start
initGame();
