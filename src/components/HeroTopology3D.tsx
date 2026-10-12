import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { MotionValue } from 'motion/react';
import { prefersReducedMotion } from '../lib/smoothScroll';

interface HeroTopology3DProps {
  progress?: MotionValue<number>;
}

/**
 * 3D Mathematical Topology & Neural Manifold (Three.js)
 * 
 * Represents Umar Sodiq's background in Pure Mathematics & AI:
 * - A parametric Torus Knot / Non-Euclidean Riemannian manifold.
 * - Layered with delicate wireframe lattices and glowing topological vertex nodes.
 * - Interactive: Smooth mouse parallax + Click & drag to spin.
 * - Performance optimized: Low vertex count, clamped DPR, auto-pauses when off-screen.
 */
export function HeroTopology3D({ progress }: HeroTopology3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = prefersReducedMotion();

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.1;

    // WebGL Renderer with low-power preference
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Color theme detector
    const isDarkMode = () => document.documentElement.classList.contains('dark');

    // Create Mathematical Manifold: Torus Knot Geometry
    // (p=2, q=3: classic trefoil mathematical knot)
    const geometry = new THREE.TorusKnotGeometry(1.15, 0.34, 120, 24, 2, 3);

    // 1. Delicate Wireframe Lattice Material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: isDarkMode() ? 0.28 : 0.22,
      color: isDarkMode() ? 0xf87171 : 0xdc2626, // Rose-400 / Red-600
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);

    // 2. Inner Glowing Core Shell
    const coreMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: isDarkMode() ? 0.04 : 0.03,
      color: 0xef4444,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(geometry, coreMaterial);

    // 3. Vertex Node Points (Topological Data Points)
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.045,
      transparent: true,
      opacity: isDarkMode() ? 0.65 : 0.5,
      color: isDarkMode() ? 0xffffff : 0xef4444,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(geometry, pointsMaterial);

    // Grouping all meshes
    const manifoldGroup = new THREE.Group();
    manifoldGroup.add(coreMesh);
    manifoldGroup.add(wireframeMesh);
    manifoldGroup.add(pointsMesh);
    scene.add(manifoldGroup);

    // Initial position & tilt
    manifoldGroup.rotation.x = 0.5;
    manifoldGroup.rotation.y = 0.3;

    // Mouse tracking & Drag interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const drag = { isDragging: false, startX: 0, startY: 0, velX: 0, velY: 0 };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx * 0.4;
      mouse.targetY = ny * 0.3;

      if (drag.isDragging) {
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        drag.velX = dx * 0.008;
        drag.velY = dy * 0.008;
        manifoldGroup.rotation.y += drag.velX;
        manifoldGroup.rotation.x += drag.velY;
        drag.startX = e.clientX;
        drag.startY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      drag.isDragging = true;
      drag.startX = e.clientX;
      drag.startY = e.clientY;
      drag.velX = 0;
      drag.velY = 0;
      container.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      drag.isDragging = false;
      container.style.cursor = 'grab';
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    // Responsive Resize Observer
    const resize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Animation Loop with Auto-Pause on Offscreen
    let animId = 0;
    let running = false;
    let isVisible = true;

    const render = () => {
      if (!running || !isVisible) return;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Inertia decay after dragging
      if (!drag.isDragging) {
        drag.velX *= 0.94;
        drag.velY *= 0.94;
        manifoldGroup.rotation.y += drag.velX;
        manifoldGroup.rotation.x += drag.velY;

        // Base peaceful rotation
        if (!reduced) {
          manifoldGroup.rotation.y += 0.0035;
          manifoldGroup.rotation.x += 0.0018;
          manifoldGroup.rotation.z += 0.001;
        }
      }

      // Parallax position from mouse
      manifoldGroup.position.x = mouse.x * 0.6;
      manifoldGroup.position.y = mouse.y * 0.5;

      // Parallax linked with scroll
      if (progress) {
        const scrollVal = progress.get();
        manifoldGroup.rotation.z = scrollVal * 1.5;
        manifoldGroup.position.y -= scrollVal * 0.8;
      }

      // Sync color with light/dark theme dynamically
      const dark = isDarkMode();
      wireframeMaterial.color.setHex(dark ? 0xf87171 : 0xdc2626);
      wireframeMaterial.opacity = dark ? 0.32 : 0.22;
      pointsMaterial.color.setHex(dark ? 0xffffff : 0xef4444);
      pointsMaterial.opacity = dark ? 0.7 : 0.5;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running || !isVisible || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    // IntersectionObserver to pause loop when scrolled past Hero
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    }, { threshold: 0 });
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    start();

    // Clean teardown
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      geometry.dispose();
      wireframeMaterial.dispose();
      coreMaterial.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progress]);

  return (
    <div
      ref={containerRef}
      data-cursor="drag"
      aria-hidden="true"
      title="Klik & geser untuk memutar objek 3D matematika"
      className="w-full h-full cursor-grab select-none pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
}
