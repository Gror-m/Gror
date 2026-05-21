"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, Math.max(1, window.devicePixelRatio || 1)));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 1, 2000);
    camera.position.set(0, 0, 700);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xe0e8ff, 0.9, 1400, 2);
    pointLight.position.set(-180, 220, 500);
    scene.add(pointLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const palette = [
      [0.44, 0.10, 0.95],
      [0.56, 0.16, 0.95],
      [0.28, 0.90, 0.96],
      [0.78, 0.18, 0.85],
    ];

    function buildRing(radius: number, tiltX: number, tiltY: number, opacity: number) {
      const segments = 180;
      const positions = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        positions.push(new THREE.Vector3(radius * Math.cos(theta), radius * Math.sin(theta), 0));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(positions);
      const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity, linewidth: 1.2, toneMapped: false });
      const line = new THREE.LineLoop(geometry, material);
      line.rotation.set(tiltX, tiltY, 0);
      return line;
    }

    const rings = [
      buildRing(280, 0.45, 0.17, 0.15),
      buildRing(238, 0.12, -0.4, 0.11),
      buildRing(205, -0.28, 0.72, 0.09),
    ];
    rings.forEach((ring) => globeGroup.add(ring));

    const particleCount = Math.max(6800, Math.floor((container.clientWidth * container.clientHeight) / 4200));
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const seeds = new Float32Array(particleCount);

    const globeRadius = 300;

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = globeRadius * (0.65 + Math.random() * 0.7);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const paletteItem = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = paletteItem[0];
      colors[i * 3 + 1] = paletteItem[1];
      colors[i * 3 + 2] = paletteItem[2];
      sizes[i] = 12 + Math.random() * 14;
      seeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.max(1, window.devicePixelRatio || 1) },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uPointerActive: { value: 0 },
      },
      vertexShader: `
        precision mediump float;
        attribute vec3 aColor;
        attribute float size;
        attribute float seed;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform vec2 uPointer;
        uniform float uPointerActive;
        varying vec3 vColor;
        varying float vSeed;
        varying float vDepth;

        void main() {
          vColor = aColor;
          vSeed = seed;
          vec3 pos = position;
          float t = uTime * (0.35 + seed * 0.85);
          pos.x += sin(t * 1.3 + seed * 6.0) * 12.0;
          pos.y += cos(t * 1.1 + seed * 4.5) * 10.0;
          pos.z += sin(t * 0.9 + seed * 5.2) * 8.0;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vDepth = -mvPosition.z;
          vec4 clip = projectionMatrix * mvPosition;
          vec2 ndc = clip.xy / clip.w;
          vec2 pointerNDC = uPointer * 2.0 - 1.0;
          vec2 diff = ndc - pointerNDC;
          float dist = length(diff);
          float influence = exp(-dist * 6.0) * uPointerActive;
          pos.xy += diff * 24.0 * influence * (0.8 + seed * 0.4);
          mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vDepth = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * (340.0 / max(1.0, vDepth)) * uPixelRatio * (1.0 + influence * 0.5);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying vec3 vColor;
        varying float vSeed;
        varying float vDepth;
        uniform float uTime;

        vec3 palette(float h) {
          return vec3(
            0.45 + 0.45 * cos(6.28318 * (h + 0.0)),
            0.45 + 0.45 * cos(6.28318 * (h + 0.33)),
            0.45 + 0.45 * cos(6.28318 * (h + 0.66))
          );
        }

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float dist = length(uv);
          float core = smoothstep(0.0, 0.28, dist);
          float alpha = pow(1.0 - core, 2.4);
          float pulse = 0.2 + 0.9 * sin(uTime * 4.7 + vSeed * 12.0);
          vec3 base = vColor * 0.95 + vec3(0.08, 0.04, 0.18);
          vec3 glow = base * (1.2 + pulse * 0.4);
          vec3 final = clamp(glow, 0.0, 1.0);
          gl_FragColor = vec4(final, alpha * (0.88 + 0.16 * pulse));
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    globeGroup.add(points);

    function resize() {
      const target = containerRef.current;
      if (!target) return;
      const width = target.clientWidth;
      const height = target.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    const pointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointerRef.current.y = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
      pointerRef.current.active = 1;
    };

    const pointerLeave = () => {
      pointerRef.current.active = 0;
    };

    container.addEventListener("pointermove", pointerMove);
    container.addEventListener("pointerleave", pointerLeave);
    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uPointer.value.set(pointerRef.current.x, pointerRef.current.y);
      material.uniforms.uPointerActive.value = pointerRef.current.active;
      globeGroup.rotation.y += 0.0009;
      globeGroup.rotation.x += 0.00035;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener("pointermove", pointerMove);
      container.removeEventListener("pointerleave", pointerLeave);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-20 opacity-100" />;
}
