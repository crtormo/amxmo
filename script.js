// Game Configuration
const TILE_SIZE = 64;
const TILE_SIZE_SRC = 64;
const TILE_COUNT_X = 100;
const TILE_COUNT_Y = 100;

const COLORS = {
    background: '#2c3e50',
    grid: '#34495e',
    conveyor: '#7f8c8d'
};

// Biomas - Probabilidades aumentadas para hierro
const BIOMES = {
    GRASSLAND: { name: 'Pradera', color: '#4a6741', resources: { ironOre: 0.35, copperOre: 0.05, coal: 0.08, stone: 0.05 } },
    DESERT: { name: 'Desierto', color: '#c2b280', resources: { ironOre: 0.25, copperOre: 0.08, oil: 0.15, uraniumOre: 0.01 } },
    FOREST: { name: 'Bosque', color: '#2d5016', resources: { ironOre: 0.40, copperOre: 0.04, coal: 0.12, stone: 0.03 } },
    TUNDRA: { name: 'Tundra', color: '#e8f4f8', resources: { ironOre: 0.45, copperOre: 0.03, coal: 0.15, uraniumOre: 0.008 } },
    VOLCANIC: { name: 'Volcánico', color: '#4a3728', resources: { ironOre: 0.50, copperOre: 0.10, stone: 0.20, coal: 0.05 } }
};

// Resources Data
const RESOURCES = {
    ironOre: { color: '#d4a574', name: 'Mineral de Hierro' },
    copperOre: { color: '#e67e22', name: 'Mineral de Cobre' },
    stone: { color: '#7f8c8d', name: 'Piedra' },
    coal: { color: '#2c3e50', name: 'Carbón', fuelValue: 100 },
    ironIngot: { color: '#b0bec5', name: 'Lingote de Hierro' },
    copperIngot: { color: '#e67e22', name: 'Lingote de Cobre' },
    gear: { color: '#7f8c8d', name: 'Engranaje' },
    wire: { color: '#d35400', name: 'Cable de Cobre' },
    electronicCircuit: { color: '#2e7d32', name: 'Circuito Electrónico' },
    oil: { color: '#212121', name: 'Petróleo Crudo' },
    plastic: { color: '#f5f5f5', name: 'Plástico' },
    uraniumOre: { color: '#76ff03', name: 'Mineral de Uranio' },
    uraniumCell: { color: '#76ff03', name: 'Celda de Combustible' },
    steel: { color: '#607d8b', name: 'Acero' },
    battery: { color: '#ffeb3b', name: 'Batería' },
    advancedCircuit: { color: '#4caf50', name: 'Circuito Avanzado' }
};

// Building Costs
const COSTS = {
    'drill': { 'ironOre': 10 },
    'furnace': { 'stone': 10 },
    'assembler': { 'gear': 10 },
    'belt': { 'ironOre': 1 },
    'filter_inserter': { 'copperOre': 5 },
    'pole': { 'wire': 2 },
    'steam_engine': { 'ironIngot': 20 },
    'electric_drill': { 'ironIngot': 10, 'gear': 5 },
    'solar_panel': { 'electronicCircuit': 5, 'copperIngot': 10, 'ironIngot': 5 },
    'pumpjack': { 'electronicCircuit': 5, 'ironIngot': 20, 'gear': 10 },
    'refinery': { 'electronicCircuit': 10, 'stone': 20, 'ironIngot': 20 },
    'centrifuge': { 'electronicCircuit': 20, 'gear': 20, 'ironIngot': 50 },
    'nuclear_reactor': { 'electronicCircuit': 100, 'plastic': 50, 'uraniumOre': 3 },
    'chest': { 'ironIngot': 8, 'gear': 2 },
    'storage_unit': { 'ironOre': 10, 'gear': 5 },
    'tank': { 'ironIngot': 20, 'gear': 5 },
    'train_station': { 'steel': 50, 'electronicCircuit': 20 },
    'rail': { 'steel': 1, 'stone': 1 },
    'turret': { 'ironIngot': 10, 'gear': 5 },
    'wall': { 'stone': 5 }
};

// Recipes
const RECIPES = {
    'ironIngot': { cost: { 'ironOre': 1 }, time: 2000 },
    'copperIngot': { cost: { 'copperOre': 1 }, time: 2000 },
    'gear': { cost: { 'ironIngot': 2 }, time: 1000 },
    'wire': { cost: { 'copperIngot': 1 }, time: 500 },
    'electronicCircuit': { cost: { 'wire': 3, 'ironIngot': 1 }, time: 2000 },
    'steel': { cost: { 'ironIngot': 5, 'coal': 1 }, time: 4000 },
    'battery': { cost: { 'copperIngot': 1, 'plastic': 1, 'electronicCircuit': 1 }, time: 3000 },
    'advancedCircuit': { cost: { 'electronicCircuit': 2, 'plastic': 2, 'wire': 4 }, time: 4000 }
};

// Research Data
const TECHNOLOGY = {
    'electricity': { name: "Energía Eléctrica", cost: { 'copperIngot': 10, 'ironIngot': 10 }, unlocks: ['steam_engine', 'pole'] },
    'electric_mining': { name: "Minería Eléctrica", cost: { 'gear': 20, 'ironIngot': 20 }, unlocks: ['electric_drill'] },
    'electronics': { name: "Electrónica Básica", cost: { 'wire': 50, 'ironIngot': 20 }, unlocks: ['electronics'] },
    'solar_energy': { name: "Energía Solar", cost: { 'electronicCircuit': 10, 'ironIngot': 30 }, unlocks: ['solar_panel'] },
    'oil_processing': { name: "Procesamiento de Petróleo", cost: { 'electronicCircuit': 20, 'ironIngot': 50 }, unlocks: ['pumpjack', 'refinery'] },
    'nuclear_power': { name: "Energía Nuclear", cost: { 'electronicCircuit': 50, 'plastic': 50, 'ironIngot': 100 }, unlocks: ['centrifuge', 'nuclear_reactor'] },
    'logistics': { name: "Logística Avanzada", cost: { 'electronicCircuit': 30, 'steel': 50 }, unlocks: ['chest', 'tank'] },
    'railway': { name: "Ferrocarril", cost: { 'steel': 100, 'electronicCircuit': 50 }, unlocks: ['train_station', 'rail'] },
    'military': { name: "Tecnología Militar", cost: { 'steel': 50, 'electronicCircuit': 20 }, unlocks: ['turret', 'wall'] },
    'advanced_electronics': { name: "Electrónica Avanzada", cost: { 'electronicCircuit': 100, 'plastic': 50 }, unlocks: ['advancedCircuit', 'battery'] }
};

// Classes
class Item {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.progress = 0;
    }
}

class Tile {
    constructor(x, y, resourceType = null, biome = 'GRASSLAND') {
        this.x = x;
        this.y = y;
        this.resourceType = resourceType;
        this.biome = biome;
        this.discovered = false;
    }
}

class Building {
    constructor(x, y, type, direction = 0) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.direction = direction;
        this.lastOutput = 0;
        this.lastActive = 0;
        this.lastProduct = null;
        this.filter = null;
        this.fuel = 0;
        this.maxFuel = 1000;
        this.needsFuel = (type === 'furnace');
        this.health = 100;
        this.maxHealth = 100;
        this.destroyed = false;
        this.powerNetwork = null;
        this.powerProduction = 0;
        this.powerConsumption = 0;
        this.maxPowerProduction = (type === 'steam_engine') ? 50 : 
                                  (type === 'solar_panel') ? 30 : 
                                  (type === 'nuclear_reactor') ? 500 : 0;
        this.basePowerConsumption = (type === 'assembler') ? 10 :
            (type === 'electric_drill') ? 20 :
            (type === 'pumpjack') ? 30 :
            (type === 'refinery') ? 50 :
            (type === 'centrifuge') ? 60 :
            (type === 'train_station') ? 40 :
            (type === 'turret') ? 15 :
            (type === 'filter_inserter') ? 1 : 0;

        if (type === 'steam_engine' || type === 'nuclear_reactor') {
            this.needsFuel = true;
            this.maxFuel = (type === 'steam_engine') ? 2000 : 5000;
        }
        
        // Storage capacity
        this.inventory = {};
        this.maxInventory = (type === 'chest') ? 50 : 
                           (type === 'tank') ? 100 : 0;
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 50;
        this.maxHealth = 50;
        this.speed = 0.02;
        this.target = null;
        this.lastAttack = 0;
    }
}

class CircuitNetwork {
    constructor(id) {
        this.id = id;
        this.signals = {};
        this.buildings = [];
    }
    
    addSignal(item, count) {
        if (!this.signals[item]) this.signals[item] = 0;
        this.signals[item] += count;
    }
    
    getSignal(item) {
        return this.signals[item] || 0;
    }
    
    reset() {
        this.signals = {};
    }
}

class Train {
    constructor(id, station) {
        this.id = id;
        this.x = station.x;
        this.y = station.y;
        this.targetStation = null;
        this.inventory = {};
        this.maxInventory = 100;
        this.speed = 0.1;
        this.state = 'waiting'; // waiting, moving, loading, unloading
        this.waitTime = 0;
        this.path = [];
    }
    
    addItem(type, count) {
        if (!this.inventory[type]) this.inventory[type] = 0;
        const total = Object.values(this.inventory).reduce((a, b) => a + b, 0);
        if (total + count <= this.maxInventory) {
            this.inventory[type] += count;
            return true;
        }
        return false;
    }
}

// Game State
const gameState = {
    inventory: {
        ironOre: 50, ironIngot: 0, gear: 5,
        copperOre: 10, copperIngot: 0, wire: 0, electronicCircuit: 0,
        plastic: 0, steel: 0, battery: 0, advancedCircuit: 0,
        uraniumOre: 0, uraniumCell: 0,
        stone: 10, coal: 10
    },
    map: [],
    buildings: [],
    items: [],
    enemies: [],
    selection: null,
    selectionRotation: 0,
    deleteMode: false,
    hoverTile: null,
    time: 0,
    camera: { x: 0, y: 0 },
    keys: { w: false, a: false, s: false, d: false },
    research: {
        'electric_drill': false,
        'steam_engine': false,
        'pole': false,
        'solar_panel': false,
        'electronics': false,
        'pumpjack': false,
        'refinery': false,
        'centrifuge': false,
        'nuclear_reactor': false,
        'chest': false,
        'tank': false,
        'train_station': false,
        'rail': false,
        'turret': false,
        'wall': false,
        'advancedCircuit': false,
        'battery': false
    },
    notifications: [],
    gameTick: 0,
    lastSave: 0,
    circuitNetworks: [],
    trains: [],
    nextCircuitId: 1,
    nextTrainId: 1,
    stats: {
        itemsProduced: {},
        itemsConsumed: {},
        enemiesKilled: 0,
        buildingsBuilt: 0,
        mineralsMined: 0,
        maxPowerGenerated: 0,
        itemsTransported: 0,
        wavesSurvived: 0,
        biomesDiscovered: new Set(),
        playTime: 0
    },
    achievements: {},
    gameMode: 'menu'
};

