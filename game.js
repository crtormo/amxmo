// ============================================
// AMXMO - VERSIÓN COMPLETA CON TODAS LAS MEJORAS
// ============================================

// Game Configuration
const TILE_SIZE = 64;
const TILE_SIZE_SRC = 64;
const CHUNK_SIZE = 16;
const TILE_COUNT_X = 100; // Mapa más grande
const TILE_COUNT_Y = 100;

// Biomas
const BIOMES = {
    GRASSLAND: { name: 'Pradera', color: '#4a6741', resources: { ironOre: 0.05, copperOre: 0.05, coal: 0.08, stone: 0.05 } },
    DESERT: { name: 'Desierto', color: '#c2b280', resources: { ironOre: 0.03, copperOre: 0.08, oil: 0.15, uraniumOre: 0.01 } },
    FOREST: { name: 'Bosque', color: '#2d5016', resources: { ironOre: 0.06, copperOre: 0.04, coal: 0.12, stone: 0.03 } },
    TUNDRA: { name: 'Tundra', color: '#e8f4f8', resources: { ironOre: 0.08, copperOre: 0.03, coal: 0.15, uraniumOre: 0.008 } },
    VOLCANIC: { name: 'Volcánico', color: '#4a3728', resources: { ironOre: 0.12, copperOre: 0.10, stone: 0.20, coal: 0.05 } }
};

// Resources Data ampliado
const RESOURCES = {
    // Básicos
    ironOre: { color: '#a1887f', name: 'Mineral de Hierro', category: 'raw' },
    copperOre: { color: '#e67e22', name: 'Mineral de Cobre', category: 'raw' },
    stone: { color: '#7f8c8d', name: 'Piedra', category: 'raw' },
    coal: { color: '#2c3e50', name: 'Carbón', fuelValue: 100, category: 'raw' },
    wood: { color: '#8d6e63', name: 'Madera', category: 'raw' },
    sand: { color: '#f4e4c1', name: 'Arena', category: 'raw' },
    water: { color: '#3498db', name: 'Agua', category: 'fluid' },
    
    // Procesados
    ironIngot: { color: '#b0bec5', name: 'Lingote de Hierro', category: 'processed' },
    copperIngot: { color: '#e67e22', name: 'Lingote de Cobre', category: 'processed' },
    gear: { color: '#7f8c8d', name: 'Engranaje', category: 'component' },
    wire: { color: '#d35400', name: 'Cable de Cobre', category: 'component' },
    electronicCircuit: { color: '#2e7d32', name: 'Circuito Electrónico', category: 'component' },
    steel: { color: '#607d8b', name: 'Acero', category: 'processed' },
    battery: { color: '#ffeb3b', name: 'Batería', category: 'component' },
    advancedCircuit: { color: '#4caf50', name: 'Circuito Avanzado', category: 'component' },
    processingUnit: { color: '#9c27b0', name: 'Unidad de Procesamiento', category: 'component' },
    
    // Fluidos
    oil: { color: '#212121', name: 'Petróleo Crudo', category: 'fluid' },
    plastic: { color: '#f5f5f5', name: 'Plástico', category: 'processed' },
    sulfur: { color: '#ffeb3b', name: 'Azufre', category: 'processed' },
    lubricant: { color: '#795548', name: 'Lubricante', category: 'fluid' },
    
    // Nuclear
    uraniumOre: { color: '#76ff03', name: 'Mineral de Uranio', category: 'raw' },
    uraniumCell: { color: '#76ff03', name: 'Celda de Combustible', category: 'nuclear' },
    usedUraniumCell: { color: '#33691e', name: 'Celda Gastada', category: 'nuclear' },
    
    // Militar
    gunpowder: { color: '#3e2723', name: 'Pólvora', category: 'military' },
    ammo: { color: '#ff6f00', name: 'Munición', category: 'military' },
    rocket: { color: '#d32f2f', name: 'Cohete', category: 'military' },
    
    // Especiales
    concrete: { color: '#9e9e9e', name: 'Hormigón', category: 'building' },
    glass: { color: '#e3f2fd', name: 'Vidrio', category: 'processed' },
    engineUnit: { color: '#ff7043', name: 'Unidad de Motor', category: 'component' },
    electricEngine: { color: '#29b6f6', name: 'Motor Eléctrico', category: 'component' },
    flyingRobotFrame: { color: '#ab47bc', name: 'Chasis de Robot Volador', category: 'component' },
    lowDensityStructure: { color: '#78909c', name: 'Estructura de Baja Densidad', category: 'component' },
    rocketFuel: { color: '#ff5722', name: 'Combustible de Cohete', category: 'fluid' },
    rocketControlUnit: { color: '#7c4dff', name: 'Unidad de Control de Cohete', category: 'component' },
    satellite: { color: '#00bcd4', name: 'Satélite', category: 'special' }
};

