import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
  const positions = useMemo(() => {
    const random = seededRandom(127);
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 3.5 + random() * 8.5;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.68;
      values[index * 3 + 2] = radius * Math.cos(phi);
    }

    return values;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.006;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={accent}
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.58}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalSatellites({ accent }) {
  const group = useRef(null);
  const satellites = useMemo(
    () => [
      { position: [2.15, 0.1, 0], scale: 0.055 },
      { position: [-1.45, 1.65, 0.3], scale: 0.038 },
      { position: [-0.8, -1.95, -0.25], scale: 0.046 },
      { position: [1.2, -1.55, 0.55], scale: 0.03 },
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z -= delta * 0.09;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.17) * 0.25;
  });

  return (
    <group ref={group} rotation={[0.42, 0, 0.2]}>
      {satellites.map((satellite, index) => (
        <mesh key={index} position={satellite.position} scale={satellite.scale}>
          <sphereGeometry args={[1, 18, 18]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function SignalCore({ accent, intensity = 1 }) {
  const assembly = useRef(null);
  const shell = useRef(null);
  const knot = useRef(null);
  const rings = useRef([]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    if (assembly.current) {
      assembly.current.rotation.y += delta * 0.075;
      assembly.current.rotation.x = Math.sin(elapsed * 0.22) * 0.1;
      const pulse = 1 + Math.sin(elapsed * 1.1) * 0.025 * intensity;
      assembly.current.scale.setScalar(pulse);
    }
    if (shell.current) {
      shell.current.rotation.x -= delta * 0.06;
      shell.current.rotation.z += delta * 0.045;
    }
    if (knot.current) {
      knot.current.rotation.y -= delta * 0.14;
      knot.current.rotation.z += delta * 0.1;
    }
    rings.current.forEach((ring, index) => {
      if (!ring) return;
      ring.rotation.z += delta * (index % 2 === 0 ? 0.045 : -0.035) * (index + 1);
    });
  });

  return (
    <group ref={assembly}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshPhysicalMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.28 * intensity}
          roughness={0.12}
          metalness={0.42}
          transmission={0.52}
          thickness={1.7}
          ior={1.38}
          clearcoat={1}
          clearcoatRoughness={0.08}
          iridescence={0.62}
          iridescenceIOR={1.25}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh scale={0.58}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#f3f7fa"
          emissive={accent}
          emissiveIntensity={3.8 * intensity}
          roughness={0.24}
        />
      </mesh>

      <mesh ref={knot}>
        <torusKnotGeometry args={[1.5, 0.038, 240, 18, 2, 3]} />
        <meshBasicMaterial color={accent} transparent opacity={0.84} toneMapped={false} />
      </mesh>

      {[1.75, 2.08, 2.44].map((radius, index) => (
        <mesh
          key={radius}
          ref={(node) => {
            rings.current[index] = node;
          }}
          rotation={[0.42 + index * 0.34, index * 0.48, index * 0.72]}
        >
          <torusGeometry args={[radius, index === 1 ? 0.014 : 0.008, 8, 220]} />
          <meshBasicMaterial
            color={index === 1 ? '#f3f7fa' : accent}
            transparent
            opacity={0.34 + index * 0.1}
            toneMapped={false}
          />
        </mesh>
      ))}

      <OrbitalSatellites accent={accent} />
    </group>
  );
}

function CameraRig({ scrollProgress, pointer }) {
  const targetPosition = useRef(new THREE.Vector3(0, 0, 7.4));
  const lookTarget = useRef(new THREE.Vector3());

  useFrame(({ camera }, delta) => {
    const progress = Math.min(Math.max(scrollProgress, 0), 1);
    targetPosition.current.set(
      pointer.current.x * 0.42 + Math.sin(progress * Math.PI * 2) * 0.22,
      pointer.current.y * 0.24 - progress * 0.52,
      7.35 - progress * 1.45,
    );
    camera.position.lerp(targetPosition.current, 1 - Math.pow(0.001, delta));
    lookTarget.current.set(0, -progress * 0.16, 0);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function SceneWorld({ accent, scrollProgress, particleCount, pointer }) {
  const world = useRef(null);

  useFrame((state) => {
    if (!world.current) return;
    world.current.position.x =
      1.55 + Math.sin(state.clock.elapsedTime * 0.2) * 0.08 - scrollProgress * 0.45;
    world.current.position.y = 0.1 - scrollProgress * 0.7;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 5, 5]} color="#f3f7fa" intensity={2.4} />
      <pointLight position={[2.5, 0.8, 3]} color={accent} intensity={68} distance={12} decay={2} />
      <pointLight position={[-4, -2, 1]} color="#9b6cff" intensity={38} distance={11} decay={2} />
      <pointLight position={[0, 4, -3]} color="#ffb66e" intensity={18} distance={9} decay={2} />

      <group ref={world}>
        <SignalCore accent={accent} intensity={1 + scrollProgress * 0.35} />
      </group>
      <ParticleField accent={accent} count={particleCount} />
      <CameraRig scrollProgress={scrollProgress} pointer={pointer} />
      <fog attach="fog" args={['#050609', 8, 19]} />
    </>
  );
}

function StaticSignal({ accent }) {
  return (
    <div className="static-signal" style={{ '--scene-accent': accent }} aria-hidden="true">
      <div className="static-signal__halo" />
      <div className="static-signal__ring static-signal__ring--one" />
      <div className="static-signal__ring static-signal__ring--two" />
      <div className="static-signal__core" />
    </div>
  );
}

export function SignalScene({ accent, scrollProgress, reduceMotion }) {
  const [available] = useState(() => supportsWebGL());
  const [visible, setVisible] = useState(() => !document.hidden);
  const pointer = useRef({ x: 0, y: 0 });
  const lowPower =
    typeof navigator !== 'undefined' &&
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4;
  const particleCount = lowPower ? 360 : 760;

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

  const fallback = <StaticSignal accent={accent} />;

  if (!available || reduceMotion) return fallback;

  return (
    <div className="signal-canvas" aria-hidden="true">
      <SceneErrorBoundary fallback={fallback}>
        <Canvas
          dpr={lowPower ? 1 : [1, 1.55]}
          camera={{ position: [0, 0, 7.4], fov: 42, near: 0.1, far: 50 }}
          gl={{ alpha: true, antialias: !lowPower, powerPreference: 'high-performance' }}
          frameloop={visible ? 'always' : 'never'}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.08;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <SceneWorld
              accent={accent}
              scrollProgress={scrollProgress}
              particleCount={particleCount}
              pointer={pointer}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
