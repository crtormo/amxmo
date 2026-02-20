# Amxmo - Factorio-like Automation Game

Un juego de automatización y fábrica inspirado en Factorio, construido con JavaScript vanilla y HTML5 Canvas.

![Versión](https://img.shields.io/badge/versión-2.0-success)
![Tecnología](https://img.shields.io/badge/tecnología-HTML5%20Canvas-blue)
![Estado](https://img.shields.io/badge/estado-activo-brightgreen)

## 🎮 Características

### Sistemas Implementados

- **🔬 Sistema de Investigación** - 13 tecnologías para desbloquear
- **⚡ Red Eléctrica** - Postes, generadores, paneles solares, reactores nucleares
- **🚂 Trenes** - Estaciones y sistema de transporte automático
- **🔌 Circuitos Lógicos** - Redes de señales para automatización avanzada
- **🌍 Biomas** - 5 tipos de terreno con recursos específicos
- **🏆 Logros** - 12 logros desbloqueables
- **💾 Guardar/Cargar** - Persistencia con localStorage
- **🗺️ Minimapa** - Vista general del mundo en tiempo real
- **⚔️ Defensa** - Torretas y muros contra enemigos
- **🤖 Robots** - Sistema logístico con robopuertos

### Recursos (15+)

| Tipo | Recursos |
|------|----------|
| **Básicos** | Hierro, Cobre, Carbón, Piedra, Madera, Arena |
| **Procesados** | Lingotes, Acero, Plástico, Vidrio, Hormigón |
| **Componentes** | Engranajes, Cables, Circuitos, Baterías |
| **Nuclear** | Uranio, Celdas de combustible |
| **Militar** | Pólvora, Munición, Cohetes |

### Biomas

| Bioma | Color | Recursos Principales |
|-------|-------|---------------------|
| **Pradera** | 🟢 Verde | Balanceado |
| **Desierto** | 🟡 Arena | Cobre, Petróleo |
| **Bosque** | 🌲 Verde oscuro | Carbón |
| **Tundra** | ❄️ Blanco | Hierro, Carbón |
| **Volcánico** | 🟤 Marrón | Hierro, Cobre, Piedra |

## 🚀 Cómo Jugar

### Inicio Rápido

```bash
# Clonar o navegar al directorio
cd amxmo

# Iniciar servidor
./start_server.sh

# Abrir navegador en http://localhost:8000
```

### Controles

| Tecla | Acción |
|-------|--------|
| `Click Izquierdo` | Colocar edificio / Seleccionar |
| `R` | Rotar edificio |
| `X` | Modo demolición |
| `WASD` | Mover cámara |
| `F5` | Guardar partida |
| `F9` | Cargar partida |
| `P` | Trucos (recursos) |

### Primeros Pasos

1. Haz clic en "🎮 Nueva Partida" en el menú principal
2. Selecciona "Perforadora" y colócala sobre un mineral de hierro
3. Coloca un horno cerca para fundir el mineral
4. Usa cintas transportadoras para mover items automáticamente
5. Investiga "Energía Eléctrica" en el maletín de emergencia
6. Construye torretas para defenderte de los enemigos

## 🏆 Logros

| Logro | Descripción |
|-------|-------------|
| 🏗️ Primeros Pasos | Coloca tu primer edificio |
| ⛏️ Minero | Extrae 100 minerales |
| 🏭 Revolución Industrial | Construye 50 edificios |
| 🔬 Científico | Desbloquea 5 tecnologías |
| ⚔️ Guerrero | Elimina 10 enemigos |
| ⚡ Electricista | Genera 1MW de energía |
| 📦 Logístico | Transporta 1000 items |
| ☢️ Energía Atómica | Construye un reactor nuclear |
| 🚂 Ferroviario | Construye una estación de tren |
| 🛡️ Defensor | Sobrevive 10 oleadas |
| 💰 Millonario | Acumula 1M de recursos |
| 🌍 Explorador | Descubre todos los biomas |

## 🛠️ Desarrollo

### Estructura del Proyecto

```
amxmo/
├── index.html          # UI principal
├── script.js           # Lógica del juego (~1800 líneas)
├── style.css           # Estilos con tema oscuro
├── sprites.svg         # Sprites cúbicos 64x64
├── test_client.mjs     # Tests con Playwright
└── start_server.sh     # Servidor de desarrollo
```

### Tecnologías

- **Frontend**: Vanilla JavaScript (ES6+), HTML5 Canvas, CSS3
- **Gráficos**: SVG con estilo cúbico/isométrico
- **Testing**: Playwright para automatización de pruebas
- **Servidor**: Python http.server

### Tests

```bash
# Ejecutar tests de Playwright
node test_client.mjs --url http://localhost:8000 --iterations 3

# Con escenarios personalizados
node test_client.mjs --url http://localhost:8000 --actions-file test_nuclear.json
```

## 📝 Changelog

### v2.0 - Sistemas Avanzados
- ✅ Sistema de biomas con 5 tipos de terreno
- ✅ Menú principal profesional
- ✅ 12 logros desbloqueables
- ✅ Sprites cúbicos de alta resolución (64x64)
- ✅ Sistema de trenes funcional
- ✅ Circuitos lógicos
- ✅ Minimapa en tiempo real
- ✅ Panel de estadísticas

### v1.5 - Energía Nuclear
- ✅ Recurso de uranio
- ✅ Centrífuga
- ✅ Reactor nuclear
- ✅ Sistema de guardado/carga

### v1.0 - Lanzamiento
- ✅ Sistema de construcción
- ✅ Líneas de producción
- ✅ Investigación tecnológica
- ✅ Enemigos y defensa

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Las contribuciones son bienvenidas:

1. Fork del repositorio
2. Crea una rama para tu feature
3. Commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Proyecto de código abierto. Libre uso y modificación.

---

**¡Disfruta construyendo tu fábrica!** 🏭✨