// Building Costs ampliado
const COSTS = {
    'drill': { 'ironOre': 10 },
    'furnace': { 'stone': 10 },
    'assembler': { 'gear': 10 },
    'belt': { 'ironOre': 1 },
    'inserter': { 'ironOre': 5 },
    'filter_inserter': { 'copperOre': 5 },
    'pole': { 'wire': 2 },
    'steam_engine': { 'ironIngot': 20 },
    'electric_drill': { 'ironIngot': 10, 'gear': 5 },
    'solar_panel': { 'electronicCircuit': 5, 'copperIngot': 10, 'ironIngot': 5 },
    'pumpjack': { 'electronicCircuit': 5, 'ironIngot': 20, 'gear': 10 },
    'refinery': { 'electronicCircuit': 10, 'stone': 20, 'ironIngot': 20 },
    'centrifuge': { 'electronicCircuit': 20, 'gear': 20, 'ironIngot': 50 },
    'nuclear_reactor': { 'electronicCircuit': 100, 'plastic': 50, 'stone': 100 },
    'chest': { 'ironIngot': 8, 'gear': 2 },
    'tank': { 'ironIngot': 20, 'gear': 5 },
    'train_station': { 'steel': 50, 'electronicCircuit': 20 },
    'rail': { 'steel': 1, 'stone': 1 },
    'turret': { 'ironIngot': 10, 'gear': 5 },
    'wall': { 'stone': 5 },
    'gate': { 'wall': 1, 'electronicCircuit': 2 },
    'radar': { 'electronicCircuit': 5, 'ironIngot': 10, 'gear': 5 },
    'lamp': { 'electronicCircuit': 1, 'ironIngot': 3, 'wire': 3 },
    'roboport': { 'steel': 45, 'electronicCircuit': 45, 'battery': 45 },
    'logistic_chest_active': { 'steel': 3, 'electronicCircuit': 3, 'advancedCircuit': 1 },
    'logistic_chest_passive': { 'steel': 3, 'electronicCircuit': 3 },
    'logistic_chest_storage': { 'steel': 3, 'electronicCircuit': 3 },
    'rocket_silo': { 'steel': 1000, 'concrete': 1000, 'processingUnit': 200, 'electricEngine': 200 }
};

// Recipes ampliado
const RECIPES = {
    'ironIngot': { cost: { 'ironOre': 1 }, time: 2000 },
    'copperIngot': { cost: { 'copperOre': 1 }, time: 2000 },
    'gear': { cost: { 'ironIngot': 2 }, time: 1000 },
    'wire': { cost: { 'copperIngot': 1 }, time: 500 },
    'electronicCircuit': { cost: { 'wire': 3, 'ironIngot': 1 }, time: 2000 },
    'steel': { cost: { 'ironIngot': 5, 'coal': 1 }, time: 4000 },
    'battery': { cost: { 'copperIngot': 1, 'plastic': 1, 'electronicCircuit': 1 }, time: 3000 },
    'advancedCircuit': { cost: { 'electronicCircuit': 2, 'plastic': 2, 'wire': 4 }, time: 4000 },
    'processingUnit': { cost: { 'advancedCircuit': 2, 'electronicCircuit': 20 }, time: 6000 },
    'concrete': { cost: { 'stone': 5, 'water': 10 }, time: 3000 },
    'glass': { cost: { 'sand': 2 }, time: 2000 },
    'engineUnit': { cost: { 'steel': 1, 'gear': 1 }, time: 4000 },
    'electricEngine': { cost: { 'engineUnit': 1, 'electronicCircuit': 2, 'lubricant': 5 }, time: 6000 },
    'flyingRobotFrame': { cost: { 'steel': 1, 'battery': 2, 'electricEngine': 1, 'electronicCircuit': 3 }, time: 8000 },
    'lowDensityStructure': { cost: { 'steel': 2, 'copperIngot': 20, 'plastic': 5 }, time: 10000 },
    'rocketFuel': { cost: { 'oil': 10, 'coal': 1 }, time: 5000 },
    'rocketControlUnit': { cost: { 'processingUnit': 1, 'speedModule': 1 }, time: 12000 },
    'satellite': { cost: { 'lowDensityStructure': 100, 'solarPanel': 100, 'accumulator': 100, 'radar': 5, 'processingUnit': 100, 'rocketFuel': 50 }, time: 30000 }
};

