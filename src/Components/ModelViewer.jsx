/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef, useLayoutEffect, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

// --- Constants ---
const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const deg2rad = d => (d * Math.PI) / 180;
const ROTATE_SPEED = 0.005;

// --- Helper Components ---

const Loader = ({ placeholderSrc }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-[#00416B]/10">
        {placeholderSrc ? (
            <img src={placeholderSrc} width={128} height={128} style={{ filter: 'blur(8px)', borderRadius: 8 }} alt="Loading" />
        ) : (
            <div className="text-[#00416B] font-bold text-lg">
                {Math.round(progress)} %
            </div>
        )}
        <span className="text-xs text-[#00416B]/60 mt-2 font-medium">Loading 3D Model...</span>
      </div>
    </Html>
  );
};

// --- Specific Loaders to ensure Hooks are always called at top level ---

const GLBModel = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene.clone()} />;
};

const FBXModel = ({ url }) => {
  const fbx = useFBX(url);
  return <primitive object={fbx.clone()} />;
};

const OBJModel = ({ url }) => {
  const obj = useLoader(OBJLoader, url);
  return <primitive object={obj.clone()} />;
};

const STLModel = ({ url }) => {
  const geom = useLoader(STLLoader, url);
  
  const mesh = useMemo(() => {
    // Center the geometry itself to ensure rotation works around the center
    geom.center();
    geom.computeVertexNormals();
    
    // Create a mesh with a nice material
    const mat = new THREE.MeshStandardMaterial({ 
        color: 0xaaaaaa, // Light grey
        roughness: 0.5,
        metalness: 0.7,
        side: THREE.DoubleSide // Ensure it's visible from inside if geometry is weird
    });
    return new THREE.Mesh(geom, mat);
  }, [geom]);

  return <primitive object={mesh} />;
};

// --- Scene Logic (Auto-centering, Rotation) ---

const ModelScene = ({
  url,
  type,
  fadeIn,
  autoFrame,
  initPitch,
  initYaw,
  onLoaded,
  enableManualRotation,
  autoRotate,
  autoRotateSpeed
}) => {
  const group = useRef();
  const { camera, invalidate } = useThree();
  const [isReady, setIsReady] = useState(false);

  // Frame the model once it loads
  useLayoutEffect(() => {
    if (!group.current) return;

    // 1. Reset Position/Scale
    const g = group.current;
    g.position.set(0,0,0);
    g.scale.setScalar(1);
    g.updateWorldMatrix(true, true);

    // 2. Calculate Bounding Box
    const box = new THREE.Box3().setFromObject(g);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // 3. Center the model
    g.position.set(-center.x, -center.y, -center.z);

    // 4. Auto-Scale if autoFrame is on
    if (autoFrame) {
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 3; // Normalize to roughly 3 units
        if (maxDim > 0) {
            const scale = targetSize / maxDim;
            g.scale.setScalar(scale);
        }
    }

    // 5. Initial Rotation
    g.rotation.set(initPitch, initYaw, 0);

    // 6. Fade In
    if (fadeIn) {
        g.traverse(o => {
          if (o.isMesh) {
             o.castShadow = true;
             o.receiveShadow = true;
             // Reset opacity just in case
             o.material.transparent = true;
             o.material.opacity = 0;
          }
        });
        
        let t = 0;
        const fadeInterval = setInterval(() => {
            t += 0.05;
            if (t >= 1) {
                t = 1;
                clearInterval(fadeInterval);
                setIsReady(true);
                onLoaded?.();
            }
            g.traverse(o => {
                if (o.isMesh) o.material.opacity = t;
            });
            invalidate();
        }, 20);
        return () => clearInterval(fadeInterval);
    } else {
        setIsReady(true);
        onLoaded?.();
    }
  }, [url, type, autoFrame, fadeIn, initPitch, initYaw, onLoaded, invalidate]);

  // Handle Rotation Logic
  useFrame((state, dt) => {
    if (!group.current) return;
    
    // Auto Rotation
    if (autoRotate) {
        group.current.rotation.y += autoRotateSpeed * dt;
        invalidate();
    }
  });

  return (
    <group ref={group}>
       {type === 'glb' && <GLBModel url={url} />}
       {type === 'gltf' && <GLBModel url={url} />}
       {type === 'fbx' && <FBXModel url={url} />}
       {type === 'obj' && <OBJModel url={url} />}
       {type === 'stl' && <STLModel url={url} />}
    </group>
  );
};

// --- Main Component ---

const ModelViewer = ({
  url,
  width = '100%',
  height = '100%',
  defaultRotationX = -20,
  defaultRotationY = 20,
  defaultZoom = 3, // Zoom distance
  minZoomDistance = 1,
  maxZoomDistance = 20,
  enableManualZoom = true,
  ambientIntensity = 0.5,
  keyLightIntensity = 1,
  fillLightIntensity = 0.5,
  environmentPreset = 'city',
  autoFrame = true,
  placeholderSrc,
  showScreenshotButton = true,
  fadeIn = true,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  onModelLoaded
}) => {
  const rendererRef = useRef(null);
  
  // Determine file type to render correct sub-component
  const type = useMemo(() => {
    if (!url) return null;
    const parts = url.split('.');
    return parts[parts.length - 1].toLowerCase();
  }, [url]);

  const initYaw = deg2rad(defaultRotationX);
  const initPitch = deg2rad(defaultRotationY);

  const capture = () => {
    const gl = rendererRef.current;
    if (!gl) return;
    const urlPNG = gl.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = 'model-capture.png';
    a.href = urlPNG;
    a.click();
  };

  return (
    <div
      style={{ width, height, position: 'relative' }}
      className="bg-gray-50 rounded-2xl overflow-hidden shadow-inner w-full h-full min-h-[400px]"
    >
      {showScreenshotButton && (
        <button
          onClick={capture}
          className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#00416B] text-xs font-bold rounded-lg shadow-sm hover:bg-white transition-all border border-[#00416B]/10"
        >
          Capture
        </button>
      )}

      <Canvas
        shadows
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        onCreated={({ gl }) => {
          rendererRef.current = gl;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
        camera={{ fov: 45, position: [0, 0, defaultZoom] }}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
            {/* Lighting Setup */}
            {environmentPreset !== 'none' && <Environment preset={environmentPreset} background={false} />}
            <ambientLight intensity={ambientIntensity} />
            <directionalLight position={[5, 10, 5]} intensity={keyLightIntensity} castShadow />
            <directionalLight position={[-5, 5, 5]} intensity={fillLightIntensity} />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />

            {/* The Model - Keyed by URL to force full remount on change */}
            <ModelScene 
                key={url} 
                url={url} 
                type={type}
                fadeIn={fadeIn}
                autoFrame={autoFrame}
                initPitch={initPitch}
                initYaw={initYaw}
                autoRotate={autoRotate}
                autoRotateSpeed={autoRotateSpeed}
                onLoaded={onModelLoaded}
            />

            <OrbitControls 
                makeDefault 
                minDistance={minZoomDistance} 
                maxDistance={maxZoomDistance}
                enableZoom={enableManualZoom}
            />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;