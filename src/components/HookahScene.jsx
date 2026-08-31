import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MATERIAL_PRESETS = {
  crystal: {
    label: 'Crystal glass',
    glass: '#b9fbff',
    glassEmissive: '#143842',
    glassOpacity: 0.78,
    glassTransmission: 0.94,
    glassRoughness: 0.04,
    glassMetalness: 0.02,
    glassIridescence: 0.08,
    metal: '#eef7fa',
    metalRoughness: 0.1,
    metalness: 0.96,
    glow: '#63f5f2',
    water: '#2a9eb7',
  },
  chrome: {
    label: 'Polished chrome',
    glass: '#b7c9d2',
    glassEmissive: '#162129',
    glassOpacity: 0.88,
    glassTransmission: 0.36,
    glassRoughness: 0.12,
    glassMetalness: 0.64,
    glassIridescence: 0.02,
    metal: '#dce5ea',
    metalRoughness: 0.055,
    metalness: 1,
    glow: '#c8faff',
    water: '#375668',
  },
  onyx: {
    label: 'Matte onyx',
    glass: '#12171d',
    glassEmissive: '#0c1720',
    glassOpacity: 0.95,
    glassTransmission: 0.26,
    glassRoughness: 0.36,
    glassMetalness: 0.12,
    glassIridescence: 0.02,
    metal: '#171c22',
    metalRoughness: 0.42,
    metalness: 0.8,
    glow: '#9b6cff',
    water: '#321f59',
  },
  iridescent: {
    label: 'Iridescent',
    glass: '#ff59cf',
    glassEmissive: '#321137',
    glassOpacity: 0.84,
    glassTransmission: 0.79,
    glassRoughness: 0.08,
    glassMetalness: 0.12,
    glassIridescence: 1,
    metal: '#cbd5e6',
    metalRoughness: 0.09,
    metalness: 0.95,
    glow: '#ff5fd2',
    water: '#5a2ccb',
  },
};

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function damp(current, target, smoothing, delta) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-smoothing * delta));
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function ParticleField({ accent, count }) {
  const points = useRef(null);
  const material = useRef(null);
  const positions = useMemo(() => {
    const random = seededRandom(127);
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 3.6 + random() * 8.8;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      values[index * 3 + 2] = radius * Math.cos(phi);
    }

    return values;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.004;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.035) * 0.025;
    }
    if (material.current) {
      material.current.color.lerp(new THREE.Color(accent), 1 - Math.exp(-delta * 3));
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color={accent}
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.38}
        depthWrite={false}
      />
    </points>
  );
}