// Research Data ampliado
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
    'advanced_electronics': { name: "Electrónica Avanzada", cost: { 'electronicCircuit': 100, 'plastic': 50 }, unlocks: ['advancedCircuit', 'battery'] },
    'concrete': { name: "Hormigón", cost: { 'stone': 100, 'ironIngot': 50 }, unlocks: ['concrete'] },
    'robotics': { name: "Robótica", cost: { 'advancedCircuit': 100, 'steel': 100 }, unlocks: ['roboport', 'logistic_chest_passive'] },
    'rocket_silo': { name: "Cohetes", cost: { 'processingUnit': 1000, 'lowDensityStructure': 1000, 'rocketFuel': 1000 }, unlocks: ['rocket_silo'] }
};

// Logros/Achievements
const ACHIEVEMENTS = {
    'first_steps': { id: 'first_steps', name: 'Primeros Pasos', desc: 'Coloca tu primer edificio', icon: '🏗️', condition: (s) => s.stats.buildingsBuilt >= 1 },
    'miner': { id: 'miner', name: 'Minero', desc: 'Extrae 100 minerales', icon: '⛏️', condition: (s) => s.stats.mineralsMined >= 100 },
    'industrial': { id: 'industrial', name: 'Revolución Industrial', desc: 'Construye 50 edificios', icon: '🏭', condition: (s) => s.stats.buildingsBuilt >= 50 },
    'scientist': { id: 'scientist', name: 'Científico', desc: 'Desbloquea 5 tecnologías', icon: '🔬', condition: (s) => Object.values(s.research).filter(v => v).length >= 5 },
    'warrior': { id: 'warrior', name: 'Guerrero', desc: 'Elimina 10 enemigos', icon: '⚔️', condition: (s) => s.stats.enemiesKilled >= 10 },
    'electrician': { id: 'electrician', name: 'Electricista', desc: 'Genera 1MW de energía', icon: '⚡', condition: (s) => s.stats.maxPowerGenerated >= 1000 },
    'logistician': { id: 'logistician', name: 'Logístico', desc: 'Transporta 1000 items', icon: '📦', condition: (s) => s.stats.itemsTransported >= 1000 },
    'nuclear': { id: 'nuclear', name: 'Energía Atómica', desc: 'Construye un reactor nuclear', icon: '☢️', condition: (s) => s.buildings.some(b => b.type === 'nuclear_reactor') },
    'trainspotter': { id: 'trainspotter', name: 'Ferroviario', desc: 'Construye tu primera estación de tren', icon: '🚂', condition: (s) => s.buildings.some(b => b.type === 'train_station') },
    'defender': { id: 'defender', name: 'Defensor', desc: 'Sobrevive 10 oleadas de enemigos', icon: '🛡️', condition: (s) => s.stats.wavesSurvived >= 10 },
    'millionaire': { id: 'millionaire', name: 'Millonario', desc: 'Acumula 1M de recursos totales', icon: '💰', condition: (s) => Object.values(s.inventory).reduce((a,b)=>a+b,0) >= 1000000 },
    'rocket_man': { id: 'rocket_man', name: 'Hacia las Estrellas', desc: 'Lanza un cohete', icon: '🚀', condition: (s) => s.stats.rocketsLaunched >= 1 }
};

// Misiones
const MISSIONS = {
    'tutorial_1': { id: 'tutorial_1', name: 'Comienza la Aventura', desc: 'Coloca una perforadora sobre un mineral de hierro', reward: { ironOre: 50 }, completed: false },
    'tutorial_2': { id: 'tutorial_2', name: 'Primeros Lingotes', desc: 'Funde 10 lingotes de hierro', reward: { coal: 50 }, completed: false },
    'tutorial_3': { id: 'tutorial_3', name: 'Automatización', desc: 'Coloca una cinta transportadora', reward: { gear: 20 }, completed: false },
    'tutorial_4': { id: 'tutorial_4', name: 'Energía Eléctrica', desc: 'Investiga Energía Eléctrica', reward: { electronicCircuit: 20 }, completed: false },
    'tutorial_5': { id: 'tutorial_5', name: 'Defensa', desc: 'Construye una torreta', reward: { ammo: 100 }, completed: false },
    'empaquetacion': { id: 'empaquetacion', name: 'Empaquetación', desc: 'Crea un almacenador (chest)', reward: { ironIngot: 30, gear: 10 }, completed: false }
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
    constructor(x, y, biome = 'GRASSLAND', resourceType = null, elevation = 0) {
        this.x = x;
        this.y = y;
        this.biome = biome;
        this.resourceType = resourceType;
        this.elevation = elevation;
        this.discovered = false;
    }
}

