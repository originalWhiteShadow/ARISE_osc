# Roadmap & Implementation Plan for ARISE OSC Website

## Analysis of `implementation.md`

**Theme & Vision**
The document outlines a highly immersive, interactive "Lucid Dream Interface". The goal is to create a sense of entering a conscious, responsive ecosystem rather than a standard multi-page website (Consciousness + Dreamscape + Lucid Control). 

**Key Requirements & Features**
- **Scene-Based Architecture:** Persistent 3D/animated world layer with React components acting as the UI layer. 
- **Lucidity System:** Users interact to gain states (Dream -> Aware -> Lucid), unlocking clearer UI and controls.
- **Pages / Layers:** Landing (Awakening), Ecosystem (Map), Projects (Entities), Ideas (Seeds), Community (Presence), Auth (Portal), Profile, Connect/Blog (Knowledge Orbs).
- **Stated Tech Stack:** Next.js (App Router), Three.js/WebGL, Zustand, Firebase, Framer Motion/GSAP.

> [!NOTE]
> Based on your confirmation, we will migrate the existing Vite application to use **Next.js App Router** and **Three.js** to fully realize the vision in the specification, and use **Firebase** as the backend layer.

---

## Implementation Roadmap

Based on the spec, here are the sequential phases for development:

### Phase 1: Foundation & Landing
- Setup persistent 3D/particle world layer separate from the UI layer.
- Build the "Awakening" landing page with portal transitions.
- Establish the soft, dimensional CSS theme (dark blue/purple, glow, blur).

### Phase 2: Ecosystem View & Navigation
- Build the zoomable/pannable Universe Map for projects and contributors.
- Create contextual, portal-like navigation (no static navbar where possible).

### Phase 3: Core Entities (Projects & Ideas)
- Create Projects Gallery (Floating entities, not cards).
- Build the Project Details ("Inner Mind" view) with 3D/2D panels.
- Build Ideas platform (growing "seeds" to proposals).

### Phase 4: Users & Community Realtime
- Implement the "Portal" Auth experience.
- Build Personal Consciousness profiles (nodes/skills graph).
- Create the Community page showing live presence and actions.

### Phase 5: Knowledge Layer (Blog)
- Add admin-only publishing capabilities.
- Build the Insight Orbs listing page and immersive reading mode.

### Phase 6: Lucidity System & Polish
- Wire Zustand/context to track user engagement (idle vs active, hover).
- Adjust animation speed, blur, and structure based on user's Lucidity score.

### Phase 7: Optimization
- Progressive loading of WebGL/heavy assets.
- Accessibility passes (contrast, keyboard navigation over canvas).

## Verification Plan

### Automated Tests
- Build success and linter checks (`npm run build`).

### Manual Verification
- Visual confirmation of the persistent world background across route changes.
- Interaction checks (hover states, idle states) matching the "consciousness" requirements.
- Responsiveness and frame-rate checks on various views.