// Simplex Noise para generación de terreno
class SimplexNoise {
    constructor() {
        this.p = new Uint8Array(256);
        for (let i = 0; i < 256; i++) this.p[i] = i;
        for (let i = 255; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
        }
        this.perm = new Uint8Array(512);
        for (let i = 0; i < 512; i++) this.perm[i] = this.p[i & 255];
    }
    
    noise2D(x, y) {
        const F2 = 0.5 * (Math.sqrt(3) - 1);
        const G2 = (3 - Math.sqrt(3)) / 6;
        let n0, n1, n2;
        let s = (x + y) * F2;
        let i = Math.floor(x + s);
        let j = Math.floor(y + s);
        let t = (i + j) * G2;
        let X0 = i - t;
        let Y0 = j - t;
        let x0 = x - X0;
        let y0 = y - Y0;
        let i1, j1;
        if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
        let x1 = x0 - i1 + G2;
        let y1 = y0 - j1 + G2;
        let x2 = x0 - 1 + 2 * G2;
        let y2 = y0 - 1 + 2 * G2;
        let ii = i & 255;
        let jj = j & 255;
        let gi0 = this.perm[ii + this.perm[jj]] % 12;
        let gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
        let gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 < 0) n0 = 0;
        else { t0 *= t0; n0 = t0 * t0 * this.dot(gi0, x0, y0); }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 < 0) n1 = 0;
        else { t1 *= t1; n1 = t1 * t1 * this.dot(gi1, x1, y1); }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 < 0) n2 = 0;
        else { t2 *= t2; n2 = t2 * t2 * this.dot(gi2, x2, y2); }
        return 70 * (n0 + n1 + n2);
    }
    
    dot(i, x, y) {
        const grad = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[1,0],[-1,0],[0,1],[0,-1],[0,1],[0,-1]];
        return grad[i][0] * x + grad[i][1] * y;
    }
}

const noise = new SimplexNoise();

// Generación de biomas
function getBiome(x, y) {
    let elevation = 0;
    let moisture = 0;
    let temperature = 0;
    
    for (let i = 0; i < 4; i++) {
        const scale = Math.pow(2, i);
        const amp = Math.pow(0.5, i);
        elevation += noise.noise2D(x * 0.02 * scale, y * 0.02 * scale) * amp;
        moisture += noise.noise2D(x * 0.025 * scale + 100, y * 0.025 * scale) * amp;
        temperature += noise.noise2D(x * 0.02 * scale + 200, y * 0.02 * scale) * amp;
    }
    
    if (elevation > 0.3) return 'VOLCANIC';
    if (temperature < -0.3) return 'TUNDRA';
    if (moisture < -0.3) return 'DESERT';
    if (moisture > 0.3 && temperature > 0) return 'FOREST';
    return 'GRASSLAND';
}

function getResourceForBiome(biome, x, y) {
    const biomeData = BIOMES[biome];
    const rand = Math.random();
    let cumulative = 0;
    
    // Agregar variación de ruido para distribución más natural
    const noiseVal = noise.noise2D(x * 0.1, y * 0.1);
    const adjustedRand = (rand + noiseVal * 0.3 + 1) / 2; // Normalizar a 0-1
    
    for (const [res, chance] of Object.entries(biomeData.resources)) {
        cumulative += chance;
        if (adjustedRand < cumulative) {
            return res;
        }
    }
    
    // Ríos ocasionales
    if (Math.abs(noise.noise2D(x * 0.05, y * 0.05)) < 0.08) {
        return 'water';
    }
    
    return null;
}

// Power Grid System
const powerGrids = [];

function updatePowerGrids() {
    powerGrids.length = 0;
    gameState.buildings.forEach(b => b.powerNetwork = null);
    
    const poles = gameState.buildings.filter(b => b.type === 'pole');
    let nextNetId = 1;

    poles.forEach(pole => {
        if (!pole.powerNetwork) {
            const netId = nextNetId++;
            pole.powerNetwork = netId;
            const queue = [pole];

            while (queue.length > 0) {
                const current = queue.shift();
                poles.forEach(other => {
                    if (!other.powerNetwork) {
                        const dist = Math.abs(current.x - other.x) + Math.abs(current.y - other.y);
                        if (dist <= 5) {
                            other.powerNetwork = netId;
                            queue.push(other);
                        }
                    }
                });
            }
        }
    });

    for (let i = 1; i < nextNetId; i++) {
        powerGrids[i] = { id: i, supply: 0, demand: 0, buildings: [] };
    }

    gameState.buildings.forEach(b => {
        if (b.type === 'pole') return;
        const nearbyPole = poles.find(p => Math.abs(p.x - b.x) <= 2 && Math.abs(p.y - b.y) <= 2);

        if (nearbyPole && nearbyPole.powerNetwork) {
            b.powerNetwork = nearbyPole.powerNetwork;
            const grid = powerGrids[b.powerNetwork];

            if (b.maxPowerProduction > 0) {
                if ((b.type === 'steam_engine' || b.type === 'nuclear_reactor') && b.fuel > 0) {
                    grid.supply += b.maxPowerProduction;
                    if (Math.random() < 0.05) b.fuel--;
                } else if (b.type === 'solar_panel') {
                    let sunlight = 1.0;
                    if (gameState.time > 80 || gameState.time < 20) sunlight = 0.0;
                    else if (gameState.time > 75) sunlight = (80 - gameState.time) / 5;
                    else if (gameState.time < 25) sunlight = (gameState.time - 20) / 5;
                    sunlight = Math.max(0, Math.min(1, sunlight));
                    grid.supply += b.maxPowerProduction * sunlight;
                }
            }
            if (b.basePowerConsumption > 0) {
                grid.demand += b.basePowerConsumption;
            }
        }
    });
}

// Circuit Network System
function updateCircuitNetworks() {
    // Reset networks
    gameState.circuitNetworks.forEach(net => net.reset());
    
    // Find all buildings with circuit connections
    const circuitBuildings = gameState.buildings.filter(b => 
        b.circuitNetwork && (b.type === 'chest' || b.type === 'tank' || b.type === 'train_station')
    );
    
    // Update signals from buildings
    circuitBuildings.forEach(b => {
        const network = gameState.circuitNetworks.find(n => n.id === b.circuitNetwork);
        if (network && b.inventory) {
            for (const [item, count] of Object.entries(b.inventory)) {
                network.addSignal(item, count);
            }
        }
    });
}

function connectCircuit(building1, building2, wireType = 'red') {
    // Connect two buildings with circuit wire
    if (!building1.circuitNetwork && !building2.circuitNetwork) {
        // Create new network
        const network = new CircuitNetwork(gameState.nextCircuitId++);
        gameState.circuitNetworks.push(network);
        building1.circuitNetwork = network.id;
        building2.circuitNetwork = network.id;
    } else if (building1.circuitNetwork && !building2.circuitNetwork) {
        building2.circuitNetwork = building1.circuitNetwork;
    } else if (!building1.circuitNetwork && building2.circuitNetwork) {
        building1.circuitNetwork = building2.circuitNetwork;
    }
    // If both have different networks, merge them
}

// Train System
function updateTrains() {
    gameState.trains.forEach(train => {
        switch(train.state) {
            case 'waiting':
                train.waitTime++;
                if (train.waitTime > 60) { // Wait 1 second
                    findNextStation(train);
                }
                break;
                
            case 'moving':
                if (train.path.length > 0) {
                    const next = train.path[0];
                    const dx = Math.sign(next.x - train.x);
                    const dy = Math.sign(next.y - train.y);
                    train.x += dx * train.speed;
                    train.y += dy * train.speed;
                    
                    if (Math.abs(train.x - next.x) < 0.1 && Math.abs(train.y - next.y) < 0.1) {
                        train.path.shift();
                    }
                } else {
                    train.state = 'unloading';
                    train.waitTime = 0;
                }
                break;
                
            case 'loading':
                train.waitTime++;
                // Load items from station
                if (train.waitTime > 120) {
                    train.state = 'moving';
                    findNextStation(train);
                }
                break;
                
            case 'unloading':
                train.waitTime++;
                // Unload items to station
                if (train.waitTime > 120) {
                    train.state = 'loading';
                    train.waitTime = 0;
                }
                break;
        }
    });
}

function findNextStation(train) {
    const stations = gameState.buildings.filter(b => b.type === 'train_station');
    if (stations.length < 2) return;
    
    let nearest = null;
    let nearestDist = Infinity;
    
    stations.forEach(station => {
        if (station.x !== train.x || station.y !== train.y) {
            const dist = Math.abs(station.x - train.x) + Math.abs(station.y - train.y);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest = station;
            }
        }
    });
    
    if (nearest) {
        train.targetStation = nearest;
        // Simple pathfinding - just go in straight lines
        train.path = [];
        let cx = train.x;
        let cy = train.y;
        
        while (Math.abs(cx - nearest.x) > 0.5 || Math.abs(cy - nearest.y) > 0.5) {
            if (Math.abs(cx - nearest.x) > Math.abs(cy - nearest.y)) {
                cx += Math.sign(nearest.x - cx);
            } else {
                cy += Math.sign(nearest.y - cy);
            }
            train.path.push({x: cx, y: cy});
        }
    }
}

// Notification System
function addNotification(message, type = 'info') {
    const notification = {
        id: Date.now() + Math.random(),
        message,
        type,
        time: Date.now()
    };
    gameState.notifications.unshift(notification);
    if (gameState.notifications.length > 5) {
        gameState.notifications.pop();
    }
    updateNotificationsUI();
}

function updateNotificationsUI() {
    const container = document.getElementById('notifications');
    if (!container) return;
    
    container.innerHTML = gameState.notifications.map(n => 
        `<div class="notification ${n.type}">${n.message}</div>`
    ).join('');
}