class Chunk {
    constructor(cx, cy) {
        this.cx = cx;
        this.cy = cy;
        this.tiles = [];
        this.buildings = [];
        this.items = [];
        this.active = false;
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
        this.needsFuel = (type === 'drill' || type === 'furnace');
        this.health = 100;
        this.maxHealth = 100;
        this.destroyed = false;
        this.powerNetwork = null;
        this.powerProduction = 0;
        this.powerConsumption = 0;
        this.circuitNetwork = null;
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
            (type === 'radar') ? 25 :
            (type === 'roboport') ? 50 :
            (type === 'inserter' || type === 'filter_inserter') ? 1 : 0;

        if (type === 'steam_engine' || type === 'nuclear_reactor') {
            this.needsFuel = true;
            this.maxFuel = (type === 'steam_engine') ? 2000 : 5000;
        }
        
        this.inventory = {};
        this.maxInventory = (type === 'chest') ? 50 : 
                           (type === 'tank') ? 100 : 
                           (type === 'roboport') ? 200 : 0;
        
        // Para robopuertos
        this.robots = [];
        this.maxRobots = (type === 'roboport') ? 10 : 0;
    }
}

class Enemy {
    constructor(x, y, type = 'biter') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.health = type === 'biter' ? 50 : type === 'spitter' ? 30 : 100;
        this.maxHealth = this.health;
        this.speed = type === 'biter' ? 0.02 : type === 'spitter' ? 0.015 : 0.01;
        this.damage = type === 'biter' ? 10 : type === 'spitter' ? 5 : 20;
        this.target = null;
        this.lastAttack = 0;
        this.attackRange = type === 'spitter' ? 3 : 1;
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
        this.state = 'waiting';
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

class LogisticRobot {
    constructor(x, y, roboport) {
        this.x = x;
        this.y = y;
        this.roboport = roboport;
        this.target = null;
        this.carrying = null;
        this.state = 'idle';
        this.speed = 0.15;
    }
}

// Game State
const gameState = {
    inventory: {
        ironOre: 50, ironIngot: 0, gear: 0,
        copperOre: 0, copperIngot: 0, wire: 0, electronicCircuit: 0,
        plastic: 0, steel: 0, battery: 0, advancedCircuit: 0,
        processingUnit: 0, concrete: 0, glass: 0,
        uraniumOre: 0, uraniumCell: 0,
        stone: 50, coal: 50, wood: 0, sand: 0,
        engineUnit: 0, electricEngine: 0,
        ammo: 0, rocket: 0
    },
    chunks: new Map(),
    buildings: [],
    items: [],
    enemies: [],
    trains: [],
    robots: [],
    selection: null,
    selectionRotation: 0,
    deleteMode: false,
    hoverTile: null,
    time: 0,
    camera: { x: 0, y: 0 },
    keys: { w: false, a: false, s: false, d: false },
    research: {
        'electric_drill': false, 'steam_engine': false, 'pole': false,
        'solar_panel': false, 'electronics': false, 'pumpjack': false,
        'refinery': false, 'centrifuge': false, 'nuclear_reactor': false,
        'chest': false, 'tank': false, 'train_station': false, 'rail': false,
        'turret': false, 'wall': false, 'advancedCircuit': false, 'battery': false,
        'concrete': false, 'roboport': false, 'logistic_chest_passive': false,
        'rocket_silo': false
    },
    notifications: [],
    gameTick: 0,
    lastSave: 0,
    circuitNetworks: [],
    nextCircuitId: 1,
    nextTrainId: 1,
    achievements: {},
    unlockedAchievements: [],
    missions: { ...MISSIONS },
    currentMission: 'tutorial_1',
    stats: {
        itemsProduced: {},
        itemsConsumed: {},
        itemsTransported: 0,
        enemiesKilled: 0,
        buildingsBuilt: 0,
        mineralsMined: 0,
        maxPowerGenerated: 0,
        wavesSurvived: 0,
        rocketsLaunched: 0,
        playTime: 0
    },
    players: [
        { id: 1, x: 25, y: 25, color: '#00ff9d', keys: { w: 'w', a: 'a', s: 's', d: 'd' } }
    ],
    activePlayer: 0,
    tutorialStep: 0,
    tutorialActive: true,
    waveNumber: 0,
    nextWaveTime: 0,
    gameMode: 'menu' // menu, playing, paused, tutorial
};

// Power Grid System
const powerGrids = [];

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

// Generación de mundo con biomas
function generateChunk(cx, cy) {
    const chunk = new Chunk(cx, cy);
    
    for (let x = 0; x < CHUNK_SIZE; x++) {
        chunk.tiles[x] = [];
        for (let y = 0; y < CHUNK_SIZE; y++) {
            const worldX = cx * CHUNK_SIZE + x;
            const worldY = cy * CHUNK_SIZE + y;
            
            // Múltiples octavas de ruido para terreno más natural
            let elevation = 0;
            let moisture = 0;
            let temperature = 0;
            
            for (let i = 0; i < 4; i++) {
                const scale = Math.pow(2, i);
                const amp = Math.pow(0.5, i);
                elevation += noise.noise2D(worldX * 0.01 * scale, worldY * 0.01 * scale) * amp;
                moisture += noise.noise2D(worldX * 0.015 * scale + 100, worldY * 0.015 * scale) * amp;
                temperature += noise.noise2D(worldX * 0.01 * scale + 200, worldY * 0.01 * scale) * amp;
            }
            
            // Determinar bioma
            let biome = 'GRASSLAND';
            if (elevation > 0.3) biome = 'VOLCANIC';
            else if (temperature < -0.3) biome = 'TUNDRA';
            else if (moisture < -0.3) biome = 'DESERT';
            else if (moisture > 0.3 && temperature > 0) biome = 'FOREST';
            
            // Generar recursos basados en bioma
            let resource = null;
            const biomeData = BIOMES[biome];
            const rand = Math.random();
            let cumulative = 0;
            
            for (const [res, chance] of Object.entries(biomeData.resources)) {
                cumulative += chance;
                if (rand < cumulative) {
                    resource = res;
                    break;
                }
            }
            
            // Ríos (valles de ruido)
            if (Math.abs(noise.noise2D(worldX * 0.05, worldY * 0.05)) < 0.1) {
                resource = 'water';
            }
            
            chunk.tiles[x][y] = new Tile(worldX, worldY, biome, resource, elevation);
        }
    }
    
    return chunk;
}

function getChunk(cx, cy) {
    const key = `${cx},${cy}`;
    if (!gameState.chunks.has(key)) {
        gameState.chunks.set(key, generateChunk(cx, cy));
    }
    return gameState.chunks.get(key);
}

function getTile(x, y) {
    const cx = Math.floor(x / CHUNK_SIZE);
    const cy = Math.floor(y / CHUNK_SIZE);
    const chunk = getChunk(cx, cy);
    const lx = x % CHUNK_SIZE;
    const ly = y % CHUNK_SIZE;
    return chunk.tiles[lx]?.[ly] || null;
}

// Sistema de logros
function checkAchievements() {
    for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
        if (!gameState.achievements[id] && achievement.condition(gameState)) {
            gameState.achievements[id] = true;
            gameState.unlockedAchievements.push(achievement);
            addNotification(`🏆 Logro desbloqueado: ${achievement.name}`, 'success');
        }
    }
}