function SmokeWisps({ glow }) {
  const group = useRef(null);
  const materials = useRef([]);
  const geometries = useMemo(() => {
    const paths = [
      [
        [0.02, 2.86, 0],
        [0.18, 3.18, 0.03],
        [-0.16, 3.5, -0.04],
        [0.12, 3.86, 0.06],
        [-0.08, 4.18, 0],
      ],
      [
        [-0.08, 2.88, -0.04],
        [-0.34, 3.24, -0.08],
        [0.12, 3.58, -0.02],
        [-0.26, 3.92, 0.08],
        [0.08, 4.28, 0.02],
      ],
      [
        [0.12, 2.9, 0.04],
        [0.4, 3.2, 0],
        [0.16, 3.54, 0.09],
        [0.44, 3.82, -0.02],
        [0.22, 4.12, 0],
      ],
    ];

    return paths.map(
      (points, index) =>
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point))),
          72,
          0.012 + index * 0.004,
          8,
          false,
        ),
    );
  }, []);

  useEffect(
    () => () => {
      geometries.forEach((geometry) => geometry.dispose());
    },
    [geometries],
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(elapsed * 0.18) * 0.24;
      group.current.position.y = Math.sin(elapsed * 0.42) * 0.035;
    }

    materials.current.forEach((material, index) => {
      if (!material) return;
      material.color.lerp(new THREE.Color(glow), 1 - Math.exp(-delta * 3));
      material.opacity = 0.1 + Math.sin(elapsed * 0.48 + index * 1.9) * 0.035;
    });
  });

  return (
    <group ref={group}>
      {geometries.map((geometry, index) => (
        <mesh key={geometry.uuid} geometry={geometry}>
          <meshBasicMaterial
            ref={(node) => {
              materials.current[index] = node;
            }}
            color={glow}
            transparent
            opacity={0.1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function HaloRings({ accent }) {
  const group = useRef(null);
  const materials = useRef([]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    }
    materials.current.forEach((material) => {
      if (!material) return;
      material.color.lerp(new THREE.Color(accent), 1 - Math.exp(-delta * 3));
    });
  });

  return (
    <group ref={group} position={[0, 0.25, -1.7]} rotation={[0.08, 0, 0]}>
      {[2.55, 3.05].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0.2 + index * 0.38, 0]}>
          <torusGeometry args={[radius, index === 0 ? 0.012 : 0.006, 8, 180]} />
          <meshBasicMaterial
            ref={(node) => {
              materials.current[index] = node;
            }}
            color={accent}
            transparent
            opacity={index === 0 ? 0.26 : 0.13}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function MaterialSlot({ material }) {
  return <primitive object={material} attach="material" />;
}

function HookahObject({ accent, materialMode, rotation, reduceMotion }) {
  const root = useRef(null);
  const materialSet = useMemo(
    () => ({
      glass: new THREE.MeshPhysicalMaterial({
        color: '#b9fbff',
        emissive: '#143842',
        emissiveIntensity: 0.22,
        roughness: 0.04,
        metalness: 0.02,
        transmission: 0.94,
        thickness: 1.8,
        ior: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.045,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide,
      }),
      metal: new THREE.MeshPhysicalMaterial({
        color: '#eef7fa',
        roughness: 0.1,
        metalness: 0.96,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
      }),
      dark: new THREE.MeshStandardMaterial({
        color: '#090d12',
        roughness: 0.32,
        metalness: 0.72,
      }),
      water: new THREE.MeshPhysicalMaterial({
        color: '#2a9eb7',
        emissive: '#123b4b',
        emissiveIntensity: 0.45,
        roughness: 0.08,
        metalness: 0.06,
        transmission: 0.58,
        thickness: 0.9,
        transparent: true,
        opacity: 0.72,
      }),
      glow: new THREE.MeshStandardMaterial({
        color: '#63f5f2',
        emissive: '#63f5f2',
        emissiveIntensity: 4.2,
        roughness: 0.22,
        toneMapped: false,
      }),
      coal: new THREE.MeshStandardMaterial({
        color: '#211418',
        emissive: '#ff6c48',
        emissiveIntensity: 2.6,
        roughness: 0.8,
      }),
    }),
    [],
  );

  const target = useMemo(() => {
    const preset = MATERIAL_PRESETS[materialMode] || MATERIAL_PRESETS.crystal;
    return {
      ...preset,
      glassColor: new THREE.Color(preset.glass),
      glassEmissiveColor: new THREE.Color(preset.glassEmissive),
      metalColor: new THREE.Color(preset.metal),
      glowColor: new THREE.Color(preset.glow || accent),
      waterColor: new THREE.Color(preset.water),
    };
  }, [accent, materialMode]);

  const baseGeometry = useMemo(() => {
    const profile = [
      [0.08, -2.18],
      [0.54, -2.16],
      [0.78, -2.04],
      [0.92, -1.74],
      [0.9, -1.42],
      [0.78, -1.12],
      [0.59, -0.88],
      [0.38, -0.67],
      [0.31, -0.42],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(profile, 112);
  }, []);

  const waterGeometry = useMemo(() => {
    const profile = [
      [0.08, -2.03],
      [0.45, -2.02],
      [0.69, -1.92],
      [0.77, -1.67],
      [0.74, -1.42],
      [0.63, -1.18],
      [0.45, -1.02],
      [0.29, -0.91],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(profile, 96);
  }, []);

  const hoseGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.54, -0.11, 0.02),
      new THREE.Vector3(1.22, 0.02, 0.42),
      new THREE.Vector3(1.88, -0.35, 0.66),
      new THREE.Vector3(2.12, -1.18, 0.72),
      new THREE.Vector3(1.86, -2.05, 0.64),
      new THREE.Vector3(1.2, -2.47, 0.52),
    ]);
    return new THREE.TubeGeometry(curve, 148, 0.075, 12, false);
  }, []);

  useEffect(
    () => () => {
      baseGeometry.dispose();
      waterGeometry.dispose();
      hoseGeometry.dispose();
      Object.values(materialSet).forEach((material) => material.dispose());
    },
    [baseGeometry, hoseGeometry, materialSet, waterGeometry],
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const transition = 1 - Math.exp(-delta * 4.6);
    const glass = materialSet.glass;
    const metal = materialSet.metal;
    const water = materialSet.water;
    const glow = materialSet.glow;

    glass.color.lerp(target.glassColor, transition);
    glass.emissive.lerp(target.glassEmissiveColor, transition);
    glass.opacity = damp(glass.opacity, target.glassOpacity, 4.6, delta);
    glass.transmission = damp(glass.transmission, target.glassTransmission, 4.6, delta);
    glass.roughness = damp(glass.roughness, target.glassRoughness, 4.6, delta);
    glass.metalness = damp(glass.metalness, target.glassMetalness, 4.6, delta);
    glass.iridescence = damp(glass.iridescence || 0, target.glassIridescence, 4.6, delta);

    metal.color.lerp(target.metalColor, transition);
    metal.roughness = damp(metal.roughness, target.metalRoughness, 4.6, delta);
    metal.metalness = damp(metal.metalness, target.metalness, 4.6, delta);

    water.color.lerp(target.waterColor, transition);
    water.emissive.lerp(target.waterColor, transition);
    glow.color.lerp(target.glowColor, transition);
    glow.emissive.lerp(target.glowColor, transition);

    if (root.current) {
      const idle = reduceMotion ? 0 : Math.sin(elapsed * 0.32) * 0.055;
      root.current.rotation.y = damp(root.current.rotation.y, rotation + idle, 8.2, delta);
      root.current.rotation.x = damp(
        root.current.rotation.x,
        reduceMotion ? 0.025 : 0.025 + Math.sin(elapsed * 0.22) * 0.018,
        4,
        delta,
      );
      root.current.position.y = reduceMotion ? 0 : Math.sin(elapsed * 0.44) * 0.018;
    }
  });

  return (
    <group ref={root}>
      <mesh geometry={baseGeometry} castShadow receiveShadow>
        <primitive object={materialSet.glass} attach="material" />
      </mesh>

      <mesh geometry={waterGeometry} scale={[0.91, 0.96, 0.91]}>
        <primitive object={materialSet.water} attach="material" />
      </mesh>

      <mesh position={[0, -0.48, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.3, 0.22, 64]} />
        <MaterialSlot material={materialSet.dark} />
      </mesh>
      <mesh position={[0, -0.33, 0]} castShadow>
        <torusGeometry args={[0.34, 0.055, 16, 64]} />
        <MaterialSlot material={materialSet.metal} />
      </mesh>
      <mesh position={[0, -0.18, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.34, 0.28, 64]} />
        <MaterialSlot material={materialSet.metal} />
      </mesh>
      <mesh position={[0, -0.01, 0]}>
        <torusGeometry args={[0.38, 0.055, 16, 64]} />
        <MaterialSlot material={materialSet.dark} />
      </mesh>

      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.2, 1.55, 48]} />
        <MaterialSlot material={materialSet.metal} />
      </mesh>
      {[0.28, 0.76, 1.18].map((y, index) => (
        <group key={y}>
          <mesh position={[0, y, 0]} scale={[1 + index * 0.04, 1, 1 + index * 0.04]}>
            <torusGeometry args={[0.23, 0.05, 16, 64]} />
            <MaterialSlot material={index % 2 === 0 ? materialSet.dark : materialSet.metal} />
          </mesh>
          <mesh position={[0, y + 0.1, 0]}>
            <cylinderGeometry args={[0.22, 0.18, 0.16, 48]} />
            <MaterialSlot material={materialSet.metal} />
          </mesh>
        </group>
      ))}

      <group position={[0, -0.04, 0]}>
        <mesh position={[0.38, 0.02, 0]} rotation={[0, 0, -0.82]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.62, 40]} />
          <MaterialSlot material={materialSet.metal} />
        </mesh>
        <mesh position={[-0.38, 0.02, 0]} rotation={[0, 0, 0.82]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.62, 40]} />
          <MaterialSlot material={materialSet.metal} />
        </mesh>
        <mesh position={[0.57, -0.03, 0]}>
          <torusGeometry args={[0.13, 0.025, 12, 48]} />
          <MaterialSlot material={materialSet.dark} />
        </mesh>
      </group>

      <mesh position={[0, 1.68, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.14, 0.5, 48]} />
        <MaterialSlot material={materialSet.metal} />
      </mesh>
      <mesh position={[0, 1.94, 0]} receiveShadow>
        <cylinderGeometry args={[1.12, 0.92, 0.075, 96]} />
        <MaterialSlot material={materialSet.metal} />
      </mesh>
      <mesh position={[0, 1.985, 0]}>
        <torusGeometry args={[1.02, 0.035, 12, 96]} />
        <MaterialSlot material={materialSet.dark} />
      </mesh>
      <mesh position={[0, 2.17, 0]}>
        <cylinderGeometry args={[0.22, 0.15, 0.38, 48]} />
        <MaterialSlot material={materialSet.metal} />
      </mesh>
      <mesh position={[0, 2.4, 0]}>
        <torusGeometry args={[0.24, 0.045, 14, 64]} />
        <MaterialSlot material={materialSet.dark} />
      </mesh>
      <mesh position={[0, 2.58, 0]} castShadow>
        <cylinderGeometry args={[0.36, 0.24, 0.34, 64]} />
        <MaterialSlot material={materialSet.dark} />
      </mesh>
      <mesh position={[0, 2.77, 0]}>
        <torusGeometry args={[0.34, 0.04, 12, 64]} />
        <MaterialSlot material={materialSet.metal} />
      </mesh>

      {[-0.12, 0.14].map((x, index) => (
        <mesh
          key={x}
          position={[x, 2.91 + index * 0.025, index ? -0.04 : 0.05]}
          rotation={[0.14, index ? 0.4 : -0.2, 0.08]}
        >
          <boxGeometry args={[0.22, 0.16, 0.2]} />
          <primitive object={materialSet.coal} attach="material" />
        </mesh>
      ))}

      <mesh geometry={hoseGeometry} castShadow>
        <MaterialSlot material={materialSet.dark} />
      </mesh>
      <group position={[1.25, -2.51, 0.54]} rotation={[0, 0.58, -1.18]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.09, 1.12, 32]} />
          <MaterialSlot material={materialSet.metal} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <cylinderGeometry args={[0.105, 0.075, 0.18, 32]} />
          <MaterialSlot material={materialSet.dark} />
        </mesh>
        <mesh position={[0, -0.58, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.15, 32]} />
          <MaterialSlot material={materialSet.dark} />
        </mesh>
      </group>

      <mesh position={[0, -2.31, 0]} receiveShadow>
        <cylinderGeometry args={[1.46, 1.62, 0.12, 112]} />
        <MaterialSlot material={materialSet.dark} />
      </mesh>
      <mesh position={[0, -2.23, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.34, 0.025, 12, 128]} />
        <primitive object={materialSet.glow} attach="material" />
      </mesh>
      <mesh position={[0, -2.37, 0]}>
        <cylinderGeometry args={[1.72, 1.76, 0.035, 112]} />
        <meshPhysicalMaterial color="#05070a" roughness={0.16} metalness={0.82} />
      </mesh>

      <SmokeWisps glow={target.glowColor.getStyle()} />
    </group>
  );
}