// Tutorial System
const TUTORIAL_STEPS = [
    {
        id: 'welcome',
        title: '¡Bienvenido a Amxmo!',
        message: 'Tu objetivo es construir una fábrica automatizada. Usa WASD para mover la cámara.',
        condition: () => true,
        completed: false
    },
    {
        id: 'place_drill',
        title: '⛏️ Primera Extracción',
        message: 'Selecciona una Perforadora y colócala sobre un depósito de hierro. ¡Las perforadoras minan automáticamente a tu inventario!',
        condition: () => gameState.buildings.some(b => b.type === 'drill'),
        completed: false
    },
    {
        id: 'place_furnace',
        title: '🔥 Fundir Minerales',
        message: 'Coloca un Horno cerca de la perforadora. Los insertadores moverán automáticamente los minerales.',
        condition: () => gameState.buildings.some(b => b.type === 'furnace'),
        completed: false
    },
    {
        id: 'craft_ingot',
        title: '✨ Crear Lingotes',
        message: 'Haz clic en el Horno para fundir mineral de hierro en lingotes de hierro.',
        condition: () => gameState.inventory.ironIngot >= 1,
        completed: false
    },
    {
        id: 'place_assembler',
        title: '🏭 Ensambladora',
        message: 'Construye una Ensambladora para crear engranajes a partir de lingotes de hierro.',
        condition: () => gameState.buildings.some(b => b.type === 'assembler'),
        completed: false
    },
    {
        id: 'craft_gear',
        title: '⚙️ Primer Componente',
        message: 'Usa la Ensambladora para crear tu primer Engranaje.',
        condition: () => gameState.inventory.gear >= 1,
        completed: false
    },
    {
        id: 'research',
        title: '🔬 Investigar',
        message: 'Abre el menú de Investigación y desbloquea "Electricidad".',
        condition: () => gameState.research.electricity === true,
        completed: false
    },
    {
        id: 'place_pole',
        title: '⚡ Red Eléctrica',
        message: 'Coloca Postes Eléctricos para conectar tus edificios a la red.',
        condition: () => gameState.buildings.some(b => b.type === 'pole'),
        completed: false
    },
    {
        id: 'place_steam_engine',
        title: '💡 Generar Energía',
        message: 'Construye una Máquina de Vapor y alimentala con carbón para generar electricidad.',
        condition: () => gameState.buildings.some(b => b.type === 'steam_engine'),
        completed: false
    },
    {
        id: 'use_belts',
        title: '📦 Cintas Transportadoras',
        message: 'Usa Cintas Transportadoras para mover ítems entre edificios automáticamente.',
        condition: () => gameState.buildings.some(b => b.type === 'belt'),
        completed: false
    },
    {
        id: 'use_storage',
        title: '📦 Almacenador Automático',
        message: 'Construye un Almacenador y conecta cintas transportadoras hacia él. ¡Recogerá automáticamente los objetos y los añadirá a tu inventario!',
        condition: () => gameState.buildings.some(b => b.type === 'storage_unit'),
        completed: false
    },
    {
        id: 'explore_biomes',
        title: '🌍 Explorar Biomas',
        message: 'Explora el mapa usando el minimapa (clic para moverte) o WASD. Descubre diferentes biomas.',
        condition: () => gameState.stats.biomesDiscovered.size >= 2,
        completed: false
    },
    {
        id: 'tutorial_complete',
        title: '🎉 ¡Tutorial Completado!',
        message: '¡Felicidades! Ahora continúa expandiendo tu fábrica. ¡Buena suerte!',
        condition: () => false,
        completed: false
    }
];

let tutorialActive = false;
let currentTutorialStep = 0;

function startTutorial() {
    tutorialActive = true;
    currentTutorialStep = 0;
    // Reset tutorial steps
    TUTORIAL_STEPS.forEach(step => step.completed = false);
    showTutorialStep();
}

function showTutorialStep() {
    if (!tutorialActive || currentTutorialStep >= TUTORIAL_STEPS.length) return;
    
    const step = TUTORIAL_STEPS[currentTutorialStep];
    if (step.completed) {
        currentTutorialStep++;
        showTutorialStep();
        return;
    }
    
    addNotification(`📖 ${step.title}: ${step.message}`, 'info');
}

function updateTutorial() {
    if (!tutorialActive || currentTutorialStep >= TUTORIAL_STEPS.length) return;
    
    const step = TUTORIAL_STEPS[currentTutorialStep];
    if (!step.completed && step.condition()) {
        step.completed = true;
        addNotification(`✅ ${step.title} completado`, 'success');
        currentTutorialStep++;
        
        // Show next step after a short delay
        setTimeout(() => showTutorialStep(), 2000);
    }
}

function stopTutorial() {
    tutorialActive = false;
}

// Achievement System
function checkAchievements() {
    const achievements = {
        'first_steps': () => gameState.stats.buildingsBuilt >= 1,
        'miner': () => gameState.stats.mineralsMined >= 100,
        'industrial': () => gameState.stats.buildingsBuilt >= 50,
        'scientist': () => Object.values(gameState.research).filter(v => v).length >= 5,
        'warrior': () => gameState.stats.enemiesKilled >= 10,
        'electrician': () => gameState.stats.maxPowerGenerated >= 1000,
        'logistician': () => gameState.stats.itemsTransported >= 1000,
        'nuclear': () => gameState.buildings.some(b => b.type === 'nuclear_reactor'),
        'trainspotter': () => gameState.buildings.some(b => b.type === 'train_station'),
        'defender': () => gameState.stats.wavesSurvived >= 10,
        'millionaire': () => Object.values(gameState.inventory).reduce((a,b) => a+b, 0) >= 1000000,
        'explorer': () => gameState.stats.biomesDiscovered.size >= 5
    };
    
    for (const [id, check] of Object.entries(achievements)) {
        if (!gameState.achievements[id] && check()) {
            gameState.achievements[id] = true;
            const ach = ACHIEVEMENTS[id];
            if (ach) {
                addNotification(`🏆 Logro desbloqueado: ${ach.name}`, 'success');
            }
        }
    }
}

// Save/Load System
function saveGame() {
    const saveData = {
        inventory: gameState.inventory,
        buildings: gameState.buildings.map(b => ({
            x: b.x, y: b.y, type: b.type, direction: b.direction,
            fuel: b.fuel, health: b.health, inventory: b.inventory
        })),
        items: gameState.items,
        research: gameState.research,
        time: gameState.time,
        camera: gameState.camera,
        gameTick: gameState.gameTick,
        achievements: gameState.achievements,
        stats: gameState.stats
    };
    localStorage.setItem('amxmo_save', JSON.stringify(saveData));
    gameState.lastSave = Date.now();
    addNotification('Partida guardada', 'success');
}

function loadGame() {
    const saveData = localStorage.getItem('amxmo_save');
    if (!saveData) {
        addNotification('No hay partida guardada', 'warning');
        return false;
    }
    
    try {
        const data = JSON.parse(saveData);
        Object.assign(gameState.inventory, data.inventory);
        gameState.research = { ...gameState.research, ...data.research };
        gameState.time = data.time || 0;
        gameState.camera = data.camera || { x: 0, y: 0 };
        gameState.gameTick = data.gameTick || 0;
        gameState.achievements = data.achievements || {};
        if (data.stats) {
            Object.assign(gameState.stats, data.stats);
        }
        
        // Reconstruct buildings
        gameState.buildings = (data.buildings || []).map(b => {
            const building = new Building(b.x, b.y, b.type, b.direction);
            building.fuel = b.fuel || 0;
            building.health = b.health || 100;
            building.inventory = b.inventory || {};
            return building;
        });
        
        gameState.items = (data.items || []).map(i => new Item(i.x, i.y, i.type));
        
        addNotification('Partida cargada', 'success');
        updateUI();
        return true;
    } catch (e) {
        console.error('Error loading save:', e);
        addNotification('Error al cargar la partida', 'error');
        return false;
    }
}

// Initialization
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const sprites = new Image();
sprites.src = 'sprites.svg';

function initGame(useBiomes = true) {
    for (let x = 0; x < TILE_COUNT_X; x++) {
        gameState.map[x] = [];
        for (let y = 0; y < TILE_COUNT_Y; y++) {
            let res = null;
            let biome = 'GRASSLAND';
            
            if (useBiomes) {
                biome = getBiome(x, y);
                res = getResourceForBiome(biome, x, y);
            } else {
                // Generación clásica
                const rand = Math.random();
                if (rand < 0.15) res = 'ironOre';
                else if (rand < 0.20) res = 'copperOre';
                else if (rand < 0.25) res = 'stone';
                else if (rand < 0.30) res = 'coal';
                else if (rand < 0.32) res = 'oil';
                else if (rand < 0.325) res = 'uraniumOre';
            }
            
            gameState.map[x][y] = new Tile(x, y, res);
            gameState.map[x][y].biome = biome;
        }
    }

    const hubX = Math.floor(TILE_COUNT_X / 2);
    const hubY = Math.floor(TILE_COUNT_Y / 2);
    gameState.map[hubX][hubY].resourceType = null;
    gameState.buildings.push(new Building(hubX, hubY, 'hub'));
    
    // Garantizar hierro cerca del centro para nuevos jugadores
    const ironDeposits = [
        { x: hubX - 3, y: hubY - 3 },
        { x: hubX + 3, y: hubY - 3 },
        { x: hubX - 3, y: hubY + 3 },
        { x: hubX + 3, y: hubY + 3 },
        { x: hubX - 4, y: hubY },
        { x: hubX + 4, y: hubY },
        { x: hubX, y: hubY - 4 },
        { x: hubX, y: hubY + 4 }
    ];
    
    for (const deposit of ironDeposits) {
        if (deposit.x >= 0 && deposit.x < TILE_COUNT_X && 
            deposit.y >= 0 && deposit.y < TILE_COUNT_Y) {
            gameState.map[deposit.x][deposit.y].resourceType = 'ironOre';
        }
    }

    // Note: We don't auto-load inventory for new games
    // Only camera position and other non-inventory stats are loaded if needed
    
    requestAnimationFrame(gameLoop);
    updateUI();
    
    if (useBiomes) {
        addNotification('🌍 Mundo generado con biomas diversos', 'success');
    }
    
    // Notificar sobre hierro cercano
    addNotification('⛏️ Depósitos de hierro cerca del centro (color marrón claro)', 'info');
}

// Input Handling
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        gameState.selectionRotation = (gameState.selectionRotation + 1) % 4;
    }
    if (e.key === 'F5' || (e.ctrlKey && e.key === 's')) {
        e.preventDefault();
        saveGame();
    }
    if (e.key === 'F9') {
        e.preventDefault();
        loadGame();
    }
    if (e.key === 'e' || e.key === 'E') {
        // Recolección manual de minerales (excepto petróleo y uranio)
        const now = Date.now();
        if (!gameState.lastManualMine) gameState.lastManualMine = 0;
        
        // Era 2 (después de desbloquear electricidad): cooldown de 1 segundo
        // Era 1 (inicio): cooldown de 0.5 segundos
        const cooldown = gameState.research['electricity'] ? 1000 : 500;
        
        if (now - gameState.lastManualMine > cooldown) {
            gameState.lastManualMine = now;
            
            if (gameState.hoverTile) {
                const { x, y } = gameState.hoverTile;
                const tile = gameState.map[x][y];
                if (tile && tile.resourceType && 
                    tile.resourceType !== 'oil' && 
                    tile.resourceType !== 'uraniumOre') {
                    
                    // Agregar al inventario
                    gameState.inventory[tile.resourceType] = (gameState.inventory[tile.resourceType] || 0) + 1;
                    gameState.stats.mineralsMined++;
                    
                    // Agotar el mineral
                    tile.resourceAmount = (tile.resourceAmount || 50) - 1;
                    if (tile.resourceAmount <= 0) {
                        tile.resourceType = null;
                        addNotification(`⛏️ Mineral agotado`, 'warning');
                    } else {
                        addNotification(`+1 ${RESOURCES[tile.resourceType]?.name || tile.resourceType}`, 'success');
                    }
                    
                    updateUI();
                }
            }
        }
    }
});