// Sistema de misiones
function checkMissions() {
    const mission = gameState.missions[gameState.currentMission];
    if (!mission || mission.completed) return;
    
    let completed = false;
    switch(mission.id) {
        case 'tutorial_1':
            completed = gameState.buildings.some(b => b.type === 'drill');
            break;
        case 'tutorial_2':
            completed = (gameState.inventory.ironIngot || 0) >= 10;
            break;
        case 'tutorial_3':
            completed = gameState.buildings.some(b => b.type === 'belt');
            break;
        case 'tutorial_4':
            completed = gameState.research['steam_engine'];
            break;
        case 'tutorial_5':
            completed = gameState.buildings.some(b => b.type === 'turret');
            break;
        case 'empaquetacion':
            completed = gameState.buildings.some(b => b.type === 'chest');
            break;
    }
    
    if (completed) {
        mission.completed = true;
        for (const [res, amount] of Object.entries(mission.reward)) {
            gameState.inventory[res] = (gameState.inventory[res] || 0) + amount;
        }
        addNotification(`✅ Misión completada: ${mission.name}`, 'success');
        
        // Siguiente misión
        const missionIds = Object.keys(gameState.missions);
        const currentIndex = missionIds.indexOf(gameState.currentMission);
        if (currentIndex < missionIds.length - 1) {
            gameState.currentMission = missionIds[currentIndex + 1];
        }
    }
}