function CameraRig({ pointer, compact }) {
  const targetPosition = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useFrame(({ camera }, delta) => {
    targetPosition.current.set(
      pointer.current.x * (compact ? 0.08 : 0.22),
      pointer.current.y * (compact ? 0.06 : 0.13) + (compact ? -0.55 : 0.04),
      compact ? 9.2 : 8.3,
    );
    camera.position.lerp(targetPosition.current, 1 - Math.pow(0.001, delta));
    lookTarget.current.set(compact ? 0 : 0.6, compact ? -0.65 : 0.08, 0);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function SceneWorld({
  accent,
  materialMode,
  rotation,
  scrollProgress,
  particleCount,
  pointer,
  reduceMotion,
}) {
  const world = useRef(null);
  const { size } = useThree();
  const compact = size.width < 820;

  useFrame((state, delta) => {
    if (!world.current) return;
    const heroExit = Math.min(scrollProgress * 9.5, 1);
    const targetScale = (compact ? 0.7 : 0.94) * (1 - heroExit * 0.12);
    world.current.scale.setScalar(damp(world.current.scale.x, targetScale, 3.4, delta));
    world.current.position.x = damp(
      world.current.position.x,
      compact ? 0.15 : 1.62 - heroExit * 0.38,
      3.8,
      delta,
    );
    world.current.position.y = damp(
      world.current.position.y,
      compact ? -0.86 - heroExit * 1.2 : -0.14 - heroExit * 1.7,
      3.8,
      delta,
    );
    world.current.rotation.z = reduceMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * 0.17) * 0.008;
  });

  return (
    <>
      <ambientLight intensity={0.46} />
      <hemisphereLight color="#eafcff" groundColor="#050609" intensity={0.55} />
      <directionalLight position={[4.6, 5.5, 5.5]} color="#f3f7fa" intensity={3.2} castShadow />
      <spotLight
        position={[3.2, 5.8, 4.6]}
        angle={0.38}
        penumbra={0.8}
        color={accent}
        intensity={58}
        distance={14}
        decay={2}
      />
      <pointLight position={[-3.5, 0.8, 2.6]} color="#9b6cff" intensity={46} distance={12} decay={2} />
      <pointLight position={[2.6, -2, 3.1]} color="#ff5fd2" intensity={32} distance={10} decay={2} />
      <pointLight position={[0, 3.2, -2.6]} color="#ffb66e" intensity={14} distance={8} decay={2} />

      <HaloRings accent={accent} />
      <group ref={world} position={[compact ? 0.15 : 1.62, compact ? -0.86 : -0.14, 0]} scale={compact ? 0.7 : 0.94}>
        <HookahObject
          accent={accent}
          materialMode={materialMode}
          rotation={rotation}
          reduceMotion={reduceMotion}
        />
      </group>

      <ParticleField accent={accent} count={particleCount} />
      <CameraRig pointer={pointer} compact={compact} />
      <fog attach="fog" args={['#050609', 8.5, 18]} />
    </>
  );
}

function StaticHookah({ accent, materialMode }) {
  const preset = MATERIAL_PRESETS[materialMode] || MATERIAL_PRESETS.crystal;

  return (
    <div
      className="static-hookah"
      style={{
        '--hookah-accent': accent,
        '--hookah-glass': preset.glass,
        '--hookah-metal': preset.metal,
      }}
      aria-hidden="true"
    >
      <div className="static-hookah__halo" />
      <svg viewBox="0 0 520 760" role="presentation">
        <defs>
          <linearGradient id="fallback-metal" x1="0" x2="1">
            <stop offset="0" stopColor="#0b1118" />
            <stop offset="0.35" stopColor={preset.metal} />
            <stop offset="0.58" stopColor="#ffffff" />
            <stop offset="1" stopColor="#111720" />
          </linearGradient>
          <radialGradient id="fallback-glass" cx="38%" cy="28%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="0.25" stopColor={preset.glass} stopOpacity="0.8" />
            <stop offset="1" stopColor="#090d13" stopOpacity="0.72" />
          </radialGradient>
          <filter id="fallback-glow">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <ellipse cx="282" cy="704" rx="164" ry="20" fill="#020305" stroke={accent} strokeOpacity="0.7" />
        <path
          d="M212 690C154 664 154 592 178 540c18-38 56-64 58-112h92c2 48 40 74 58 112 24 52 24 124-34 150-38 17-102 17-140 0Z"
          fill="url(#fallback-glass)"
          stroke={preset.glass}
          strokeOpacity="0.62"
        />
        <path d="M247 428h70v-190h-70z" fill="url(#fallback-metal)" />
        <path d="M224 420h116v42H224z" rx="16" fill="url(#fallback-metal)" />
        <path d="M258 238h48v-92h-48z" fill="url(#fallback-metal)" />
        <ellipse cx="282" cy="141" rx="118" ry="18" fill="url(#fallback-metal)" />
        <path d="M262 140h40V84h-40z" fill="url(#fallback-metal)" />
        <path d="M246 84c4-34 68-34 72 0Z" fill="#121820" stroke={preset.metal} />
        <path
          d="M332 430c106-18 132 36 116 112-13 59-63 103-127 132"
          fill="none"
          stroke="#0c1118"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M320 675l108-48"
          fill="none"
          stroke="url(#fallback-metal)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path
          d="M282 63c-28-36 44-48 7-88M293 64c43-42-11-66 30-98"
          fill="none"
          stroke={accent}
          strokeOpacity="0.4"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#fallback-glow)"
        />
      </svg>
      <span className="static-hookah__ring static-hookah__ring--one" />
      <span className="static-hookah__ring static-hookah__ring--two" />
    </div>
  );
}

export function HookahScene({
  accent,
  materialMode,
  rotation,
  scrollProgress,
  reduceMotion,
}) {
  const [available] = useState(() => supportsWebGL());
  const [visible, setVisible] = useState(() => !document.hidden);
  const pointer = useRef({ x: 0, y: 0 });
  const lowPower =
    typeof navigator !== 'undefined' &&
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4;
  const particleCount = lowPower ? 180 : 420;
  const heroOpacity = Math.max(0, 1 - scrollProgress * 10.5);

  useEffect(() => {
    const onPointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onVisibility = () => setVisible(!document.hidden);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const fallback = (
    <StaticHookah
      accent={accent}
      materialMode={materialMode}
    />
  );

  if (!available || reduceMotion) return fallback;

  return (
    <div
      className="signal-canvas hookah-canvas"
      style={{ opacity: heroOpacity }}
      aria-hidden="true"
    >
      <SceneErrorBoundary fallback={fallback}>
        <Canvas
          dpr={lowPower ? 1 : [1, 1.45]}
          camera={{ position: [0, 0.04, 8.3], fov: 37, near: 0.1, far: 50 }}
          gl={{
            alpha: true,
            antialias: !lowPower,
            powerPreference: 'high-performance',
          }}
          shadows={!lowPower}
          frameloop={visible ? 'always' : 'never'}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.18;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <SceneWorld
              accent={accent}
              materialMode={materialMode}
              rotation={rotation}
              scrollProgress={scrollProgress}
              particleCount={particleCount}
              pointer={pointer}
              reduceMotion={reduceMotion}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