window.addEventListener('keyup', e => {
    if (e.key === 'w' || e.key === 'ArrowUp') gameState.keys.w = false;
    if (e.key === 'a' || e.key === 'ArrowLeft') gameState.keys.a = false;
    if (e.key === 's' || e.key === 'ArrowDown') gameState.keys.s = false;
    if (e.key === 'd' || e.key === 'ArrowRight') gameState.keys.d = false;

    // DEBUG CHEAT
    if (e.key === 'p') {
        gameState.inventory.electronicCircuit += 1000;
        gameState.inventory.plastic += 1000;
        gameState.inventory.ironIngot += 1000;
        gameState.inventory.stone += 1000;
        gameState.inventory.copperIngot += 1000;
        gameState.inventory.wire += 1000;
        gameState.inventory.gear += 1000;
        gameState.inventory.uraniumOre += 100;
        gameState.inventory.uraniumCell += 100;
        gameState.inventory.steel += 100;
        gameState.inventory.battery += 50;
        gameState.inventory.advancedCircuit += 50;
        gameState.research.electronics = true;
        gameState.research.pumpjack = true;
        gameState.research.refinery = true;
        gameState.research.centrifuge = true;
        gameState.research.nuclear_reactor = true;
        gameState.research.chest = true;
        gameState.research.tank = true;
        gameState.research.train_station = true;
        gameState.research.rail = true;
        gameState.research.turret = true;
        gameState.research.wall = true;
        gameState.research.advancedCircuit = true;
        gameState.research.battery = true;
        updateUI();
        addNotification('CHEAT: Recursos y tecnologías desbloqueadas', 'warning');
    }
});

canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left + gameState.camera.x;
    const my = e.clientY - rect.top + gameState.camera.y;
    
    const tx = Math.floor(mx / TILE_SIZE);
    const ty = Math.floor(my / TILE_SIZE);

    if (tx >= 0 && tx < TILE_COUNT_X && ty >= 0 && ty < TILE_COUNT_Y) {
        gameState.hoverTile = { x: tx, y: ty };
    } else {
        gameState.hoverTile = null;
    }
});

canvas.addEventListener('mousedown', e => {
    if (!gameState.hoverTile) return;
    const { x, y } = gameState.hoverTile;
    
    if (gameState.deleteMode) {
        const bIndex = gameState.buildings.findIndex(b => b.x === x && b.y === y);
        if (bIndex >= 0 && gameState.buildings[bIndex].type !== 'hub') {
            gameState.buildings.splice(bIndex, 1);
            updatePowerGrids();
            addNotification('Edificio eliminado', 'info');
        }
    } else if (gameState.selection) {
        placeBuilding(x, y, gameState.selection);
    }
});

// Minimap click to move camera
const minimapCanvas = document.getElementById('minimap-canvas');
if (minimapCanvas) {
    minimapCanvas.addEventListener('mousedown', e => {
        const rect = minimapCanvas.getBoundingClientRect();
        const mmX = e.clientX - rect.left;
        const mmY = e.clientY - rect.top;
        
        const mmWidth = minimapCanvas.width;
        const mmHeight = minimapCanvas.height;
        const scaleX = mmWidth / TILE_COUNT_X;
        const scaleY = mmHeight / TILE_COUNT_Y;
        
        // Convert minimap coordinates to tile coordinates
        const tileX = mmX / scaleX;
        const tileY = mmY / scaleY;
        
        // Center camera on clicked position
        const maxCamX = TILE_COUNT_X * TILE_SIZE - canvas.width;
        const maxCamY = TILE_COUNT_Y * TILE_SIZE - canvas.height;
        
        gameState.camera.x = Math.max(0, Math.min(tileX * TILE_SIZE - canvas.width / 2, maxCamX));
        gameState.camera.y = Math.max(0, Math.min(tileY * TILE_SIZE - canvas.height / 2, maxCamY));
    });
}

// UI Functions
function selectBuilding(type) {
    gameState.selection = type;
    gameState.deleteMode = false;
    document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('selected'));
    const btn = document.getElementById(COSTS[type] ? 'btn-' + type.replace('_', '-') : null);
    if (btn) btn.classList.add('selected');
}

function toggleDeleteMode() {
    gameState.deleteMode = !gameState.deleteMode;
    gameState.selection = null;
    document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('selected'));
    updateUI();
}

function toggleCraftingMenu() {
    const el = document.getElementById('crafting-menu');
    if (el) {
        el.style.display = (el.style.display === 'none') ? 'block' : 'none';
        if (el.style.display === 'block') updateStats();
    }
}

function toggleStats() {
    const el = document.getElementById('stats-panel');
    if (el) {
        el.style.display = (el.style.display === 'none') ? 'block' : 'none';
        if (el.style.display === 'block') updateStats();
    }
}

function updateStats() {
    const playTime = gameState.stats.playTime;
    const hours = Math.floor(playTime / 3600);
    const minutes = Math.floor((playTime % 3600) / 60);
    
    const playTimeEl = document.getElementById('stat-playtime');
    if (playTimeEl) playTimeEl.textContent = `${hours}h ${minutes}m`;
    
    const buildingsEl = document.getElementById('stat-buildings');
    if (buildingsEl) buildingsEl.textContent = gameState.stats.buildingsBuilt;
    
    const enemiesEl = document.getElementById('stat-enemies');
    if (enemiesEl) enemiesEl.textContent = gameState.stats.enemiesKilled;
    
    const producedEl = document.getElementById('stat-produced');
    if (producedEl) {
        const total = Object.values(gameState.stats.itemsProduced).reduce((a, b) => a + b, 0);
        producedEl.textContent = total;
    }
    
    const techEl = document.getElementById('stat-tech');
    if (techEl) {
        const unlocked = Object.values(gameState.research).filter(v => v).length;
        const total = Object.keys(gameState.research).length;
        techEl.textContent = `${unlocked}/${total}`;
    }
}

function craftItem(product) {
    const recipe = RECIPES[product];
    if (!recipe) return;

    let canCraft = true;
    for (const [res, count] of Object.entries(recipe.cost)) {
        if ((gameState.inventory[res] || 0) < count) canCraft = false;
    }

    if (canCraft) {
        for (const [res, count] of Object.entries(recipe.cost)) {
            gameState.inventory[res] -= count;
        }
        gameState.inventory[product] = (gameState.inventory[product] || 0) + 1;
        updateUI();
        addNotification('Fabricado: ' + RESOURCES[product]?.name || product, 'success');
    } else {
        addNotification('¡Recursos insuficientes!', 'error');
    }
}

function unlockTechnology(techId) {
    const tech = TECHNOLOGY[techId];
    if (!tech) return;

    if (gameState.research[tech.unlocks[0]]) {
        addNotification('¡Ya investigado!', 'warning');
        return;
    }

    let canAfford = true;
    for (const [res, count] of Object.entries(tech.cost)) {
        if ((gameState.inventory[res] || 0) < count) canAfford = false;
    }

    if (canAfford) {
        for (const [res, count] of Object.entries(tech.cost)) {
            gameState.inventory[res] -= count;
        }
        tech.unlocks.forEach(u => gameState.research[u] = true);
        updateUI();
        addNotification('¡Investigación Completada: ' + tech.name + '!', 'success');
    } else {
        addNotification('¡Recursos insuficientes para investigar ' + tech.name + '!', 'error');
    }
}

function placeBuilding(x, y, buildingType) {
    const tile = gameState.map[x][y];
    const dir = gameState.selectionRotation;
    const type = buildingType || gameState.selection;

    if (type === 'pumpjack' && tile.resourceType !== 'oil') {
        addNotification('¡La Bomba debe ir sobre Petróleo!', 'error');
        return;
    }

    if ((type === 'drill' || type === 'electric_drill') && !tile.resourceType) {
        addNotification('¡La Perforadora debe ir sobre un recurso!', 'error');
        return;
    }

    const cost = COSTS[type];
    if (cost) {
        let canAfford = true;
        let missingResources = [];
        for (const [res, amount] of Object.entries(cost)) {
            const has = gameState.inventory[res] || 0;
            if (has < amount) {
                canAfford = false;
                missingResources.push(`${RESOURCES[res]?.name || res}: ${has}/${amount}`);
            }
        }

        if (canAfford) {
            for (const [res, amount] of Object.entries(cost)) {
                gameState.inventory[res] -= amount;
            }
            const b = new Building(x, y, type, dir);
            if (type === 'filter_inserter') {
                const f = prompt("Filtro (ironOre, copperOre, ironIngot, copperIngot, gear, wire):", "ironOre");
                if (f && RESOURCES[f]) b.filter = f;
            }
            gameState.buildings.push(b);
            
            // Create train if train station
            if (type === 'train_station') {
                const train = new Train(gameState.nextTrainId++, b);
                gameState.trains.push(train);
                addNotification('Tren creado en estación', 'success');
            }
            
            // Update stats
            gameState.stats.buildingsBuilt++;
            
            updateUI();
            addNotification('Edificio colocado: ' + type, 'success');
        } else {
            addNotification(`Falta: ${missingResources.join(', ')}`, 'error');
        }
    } else {
        // Edificios sin costo (como el hub)
        const b = new Building(x, y, type, dir);
        gameState.buildings.push(b);
        gameState.stats.buildingsBuilt++;
        updateUI();
        addNotification('Edificio colocado: ' + type, 'success');
    }
}