// Tutorial
const TUTORIAL_STEPS = [
    { text: "¡Bienvenido a Amxmo! Usa WASD para mover la cámara.", condition: () => gameState.camera.x > 0 || gameState.camera.y > 0 },
    { text: "Haz clic en 'Perforadora' y colócala sobre un mineral de hierro.", condition: () => gameState.buildings.some(b => b.type === 'drill') },
    { text: "Coloca un horno para fundir el mineral en lingotes.", condition: () => gameState.buildings.some(b => b.type === 'furnace') },
    { text: "Usa cintas transportadoras para mover items automáticamente.", condition: () => gameState.buildings.some(b => b.type === 'belt') },
    { text: "Investiga 'Energía Eléctrica' en el maletín de emergencia (P).", condition: () => gameState.research['steam_engine'] },
    { text: "¡Defiende tu base! Los enemigos atacarán desde los bordes.", condition: () => gameState.stats.enemiesKilled > 0 }
];

function updateTutorial() {
    if (!gameState.tutorialActive || gameState.tutorialStep >= TUTORIAL_STEPS.length) return;
    
    const step = TUTORIAL_STEPS[gameState.tutorialStep];
    if (step.condition()) {
        gameState.tutorialStep++;
        if (gameState.tutorialStep < TUTORIAL_STEPS.length) {
            addNotification(`📖 ${TUTORIAL_STEPS[gameState.tutorialStep].text}`, 'info');
        } else {
            addNotification("🎉 ¡Tutorial completado! ¡Buena suerte!", 'success');
            gameState.tutorialActive = false;
        }
    }
}

// Menú principal
function showMainMenu() {
    gameState.gameMode = 'menu';
    const menuHTML = `
        <div id="main-menu" style="position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#0f0f13 0%,#1a1a30 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1000;">
            <h1 style="font-size:4rem;color:#00ff9d;text-shadow:0 0 20px rgba(0,255,157,0.5);margin-bottom:10px;">AMXMO</h1>
            <p style="color:#888;font-size:1.2rem;margin-bottom:40px;">Automation Factory Game</p>
            <div style="display:flex;flex-direction:column;gap:15px;width:300px;">
                <button onclick="startNewGame()" style="padding:15px;background:#00ff9d;border:none;border-radius:8px;color:#000;font-size:1.1rem;font-weight:bold;cursor:pointer;transition:all 0.2s;">🎮 Nueva Partida</button>
                <button onclick="loadGameMenu()" style="padding:15px;background:#00d2ff;border:none;border-radius:8px;color:#000;font-size:1.1rem;font-weight:bold;cursor:pointer;transition:all 0.2s;">📂 Cargar Partida</button>
                <button onclick="showTutorial()" style="padding:15px;background:#ffa502;border:none;border-radius:8px;color:#000;font-size:1.1rem;font-weight:bold;cursor:pointer;transition:all 0.2s;">📖 Tutorial</button>
                <button onclick="showOptions()" style="padding:15px;background:#78909c;border:none;border-radius:8px;color:#fff;font-size:1.1rem;font-weight:bold;cursor:pointer;transition:all 0.2s;">⚙️ Opciones</button>
            </div>
            <p style="color:#555;margin-top:40px;font-size:0.9rem;">v2.0 - Todos los sistemas implementados</p>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);
}

function startNewGame() {
    const menu = document.getElementById('main-menu');
    if (menu) menu.remove();
    gameState.gameMode = 'playing';
    gameState.tutorialActive = true;
    addNotification("📖 " + TUTORIAL_STEPS[0].text, 'info');
}

function loadGameMenu() {
    if (loadGame()) {
        const menu = document.getElementById('main-menu');
        if (menu) menu.remove();
        gameState.gameMode = 'playing';
    }
}

function showTutorial() {
    gameState.tutorialActive = true;
    gameState.tutorialStep = 0;
    startNewGame();
}

function showOptions() {
    addNotification("⚙️ Opciones: Implementación pendiente", 'warning');
}

// Exportar funciones necesarias
window.gameState = gameState;
window.getTile = getTile;
window.getChunk = getChunk;
window.checkAchievements = checkAchievements;
window.checkMissions = checkMissions;
window.updateTutorial = updateTutorial;
window.showMainMenu = showMainMenu;
window.startNewGame = startNewGame;
window.BIOMES = BIOMES;
