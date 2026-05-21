"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 3400;

function fibonacciSphere(radius: number, count: number) {
  const positions = new Float32Array(count * 3);
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const angleIncrement = Math.PI * 2 * goldenRatio;

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = angleIncrement * i;

    positions[i * 3] = radius * Math.sin(inclination) * Math.cos(azimuth);
    positions[i * 3 + 1] = radius * Math.cos(inclination);
    positions[i * 3 + 2] = radius * Math.sin(inclination) * Math.sin(azimuth);
  }

  return positions;
}

function pseudoSeed(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function ParticleTunnel() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const geometry = useMemo(() => {
    const positions = fibonacciSphere(3.6, PARTICLE_COUNT);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(
        new Float32Array(Array.from({ length: PARTICLE_COUNT }, () => [0.55, 0.22, 0.85]).flat()),
        3
      )
    );
    const seeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) seeds[i] = pseudoSeed(i);
    geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    return geometry;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: `
          precision mediump float;
          uniform float uTime;
          uniform vec2 uMouse;
          attribute vec3 color;
          attribute float seed;
          varying vec3 vColor;
          varying float vSeed;
          void main() {
            vColor = color;
            vSeed = seed;
            vec3 pos = position;
            // subtle pulsing
            float pulse = sin(uTime * 1.4 + length(pos) * 4.0) * 0.06;
            vec3 offset = normalize(pos) * pulse;

            // map mouse (-1..1) into a larger world-space influence
            vec2 m = uMouse;
            vec2 mouseWorld = m * 5.6;
            vec2 pos2 = vec2(pos.x, pos.y);
            float dist = length(pos2 - mouseWorld);
            float influence = exp(-dist * 0.35);
            vec3 dir = normalize(vec3(mouseWorld - pos2, 0.0));
            float poleFactor = 1.0 - smoothstep(0.0, 2.4, abs(pos.z));
            vec3 attract = dir * (4.6 * influence * poleFactor);
            vec3 target = pos + offset + attract;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(target, 1.0);
            gl_PointSize = mix(14.0, 30.0, length(pos) / 3.8);
          }
        `,
        fragmentShader: `
          precision mediump float;
          uniform float uTime;
          varying vec3 vColor;
          varying float vSeed;
          // convert hue to rgb using cosine palette
          vec3 hue2rgb(float h) {
            return 0.5 + 0.5 * cos(6.28318 * (vec3(h, h + 0.3333, h + 0.6666)) + vec3(0.0, 0.0, 0.0));
          }
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.45) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.12, dist);
            float h = mod(vSeed + uTime * 0.12, 1.0);
            vec3 rainbow = hue2rgb(h);
            vec3 color = rainbow * 1.5;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      }),
    []
  );

  useEffect(() => {
    materialRef.current = material;
  }, [material]);

  useFrame(({ clock, mouse }) => {
    const elapsed = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.08 + mouse.x * 0.5;
      pointsRef.current.rotation.x = mouse.y * 0.25;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      const mx = (mouseRef.current?.x ?? mouse.x) as number;
      const my = (mouseRef.current?.y ?? mouse.y) as number;
      materialRef.current.uniforms.uMouse.value.set(mx, my);
    }
  });

  // global pointer listener to support interactions even when canvas doesn't receive events
  // normalized to -1..1 (x left->right, y bottom->top)
  useEffect(() => {
    function onPointer(e: PointerEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current.set(x, y);
    }
    window.addEventListener("pointermove", onPointer);
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  return (
    <group>
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  );
}
