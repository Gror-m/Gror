"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MiniParticleGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

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
    const camera = new THREE.PerspectiveCamera(50, 1, 1, 20000);
    camera.position.z = 700;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const area = container.clientWidth * container.clientHeight;
    const PARTICLE_COUNT = Math.max(2000, Math.floor(area / 7400));
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const seeds = new Float32Array(PARTICLE_COUNT);

    const palette = [
      [265, 96, 58],
      [200, 96, 60],
      [285, 90, 58],
      [160, 90, 64],
      [320, 90, 58],
    ];

    const globeRadius = Math.min(container.clientWidth, container.clientHeight) * 0.36;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const onSphere = Math.random() > 0.42;
      let x: number, y: number, z: number;
      if (onSphere) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = globeRadius * (0.8 + Math.random() * 0.25);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      } else {
        x = (Math.random() - 0.5) * container.clientWidth * 0.8;
        y = (Math.random() - 0.5) * container.clientHeight * 0.9;
        z = (Math.random() - 0.5) * globeRadius * 1.8;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const pal = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = pal[0] / 360;
      colors[i * 3 + 1] = pal[1] / 100;
      colors[i * 3 + 2] = pal[2] / 100;
      sizes[i] = 9 + Math.random() * 13;
      seeds[i] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.max(1, window.devicePixelRatio || 1) },
      },
      vertexShader: `
        precision mediump float;
        attribute vec3 aColor;
        attribute float size;
        attribute float seed;
        uniform float uTime;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vSeed;
        varying float vDepth;

        void main() {
          vSeed = seed;
          vColor = aColor;
          vec3 p = position;
          float t = uTime * (0.3 + seed * 1.1);
          p.x += sin(t * 1.4 + seed * 4.0) * 12.0;
          p.y += cos(t * 1.25 + seed * 5.0) * 10.0;
          p.z += sin(t * 0.9 + seed * 6.0) * 7.0;
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          vDepth = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * (360.0 / max(1.0, vDepth)) * uPixelRatio;
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying vec3 vColor;
        varying float vSeed;
        varying float vDepth;
        uniform float uTime;

        vec3 hue2rgb(float h) {
          return 0.5 + 0.5 * cos(6.28318 * vec3(h, h + 0.3333, h + 0.6666));
        }

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float dist = length(uv);
          float core = smoothstep(0.0, 0.28, dist);
          float alpha = pow(1.0 - core, 2.5);
          float pulse = 0.3 + 0.8 * sin(uTime * 6.0 + vSeed * 12.0);
          vec3 color = hue2rgb(vColor.x + pulse * 0.02);
          vec3 tinted = mix(color, vec3(0.72, 0.18, 0.95), 0.1);
          vec3 final = tinted * (1.0 + pulse * 0.2);
          gl_FragColor = vec4(final, alpha * (0.86 + 0.18 * pulse));
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const tick = new THREE.Clock();

    function animate() {
      material.uniforms.uTime.value = tick.getElapsedTime();
      points.rotation.y += 0.0012;
      points.rotation.x += 0.0007;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className={className ?? "fixed inset-0 -z-20 opacity-100 pointer-events-none"} />;
}
