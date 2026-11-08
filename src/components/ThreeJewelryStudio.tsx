import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  X, RotateCcw, Sparkles, ZoomIn, ZoomOut, ShoppingBag, 
  Calendar, Check, ShieldCheck, RefreshCw 
} from 'lucide-react';
import { RivaLogo } from './RivaLogo';

export type DiamondShape = 'oval' | 'round' | 'emerald' | 'cushion';

interface ThreeJewelryStudioProps {
  initialMetalId?: string;
  initialStone?: string;
  initialShape?: DiamondShape;
  onClose?: () => void;
  onAddToCart?: (config: {
    metalId: string;
    metalName: string;
    stoneId: string;
    stoneName: string;
    shape: DiamondShape;
    price: number;
  }) => void;
  onOpenConsultation?: () => void;
}

export const ThreeJewelryStudio: React.FC<ThreeJewelryStudioProps> = ({
  initialMetalId = '18k_yellow',
  initialStone = 'diamond',
  initialShape = 'oval',
  onClose,
  onAddToCart,
  onOpenConsultation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMetal, setSelectedMetal] = useState(initialMetalId);
  const [selectedStone, setSelectedStone] = useState(initialStone);
  const [selectedShape, setSelectedShape] = useState<DiamondShape>(initialShape);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const autoRotateRef = useRef(true);
  autoRotateRef.current = isAutoRotate;
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // References to dynamic 3D elements
  const sceneRef = useRef<{
    ringRoot: THREE.Group;
    diamondGroup: THREE.Group;
    shankMaterial: THREE.MeshStandardMaterial;
    prongMaterial: THREE.MeshStandardMaterial;
    diamondMaterial: THREE.MeshPhysicalMaterial;
    controls: OrbitControls;
    camera: THREE.PerspectiveCamera;
    isDragging: boolean;
  } | null>(null);

  const metalPresets: Record<string, { color: number; roughness: number; metalness: number; label: string; priceAdj: number }> = {
    '18k_yellow': { color: 0xD4AF37, roughness: 0.16, metalness: 0.96, label: '18K Yellow Gold', priceAdj: 0 },
    '18k_rose': { color: 0xB76E79, roughness: 0.18, metalness: 0.94, label: '18K Rose Gold', priceAdj: 4500 },
    'platinum': { color: 0xE5E4E2, roughness: 0.12, metalness: 0.98, label: 'Platinum 950', priceAdj: 28000 },
    '18k_white': { color: 0xF0F0F2, roughness: 0.15, metalness: 0.96, label: '18K White Gold', priceAdj: 6500 }
  };

  const stonePresets: Record<string, { color: number; transmission: number; roughness: number; ior: number; label: string; priceAdj: number }> = {
    'diamond': { color: 0xFFFFFF, transmission: 0.96, roughness: 0.0, ior: 2.417, label: 'F/VVS1 Natural Diamond', priceAdj: 0 },
    'sapphire': { color: 0x183059, transmission: 0.75, roughness: 0.03, ior: 1.77, label: 'Ceylon Royal Sapphire', priceAdj: 75000 },
    'emerald': { color: 0x097969, transmission: 0.80, roughness: 0.04, ior: 1.58, label: 'Colombian Vivid Emerald', priceAdj: 110000 },
    'ruby': { color: 0x9B111E, transmission: 0.78, roughness: 0.02, ior: 1.76, label: 'Burmese Pigeon Blood Ruby', priceAdj: 95000 },
    'canary': { color: 0xFFD700, transmission: 0.92, roughness: 0.01, ior: 2.417, label: 'Canary Gold Diamond', priceAdj: 65000 }
  };

  const shapeScales: Record<DiamondShape, { x: number; y: number; z: number; label: string }> = {
    'oval': { x: 0.92, y: 1.0, z: 1.25, label: 'Oval Brilliant' },
    'round': { x: 1.05, y: 1.0, z: 1.05, label: 'Round Brilliant' },
    'emerald': { x: 0.88, y: 0.95, z: 1.35, label: 'Emerald Step-Cut' },
    'cushion': { x: 1.12, y: 0.98, z: 1.12, label: 'Cushion Cut' }
  };

  const basePrice = 485000;
  const currentPrice = basePrice + (metalPresets[selectedMetal]?.priceAdj || 0) + (stonePresets[selectedStone]?.priceAdj || 0);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFCF9F5);
    scene.fog = new THREE.FogExp2(0xFCF9F5, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 2.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Environment using RoomEnvironment & PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

    // Damped OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2.2;
    controls.maxDistance = 8.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.target.set(0, 0.7, 0);

    // Studio PBR Lighting
    const keyLight = new THREE.DirectionalLight(0xFFF6EA, 1.8);
    keyLight.position.set(3.5, 6.0, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xFAF7F3, 0x423C37, 0.85);
    scene.add(hemiLight);

    const diamondRimLight = new THREE.DirectionalLight(0xEAF2FF, 1.4);
    diamondRimLight.position.set(-3.5, 5.0, -3.0);
    scene.add(diamondRimLight);

    const sparkleSparkLight = new THREE.PointLight(0xFFFFFF, 1.5, 4);
    sparkleSparkLight.position.set(0.6, 2.2, 1.2);
    scene.add(sparkleSparkLight);

    // Procedural Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d');
    if (sctx) {
      const shadowGrad = sctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      shadowGrad.addColorStop(0, 'rgba(41, 37, 34, 0.45)');
      shadowGrad.addColorStop(0.35, 'rgba(41, 37, 34, 0.22)');
      shadowGrad.addColorStop(0.7, 'rgba(41, 37, 34, 0.08)');
      shadowGrad.addColorStop(1, 'rgba(41, 37, 34, 0.0)');
      sctx.fillStyle = shadowGrad;
      sctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    // Presentation Turntable
    const pedestalGeo = new THREE.CylinderGeometry(2.2, 2.3, 0.2, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xF7F4EF,
      roughness: 0.85,
      metalness: 0.02
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.1;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    const shadowPlaneGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.005;
    scene.add(shadowMesh);

    // --- Composite 12-Part Procedural Solitaire Model ---
    const ringRoot = new THREE.Group();
    scene.add(ringRoot);

    const initialM = metalPresets[initialMetalId] || metalPresets['18k_yellow'];
    const shankMaterial = new THREE.MeshStandardMaterial({
      color: initialM.color,
      roughness: initialM.roughness,
      metalness: initialM.metalness,
      envMapIntensity: 1.4
    });

    const prongMaterial = new THREE.MeshStandardMaterial({
      color: initialM.color,
      roughness: 0.11,
      metalness: 0.99,
      envMapIntensity: 1.6
    });

    const initialS = stonePresets[initialStone] || stonePresets['diamond'];
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: initialS.color,
      transmission: initialS.transmission,
      opacity: 1.0,
      transparent: true,
      roughness: initialS.roughness,
      ior: initialS.ior,
      reflectivity: 0.95,
      clearcoat: 1.0,
      envMapIntensity: 2.5
    });

    const paveMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.9,
      transparent: true,
      roughness: 0.02,
      ior: 2.4,
      envMapIntensity: 2.0
    });

    // 1. Ring Shank Band
    const ringRadius = 0.9;
    const tubeRadius = 0.095;
    const shankGeo = new THREE.TorusGeometry(ringRadius, tubeRadius, 24, 72);
    const shankMesh = new THREE.Mesh(shankGeo, shankMaterial);
    shankMesh.castShadow = true;
    shankMesh.receiveShadow = true;
    ringRoot.add(shankMesh);

    // 2 & 3. Cathedral Arches
    const createCathedralArch = (angle: number) => {
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(Math.cos(angle) * ringRadius, Math.sin(angle) * ringRadius, 0),
        new THREE.Vector3(Math.cos(angle) * 0.92, 0.95, 0.05),
        new THREE.Vector3(0.18 * (angle > Math.PI / 2 ? -1 : 1), 1.08, 0.03),
        new THREE.Vector3(0.08 * (angle > Math.PI / 2 ? -1 : 1), 1.15, 0)
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.05, 12, false);
      const mesh = new THREE.Mesh(tubeGeo, shankMaterial);
      mesh.castShadow = true;
      return mesh;
    };
    ringRoot.add(createCathedralArch(Math.PI * 0.58));
    ringRoot.add(createCathedralArch(Math.PI * 0.42));

    // 4. Collet Rim
    const colletGeo = new THREE.TorusGeometry(0.38, 0.035, 16, 36);
    const colletMesh = new THREE.Mesh(colletGeo, shankMaterial);
    colletMesh.rotation.x = Math.PI / 2;
    colletMesh.position.set(0, 1.14, 0);
    colletMesh.castShadow = true;
    ringRoot.add(colletMesh);

    // 5-8. 4 Slanted Claw Prongs with Spherical Tips
    const prongsGroup = new THREE.Group();
    const prongAngles = [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75];
    prongAngles.forEach((ang) => {
      const prongSingle = new THREE.Group();
      const pStemGeo = new THREE.CylinderGeometry(0.032, 0.045, 0.38, 12);
      const pStem = new THREE.Mesh(pStemGeo, prongMaterial);
      pStem.castShadow = true;
      prongSingle.add(pStem);

      const pTipGeo = new THREE.SphereGeometry(0.036, 12, 12);
      const pTip = new THREE.Mesh(pTipGeo, prongMaterial);
      pTip.position.y = 0.19;
      pTip.castShadow = true;
      prongSingle.add(pTip);

      const rad = 0.34;
      prongSingle.position.set(Math.cos(ang) * rad, 1.22, Math.sin(ang) * rad);
      prongSingle.rotation.z = -Math.cos(ang) * 0.22;
      prongSingle.rotation.x = Math.sin(ang) * 0.22;
      prongsGroup.add(prongSingle);
    });
    ringRoot.add(prongsGroup);

    // 9. Hero Faceted Gemstone Group
    const diamondGroup = new THREE.Group();
    const crownGeo = new THREE.CylinderGeometry(0.38, 0.52, 0.18, 16);
    const crownMesh = new THREE.Mesh(crownGeo, diamondMaterial);
    crownMesh.position.y = 1.34;
    crownMesh.castShadow = true;
    diamondGroup.add(crownMesh);

    const tableGeo = new THREE.CircleGeometry(0.38, 16);
    const tableMesh = new THREE.Mesh(tableGeo, diamondMaterial);
    tableMesh.rotation.x = -Math.PI / 2;
    tableMesh.position.y = 1.431;
    diamondGroup.add(tableMesh);

    const pavilionGeo = new THREE.ConeGeometry(0.52, 0.42, 16);
    const pavilionMesh = new THREE.Mesh(pavilionGeo, diamondMaterial);
    pavilionMesh.rotation.x = Math.PI;
    pavilionMesh.position.y = 1.04;
    pavilionMesh.castShadow = true;
    diamondGroup.add(pavilionMesh);

    const sc = shapeScales[initialShape] || shapeScales['oval'];
    diamondGroup.scale.set(sc.x, sc.y, sc.z);
    ringRoot.add(diamondGroup);

    // 10. Micro-Pavé Accent Diamonds
    const paveGroup = new THREE.Group();
    const paveAngles = [0.38, 0.43, 0.48, 0.53, 0.58, 2.56, 2.61, 2.66, 2.71, 2.76];
    paveAngles.forEach((a) => {
      const gemGeo = new THREE.OctahedronGeometry(0.045, 1);
      const gemMesh = new THREE.Mesh(gemGeo, paveMaterial);
      gemMesh.position.set(Math.cos(a) * ringRadius, Math.sin(a) * ringRadius, tubeRadius * 0.7);
      gemMesh.rotation.z = a;
      paveGroup.add(gemMesh);
    });
    ringRoot.add(paveGroup);

    // 11. Hallmark Plate
    const hallmarkGeo = new THREE.CylinderGeometry(tubeRadius * 0.9, tubeRadius * 0.9, 0.18, 16, 1, true, 0, Math.PI);
    const hallmarkMesh = new THREE.Mesh(hallmarkGeo, prongMaterial);
    hallmarkMesh.position.set(0, -ringRadius, 0);
    ringRoot.add(hallmarkMesh);

    // Flush pivot at bottom center
    ringRoot.position.set(0, ringRadius + tubeRadius, 0);
    ringRoot.rotation.x = 0.25;
    ringRoot.rotation.y = 0.6;

    let isDragging = false;
    const domEl = renderer.domElement;
    const onDown = () => { isDragging = true; };
    const onUp = () => { isDragging = false; };
    domEl.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    sceneRef.current = {
      ringRoot,
      diamondGroup,
      shankMaterial,
      prongMaterial,
      diamondMaterial,
      controls,
      camera,
      isDragging: false
    };

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      clock.getDelta();

      if (autoRotateRef.current && !isDragging) {
        ringRoot.rotation.y += 0.005;
      }

      sparkleSparkLight.position.x = Math.sin(clock.getElapsedTime() * 1.5) * 1.2;
      sparkleSparkLight.position.z = Math.cos(clock.getElapsedTime() * 1.5) * 1.2;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync Metal Changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const p = metalPresets[selectedMetal];
    if (p) {
      sceneRef.current.shankMaterial.color.setHex(p.color);
      sceneRef.current.shankMaterial.roughness = p.roughness;
      sceneRef.current.shankMaterial.metalness = p.metalness;
      sceneRef.current.prongMaterial.color.setHex(p.color);
    }
  }, [selectedMetal]);

  // Sync Stone Changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const s = stonePresets[selectedStone];
    if (s) {
      sceneRef.current.diamondMaterial.color.setHex(s.color);
      sceneRef.current.diamondMaterial.transmission = s.transmission;
      sceneRef.current.diamondMaterial.roughness = s.roughness;
      sceneRef.current.diamondMaterial.ior = s.ior;
    }
  }, [selectedStone]);

  // Sync Shape Changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const sc = shapeScales[selectedShape] || shapeScales['oval'];
    sceneRef.current.diamondGroup.scale.set(sc.x, sc.y, sc.z);
  }, [selectedShape]);

  // Camera & Zoom Helpers
  const resetAllConfiguration = () => {
    setSelectedMetal('18k_yellow');
    setSelectedStone('diamond');
    setSelectedShape('oval');
    setIsAutoRotate(true);
    if (sceneRef.current) {
      sceneRef.current.controls.reset();
      sceneRef.current.ringRoot.rotation.set(0.25, 0.6, 0);
    }
  };

  const zoomIn = () => {
    if (!sceneRef.current) return;
    const cam = sceneRef.current.camera;
    const target = sceneRef.current.controls.target;
    cam.position.lerp(target, 0.15);
    sceneRef.current.controls.update();
  };

  const zoomOut = () => {
    if (!sceneRef.current) return;
    const cam = sceneRef.current.camera;
    const target = sceneRef.current.controls.target;
    const dir = new THREE.Vector3().subVectors(cam.position, target).normalize();
    cam.position.addScaledVector(dir, 0.6);
    sceneRef.current.controls.update();
  };

  const handleAddCustomToBag = () => {
    if (onAddToCart) {
      onAddToCart({
        metalId: selectedMetal,
        metalName: metalPresets[selectedMetal]?.label || selectedMetal,
        stoneId: selectedStone,
        stoneName: stonePresets[selectedStone]?.label || selectedStone,
        shape: selectedShape,
        price: currentPrice
      });
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#FCF9F5] overflow-hidden select-none font-sans">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

      {/* Top Header Watermark & Brand Identifier */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <RivaLogo variant="full" />
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#745548] mt-1 font-semibold">
          3D Interactive Haute Joaillerie Atelier
        </p>
      </div>

      {/* Top Right Controls & Close */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 bg-white/90 border border-[#E8E2D9] px-3 py-1.5 rounded-xs shadow-xs text-[10px] uppercase tracking-widest text-[#745548]">
          <ShieldCheck size={13} className="text-[#D6BD9A]" />
          <span>Real-time PBR Optics • Drag & Pinch</span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#292522] text-[#FAF7F3] hover:bg-[#A17E70] transition-colors shadow-md"
            title="Return to Collections"
            aria-label="Close 3D Studio"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Dedicated Floating Zoom & Orbit Controls (Right Edge) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#292522] border border-[#E8E2D9] shadow-md flex items-center justify-center transition-all"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={zoomOut}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#292522] border border-[#E8E2D9] shadow-md flex items-center justify-center transition-all"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={resetAllConfiguration}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#292522] border border-[#E8E2D9] shadow-md flex items-center justify-center transition-all"
          title="Reset All Configurations & View"
          aria-label="Reset Configuration"
        >
          <RefreshCw size={16} />
        </button>
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`w-10 h-10 rounded-full border shadow-md flex items-center justify-center transition-all ${
            isAutoRotate ? 'bg-[#292522] text-[#D6BD9A] border-[#292522]' : 'bg-white/90 text-[#292522] border-[#E8E2D9]'
          }`}
          title={isAutoRotate ? 'Pause 360° Rotation' : 'Start 360° Rotation'}
          aria-label="Toggle Auto Rotation"
        >
          <RotateCcw size={16} className={isAutoRotate ? 'animate-spin' : ''} style={{ animationDuration: '6s' }} />
        </button>
      </div>

      {/* Notification Toast for Bag */}
      {addedToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#292522] text-[#FAF7F3] px-5 py-3 rounded-xs shadow-2xl border border-[#D6BD9A]/50 flex items-center gap-2 text-xs tracking-wider animate-slide-down">
          <Check size={16} className="text-[#D6BD9A]" />
          <span>Bespoke 3D configuration added to your Shopping Bag</span>
        </div>
      )}

      {/* Floating Interactive Studio Configurator Dock */}
      <div 
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-2xl bg-[#FCF9F5]/98 border border-[#E8E2D9] rounded-sm p-4 shadow-2xl z-20 backdrop-blur-md transition-all duration-300 ${
          isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : ''
        }`}
      >
        {/* Dock Drag Handle / Collapse Toggle */}
        <div 
          onClick={() => setIsDockCollapsed(!isDockCollapsed)}
          className="w-full h-3 flex items-center justify-center cursor-pointer mb-2"
          title={isDockCollapsed ? 'Expand Studio Panel' : 'Minimize Studio Panel'}
        >
          <div className="w-12 h-1 bg-[#82746F] rounded-full" />
        </div>

        {/* Header Bar: Spec Summary & Pricing */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#E8E2D9] gap-2 mb-3">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#745548] block">
              BESPOKE SOLITAIRE CONFIGURATION
            </span>
            <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1C1A]">
              {shapeScales[selectedShape]?.label} • {stonePresets[selectedStone]?.label.split(' ')[0]}
            </h3>
            <span className="text-[11px] text-[#6B6560]">
              {metalPresets[selectedMetal]?.label} • Hand-rubbed comfort bezel
            </span>
          </div>

          <div className="text-left sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto">
            <span className="text-[10px] uppercase tracking-wider text-[#745548] font-medium hidden sm:block">
              Configured Investment
            </span>
            <span className="font-serif text-lg sm:text-xl font-medium text-[#292522]">
              {formatPrice(currentPrice)}
            </span>
          </div>
        </div>

        {/* 1. Metal Options */}
        <div className="mb-2.5">
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#745548] block mb-1">
            1. Precious Metal Alloy
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {Object.entries(metalPresets).map(([key, item]) => {
              const isSelected = selectedMetal === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMetal(key)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-medium tracking-wider rounded-xs border transition-all ${
                    isSelected 
                      ? 'bg-[#292522] text-[#FAF7F3] border-[#292522] shadow-xs' 
                      : 'bg-white text-[#292522] border-[#E8E2D9] hover:border-[#82746F]'
                  }`}
                >
                  <span 
                    className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: '#' + item.color.toString(16).padStart(6, '0') }}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Diamond Cut / Shape Options */}
        <div className="mb-2.5">
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#745548] block mb-1">
            2. Solitaire Diamond Cut & Silhouette
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {(Object.keys(shapeScales) as DiamondShape[]).map((shapeKey) => {
              const isSelected = selectedShape === shapeKey;
              return (
                <button
                  key={shapeKey}
                  onClick={() => setSelectedShape(shapeKey)}
                  className={`px-2.5 py-1.5 text-[10px] font-medium tracking-wider rounded-xs border text-center transition-all ${
                    isSelected 
                      ? 'bg-[#292522] text-[#FAF7F3] border-[#292522] shadow-xs' 
                      : 'bg-white text-[#292522] border-[#E8E2D9] hover:border-[#82746F]'
                  }`}
                >
                  {shapeScales[shapeKey].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Gemstone & Diamond Optical Grade */}
        <div className="mb-3">
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#745548] block mb-1">
            3. Center Gemstone Selection
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {Object.entries(stonePresets).map(([key, item]) => {
              const isSelected = selectedStone === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStone(key)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-[10px] font-medium tracking-wider rounded-xs border whitespace-nowrap transition-all ${
                    isSelected 
                      ? 'bg-[#A17E70] text-[#FAF7F3] border-[#A17E70] shadow-xs' 
                      : 'bg-white text-[#292522] border-[#E8E2D9] hover:border-[#82746F]'
                  }`}
                >
                  <Sparkles size={11} className={isSelected ? 'text-[#FAF7F3]' : 'text-[#D6BD9A]'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTAs: Add to Bag & Consultation */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-[#E8E2D9]">
          <button
            onClick={handleAddCustomToBag}
            className="w-full sm:flex-1 py-3 bg-[#292522] text-[#FAF7F3] hover:bg-[#A17E70] text-xs uppercase tracking-widest font-semibold rounded-xs shadow transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} className="text-[#D6BD9A]" />
            <span>Add Configured Piece to Bag</span>
          </button>

          {onOpenConsultation && (
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-4 py-3 bg-white border border-[#292522] text-[#292522] hover:bg-[#292522] hover:text-[#FAF7F3] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Calendar size={14} />
              <span>Salon Consultation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