// Game Logic (separated from render)
function updateLogic() {
    const now = Date.now();
    gameState.gameTick++;
    
    // Auto-save every 5 minutes
    if (now - gameState.lastSave > 5 * 60 * 1000) {
        saveGame();
    }
    
    // Day Cycle
    gameState.time = (gameState.time + 0.05) % 100;
    
    // Update Power Grids
    updatePowerGrids();
    
    // Update Circuit Networks
    updateCircuitNetworks();
    
    // Update Trains
    updateTrains();
    
    // Update Stats
    gameState.stats.playTime += 1/60;
    
    // Check Achievements
    checkAchievements(); // Approximate seconds
    
    // Camera movement
    if (gameState.keys.w) gameState.camera.y -= 5;
    if (gameState.keys.s) gameState.camera.y += 5;
    if (gameState.keys.a) gameState.camera.x -= 5;
    if (gameState.keys.d) gameState.camera.x += 5;
    
    // Clamp camera
    const maxCamX = TILE_COUNT_X * TILE_SIZE - canvas.width;
    const maxCamY = TILE_COUNT_Y * TILE_SIZE - canvas.height;
    gameState.camera.x = Math.max(0, Math.min(gameState.camera.x, maxCamX));
    gameState.camera.y = Math.max(0, Math.min(gameState.camera.y, maxCamY));
    
    // Process buildings
    gameState.buildings.forEach(b => {
        // Corrosion
        if (b.type !== 'hub') {
            b.health -= 0.02;
            if (b.health <= 0) b.destroyed = true;
        }

        // Power & Fuel Logic
        let hasPower = true;
        let satisfaction = 1.0;

        // Drill doesn't need power network (burner drill)
        if (b.type === 'drill') {
            hasPower = true;
        } else if (b.powerNetwork) {
            const grid = powerGrids[b.powerNetwork];
            if (grid && grid.demand > 0) {
                satisfaction = Math.min(1.0, grid.supply / grid.demand);
            } else if (grid && grid.demand === 0 && grid.supply > 0) {
                satisfaction = 1.0;
            } else {
                if (b.basePowerConsumption > 0) hasPower = false;
            }

            if (b.maxPowerProduction > 0) {
                const load = (grid.supply > 0) ? Math.min(1.0, grid.demand / grid.supply) : 0;
                if (b.fuel > 0) {
                    b.fuel -= 0.5 * load;
                }
            }
        } else {
            if (b.basePowerConsumption > 0) hasPower = false;
        }

        if (b.needsFuel && b.type !== 'steam_engine') {
            if (b.fuel > 0) b.fuel -= 0.5;
            else hasPower = false;
            satisfaction = 1.0;
        }

        if (hasPower && satisfaction < 1.0) {
            if (Math.random() > satisfaction) hasPower = false;
        }

        // Drill Logic - Mines items to the world (can be transported)
        if ((b.type === 'drill' || b.type === 'electric_drill') && hasPower) {
            const speed = (b.type === 'electric_drill') ? 500 : 1000;
            
            if (now - b.lastActive > speed) {
                const tile = gameState.map[b.x][b.y];
                if (tile.resourceType) {
                    // Check if there's space to drop the item
                    const existingItem = gameState.items.find(i => Math.round(i.x) === b.x && Math.round(i.y) === b.y);
                    if (!existingItem) {
                        // Verificar si hay transporte cerca (radio 1)
                        const hasTransportNearby = gameState.buildings.some(nb => {
                            const dist = Math.abs(nb.x - b.x) + Math.abs(nb.y - b.y);
                            return dist <= 1 && (nb.type === 'belt' || nb.type === 'filter_inserter' || nb.type === 'chest' || nb.type === 'storage_unit');
                        });
                        
                        // Verificar si hay un horno cerca de una cinta conectada (radio 1 desde la cinta)
                        let furnaceNearby = null;
                        const connectedBelt = gameState.buildings.find(nb => {
                            const dist = Math.abs(nb.x - b.x) + Math.abs(nb.y - b.y);
                            return dist <= 1 && nb.type === 'belt';
                        });
                        if (connectedBelt) {
                            furnaceNearby = gameState.buildings.find(nb => {
                                const dist = Math.abs(nb.x - connectedBelt.x) + Math.abs(nb.y - connectedBelt.y);
                                return dist <= 1 && nb.type === 'furnace';
                            });
                        }
                        
                        if (hasTransportNearby) {
                            if (furnaceNearby) {
                                // Hay horno cerca: el mineral va directo al inventario del horno
                                furnaceNearby.inventory = furnaceNearby.inventory || {};
                                furnaceNearby.inventory[tile.resourceType] = (furnaceNearby.inventory[tile.resourceType] || 0) + 1;
                                gameState.stats.mineralsMined++;
                                b.lastActive = now;
                                
                                // Agotar el mineral
                                tile.resourceAmount = (tile.resourceAmount || 50) - 1;
                                if (tile.resourceAmount <= 0) {
                                    tile.resourceType = null;
                                    addNotification(`⛏️ Mineral agotado`, 'warning');
                                }
                            } else {
                                // No hay horno: crear item en el mundo
                                gameState.items.push(new Item(b.x, b.y, tile.resourceType));
                                gameState.stats.mineralsMined++;
                                b.lastActive = now;
                                
                                // Agotar el mineral
                                tile.resourceAmount = (tile.resourceAmount || 50) - 1;
                                if (tile.resourceAmount <= 0) {
                                    tile.resourceType = null;
                                    addNotification(`⛏️ Mineral agotado`, 'warning');
                                }
                                
                                // Show floating text occasionally
                                if (Math.random() < 0.1) {
                                    addNotification(`+1 ${RESOURCES[tile.resourceType]?.name || tile.resourceType}`, 'success');
                                }
                            }
                        }
                    } else {
                        // Auto-collect to inventory if item is stuck
                        gameState.inventory[existingItem.type] = (gameState.inventory[existingItem.type] || 0) + 1;
                        gameState.items.splice(gameState.items.indexOf(existingItem), 1);
                        addNotification(`📦 +1 ${RESOURCES[existingItem.type]?.name || existingItem.type} (auto)`, 'success');
                    }
                }
            }
        }

        // Pumpjack Logic - Pumps oil to the world (can be transported)
        if (b.type === 'pumpjack' && hasPower) {
            if (now - b.lastActive > 1000) {
                const tile = gameState.map[b.x][b.y];
                if (tile.resourceType === 'oil') {
                    // Check if there's space to drop the item
                    const existingItem = gameState.items.find(i => Math.round(i.x) === b.x && Math.round(i.y) === b.y);
                    if (!existingItem) {
                        // Create item in the world (can be picked up by inserters/belts)
                        gameState.items.push(new Item(b.x, b.y, 'oil'));
                        gameState.stats.mineralsMined++;
                        b.lastActive = now;
                        
                        // Agotar el pozo de petróleo (cada pozo tiene 100 unidades)
                        tile.resourceAmount = (tile.resourceAmount || 100) - 1;
                        if (tile.resourceAmount <= 0) {
                            tile.resourceType = null;
                            addNotification(`⛽ Pozo de petróleo agotado`, 'warning');
                        }
                        
                        // Show floating text occasionally
                        if (Math.random() < 0.1) {
                            addNotification(`+1 ${RESOURCES.oil?.name || 'Petróleo'}`, 'success');
                        }
                    }
                }
            }
        }

        // Refinery Logic
        if (b.type === 'refinery' && hasPower) {
            const inputOil = gameState.items.find(i => Math.round(i.x) === b.x && Math.round(i.y) === b.y && i.progress === 0 && i.type === 'oil');
            if (inputOil) {
                if (now - b.lastActive > 2000) {
                    inputOil.type = 'plastic';
                    b.lastActive = now;
                    b.lastProduct = 'plastic';
                }
            }
        }
        
        // Centrifuge Logic
        if (b.type === 'centrifuge' && hasPower) {
            const inputOre = gameState.items.find(i => Math.round(i.x) === b.x && Math.round(i.y) === b.y && i.progress === 0 && i.type === 'uraniumOre');
            if (inputOre) {
                if (now - b.lastActive > 3000) {
                    inputOre.type = 'uraniumCell';
                    b.lastActive = now;
                    b.lastProduct = 'uraniumCell';
                }
            }
        }

        // Furnace Logic
        if (b.type === 'furnace' && hasPower) {
            // Primero intentar procesar items del mundo
            const item = gameState.items.find(i => Math.round(i.x) === b.x && Math.round(i.y) === b.y && i.progress === 0);
            if (item) {
                let product = null;
                if (item.type === 'ironOre') product = 'ironIngot';
                else if (item.type === 'copperOre') product = 'copperIngot';
                else if (item.type === 'stone') product = 'stone';
                else if (item.type === 'ironIngot' && gameState.research['steel']) product = 'steel';

                if (product && now - b.lastActive > 2000) {
                    item.type = product;
                    b.lastActive = now;
                    b.lastProduct = product;
                }
            } else {
                // Procesar desde inventario interno (si viene de perforadora conectada)
                b.inventory = b.inventory || {};
                const inputTypes = ['ironOre', 'copperOre', 'stone'];
                let processed = false;
                
                for (const inputType of inputTypes) {
                    if ((b.inventory[inputType] || 0) > 0 && now - b.lastActive > 2000) {
                        let product = null;
                        if (inputType === 'ironOre') product = 'ironIngot';
                        else if (inputType === 'copperOre') product = 'copperIngot';
                        else if (inputType === 'stone') product = 'stone';
                        
                        if (product) {
                            b.inventory[inputType]--;
                            b.inventory[product] = (b.inventory[product] || 0) + 1;
                            b.lastActive = now;
                            b.lastProduct = product;
                            processed = true;
                            break;
                        }
                    }
                }
            }
        }

        // Assembler Logic - Crafts items from recipes
        if (b.type === 'assembler' && hasPower) {
            const item = gameState.items.find(i => Math.round(i.x) === b.x && Math.round(i.y) === b.y && i.progress === 0);
            if (item && RECIPES[item.type]) {
                const recipe = RECIPES[item.type];
                if (now - b.lastActive > recipe.time) {
                    // Transform the item into the crafted product
                    // For now, just mark it as processed (in a real system we'd consume ingredients)
                    b.lastActive = now;
                    b.lastProduct = item.type;
                }
            }
        }

        // Inserter Logic
        // Filter Inserter Logic (solo brazo filtrador)
        if (b.type === 'filter_inserter') {
            if (now - b.lastActive > 400) {
                let dx = 0, dy = -1;
                if (b.direction === 1) { dx = 1; dy = 0; }
                if (b.direction === 2) { dx = 0; dy = 1; }
                if (b.direction === 3) { dx = -1; dy = 0; }

                const inX = b.x - dx;
                const inY = b.y - dy;
                const outX = b.x + dx;
                const outY = b.y + dy;

                const itemIndex = gameState.items.findIndex(i => Math.round(i.x) === inX && Math.round(i.y) === inY && i.progress < 0.5);
                if (itemIndex !== -1) {
                    const item = gameState.items[itemIndex];
                    let canPick = true;
                    if (b.filter && item.type !== b.filter) canPick = false;

                    if (canPick) {
                        const itemAtDest = gameState.items.find(i => Math.round(i.x) === outX && Math.round(i.y) === outY);
                        const targetBuilding = gameState.buildings.find(tb => tb.x === outX && tb.y === outY);

                        if (targetBuilding && targetBuilding.needsFuel && item.type === 'coal') {
                            if (targetBuilding.fuel < targetBuilding.maxFuel) {
                                targetBuilding.fuel += RESOURCES.coal.fuelValue;
                                gameState.items.splice(itemIndex, 1);
                                b.lastActive = now;
                            }
                        } else if (!itemAtDest) {
                            item.x = outX;
                            item.y = outY;
                            item.progress = 0;
                            b.lastActive = now;
                        }
                    }
                }
            }
        }
        
        // Turret Logic (Attack enemies)
        if (b.type === 'turret' && hasPower) {
            if (now - b.lastActive > 500) {
                const target = gameState.enemies.find(e => {
                    const dist = Math.abs(e.x - b.x) + Math.abs(e.y - b.y);
                    return dist <= 5;
                });
                if (target) {
                    target.health -= 10;
                    b.lastActive = now;
                    if (target.health <= 0) {
                        const idx = gameState.enemies.indexOf(target);
                        if (idx > -1) gameState.enemies.splice(idx, 1);
                    }
                }
            }
        }
    });

    // Cleanup destroyed buildings
    gameState.buildings = gameState.buildings.filter(b => !b.destroyed);

    // Belts Logic
    gameState.items.forEach(item => {
        const tx = Math.floor(item.x);
        const ty = Math.floor(item.y);
        const belt = gameState.buildings.find(b => b.x === tx && b.y === ty && b.type === 'belt');

        if (belt) {
            let dx = 0, dy = -1;
            if (belt.direction === 1) { dx = 1; dy = 0; }
            if (belt.direction === 2) { dx = 0; dy = 1; }
            if (belt.direction === 3) { dx = -1; dy = 0; }

            const speed = 0.15;
            const nextX = item.x + dx * speed;
            const nextY = item.y + dy * speed;

            const blocked = gameState.items.some(other => {
                if (other === item) return false;
                const dist = Math.abs(other.x - nextX) + Math.abs(other.y - nextY);
                return dist < 0.6 && (
                    (dx !== 0 && Math.sign(other.x - item.x) === Math.sign(dx)) ||
                    (dy !== 0 && Math.sign(other.y - item.y) === Math.sign(dy))
                );
            });

            if (!blocked) {
                item.x = nextX;
                item.y = nextY;
            }
        }
    });
    
    // Storage Unit Logic - Collects items from belts and adds to inventory
    gameState.buildings.forEach(b => {
        if (b.type === 'storage_unit') {
            // Find items on the same tile as the storage unit
            const itemIndex = gameState.items.findIndex(i => 
                Math.round(i.x) === b.x && Math.round(i.y) === b.y
            );
            
            if (itemIndex !== -1) {
                const item = gameState.items[itemIndex];
                // Add to inventory
                gameState.inventory[item.type] = (gameState.inventory[item.type] || 0) + 1;
                // Remove from world
                gameState.items.splice(itemIndex, 1);
                // Update stats
                gameState.stats.itemsTransported++;
                
                // Show notification occasionally (5% chance)
                if (Math.random() < 0.05) {
                    addNotification(`📦 Almacenado: +1 ${RESOURCES[item.type]?.name || item.type}`, 'success');
                }
            }
        }
    });
    
    // Enemy Logic
    gameState.enemies.forEach(enemy => {
        // Find nearest building
        let nearest = null;
        let nearestDist = Infinity;
        gameState.buildings.forEach(b => {
            if (b.type === 'hub' || b.type === 'turret') {
                const dist = Math.abs(b.x - enemy.x) + Math.abs(b.y - enemy.y);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearest = b;
                }
            }
        });
        
        if (nearest) {
            const dx = Math.sign(nearest.x - enemy.x);
            const dy = Math.sign(nearest.y - enemy.y);
            enemy.x += dx * enemy.speed;
            enemy.y += dy * enemy.speed;
            
            // Attack if close
            if (nearestDist < 1 && Date.now() - enemy.lastAttack > 1000) {
                nearest.health -= 10;
                enemy.lastAttack = Date.now();
                if (nearest.health <= 0) {
                    nearest.destroyed = true;
                    addNotification('¡Edificio destruido por enemigos!', 'error');
                }
            }
        }
    });
    
    // Spawn enemies occasionally
    if (gameState.gameTick % 1000 === 0 && gameState.enemies.length < 5) {
        const edge = Math.floor(Math.random() * 4);
        let ex, ey;
        switch(edge) {
            case 0: ex = 0; ey = Math.floor(Math.random() * TILE_COUNT_Y); break;
            case 1: ex = TILE_COUNT_X - 1; ey = Math.floor(Math.random() * TILE_COUNT_Y); break;
            case 2: ex = Math.floor(Math.random() * TILE_COUNT_X); ey = 0; break;
            case 3: ex = Math.floor(Math.random() * TILE_COUNT_X); ey = TILE_COUNT_Y - 1; break;
        }
        gameState.enemies.push(new Enemy(ex, ey));
        addNotification('¡Enemigos detectados!', 'warning');
    }
}

