# Documentación Técnica - Amxmo

> Guía completa para desarrolladores que trabajan en el proyecto.

## 📚 Índice

1. [Arquitectura General](#arquitectura-general)
2. [Sistemas del Juego](#sistemas-del-juego)
3. [Generación de Mundo](#generación-de-mundo)
4. [Renderizado](#renderizado)
5. [Sistemas de Red](#sistemas-de-red)
6. [IA y Enemigos](#ia-y-enemigos)
7. [Testing](#testing)
8. [Optimización](#optimización)

---

## Arquitectura General

### Estado del Juego

```javascript
const gameState = {
    // Recursos del jugador
    inventory: { ironOre: 50, ironIngot: 0, ... },
    
    // Mundo
    map: [],           // Matriz 2D de Tiles
    buildings: [],     // Array de Building
    items: [],         // Array de Item
    enemies: [],       // Array de Enemy
    trains: [],        // Array de Train
    robots: [],        // Array de LogisticRobot
    
    // Estado de juego
    selection: null,           // Edificio seleccionado
    selectionRotation: 0,      // Rotación (0-3)
    deleteMode: false,         // Modo demolición
    hoverTile: null,           // Tile bajo el mouse
    time: 0,                   // Ciclo día/noche (0-100)
    camera: { x: 0, y: 0 },    // Posición de cámara
    
    // Investigación
    research: { steam_engine: false, ... },
    
    // Logros y estadísticas
    achievements: {},
    stats: { buildingsBuilt: 0, enemiesKilled: 0, ... },
    
    // Sistemas
    circuitNetworks: [],
    nextCircuitId: 1,
    nextTrainId: 1,
    
    // Game loop
    gameTick: 0,
    gameMode: 'menu'  // menu, playing, paused
};
```

### Game Loop

```javascript
function gameLoop() {
    updateLogic();      // Actualizar estado del juego
    render();           // Renderizar al canvas
    renderMinimap();    // Actualizar minimapa
    updateUI();         // Actualizar interfaz DOM
    requestAnimationFrame(gameLoop);
}
```

### Clases Principales

#### Tile
```javascript
class Tile {
    constructor(x, y, resourceType = null, biome = 'GRASSLAND') {
        this.x = x;
        this.y = y;
        this.resourceType = resourceType;  // null, 'ironOre', 'coal', etc.
        this.biome = biome;                // 'GRASSLAND', 'DESERT', etc.
        this.discovered = false;
    }
}
```

#### Building
```javascript
class Building {
    constructor(x, y, type, direction = 0) {
        this.x = x;
        this.y = y;
        this.type = type;              // 'drill', 'furnace', etc.
        this.direction = direction;    // 0=N, 1=E, 2=S, 3=W
        
        // Estado
        this.health = 100;
        this.destroyed = false;
        this.lastActive = 0;
        
        // Combustible
        this.fuel = 0;
        this.maxFuel = 1000;
        this.needsFuel = false;
        
        // Electricidad
        this.powerNetwork = null;
        this.powerProduction = 0;
        this.powerConsumption = 0;
        
        // Inventario
        this.inventory = {};
        this.maxInventory = 0;
        
        // Circuitos
        this.circuitNetwork = null;
    }
}
```

---

## Sistemas del Juego

### Sistema de Investigación

```javascript
const TECHNOLOGY = {
    'electricity': {
        name: "Energía Eléctrica",
        cost: { 'copperIngot': 10, 'ironIngot': 10 },
        unlocks: ['steam_engine', 'pole']
    },
    // ...
};

function unlockTechnology(techId) {
    const tech = TECHNOLOGY[techId];
    // Verificar recursos
    // Descontar costos
    // Desbloquear edificios
    tech.unlocks.forEach(u => gameState.research[u] = true);
}
```

### Sistema de Crafting

```javascript
const RECIPES = {
    'ironIngot': { cost: { 'ironOre': 1 }, time: 2000 },
    'gear': { cost: { 'ironIngot': 2 }, time: 1000 },
    // ...
};

function craftItem(product) {
    const recipe = RECIPES[product];
    // Verificar recursos
    // Descontar materiales
    // Añadir producto
}
```

### Sistema de Construcción

```javascript
const COSTS = {
    'drill': { 'ironOre': 10 },
    'furnace': { 'stone': 10 },
    // ...
};

function placeBuilding(x, y) {
    const type = gameState.selection;
    const cost = COSTS[type];
    
    // Validaciones:
    // - Recursos suficientes
    // - Posición válida (no edificios existentes)
    // - Terreno apropiado (ej: pumpjack sobre oil)
    
    // Crear edificio
    const building = new Building(x, y, type, gameState.selectionRotation);
    gameState.buildings.push(building);
    
    // Actualizar estadísticas
    gameState.stats.buildingsBuilt++;
    checkAchievements();
}
```

---

## Generación de Mundo

### Ruido Simplex

```javascript
class SimplexNoise {
    constructor() {
        // Permutación pseudoaleatoria
        this.p = new Uint8Array(256);
        // ...
    }
    
    noise2D(x, y) {
        // Algoritmo de ruido Simplex 2D
        // Retorna valor entre -1 y 1
    }
}
```

### Generación de Biomas

```javascript
function getBiome(x, y) {
    // Múltiples octavas de ruido
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
    
    // Determinar bioma basado en parámetros
    if (elevation > 0.3) return 'VOLCANIC';
    if (temperature < -0.3) return 'TUNDRA';
    if (moisture < -0.3) return 'DESERT';
    if (moisture > 0.3 && temperature > 0) return 'FOREST';
    return 'GRASSLAND';
}
```

### Distribución de Recursos

```javascript
const BIOMES = {
    GRASSLAND: {
        resources: { ironOre: 0.05, copperOre: 0.05, coal: 0.08, stone: 0.05 }
    },
    DESERT: {
        resources: { ironOre: 0.03, copperOre: 0.08, oil: 0.15, uraniumOre: 0.01 }
    },
    // ...
};

function getResourceForBiome(biome, x, y) {
    const biomeData = BIOMES[biome];
    const rand = Math.random();
    const noiseVal = noise.noise2D(x * 0.1, y * 0.1);
    const adjustedRand = (rand + noiseVal * 0.3 + 1) / 2;
    
    // Distribución acumulativa
    let cumulative = 0;
    for (const [res, chance] of Object.entries(biomeData.resources)) {
        cumulative += chance;
        if (adjustedRand < cumulative) return res;
    }
    
    // Ríos
    if (Math.abs(noise.noise2D(x * 0.05, y * 0.05)) < 0.08) {
        return 'water';
    }
    
    return null;
}
```

---

## Renderizado

### Canvas Principal

```javascript
function render() {
    // 1. Limpiar canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(-gameState.camera.x, -gameState.camera.y);
    
    // 2. Renderizar mapa
    renderMap();
    
    // 3. Renderizar edificios
    renderBuildings();
    
    // 4. Renderizar items
    renderItems();
    
    // 5. Renderizar enemigos
    renderEnemies();
    
    // 6. Renderizar trenes
    renderTrains();
    
    // 7. Efectos de overlay
    renderNightOverlay();
    
    ctx.restore();
}
```

### Renderizado de Sprites

```javascript
// Coordenadas en sprites.svg (cada sprite es 64x64)
const SPRITE_COORDS = {
    'ironOre': { sx: 0, sy: 0 },
    'copperOre': { sx: 64, sy: 0 },
    'drill': { sx: 0, sy: 192 },
    'furnace': { sx: 64, sy: 192 },
    // ...
};

function renderBuilding(building) {
    const px = building.x * TILE_SIZE;
    const py = building.y * TILE_SIZE;
    
    // Culling: solo renderizar si está visible
    if (px + TILE_SIZE < camera.x || px > camera.x + canvas.width ||
        py + TILE_SIZE < camera.y || py > camera.y + canvas.height) {
        return;
    }
    
    const coords = SPRITE_COORDS[building.type];
    ctx.drawImage(
        sprites,
        coords.sx, coords.sy, 64, 64,  // Source
        px, py, TILE_SIZE, TILE_SIZE   // Destination
    );
}
```

### Minimapa

```javascript
function renderMinimap() {
    const mmCanvas = document.getElementById('minimap-canvas');
    const mmCtx = mmCanvas.getContext('2d');
    const scaleX = mmCanvas.width / TILE_COUNT_X;
    const scaleY = mmCanvas.height / TILE_COUNT_Y;
    
    // Limpiar
    mmCtx.fillStyle = '#1a1a20';
    mmCtx.fillRect(0, 0, mmCanvas.width, mmCanvas.height);
    
    // Renderizar recursos
    for (let x = 0; x < TILE_COUNT_X; x++) {
        for (let y = 0; y < TILE_COUNT_Y; y++) {
            const tile = gameState.map[x][y];
            if (tile.resourceType) {
                mmCtx.fillStyle = RESOURCE_COLORS[tile.resourceType];
                mmCtx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);
            }
        }
    }
    
    // Viewport de cámara
    mmCtx.strokeStyle = '#fff';
    mmCtx.strokeRect(
        (camera.x / TILE_SIZE) * scaleX,
        (camera.y / TILE_SIZE) * scaleY,
        (canvas.width / TILE_SIZE) * scaleX,
        (canvas.height / TILE_SIZE) * scaleY
    );
}
```

---

## Sistemas de Red

### Red Eléctrica

```javascript
const powerGrids = [];

function updatePowerGrids() {
    // 1. Resetear redes
    powerGrids.length = 0;
    gameState.buildings.forEach(b => b.powerNetwork = null);
    
    // 2. Encontrar postes conectados (flood fill)
    const poles = gameState.buildings.filter(b => b.type === 'pole');
    // ...
    
    // 3. Calcular oferta y demanda por red
    gameState.buildings.forEach(b => {
        if (b.powerNetwork) {
            const grid = powerGrids[b.powerNetwork];
            if (b.maxPowerProduction > 0) {
                grid.supply += b.maxPowerProduction;
            }
            if (b.basePowerConsumption > 0) {
                grid.demand += b.basePowerConsumption;
            }
        }
    });
}
```

### Red de Circuitos

```javascript
class CircuitNetwork {
    constructor(id) {
        this.id = id;
        this.signals = {};  // { itemType: count }
        this.buildings = [];
    }
    
    addSignal(item, count) {
        if (!this.signals[item]) this.signals[item] = 0;
        this.signals[item] += count;
    }
    
    reset() {
        this.signals = {};
    }
}

function updateCircuitNetworks() {
    gameState.circuitNetworks.forEach(net => net.reset());
    
    // Leer señales de cofres, tanques, etc.
    gameState.buildings.forEach(b => {
        if (b.circuitNetwork && b.inventory) {
            const network = gameState.circuitNetworks.find(n => n.id === b.circuitNetwork);
            for (const [item, count] of Object.entries(b.inventory)) {
                network.addSignal(item, count);
            }
        }
    });
}
```

---

## IA y Enemigos

### Tipos de Enemigos

```javascript
class Enemy {
    constructor(x, y, type = 'biter') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        // Stats según tipo
        switch(type) {
            case 'biter':
                this.health = 50;
                this.speed = 0.02;
                this.damage = 10;
                this.attackRange = 1;
                break;
            case 'spitter':
                this.health = 30;
                this.speed = 0.015;
                this.damage = 5;
                this.attackRange = 3;
                break;
            case 'behemoth':
                this.health = 100;
                this.speed = 0.01;
                this.damage = 20;
                this.attackRange = 1;
                break;
        }
    }
}
```

### Comportamiento de Enemigos

```javascript
function updateEnemies() {
    gameState.enemies.forEach(enemy => {
        // Encontrar objetivo más cercano (hub o torreta)
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
            // Mover hacia objetivo
            const dx = Math.sign(nearest.x - enemy.x);
            const dy = Math.sign(nearest.y - enemy.y);
            enemy.x += dx * enemy.speed;
            enemy.y += dy * enemy.speed;
            
            // Atacar si está cerca
            if (nearestDist < enemy.attackRange) {
                nearest.health -= enemy.damage;
                if (nearest.health <= 0) {
                    nearest.destroyed = true;
                }
            }
        }
    });
}
```

### Spawning de Enemigos

```javascript
function spawnEnemies() {
    // Oleadas cada cierto tiempo
    if (gameState.gameTick % 1000 === 0) {
        gameState.waveNumber++;
        const enemyCount = Math.min(5 + gameState.waveNumber, 20);
        
        for (let i = 0; i < enemyCount; i++) {
            // Spawn en bordes del mapa
            const edge = Math.floor(Math.random() * 4);
            let ex, ey;
            switch(edge) {
                case 0: ex = 0; ey = Math.random() * TILE_COUNT_Y; break;
                case 1: ex = TILE_COUNT_X - 1; ey = Math.random() * TILE_COUNT_Y; break;
                case 2: ex = Math.random() * TILE_COUNT_X; ey = 0; break;
                case 3: ex = Math.random() * TILE_COUNT_X; ey = TILE_COUNT_Y - 1; break;
            }
            
            // Tipo según oleada
            let type = 'biter';
            if (gameState.waveNumber > 5) type = Math.random() > 0.5 ? 'spitter' : 'biter';
            if (gameState.waveNumber > 10) type = 'behemoth';
            
            gameState.enemies.push(new Enemy(ex, ey, type));
        }
        
        addNotification(`⚠️ Oleada ${gameState.waveNumber} de enemigos!`, 'warning');
    }
}
```

---

## Testing

### Estructura de Tests

```javascript
// test_client.mjs
const steps = [
    { 
        description: "Cheat Resources", 
        buttons: ["p"], 
        frames: 10 
    },
    { 
        description: "Select Building", 
        click_selector: "#btn-nuclear-reactor", 
        frames: 10 
    },
    { 
        description: "Place Building", 
        buttons: ["left_mouse_button"], 
        mouse_x: 400, 
        mouse_y: 300, 
        frames: 10 
    }
];
```

### Hooks de Testing

```javascript
// Exponer estado para tests
window.render_game_to_text = function() {
    return JSON.stringify({
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
    });
};

window.advanceTime = function(ms) {
    const steps = Math.floor(ms / 16);
    for(let i = 0; i < steps; i++) {
        updateLogic();
    }
};
```

---

## Optimización

### Culling (Renderizado Selectivo)

```javascript
function shouldRender(x, y, width, height) {
    return !(x + width < camera.x || 
             x > camera.x + canvas.width ||
             y + height < camera.y || 
             y > camera.y + canvas.height);
}

// Uso
if (!shouldRender(px, py, TILE_SIZE, TILE_SIZE)) return;
```

### Sistema de Chunks (Preparado)

```javascript
class Chunk {
    constructor(cx, cy) {
        this.cx = cx;           // Coordenadas de chunk
        this.cy = cy;
        this.tiles = [];        // Tiles en este chunk
        this.buildings = [];    // Edificios en este chunk
        this.items = [];        // Items en este chunk
        this.active = false;    // Si está cargado en memoria
    }
}

// Generación diferida
function getChunk(cx, cy) {
    const key = `${cx},${cy}`;
    if (!gameState.chunks.has(key)) {
        gameState.chunks.set(key, generateChunk(cx, cy));
    }
    return gameState.chunks.get(key);
}
```

### Consejos de Rendimiento

1. **Minimizar draw calls**: Agrupar renderizado por tipo
2. **Object pooling**: Reutilizar objetos en lugar de crear/eliminar
3. **Dirty rectangles**: Solo redibujar lo que cambió
4. **Web Workers**: Para generación de mundo en background
5. **Canvas offscreen**: Para precálculo de elementos estáticos

---

## Referencias Rápidas

### Constantes Importantes

```javascript
TILE_SIZE = 64;           // Tamaño de tile en píxeles
TILE_COUNT_X = 100;       // Ancho del mundo en tiles
TILE_COUNT_Y = 100;       // Alto del mundo en tiles
CHUNK_SIZE = 16;          // Tamaño de chunk en tiles
```

### Eventos del Juego

```javascript
// Input
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
document.addEventListener('keydown', handleKeyDown);

// Game state changes
addNotification(message, type);     // type: 'info', 'success', 'warning', 'error'
checkAchievements();                // Verificar logros
checkMissions();                    // Verificar misiones
updateUI();                         // Actualizar interfaz
```

### Utilidades

```javascript
// Distancia Manhattan
function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

// Aleatorio en rango
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Clamp
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
```

---

**Documentación versión 2.0** - Actualizada con todos los sistemas implementados.
