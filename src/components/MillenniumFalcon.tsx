'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import * as THREE from 'three';

export interface FalconSettings {
  enabled: boolean;
  // Position controls
  positionX: number;
  positionY: number;
  positionZ: number;
  // Rotation/Orientation controls
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  // Scale
  scale: number;
  // Auto-rotation
  autoRotate: boolean;
  autoRotateSpeed: number;
  // Color
  color: string;
  // Gradient
  useGradient: boolean;
  gradientColor1: string;
  gradientColor2: string;
  gradientColor3: string;
  gradientColor4: string;
  // Liquid Metal animation controls
  flowSpeed: number;
  noiseScale: number;
}

/**
 * Liquid Metal Shader - Organic flowing colors like oil on water
 * Uses 3D simplex noise to create swirling, morphing color pools
 */
function createGradientMaterial(
  color1: string,
  color2: string,
  color3: string,
  color4: string,
  flowSpeed: number,
  noiseScale: number
): THREE.ShaderMaterial {
  const c1 = new THREE.Color(color1);
  const c2 = new THREE.Color(color2);
  const c3 = new THREE.Color(color3);
  const c4 = new THREE.Color(color4);
  const accentWarm = new THREE.Color('#f59e0b');

  return new THREE.ShaderMaterial({
    uniforms: {
      uColor1: { value: c1 },
      uColor2: { value: c2 },
      uColor3: { value: c3 },
      uColor4: { value: c4 },
      uAccentWarm: { value: accentWarm },
      uTime: { value: 0 },
      uFlowSpeed: { value: flowSpeed },
      uNoiseScale: { value: noiseScale },
    },
    transparent: true,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying vec3 vViewDirection;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;

        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        vViewDirection = normalize(cameraPosition - worldPos.xyz);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;
      uniform vec3 uAccentWarm;
      uniform float uFlowSpeed;
      uniform float uNoiseScale;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying vec3 vViewDirection;

      // ============================================
      // SIMPLEX 3D NOISE
      // ============================================
      vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 1.0/7.0;
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      // Fractal Brownian Motion - layered noise for more organic look
      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;

        for (int i = 0; i < 4; i++) {
          value += amplitude * snoise(p * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        return value;
      }

      // ============================================
      // MAIN
      // ============================================
      void main() {
        float time = uTime * uFlowSpeed;

        // === LIQUID METAL COLOR POOLS ===
        vec3 noisePos = vPosition * uNoiseScale;

        // Primary flow - large slow-moving pools
        float flow1 = fbm(noisePos + vec3(time * 0.2, time * 0.15, time * 0.1));

        // Secondary flow - medium pools moving differently
        float flow2 = fbm(noisePos * 1.5 + vec3(-time * 0.15, time * 0.25, -time * 0.1));

        // Tertiary flow - small detail ripples
        float flow3 = snoise(noisePos * 3.0 + vec3(time * 0.3, -time * 0.2, time * 0.25));

        // Combine flows
        float combinedFlow = flow1 * 0.5 + flow2 * 0.35 + flow3 * 0.15;
        combinedFlow = combinedFlow * 0.5 + 0.5;

        // === COLOR MIXING ===
        vec3 liquidColor;
        float colorPhase = combinedFlow * 4.0;
        colorPhase = mod(colorPhase + time * 0.1, 4.0);

        if (colorPhase < 1.0) {
          liquidColor = mix(uColor1, uColor2, colorPhase);
        } else if (colorPhase < 2.0) {
          liquidColor = mix(uColor2, uColor3, colorPhase - 1.0);
        } else if (colorPhase < 3.0) {
          liquidColor = mix(uColor3, uColor4, colorPhase - 2.0);
        } else {
          liquidColor = mix(uColor4, uColor1, colorPhase - 3.0);
        }

        // === WARM ACCENT POOLS ===
        float warmNoise = snoise(noisePos * 0.8 + vec3(time * 0.1, -time * 0.15, time * 0.05));
        float warmPool = smoothstep(0.5, 0.7, warmNoise);
        liquidColor = mix(liquidColor, uAccentWarm, warmPool * 0.35);

        // === IRIDESCENT SHIMMER ===
        float iridescence = dot(vViewDirection, vNormal);
        iridescence = pow(1.0 - abs(iridescence), 2.0);
        vec3 iridescentShift = mix(uColor3, uAccentWarm, iridescence * 0.5);
        liquidColor = mix(liquidColor, iridescentShift, iridescence * 0.2);

        // === FRESNEL ===
        float fresnel = 1.0 - max(dot(vViewDirection, vNormal), 0.0);
        fresnel = pow(fresnel, 3.0);

        // === LIGHTING ===
        vec3 lightDir1 = normalize(vec3(1.0, 1.0, 1.0));
        vec3 lightDir2 = normalize(vec3(-0.5, 0.5, -0.5));

        float diff1 = max(dot(vNormal, lightDir1), 0.0);
        float diff2 = max(dot(vNormal, lightDir2), 0.0);
        float diffuse = diff1 * 0.5 + diff2 * 0.25 + 0.25;

        vec3 halfDir = normalize(lightDir1 + vViewDirection);
        float spec = pow(max(dot(vNormal, halfDir), 0.0), 32.0);

        // === METALLIC SHEEN ===
        vec3 sheenDir = normalize(vec3(
          sin(time * 0.4) * 0.6,
          0.8,
          cos(time * 0.3) * 0.6
        ));
        float sheen = pow(max(dot(vNormal, sheenDir), 0.0), 16.0) * 0.4;

        // === COMBINE ===
        vec3 finalColor = liquidColor * diffuse;
        finalColor += vec3(1.0) * spec * 0.3;
        finalColor += vec3(1.0, 0.98, 0.95) * sheen;

        vec3 rimColor = mix(uColor2, uColor3, sin(time * 0.5) * 0.5 + 0.5);
        finalColor += rimColor * fresnel * 0.3;

        float alpha = mix(0.88, 0.96, fresnel);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
  });
}

/**
 * The Falcon mesh component that loads and animates the STL model
 */
function FalconMesh({ settings }: { settings: FalconSettings }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useLoader(STLLoader, '/falcon.stl');
  const [gradientMaterial, setGradientMaterial] = useState<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (meshRef.current) {
      // Apply configurable position, rotation, and scale
      meshRef.current.scale.setScalar(settings.scale);
      meshRef.current.position.set(settings.positionX, settings.positionY, settings.positionZ);
      meshRef.current.rotation.set(settings.rotationX, settings.rotationY, settings.rotationZ);
    }
  }, [settings.scale, settings.positionX, settings.positionY, settings.positionZ, settings.rotationX, settings.rotationY, settings.rotationZ]);

  // Update gradient material when gradient settings change
  useEffect(() => {
    if (settings.useGradient && settings.gradientColor1 && settings.gradientColor2 && settings.gradientColor3 && settings.gradientColor4) {
      const material = createGradientMaterial(
        settings.gradientColor1,
        settings.gradientColor2,
        settings.gradientColor3,
        settings.gradientColor4,
        settings.flowSpeed,
        settings.noiseScale
      );
      setGradientMaterial(material);
    } else {
      setGradientMaterial(null);
    }
  }, [
    settings.useGradient,
    settings.gradientColor1,
    settings.gradientColor2,
    settings.gradientColor3,
    settings.gradientColor4,
    settings.flowSpeed,
    settings.noiseScale,
  ]);

  // Update animation uniforms and optional auto-rotation
  useFrame((state) => {
    if (meshRef.current && settings.enabled && settings.autoRotate) {
      // Auto-rotate on z-axis
      meshRef.current.rotation.z += settings.autoRotateSpeed;
    }

    // Update time and animation uniforms for gradient material
    if (gradientMaterial) {
      gradientMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
      gradientMaterial.uniforms.uFlowSpeed.value = settings.flowSpeed;
      gradientMaterial.uniforms.uNoiseScale.value = settings.noiseScale;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {settings.useGradient && gradientMaterial ? (
        <primitive object={gradientMaterial} attach="material" />
      ) : (
        <meshLambertMaterial color={settings.color} />
      )}
    </mesh>
  );
}

/**
 * MillenniumFalcon - A 3D animated Millennium Falcon that flies toward the center
 *
 * Props:
 *   settings: Animation settings for the Falcon
 *   enableControls: Enable mouse orbit controls (default: false)
 *   showBackground: Show space background (default: false)
 */
interface MillenniumFalconProps {
  settings: FalconSettings;
  enableControls?: boolean;
  showBackground?: boolean;
}

export function MillenniumFalcon({
  settings,
  enableControls = false,
  showBackground = false,
}: MillenniumFalconProps) {
  if (!settings || !settings.enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting setup */}
        <directionalLight position={[1, 1, 1]} intensity={1.5} />
        <directionalLight position={[-1, -1, -1]} intensity={0.5} />
        <ambientLight intensity={0.3} />

        {/* The Falcon */}
        <FalconMesh settings={settings} />

        {/* Optional orbit controls */}
        {enableControls && <OrbitControls enableDamping dampingFactor={0.05} />}

        {/* Optional background */}
        {showBackground && (
          <color attach="background" args={['#000000']} />
        )}
      </Canvas>
    </div>
  );
}
