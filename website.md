# 🚀 GROR MARKETING — Complete 3D Premium Website Master Prompt

> **Build Exact Design Replica with Advanced 3D Particle Sphere, Cursor Interactions & Premium Animations**

---

## TABLE OF CONTENTS

1. [Visual Reference Analysis](#visual-reference-analysis)
2. [Color Palette & Design System](#color-palette--design-system)
3. [Hero Section Specifications](#hero-section-specifications)
4. [3D Background System](#3d-background-system)
5. [Navigation & Header](#navigation--header)
6. [Floating Sidebar](#floating-sidebar)
7. [Stats Bar & Metrics](#stats-bar--metrics)
8. [Animation Specifications](#animation-specifications)
9. [Technology Stack](#technology-stack)
10. [Component Architecture](#component-architecture)
11. [Advanced Features](#advanced-features)
12. [Deployment Instructions](#deployment-instructions)

---

## VISUAL REFERENCE ANALYSIS

### Reference Image Breakdown

The design shows:
- **Light purple-tinted white background** (`#F8F8FF`)
- **Left-aligned dark hero text** with gradient accent
- **Right-side 3D particle sphere** with rotating animation
- **Floating purple contact sidebar** on far right
- **Fixed navigation header** with transparent → white transition
- **Stats bar** with glassmorphism effect
- **Cursor-reactive particles** that respond to mouse movement

### Key Design Principles

- **Premium luxury feel** — smooth, refined, high-polish
- **Light aesthetic** — NOT dark mode, light background with colored accents
- **3D focal point** — particle sphere is the visual hero
- **Micro-interactions** — everything responds to hover/scroll
- **Typography-first** — large impactful headlines
- **Performance-optimized** — 60fps animations, smooth scrolling

---

## COLOR PALETTE & DESIGN SYSTEM

### Primary Colors

```css
:root {
  /* Background */
  --bg-primary: #F8F8FF;           /* Light purple-white */
  --bg-secondary: #FAFAFA;         /* Slightly darker white */
  --bg-dark: #F3F0FF;              /* Very light purple */
  
  /* Text */
  --text-primary: #0D0D1A;         /* Near black */
  --text-secondary: #64748B;       /* Slate gray */
  --text-light: #A0AEC0;           /* Light gray */
  
  /* Accents */
  --accent-purple: #5B21B6;        /* Deep purple (CTAs, buttons) */
  --accent-light-purple: #8B5CF6;  /* Medium purple */
  --accent-pink: #EC4899;          /* Magenta pink */
  --accent-blue: #3B82F6;          /* Bright blue */
  --accent-gold: #D8B4A0;          /* Copper/gold (gradients) */
  --accent-peach: #F5E6D8;         /* Light peach (CTA bg) */
  
  /* Sphere Colors */
  --particle-purple: #8B5CF6;
  --particle-pink: #EC4899;
  --particle-blue: #3B82F6;
}
```

### Gradient System

```css
/* Hero Title Gradient */
--gradient-hero: linear-gradient(
  135deg,
  #C084FC 0%,
  #D8B4A0 100%
);

/* CTA Button Gradient */
--gradient-cta: linear-gradient(
  135deg,
  #7C3AED 0%,
  #5B21B6 100%
);

/* Particle Sphere Glow */
--gradient-glow: radial-gradient(
  circle,
  rgba(139, 92, 246, 0.3) 0%,
  rgba(139, 92, 246, 0.1) 50%,
  transparent 100%
);
```

---

## HERO SECTION SPECIFICATIONS

### Layout Grid

```
Hero Container:
├─ Left Column (60% width)
│  ├─ Badge
│  ├─ Headline (3 lines)
│  ├─ Subtext
│  ├─ CTA Buttons (2)
│  └─ Stats Bar (glassmorphism)
│
└─ Right Column (40% width)
   └─ 3D Particle Sphere (Three.js)
```

### Badge Component

```html
<!-- Design -->
<div class="hero-badge">
  <span class="star-icon">★</span>
  <span>REAL ESTATE MARKETING EXPERTS</span>
</div>

<!-- Styles -->
{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 50px;
  color: #64748B;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 32px;
}

/* Star icon color */
.star-icon {
  color: #EC4899;
  font-size: 14px;
}

/* Animation */
@keyframes badgePulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.8; }
}
animation: badgePulse 2s ease-in-out infinite;
```

### Headline Component

```html
<!-- Structure -->
<h1 class="hero-title">
  We Build High-Converting<br>
  <span class="gradient-text">Digital Growth Systems</span><br>
  For Real Estate Brands
</h1>

<!-- Styles -->
{
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(42px, 7vw, 72px);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -1px;
  color: #0D0D1A;
  margin-bottom: 24px;
}

/* Gradient text line */
.gradient-text {
  background: linear-gradient(135deg, #C084FC 0%, #D8B4A0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientFlow 4s ease infinite;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Staggered line animation on load */
.hero-title {
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Subtext Component

```html
<!-- Structure -->
<p class="hero-subtext">
  Performance marketing, automation & data-driven strategies
  that generate qualified leads, increase sales, and maximize ROI.
</p>

<!-- Styles -->
{
  font-size: 16px;
  line-height: 1.6;
  color: #64748B;
  max-width: 520px;
  margin-bottom: 32px;
  font-weight: 400;
}

animation: fadeIn 0.8s ease 1.3s forwards;
opacity: 0;

@keyframes fadeIn {
  to { opacity: 1; }
}
```

### CTA Buttons

```html
<!-- Structure -->
<div class="cta-button-group">
  <button class="btn btn-primary">
    <span>📞</span> Book Free Strategy Call
  </button>
  <button class="btn btn-secondary">
    Explore Our Services <span>→</span>
  </button>
</div>

<!-- Primary Button Styles -->
.btn-primary {
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 700;
  padding: 14px 32px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(123, 58, 237, 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255,255,255,0.2) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.btn-primary:hover::before {
  transform: translateX(100%);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(123, 58, 237, 0.4);
}

.btn-primary:active {
  transform: scale(0.98);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  border: 1.5px solid #0D0D1A;
  color: #0D0D1A;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #0D0D1A;
  color: #FFFFFF;
  transform: translateY(-4px);
}

/* Animation on load */
.cta-button-group {
  display: flex;
  gap: 16px;
  animation: fadeUp 0.8s ease 1.5s forwards;
  opacity: 0;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Stats Bar Component

```html
<!-- Structure -->
<div class="stats-bar">
  <div class="stat-item">
    <div class="stat-icon">📊</div>
    <div class="stat-value">₹250Cr+</div>
    <div class="stat-label">Revenue Generated</div>
  </div>
  <div class="stat-item">
    <div class="stat-icon">👥</div>
    <div class="stat-value">10,000+</div>
    <div class="stat-label">Qualified Leads</div>
  </div>
  <div class="stat-item">
    <div class="stat-icon">📈</div>
    <div class="stat-value">4.6X</div>
    <div class="stat-label">Avg. ROAS</div>
  </div>
  <div class="stat-item">
    <div class="stat-icon">⭐</div>
    <div class="stat-value">98%</div>
    <div class="stat-label">Client Retention</div>
  </div>
</div>

<!-- Styles -->
.stats-bar {
  position: absolute;
  bottom: 40px;
  left: 64px;
  width: 580px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 24px 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.7s forwards;
  opacity: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-icon {
  font-size: 24px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #5B21B6;
  font-family: 'Space Mono', monospace;
}

.stat-label {
  font-size: 12px;
  color: #64748B;
  font-weight: 500;
}

/* Counter animation */
@keyframes countUp {
  from { content-visibility: auto; }
  to { content-visibility: auto; }
}
```

---

## 3D BACKGROUND SYSTEM

### Overview

The 3D particle sphere is the centerpiece of the hero section. It uses **Three.js** with **React Three Fiber** for optimal performance and integration.

### Three.js Implementation

```javascript
// ==== SCENE SETUP ====
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

export function ParticleSphere({ mousePosition }) {
  const groupRef = useRef();
  const particlesRef = useRef();
  
  // Scene configuration
  const PARTICLE_COUNT = 2000;
  const SPHERE_RADIUS = 280;
  const COLORS = [
    new THREE.Color('#8B5CF6'),  // Purple
    new THREE.Color('#EC4899'),  // Pink
    new THREE.Color('#3B82F6'),  // Blue
  ];

  useEffect(() => {
    // === Create particles using Fibonacci sphere ===
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Fibonacci sphere algorithm for even distribution
      const phi = Math.acos(1 - 2 * i / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      // Convert to cartesian coordinates
      const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = SPHERE_RADIUS * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color based on distance from center
      const distance = Math.sqrt(x * x + y * y + z * z);
      let colorIndex;
      
      if (distance < SPHERE_RADIUS * 0.4) {
        colorIndex = 0; // Purple (inner)
      } else if (distance < SPHERE_RADIUS * 0.7) {
        colorIndex = 1; // Pink (middle)
      } else {
        colorIndex = 2; // Blue (outer)
      }
      
      const color = COLORS[colorIndex];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material with point rendering
    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
    });
    
    const points = new THREE.Points(geometry, material);
    groupRef.current.add(points);
    particlesRef.current = { geometry, material, points };
    
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // === Animation loop ===
  useFrame(({ mouse }) => {
    if (!groupRef.current) return;
    
    // Continuous rotation
    groupRef.current.rotation.y += 0.0008;
    
    // Mouse interaction
    const mouseInfluence = {
      x: (mouse.x * 0.5) * 0.1,
      y: (mouse.y * 0.5) * 0.1,
    };
    
    // Smooth tilt toward cursor
    groupRef.current.rotation.x += 
      (mouseInfluence.y - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z += 
      (mouseInfluence.x - groupRef.current.rotation.z) * 0.04;
    
    // Particle position distortion on cursor proximity
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        
        // Distance from cursor influence
        const distFromMouse = Math.sqrt(
          (mouse.x * window.innerWidth / 2 - x) ** 2 +
          (mouse.y * window.innerHeight / 2 - y) ** 2
        );
        
        if (distFromMouse < 300) {
          // Deflect particles away from cursor
          const force = (300 - distFromMouse) / 300;
          const angle = Math.atan2(y, x);
          
          positions[i * 3] += Math.cos(angle) * force * 0.5;
          positions[i * 3 + 1] += Math.sin(angle) * force * 0.5;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return <group ref={groupRef} />;
}
```

### Center Glow Circle

```jsx
export function SphereCenterGlow() {
  return (
    <>
      {/* Outer glow */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[180, 180, 2, 64]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner bright circle */}
      <mesh position={[0, 0, 10]}>
        <planeGeometry args={[120, 120]} />
        <meshBasicMaterial
          transparent
          opacity={0}
        />
      </mesh>
    </>
  );
}
```

### Canvas Configuration

```jsx
import { Canvas } from '@react-three/fiber';

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 800], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: '50%',
        height: '100%',
        background: 'transparent',
      }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[100, 100, 100]} intensity={0.8} />
      <ParticleSphere />
      <SphereCenterGlow />
    </Canvas>
  );
}
```

### Background Particle Scatter

```css
/* Subtle background particles scattered across viewport */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 15% 20%, rgba(139, 92, 246, 0.08) 1px, transparent 1px),
    radial-gradient(circle at 85% 80%, rgba(236, 72, 153, 0.06) 1.5px, transparent 1.5px),
    radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 25% 75%, rgba(139, 92, 246, 0.07) 1.2px, transparent 1.2px),
    radial-gradient(circle at 75% 25%, rgba(236, 72, 153, 0.06) 1px, transparent 1px);
  
  background-size: 
    200px 200px,
    300px 300px,
    250px 250px,
    280px 280px,
    220px 220px;
  
  background-position: 
    0 0,
    40px 60px,
    130px 270px,
    70px 100px,
    200px 50px;
  
  pointer-events: none;
  z-index: 1;
}
```

---

## NAVIGATION & HEADER

### Header Structure

```html
<!-- Fixed Navigation -->
<header class="main-header">
  <div class="header-container">
    <!-- Logo -->
    <div class="logo">
      <img src="logo.svg" alt="GROR Marketing">
    </div>
    
    <!-- Navigation Menu -->
    <nav class="main-nav">
      <a href="/" class="nav-item active">Home</a>
      <div class="nav-item dropdown-trigger">
        Services
        <span class="dropdown-arrow">▾</span>
        <!-- Dropdown menu -->
      </div>
      <div class="nav-item dropdown-trigger">
        Industries
        <span class="dropdown-arrow">▾</span>
      </div>
      <a href="#" class="nav-item">Case Studies</a>
      <a href="#" class="nav-item">About Us</a>
      <div class="nav-item dropdown-trigger">
        Insights
        <span class="dropdown-arrow">▾</span>
      </div>
      <a href="#" class="nav-item">Contact</a>
    </nav>
    
    <!-- CTA Button -->
    <button class="header-cta">
      Book Strategy Call
      <span class="arrow">→</span>
    </button>
  </div>
</header>
```

### Header Styles

```css
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 64px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
}

/* Initial transparent state */
.main-header:not(.scrolled) {
  background: transparent;
  backdrop-filter: none;
}

/* Scrolled state */
.main-header.scrolled {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(91, 33, 182, 0.1);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
}

/* Logo */
.logo img {
  height: 44px;
  width: auto;
  transition: transform 0.3s;
}

.logo:hover img {
  transform: scale(1.05);
}

/* Navigation */
.main-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.nav-item {
  font-size: 14px;
  font-weight: 500;
  color: #0D0D1A;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.main-header.scrolled .nav-item {
  color: #0D0D1A;
}

.nav-item:hover {
  color: #5B21B6;
  background: rgba(91, 33, 182, 0.08);
}

.dropdown-arrow {
  font-size: 12px;
  margin-left: 6px;
  transition: transform 0.3s;
}

.nav-item.dropdown-trigger:hover .dropdown-arrow {
  transform: rotate(180deg);
}

/* CTA Button in Header */
.header-cta {
  background: #F5E6D8;
  color: #2D1B69;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(245, 230, 216, 0.3);
}

.header-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 230, 216, 0.4);
  background: #F0DDD0;
}

.header-cta .arrow {
  font-size: 16px;
  transition: transform 0.3s;
}

.header-cta:hover .arrow {
  transform: translateX(4px);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 16px);
  left: 0;
  min-width: 280px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.nav-item.dropdown-trigger:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu a {
  display: block;
  padding: 10px 12px;
  color: #0D0D1A;
  text-decoration: none;
  font-size: 13px;
  border-radius: 6px;
  transition: all 0.3s;
}

.dropdown-menu a:hover {
  background: #F3F0FF;
  color: #5B21B6;
}
```

### Header Scroll Detection

```javascript
// Detect scroll and add .scrolled class
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
```

---

## FLOATING SIDEBAR

### Sidebar Structure

```html
<!-- Fixed Right Sidebar -->
<div class="floating-sidebar">
  <a href="tel:+91XXXXXXXXXX" class="sidebar-item" title="Call Us">
    <span class="item-icon">📞</span>
    <span class="item-label">Call Us</span>
  </a>
  
  <a href="https://wa.me/91XXXXXXXXXX" class="sidebar-item" title="WhatsApp">
    <span class="item-icon">💬</span>
    <span class="item-label">WhatsApp</span>
  </a>
  
  <a href="#book-call" class="sidebar-item" title="Book Call">
    <span class="item-icon">📅</span>
    <span class="item-label">Book Call</span>
  </a>
  
  <a href="mailto:info.gror@gmail.com" class="sidebar-item" title="Email">
    <span class="item-icon">✉️</span>
    <span class="item-label">Email Us</span>
  </a>
</div>

<!-- Chat Bubble (bottom right) -->
<div class="chat-bubble">
  <span class="chat-icon">💬</span>
</div>
```

### Sidebar Styles

```css
/* Floating Sidebar */
.floating-sidebar {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 12px;
}

.sidebar-item {
  width: 64px;
  height: 64px;
  background: #5B21B6;
  border-radius: 12px 0 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(91, 33, 182, 0.3);
  cursor: pointer;
}

.sidebar-item:hover {
  width: 140px;
  border-radius: 12px 0 0 12px;
}

.item-icon {
  font-size: 24px;
  transition: transform 0.3s;
}

.sidebar-item:hover .item-icon {
  flex-shrink: 0;
}

.item-label {
  position: absolute;
  right: 20px;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s 0.1s;
  white-space: nowrap;
}

.sidebar-item:hover .item-label {
  opacity: 1;
}

/* Chat Bubble */
.chat-bubble {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 4px 24px rgba(123, 58, 237, 0.4);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 998;
  animation: bounce 2s ease-in-out infinite;
}

.chat-bubble:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 32px rgba(123, 58, 237, 0.5);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

---

## STATS BAR & METRICS

### Animation Logic

```javascript
// Counter animation function
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const step = target / (duration / 16);
  let current = start;
  
  const animate = () => {
    current += step;
    if (current >= target) {
      current = target;
    } else {
      requestAnimationFrame(animate);
    }
    
    element.textContent = Math.floor(current).toLocaleString('en-IN');
  };
  
  animate();
}

// Trigger when stats bar enters viewport
const statsBar = document.querySelector('.stats-bar');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const values = entry.target.querySelectorAll('.stat-value');
      values.forEach((el, index) => {
        const target = parseInt(el.dataset.target);
        setTimeout(() => {
          animateCounter(el, target);
        }, index * 150);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

observer.observe(statsBar);
```

---

## ANIMATION SPECIFICATIONS

### Page Load Sequence

```javascript
// Timeline for entrance animations
const loadingTimeline = {
  // Loader
  0: 'Loader appears & starts progress',
  800: 'Loader progress reaches 100%',
  1200: 'Loader fades out',
  
  // Header
  1000: 'Header slides down with fade',
  
  // Hero section
  1100: 'Badge fades in & pulses',
  1200: 'First headline line slides up',
  1300: 'Second headline line (gradient) slides up',
  1400: 'Third headline line slides up',
  1500: 'Gradient animation starts',
  1600: 'Subtext fades in',
  1700: 'CTA buttons fade in & appear',
  1900: 'Stats bar slides up from bottom',
  2000: 'Particle sphere fades in',
  2100: 'Particle sphere rotation starts',
};

// Implement with GSAP or Framer Motion
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};
```

### Scroll Animations

```css
/* Fade in and slide up on scroll */
.reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
.reveal-child {
  transition-delay: calc(var(--index) * 0.1s);
}

/* Parallax effect */
.parallax-section {
  will-change: transform;
}

.parallax-element {
  transform: translateY(calc(var(--scroll) * var(--speed, 0.5) * 1px));
}
```

### Intersection Observer for Reveals

```javascript
// Use Intersection Observer for performance
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  }
);

revealElements.forEach((el) => observer.observe(el));
```

---

## TECHNOLOGY STACK

### Frontend Framework

```json
{
  "framework": "Next.js 14",
  "runtime": "App Router with TypeScript",
  "styling": {
    "primary": "Tailwind CSS",
    "animations": "Framer Motion",
    "3d": "Three.js + React Three Fiber"
  },
  "fonts": {
    "display": "Bricolage Grotesque (Google Fonts)",
    "body": "DM Sans (Google Fonts)",
    "mono": "Space Mono (Google Fonts)"
  },
  "performance": {
    "imageOptimization": "Next.js Image",
    "smoothScroll": "Lenis",
    "analytics": "Vercel Analytics"
  }
}
```

### Package Requirements

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "three": "^r128",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "framer-motion": "^10.16.0",
    "lenis": "^1.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "gsap": "^3.12.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/three": "^r128"
  }
}
```

---

## COMPONENT ARCHITECTURE

### Folder Structure

```
gror-marketing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── globals.ts
│
├── components/
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── FloatingSidebar.tsx
│   ├── ChatBubble.tsx
│   │
│   ├── Sections/
│   │   ├── HeroSection.tsx
│   │   ├── ParticleSphere.tsx
│   │   ├── StatsBar.tsx
│   │   ├── BrandsMarquee.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── WhyGROR.tsx
│   │   ├── ProcessTimeline.tsx
│   │   ├── RealEstateSection.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TechStack.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTABanner.tsx
│   │   └── Footer.tsx
│   │
│   ├── UI/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Loader.tsx
│   │   └── Accordion.tsx
│   │
│   └── Animations/
│       ├── RevealOnScroll.tsx
│       ├── CounterAnimation.tsx
│       ├── ParallaxSection.tsx
│       └── StaggerContainer.tsx
│
├── hooks/
│   ├── useIntersection.ts
│   ├── useScrollPosition.ts
│   ├── useMousePosition.ts
│   └── useLenis.ts
│
├── lib/
│   ├── animations.ts
│   ├── constants.ts
│   ├── colors.ts
│   └── types.ts
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── fonts/
│
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── animations.css
│
└── tailwind.config.ts
```

### Sample Component: HeroSection.tsx

```typescript
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ParticleSphere from '@/components/Sections/ParticleSphere';
import StatsBar from '@/components/Sections/StatsBar';
import Button from '@/components/UI/Button';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll with Lenis
    const Lenis = require('lenis').default;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-[#F8F8FF] to-[#FAFAFA] overflow-hidden pt-32"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 h-screen flex items-center">
        {/* Left Content */}
        <motion.div 
          className="w-3/5 pr-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-purple-100/50 border border-purple-200 rounded-full"
          >
            <span className="text-pink-500 text-lg">★</span>
            <span className="text-gray-600 text-xs font-semibold tracking-widest uppercase">
              Real Estate Marketing Experts
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black text-gray-950 leading-tight mb-6"
          >
            We Build High-Converting
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 animate-gradient-shift">
              Digital Growth Systems
            </span>
            <br />
            For Real Estate Brands
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed"
          >
            Performance marketing, automation & data-driven strategies that generate qualified leads, increase sales, and maximize ROI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-4 mb-12"
          >
            <Button 
              variant="primary"
              size="lg"
              icon="📞"
            >
              Book Free Strategy Call
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              icon="→"
            >
              Explore Our Services
            </Button>
          </motion.div>
        </motion.div>

        {/* Right 3D Sphere */}
        <motion.div 
          className="w-2/5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <ParticleSphere />
        </motion.div>
      </div>

      {/* Stats Bar */}
      <StatsBar />
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-gray-500 text-sm uppercase tracking-widest mb-3">Scroll</p>
        <div className="w-0.5 h-8 bg-gradient-to-b from-purple-400 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
```

---

## ADVANCED FEATURES

### Smooth Scroll with Lenis

```typescript
// hooks/useLenis.ts
'use client';

import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    };

    initLenis();
  }, []);
}
```

### Scroll-Triggered Animations

```typescript
// hooks/useIntersection.ts
'use client';

import { useEffect, useRef } from 'react';

export function useIntersection(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return ref;
}
```

### Cursor Position Tracking

```typescript
// hooks/useMousePosition.ts
'use client';

import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}
```

---

## DEPLOYMENT INSTRUCTIONS

### Deploy to Vercel (Recommended)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial GROR Marketing website"
git branch -M main
git remote add origin https://github.com/your-username/gror-marketing.git
git push -u origin main

# 2. Go to vercel.com
# - Import your GitHub repository
# - Vercel auto-detects Next.js
# - No additional config needed
# - Deploy!
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G_XXXXXXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=info.gror@gmail.com
NEXT_PUBLIC_PHONE=+91XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP=91XXXXXXXXXX
```

### Build & Run Locally

```bash
# Install dependencies
npm install

# Development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

### Performance Optimization

```bash
# Check bundle size
npm run build
npm run analyze

# Lighthouse score targets
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 95+
# - SEO: 100
```

---

## SEO OPTIMIZATION

### Meta Tags

```typescript
// app/layout.tsx
export const metadata = {
  title: 'GROR Marketing — Premium Real Estate Performance Marketing Agency',
  description: 'GROR Marketing builds high-converting digital growth systems for real estate brands. Performance marketing, automation, lead generation & more.',
  keywords: 'Real Estate Marketing, Performance Marketing, Lead Generation, Google Ads, Meta Ads, SEO',
  openGraph: {
    title: 'GROR Marketing — Real Estate Performance Marketing',
    description: 'We build high-converting digital growth systems for real estate brands.',
    type: 'website',
    url: 'https://grormarketing.com',
  },
};
```

### Structured Data

```typescript
// app/layout.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GROR Marketing',
      url: 'https://grormarketing.com',
      logo: 'https://grormarketing.com/logo.svg',
      description: 'Premium Real Estate Performance Marketing Agency',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'info.gror@gmail.com',
      },
    }),
  }}
/>
```

---

## PERFORMANCE METRICS

### Target Lighthouse Scores

- **Performance:** 95+
- **Accessibility:** 98+
- **Best Practices:** 95+
- **SEO:** 100

### Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimization Techniques

1. **Image Optimization**
   - Use Next.js Image component
   - WebP format with fallbacks
   - Lazy loading by default

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting

3. **Caching**
   - Browser caching headers
   - CDN for static assets
   - ISR for dynamic content

4. **Bundle Size**
   - Tree-shaking unused code
   - Minification & compression
   - Remove unused dependencies

---

## FINAL CHECKLIST

- [ ] Hero section with exact color palette
- [ ] 3D particle sphere with cursor interaction
- [ ] Smooth scroll animation (Lenis)
- [ ] Header with scroll detection
- [ ] Floating sidebar with 4 contact options
- [ ] Stats bar with counter animation
- [ ] Navigation with dropdown menus
- [ ] All 11 hero section elements
- [ ] Mobile responsive design
- [ ] Performance optimized (60fps)
- [ ] SEO metadata & structured data
- [ ] Lighthouse scores 95+
- [ ] Deployed to Vercel
- [ ] Custom domain configured
- [ ] Analytics set up
- [ ] Contact form connected

---

## QUICK START COMMAND

```bash
# Generate complete project with this prompt
npx create-next-app@latest gror-marketing \
  --typescript \
  --tailwind \
  --eslint \
  --no-src-dir \
  --import-alias '@/*'

# Install additional packages
npm install three @react-three/fiber @react-three/drei framer-motion lenis gsap

# Start development
npm run dev
```

---

**Created:** May 19, 2026
**Version:** 2.0 (Master Prompt)
**Status:** Production-Ready
**Last Updated:** Latest

---

> This prompt is optimized for creating pixel-perfect replicas of the GROR Marketing website reference image. Use with Claude, Cursor, v0.dev, or Bolt.new for best results.