// Render Function (separated from logic)
function render() {
    // Clear Screen
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-gameState.camera.x, -gameState.camera.y);

    // Render Map
    for (let x = 0; x < TILE_COUNT_X; x++) {
        for (let y = 0; y < TILE_COUNT_Y; y++) {
            const tile = gameState.map[x][y];
            
            const px = x * TILE_SIZE;
            const py = y * TILE_SIZE;
            if (px + TILE_SIZE < gameState.camera.x || px > gameState.camera.x + canvas.width ||
                py + TILE_SIZE < gameState.camera.y || py > gameState.camera.y + canvas.height) {
                continue;
            }

            // Dibujar fondo de bioma
            if (tile.biome && BIOMES[tile.biome]) {
                ctx.fillStyle = BIOMES[tile.biome].color;
                ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
            }

            ctx.strokeStyle = 'rgba(52, 73, 94, 0.3)';
            ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
            
            if (tile.resourceType) {
                let sx = 0, sy = 0;
                if (tile.resourceType === 'ironOre') sx = 0;
                else if (tile.resourceType === 'copperOre') sx = 64;
                else if (tile.resourceType === 'stone') sx = 128;
                else if (tile.resourceType === 'coal') sx = 192;
                else if (tile.resourceType === 'oil') { sx = 0; sy = 384; }
                else if (tile.resourceType === 'uraniumOre') { sx = 128; sy = 448; }
                else if (tile.resourceType === 'water') { 
                    ctx.fillStyle = '#3498db';
                    ctx.fillRect(px + 8, py + 8, TILE_SIZE - 16, TILE_SIZE - 16);
                    continue;
                }
                ctx.drawImage(sprites, sx, sy, 64, 64, px, py, TILE_SIZE, TILE_SIZE);
                
                // Mostrar cantidad solo al pasar el mouse sobre el mineral
                if (gameState.hoverTile && gameState.hoverTile.x === x && gameState.hoverTile.y === y) {
                    const maxAmount = tile.resourceType === 'oil' ? 100 : 50;
                    const currentAmount = tile.resourceAmount || maxAmount;
                    const percentage = currentAmount / maxAmount;
                    
                    // Fondo de la barra
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                    ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, 8);
                    
                    // Barra de progreso (verde -> amarillo -> rojo)
                    if (percentage > 0.5) ctx.fillStyle = '#4caf50';
                    else if (percentage > 0.25) ctx.fillStyle = '#ff9800';
                    else ctx.fillStyle = '#f44336';
                    
                    ctx.fillRect(px + 5, py + 5, (TILE_SIZE - 10) * percentage, 6);
                    
                    // Número de recursos restantes
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 11px Arial';
                    ctx.textAlign = 'center';
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 3;
                    ctx.strokeText(currentAmount.toString(), px + TILE_SIZE/2, py + 20);
                    ctx.fillText(currentAmount.toString(), px + TILE_SIZE/2, py + 20);
                    ctx.textAlign = 'left';
                }
            }
        }
    }

    // Render Buildings
    gameState.buildings.forEach(b => {
        const px = b.x * TILE_SIZE;
        const py = b.y * TILE_SIZE;
        
        if (px + TILE_SIZE < gameState.camera.x || px > gameState.camera.x + canvas.width ||
            py + TILE_SIZE < gameState.camera.y || py > gameState.camera.y + canvas.height) return;

        let sx = 0, sy = 40;
        let rotate = false;
        let rotAngle = 0;

        if (b.type === 'belt') {
            sx = 0; sy = 128; 
            rotate = true; 
            if (b.direction === 1) rotAngle = 90;
            if (b.direction === 2) rotAngle = 180;
            if (b.direction === 3) rotAngle = 270;
        } 
        else if (b.type === 'filter_inserter') {
            sx = 64; sy = 128;
            rotate = true;
            if (b.direction === 1) rotAngle = 90;
            if (b.direction === 2) rotAngle = 180;
            if (b.direction === 3) rotAngle = 270;
        }
        else if (b.type === 'drill') { sx = 0; sy = 192; }
        else if (b.type === 'furnace') { sx = 64; sy = 192; }
        else if (b.type === 'assembler') { sx = 128; sy = 192; }
        else if (b.type === 'hub') { sx = 0; sy = 256; }
        else if (b.type === 'steam_engine') { sx = 64; sy = 256; }
        else if (b.type === 'pole') { sx = 128; sy = 256; }
        else if (b.type === 'electric_drill') { sx = 192; sy = 256; }
        else if (b.type === 'solar_panel') { sx = 64; sy = 320; }
        else if (b.type === 'pumpjack') { sx = 64; sy = 384; }
        else if (b.type === 'refinery') { sx = 128; sy = 384; }
        else if (b.type === 'centrifuge') { sx = 64; sy = 448; }
        else if (b.type === 'nuclear_reactor') { sx = 192; sy = 448; }
        else if (b.type === 'chest') { sx = 128; sy = 128; }
        else if (b.type === 'storage_unit') { sx = 256; sy = 128; }  // Almacenador
        else if (b.type === 'tank') { sx = 192; sy = 128; }
        else if (b.type === 'turret') { sx = 0; sy = 512; }
        else if (b.type === 'wall') { sx = 64; sy = 512; }

        ctx.save();
        if (rotate) {
            ctx.translate(px + TILE_SIZE/2, py + TILE_SIZE/2);
            ctx.rotate(rotAngle * Math.PI / 180);
            ctx.drawImage(sprites, sx, sy, 64, 64, -20, -20, 40, 40);
        } else {
            ctx.drawImage(sprites, sx, sy, 64, 64, px, py, 40, 40);
        }
        ctx.restore();

        // Filter Inserter Arm Animation
        if (b.type === 'filter_inserter') {
            const bx = px + TILE_SIZE/2;
            const by = py + TILE_SIZE/2;
            let tx = bx, ty = by;
            if (b.direction === 0) ty -= 40;
            if (b.direction === 1) tx += 40;
            if (b.direction === 2) ty += 40;
            if (b.direction === 3) tx -= 40;
            
            ctx.strokeStyle = '#f1c40f';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(bx, by);
            const t = (Date.now() - b.lastActive) < 500 ? (Date.now() - b.lastActive)/500 : 1;
            ctx.lineTo(bx + (tx-bx)*t, by + (ty-by)*t);
            ctx.stroke();
        }

        // Status Indicators
        let showIcon = false;
        let iconTxt = '';
        if (b.needsFuel && b.fuel <= 0) { showIcon = true; iconTxt = '⚡'; ctx.fillStyle = 'red'; }

        if (showIcon) {
            ctx.font = '20px Arial';
            ctx.fillText(iconTxt, px + 10, py + 30);
        }

        // Power Grid Links
        if (b.type === 'pole' && b.powerNetwork) {
            const poles = gameState.buildings.filter(p => p.type === 'pole' && p.powerNetwork === b.powerNetwork);
            poles.forEach(p => {
                if (p !== b) {
                    const dist = Math.abs(p.x - b.x) + Math.abs(p.y - b.y);
                    if (dist <= 5) {
                        ctx.beginPath();
                        ctx.moveTo(px + 20, py + 10);
                        ctx.lineTo(p.x * TILE_SIZE + 20, p.y * TILE_SIZE + 10);
                        ctx.strokeStyle = '#000';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        }

        // Operational Light
        if (b.lastActive && Date.now() - b.lastActive < 800) {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE / 2, py + TILE_SIZE / 2, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Fuel Warning
        if (b.needsFuel && b.fuel <= 0) {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE - 8, py + 8, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Health Bar
        if (b.health < b.maxHealth && b.type !== 'hub') {
            const barW = 30, barH = 4;
            const bx = px + (TILE_SIZE - barW) / 2;
            const by = py - 6;
            ctx.fillStyle = '#222';
            ctx.fillRect(bx, by, barW, barH);
            const pct = Math.max(0, b.health / b.maxHealth);
            ctx.fillStyle = pct > 0.5 ? '#2ecc71' : (pct > 0.25 ? '#f1c40f' : '#e74c3c');
            ctx.fillRect(bx, by, barW * pct, barH);
        }
    });

    // Render Items
    gameState.items.forEach(item => {
        const px = item.x * TILE_SIZE;
        const py = item.y * TILE_SIZE;
        
        if (px + TILE_SIZE < gameState.camera.x || px > gameState.camera.x + canvas.width ||
            py + TILE_SIZE < gameState.camera.y || py > gameState.camera.y + canvas.height) return;

        let sx = 0, sy = 40;
        if (item.type === 'ironOre') { sx = 0; sy = 0; }
        else if (item.type === 'copperOre') { sx = 64; sy = 0; }
        else if (item.type === 'stone') { sx = 128; sy = 0; }
        else if (item.type === 'coal') { sx = 192; sy = 0; }
        else if (item.type === 'ironIngot') sx = 0;
        else if (item.type === 'copperIngot') sx = 40;
        else if (item.type === 'gear') sx = 80;
        else if (item.type === 'wire') sx = 120;
        else if (item.type === 'electronicCircuit') { sx = 0; sy = 512; }
        else if (item.type === 'oil') { sx = 0; sy = 384; }
        else if (item.type === 'plastic') { sx = 192; sy = 384; }
        else if (item.type === 'uraniumOre') { sx = 0; sy = 448; }
        else if (item.type === 'uraniumCell') { sx = 128; sy = 448; }
        else if (item.type === 'steel') { sx = 64; sy = 320; }
        else if (item.type === 'battery') { sx = 128; sy = 320; }
        else if (item.type === 'advancedCircuit') { sx = 192; sy = 320; }

        ctx.drawImage(sprites, sx, sy, 64, 64, px + 8, py + 8, 24, 24);
    });
    
    // Render Enemies
    gameState.enemies.forEach(enemy => {
        const px = enemy.x * TILE_SIZE;
        const py = enemy.y * TILE_SIZE;
        
        if (px + TILE_SIZE < gameState.camera.x || px > gameState.camera.x + canvas.width ||
            py + TILE_SIZE < gameState.camera.y || py > gameState.camera.y + canvas.height) return;
        
        // Draw enemy (red triangle)
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(px + TILE_SIZE/2, py + 5);
        ctx.lineTo(px + TILE_SIZE - 5, py + TILE_SIZE - 5);
        ctx.lineTo(px + 5, py + TILE_SIZE - 5);
        ctx.closePath();
        ctx.fill();
        
        // Health bar
        const barW = 30, barH = 4;
        const bx = px + (TILE_SIZE - barW) / 2;
        const by = py - 6;
        ctx.fillStyle = '#222';
        ctx.fillRect(bx, by, barW, barH);
        const pct = Math.max(0, enemy.health / enemy.maxHealth);
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(bx, by, barW * pct, barH);
    });
    
    // Render Trains
    gameState.trains.forEach(train => {
        const px = train.x * TILE_SIZE;
        const py = train.y * TILE_SIZE;
        
        if (px + TILE_SIZE < gameState.camera.x || px > gameState.camera.x + canvas.width ||
            py + TILE_SIZE < gameState.camera.y || py > gameState.camera.y + canvas.height) return;
        
        // Draw train body
        ctx.fillStyle = '#ff7043';
        ctx.fillRect(px + 5, py + 10, 30, 20);
        
        // Draw train cabin
        ctx.fillStyle = '#e64a19';
        ctx.fillRect(px + 25, py + 5, 10, 15);
        
        // Draw wheels
        ctx.fillStyle = '#37474f';
        ctx.beginPath();
        ctx.arc(px + 10, py + 32, 4, 0, Math.PI * 2);
        ctx.arc(px + 30, py + 32, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw windows
        ctx.fillStyle = '#81d4fa';
        ctx.fillRect(px + 8, py + 12, 6, 6);
        ctx.fillRect(px + 16, py + 12, 6, 6);
    });

    // Hover Text / Selection
    if (gameState.hoverTile) {
        const px = gameState.hoverTile.x * TILE_SIZE;
        const py = gameState.hoverTile.y * TILE_SIZE;
        
        ctx.strokeStyle = gameState.deleteMode ? 'red' : 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);

        const tile = gameState.map[gameState.hoverTile.x][gameState.hoverTile.y];
        const b = gameState.buildings.find(b => b.x === gameState.hoverTile.x && b.y === gameState.hoverTile.y);
        
        let text = "(" + gameState.hoverTile.x + ", " + gameState.hoverTile.y + ")";
        if (tile.resourceType) {
            const resName = RESOURCES[tile.resourceType] ? RESOURCES[tile.resourceType].name : tile.resourceType;
            const amount = tile.resourceAmount || 50;
            text += " " + resName + " [" + amount + "]";
        }
        if (b) {
            text += " [" + b.type + "]";
            if (b.fuel > 0) text += " Fuel:" + Math.floor(b.fuel) + " ";
            if (b.health < b.maxHealth) text += " HP:" + Math.floor(b.health) + " ";
            if (b.powerNetwork) text += " Net:" + b.powerNetwork + " ";
            // Mostrar inventario del horno
            if (b.type === 'furnace' && b.inventory) {
                const invItems = Object.entries(b.inventory).filter(([k, v]) => v > 0);
                if (invItems.length > 0) {
                    text += " Inv:" + invItems.map(([k, v]) => k + "=" + v).join(",");
                }
            }
        }
        
        ctx.fillStyle = 'white';
        ctx.font = '12px monospace';
        ctx.fillText(text, px + 5, py - 10);
    }
    
    // Night Overlay
    ctx.restore();
    
    let darkness = 0;
    if (gameState.time > 70) darkness = (gameState.time - 70) / 30 * 0.5;
    else if (gameState.time < 30) darkness = (30 - gameState.time) / 30 * 0.5;
    
    if (darkness > 0) {
        ctx.fillStyle = 'rgba(0, 0, 10, ' + darkness + ')';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Minimap Render
function renderMinimap() {
    const minimapCanvas = document.getElementById('minimap-canvas');
    if (!minimapCanvas) return;
    
    const mmCtx = minimapCanvas.getContext('2d');
    const mmWidth = minimapCanvas.width;
    const mmHeight = minimapCanvas.height;
    const scaleX = mmWidth / TILE_COUNT_X;
    const scaleY = mmHeight / TILE_COUNT_Y;
    
    // Clear
    mmCtx.fillStyle = '#1a1a20';
    mmCtx.fillRect(0, 0, mmWidth, mmHeight);
    
    // Draw resources
    for (let x = 0; x < TILE_COUNT_X; x++) {
        for (let y = 0; y < TILE_COUNT_Y; y++) {
            const tile = gameState.map[x][y];
            if (tile.resourceType) {
                const px = x * scaleX;
                const py = y * scaleY;
                
                if (tile.resourceType === 'ironOre') mmCtx.fillStyle = '#d4a574';
                else if (tile.resourceType === 'copperOre') mmCtx.fillStyle = '#e67e22';
                else if (tile.resourceType === 'coal') mmCtx.fillStyle = '#2c3e50';
                else if (tile.resourceType === 'stone') mmCtx.fillStyle = '#7f8c8d';
                else if (tile.resourceType === 'oil') mmCtx.fillStyle = '#212121';
                else if (tile.resourceType === 'uraniumOre') mmCtx.fillStyle = '#76ff03';
                else mmCtx.fillStyle = '#555';
                
                mmCtx.fillRect(px, py, Math.max(1, scaleX), Math.max(1, scaleY));
            }
        }
    }
    
    // Draw buildings
    gameState.buildings.forEach(b => {
        const px = b.x * scaleX;
        const py = b.y * scaleY;
        
        if (b.type === 'hub') mmCtx.fillStyle = '#00ff9d';
        else if (b.type === 'turret' || b.type === 'wall') mmCtx.fillStyle = '#ff4757';
        else if (b.type === 'nuclear_reactor') mmCtx.fillStyle = '#76ff03';
        else if (b.type === 'steam_engine' || b.type === 'solar_panel') mmCtx.fillStyle = '#ffd700';
        else mmCtx.fillStyle = '#00d2ff';
        
        mmCtx.fillRect(px, py, Math.max(2, scaleX), Math.max(2, scaleY));
    });
    
    // Draw enemies
    mmCtx.fillStyle = '#ff0000';
    gameState.enemies.forEach(e => {
        const px = e.x * scaleX;
        const py = e.y * scaleY;
        mmCtx.beginPath();
        mmCtx.arc(px + scaleX/2, py + scaleY/2, Math.max(2, scaleX/2), 0, Math.PI * 2);
        mmCtx.fill();
    });
    
    // Draw camera viewport
    mmCtx.strokeStyle = '#fff';
    mmCtx.lineWidth = 1;
    const camX = (gameState.camera.x / TILE_SIZE) * scaleX;
    const camY = (gameState.camera.y / TILE_SIZE) * scaleY;
    const camW = (canvas.width / TILE_SIZE) * scaleX;
    const camH = (canvas.height / TILE_SIZE) * scaleY;
    mmCtx.strokeRect(camX, camY, camW, camH);
}

// Main Game Loop
function gameLoop() {
    updateLogic();
    render();
    renderMinimap();
    updateUI();
    updateTutorial();
    requestAnimationFrame(gameLoop);
}

function updateUI() {
    const ids = {
        'ironOre': 'res-iron-ore', 'ironIngot': 'res-iron-ingot', 'gear': 'res-gear',
        'copperOre': 'res-copper-ore', 'copperIngot': 'res-copper-ingot', 'wire': 'res-wire',
        'stone': 'res-stone', 'coal': 'res-coal', 'plastic': 'res-plastic',
        'uraniumOre': 'res-uranium-ore', 'uraniumCell': 'res-uranium-cell',
        'steel': 'res-steel', 'battery': 'res-battery', 'advancedCircuit': 'res-advanced-circuit'
    };
    for (const [key, id] of Object.entries(ids)) {
        const el = document.querySelector('#' + id + ' .value');
        if (el) el.innerText = Math.floor(gameState.inventory[key] || 0);
    }
    
    // Contar cofres construidos
    const chestCount = gameState.buildings.filter(b => b.type === 'chest').length;
    const chestEl = document.querySelector('#res-chests .value');
    if (chestEl) chestEl.innerText = chestCount;

    const btnMap = {
        'steam_engine': 'btn-steam-engine',
        'pole': 'btn-pole',
        'electric_drill': 'btn-electric-drill',
        'solar_panel': 'btn-solar-panel',
        'pumpjack': 'btn-pumpjack',
        'refinery': 'btn-refinery',
        'centrifuge': 'btn-centrifuge',
        'nuclear_reactor': 'btn-nuclear-reactor',
        'chest': 'btn-chest',
        'tank': 'btn-tank',
        'train_station': 'btn-train-station',
        'rail': 'btn-rail',
        'turret': 'btn-turret',
        'wall': 'btn-wall'
    };

    const btnCircuit = document.getElementById('btn-craft-circuit');
    if (btnCircuit) btnCircuit.style.display = gameState.research['electronics'] ? 'inline-block' : 'none';

    for (const [type, id] of Object.entries(btnMap)) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.style.display = gameState.research[type] ? 'inline-block' : 'none';
        }
    }
    
    // Show/hide military category
    const militaryCategory = document.getElementById('military-category');
    if (militaryCategory) {
        militaryCategory.style.display = gameState.research['turret'] ? 'block' : 'none';
    }
    
    // Show/hide advanced resources
    const advancedResources = ['res-steel', 'res-battery', 'res-advanced-circuit'];
    advancedResources.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            let resType = id.replace('res-', '').replace('-', '');
            if (resType === 'advancedcircuit') resType = 'advancedCircuit';
            el.style.display = gameState.research[resType] ? 'flex' : 'none';
        }
    });
    
    // Show/hide craft buttons
    const craftButtons = {
        'btn-craft-steel': 'steel',
        'btn-craft-battery': 'battery',
        'btn-craft-advanced-circuit': 'advancedCircuit'
    };
    for (const [id, tech] of Object.entries(craftButtons)) {
        const btn = document.getElementById(id);
        if (btn) btn.style.display = gameState.research[tech] ? 'inline-block' : 'none';
    }

    updateResearchUI();
}

function updateResearchUI() {
    const container = document.getElementById('research-list');
    if (!container) return;

    container.innerHTML = '';

    for (const [id, tech] of Object.entries(TECHNOLOGY)) {
        const isUnlocked = gameState.research[tech.unlocks[0]];

        const div = document.createElement('div');
        div.className = 'tech-item';
        div.style.marginBottom = '10px';
        div.style.padding = '10px';
        div.style.border = '1px solid #444';
        div.style.backgroundColor = isUnlocked ? '#2e7d32' : '#333';

        let costStr = Object.entries(tech.cost).map(([k, v]) => `${ v } ${ RESOURCES[k] ? RESOURCES[k].name : k } `).join(', ');

        div.innerHTML = `
            <strong>${ tech.name }</strong><br>
            <span style="font-size:0.8em; color:#aaa">Coste: ${costStr}</span><br>
            <button onclick="unlockTechnology('${id}')" ${isUnlocked ? 'disabled' : ''}>
                ${isUnlocked ? 'Investigado' : 'Investigar'}
            </button>
        `;
        container.appendChild(div);
    }
}

// Test Hooks
window.render_game_to_text = function() {
    const payload = {
        time: gameState.time,
        camera: gameState.camera,
        inventory: gameState.inventory,
        research: gameState.research,
        buildingCount: gameState.buildings.length,
        itemCount: gameState.items.length,
        enemyCount: gameState.enemies.length,
        hover: gameState.hoverTile,
        selection: gameState.selection,
        gameTick: gameState.gameTick
    };
    return JSON.stringify(payload);
};

window.advanceTime = function(ms) {
    const steps = Math.floor(ms / 16);
    for(let i=0; i<steps; i++) {
        updateLogic();
    }
};

// Menu System
function showMainMenu() {
    // Crear overlay del menú
    const menuDiv = document.createElement('div');
    menuDiv.id = 'main-menu';
    menuDiv.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#0f0f13 0%,#1a1a30 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1000;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
            <h1 style="font-size:4rem;color:#00ff9d;text-shadow:0 0 20px rgba(0,255,157,0.5);margin-bottom:10px;">AMXMO</h1>
            <p style="color:#888;font-size:1.2rem;margin-bottom:40px;">Automation Factory Game</p>
            <div style="display:flex;flex-direction:column;gap:15px;width:300px;">
                <button id="btn-new-game" style="padding:15px;background:#00ff9d;border:none;border-radius:8px;color:#000;font-size:1.1rem;font-weight:bold;cursor:pointer;transition:all 0.2s;">🎮 Nueva Partida</button>
                <button id="btn-load-game" style="padding:15px;background:#00d2ff;border:none;border-radius:8px;color:#000;font-size:1.1rem;font-weight:bold;cursor:pointer;transition:all 0.2s;">📂 Cargar Partida</button>
                <button id="btn-tutorial" style="padding:15px;background:#ffa502;border:none;border-radius:8px;color:#000;font-size:1.1rem;font-weight:bold;cursor:pointer;transition:all 0.2s;">📖 Tutorial Guiado</button>
                <button id="btn-achievements" style="padding:15px;background:#9c27b0;border:none;border-radius:8px;color:#fff;font-size:1.1rem;font-weight:bold;cursor:pointer;transition:all 0.2s;">🏆 Logros</button>
            </div>
            <div style="margin-top:30px;padding:15px;background:rgba(255,165,2,0.1);border:1px solid #ffa502;border-radius:8px;max-width:400px;text-align:center;">
                <p style="color:#ffa502;font-size:0.9rem;margin:0;">
                    <strong>💡 ¿Primera vez?</strong> El Tutorial Guiado te enseñará paso a paso cómo jugar.<br>
                    <span style="color:#888;font-size:0.8rem;">WASD: Mover cámara | Click: Construir | Click en minimapa: Navegar</span>
                </p>
            </div>
            <p style="color:#555;margin-top:30px;font-size:0.9rem;">v2.0 - Con biomas, logros y más</p>
        </div>
    `;
    document.body.appendChild(menuDiv);
    
    // Event listeners
    document.getElementById('btn-new-game').onclick = () => {
        menuDiv.remove();
        initGame(true);
    };
    
    document.getElementById('btn-load-game').onclick = () => {
        menuDiv.remove();
        initGame(true);
        loadGame();
    };
    
    document.getElementById('btn-tutorial').onclick = () => {
        menuDiv.remove();
        initGame(true);
        startTutorial();
    };
    
    document.getElementById('btn-achievements').onclick = () => {
        showAchievementsPanel();
    };
}

function showAchievementsPanel() {
    const panel = document.createElement('div');
    panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;max-height:80vh;background:#1a1a20;border:2px solid #00ff9d;border-radius:8px;padding:20px;z-index:1001;overflow-y:auto;';
    
    const achievementsHTML = Object.values(ACHIEVEMENTS).map(ach => {
        const unlocked = gameState.achievements && gameState.achievements[ach.id];
        return `
            <div style="display:flex;align-items:center;gap:15px;padding:15px;margin-bottom:10px;background:${unlocked ? 'rgba(0,255,157,0.1)' : '#2a2a30'};border-radius:8px;border:1px solid ${unlocked ? '#00ff9d' : '#444'};">
                <span style="font-size:2rem;">${ach.icon}</span>
                <div style="flex:1;">
                    <div style="font-weight:bold;color:${unlocked ? '#00ff9d' : '#fff'};">${ach.name}</div>
                    <div style="font-size:0.85rem;color:#888;">${ach.desc}</div>
                </div>
                ${unlocked ? '<span style="color:#00ff9d;">✓</span>' : '<span style="color:#555;">🔒</span>'}
            </div>
        `;
    }).join('');
    
    panel.innerHTML = `
        <h2 style="color:#00ff9d;margin-top:0;">🏆 Logros</h2>
        <div style="margin-bottom:20px;">${achievementsHTML}</div>
        <button onclick="this.parentElement.remove()" style="width:100%;padding:12px;background:#333;border:1px solid #555;border-radius:6px;color:#fff;cursor:pointer;">Cerrar</button>
    `;
    
    document.body.appendChild(panel);
}

// Logros
const ACHIEVEMENTS = {
    'first_steps': { id: 'first_steps', name: 'Primeros Pasos', desc: 'Coloca tu primer edificio', icon: '🏗️' },
    'miner': { id: 'miner', name: 'Minero', desc: 'Extrae 100 minerales', icon: '⛏️' },
    'industrial': { id: 'industrial', name: 'Revolución Industrial', desc: 'Construye 50 edificios', icon: '🏭' },
    'scientist': { id: 'scientist', name: 'Científico', desc: 'Desbloquea 5 tecnologías', icon: '🔬' },
    'warrior': { id: 'warrior', name: 'Guerrero', desc: 'Elimina 10 enemigos', icon: '⚔️' },
    'electrician': { id: 'electrician', name: 'Electricista', desc: 'Genera 1MW de energía', icon: '⚡' },
    'logistician': { id: 'logistician', name: 'Logístico', desc: 'Transporta 1000 items', icon: '📦' },
    'nuclear': { id: 'nuclear', name: 'Energía Atómica', desc: 'Construye un reactor nuclear', icon: '☢️' },
    'trainspotter': { id: 'trainspotter', name: 'Ferroviario', desc: 'Construye tu primera estación de tren', icon: '🚂' },
    'defender': { id: 'defender', name: 'Defensor', desc: 'Sobrevive 10 oleadas de enemigos', icon: '🛡️' },
    'millionaire': { id: 'millionaire', name: 'Millonario', desc: 'Acumula 1M de recursos totales', icon: '💰' },
    'explorer': { id: 'explorer', name: 'Explorador', desc: 'Descubre todos los biomas', icon: '🌍' }
};

// Start game when sprites load
sprites.onload = showMainMenu;
