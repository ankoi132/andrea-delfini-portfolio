# Andrea Delfini — Ingegnere di Turbine e Generatori

Cinematic single-page landing site for Andrea Delfini, a turbine and generator engineer.

## Tech Stack

- **React 18** + **Vite 5** — modern frontend tooling
- **@react-three/fiber** + **@react-three/drei** — declarative Three.js in React
- **@react-three/postprocessing** — bloom & glow effects
- **GSAP** + **ScrollTrigger** — scroll-driven and entrance animations

## Features

- 🌀 Procedural 3D turbine model assembled at page load
- ✨ Scroll-driven turbine rotation and scale
- ⚡ Floating electric particle field
- 🎞️ Cinematic scanline overlay
- 📱 Mobile-responsive with touch support
- 🌑 Dark industrial color palette

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Color Palette

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Steel | `#8b9bb4` |
| Electric Blue | `#0099ff` |
| Bright Blue | `#00d4ff` |

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx          # Main hero section with text overlay
│   ├── TurbineScene.jsx  # R3F Canvas wrapper + lighting
│   ├── TurbineModel.jsx  # Procedural turbine geometry + animations
│   ├── Particles.jsx     # Floating electric spark particles
│   └── ScanlineOverlay.jsx # CSS scanline cinematic effect
├── App.jsx
├── main.jsx
└── index.css
```
