
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import ServiceCard from './components/ServiceCard';
import GeminiChat from './components/GeminiChat';
import { IMAGES, NAV_ITEMS, COLOMBIAN_PLANTS, PROJECTS, TEAM_MEMBERS, CementPlant } from './constants';
import { generateProposal } from './services/geminiService';

interface SentProposal {
  plantId: string;
  date: string;
  content: string;
  status: 'Entregado' | 'Leído' | 'Respondido';
}

interface CfdDemo {
  id: string;
  title: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  technicalData: string[];
}

const CFD_DEMOS: CfdDemo[] = [
  {
    id: 'combustion',
    title: 'Perfiles de Llama en Horno',
    description: 'Análisis de combustión turbulenta y transferencia de calor radiante para optimizar el consumo de clinker.',
    image: IMAGES.demoFlame,
    stats: [
      { label: 'Temperatura Max', value: '1850°C' },
      { label: 'Longitud de Llama', value: '12m' },
      { label: 'Mesh Nodes', value: '4.2M' }
    ],
    technicalData: [
      'Solver: buoyantSimpleFoam',
      'Radiation Model: P1',
      'Combustion: Eddy Break Up (EBU)',
      'Turbulence: k-epsilon Standard'
    ]
  },
  {
    id: 'ciclones',
    title: 'Eficiencia de Separación',
    description: 'Modelado de trayectorias de partículas (DPM) para maximizar la captura en la torre de precalentamiento.',
    image: IMAGES.demoCyclone,
    stats: [
      { label: 'Captura Eff', value: '98.5%' },
      { label: 'Drop Pressure', value: '12 mbar' },
      { label: 'Particle Size', value: '10-100µm' }
    ],
    technicalData: [
      'Solver: simpleFoam',
      'Phase Interaction: One-way DPM',
      'Particle Distribution: Rosin-Rammler',
      'Mesh: Hex-dominant snappyHexMesh'
    ]
  },
  {
    id: 'intercambiadores',
    title: 'Enfriador de Clinker',
    description: 'Simulación de flujo cruzado aire-clinker para maximizar la recuperación de calor secundario.',
    image: IMAGES.demoCooler,
    stats: [
      { label: 'Recuperación', value: '72%' },
      { label: 'Flujo Aire', value: '1250 Nm³/h' },
      { label: 'Inlet Temp', value: '1350°C' }
    ],
    technicalData: [
      'Solver: chtMultiRegionSimpleFoam',
      'Heat Transfer: Conjugate Heat Transfer',
      'Medium: Porous Media (Clinker Bed)',
      'Convergence: 10e-5 residual limit'
    ]
  },
  {
    id: 'neumatico',
    title: 'Transporte Neumático',
    description: 'Cálculo de transporte neumático en fase diluida y fase densa, diseño completo del proyecto.',
    image: IMAGES.industry40,
    stats: [
      { label: 'Sólido/Aire', value: '45 kg/kg' },
      { label: 'Presión ΔP', value: '0.8 bar' },
      { label: 'Capacidad', value: '120 t/h' }
    ],
    technicalData: [
      'Solver: multiphaseInterFoam',
      'Phase Model: Euler-Euler',
      'Solid Phase: Fluidized particles',
      'Regime: Dense / Dilute phase'
    ]
  }
];

const PneumaticTransportVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState(0);
  const [phase, setPhase] = useState<'dense' | 'dilute'>('dense');

  useEffect(() => {
    const interval = setInterval(() => setFrame(prev => prev + 1), 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
    }
    for (let i = 0; i < h; i += 40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
    }

    // Pipe Shadow
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(52, h / 2 + 42);
    ctx.lineTo(w - 148, h / 2 + 42);
    ctx.quadraticCurveTo(w - 98, h / 2 + 42, w - 98, h / 2 - 8);
    ctx.lineTo(w - 98, 52);
    ctx.stroke();

    // Pipe
    const pipeGradient = ctx.createLinearGradient(0, h / 2 + 30, 0, h / 2 + 50);
    pipeGradient.addColorStop(0, '#1e293b');
    pipeGradient.addColorStop(0.5, '#334155');
    pipeGradient.addColorStop(1, '#1e293b');

    ctx.strokeStyle = pipeGradient;
    ctx.lineWidth = 12;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(50, h / 2 + 40);
    ctx.lineTo(w - 150, h / 2 + 40);
    ctx.quadraticCurveTo(w - 100, h / 2 + 40, w - 100, h / 2 - 10);
    ctx.lineTo(w - 100, 50);
    ctx.stroke();

    // Secondary Pipe Outline
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 14;
    ctx.stroke();

    // Particles Simulation
    const isDense = phase === 'dense';
    const particleCount = isDense ? 80 : 30;
    const speedMultiplier = isDense ? 0.5 : 2.5;

    for (let i = 0; i < particleCount; i++) {
      const offset = (i * (600 / particleCount));
      const t = ((frame * speedMultiplier + offset) % 600) / 600;
      let px, py;

      const jitter = isDense ? 8 : 12;

      if (t < 0.7) {
        px = 50 + t * (w - 200) / 0.7;
        py = h / 2 + 40 + (Math.random() - 0.5) * jitter;
      } else {
        const vt = (t - 0.7) / 0.3;
        px = w - 100 + (Math.random() - 0.5) * jitter;
        py = h / 2 - 10 - vt * (h / 2 + 10);
      }

      ctx.fillStyle = isDense ? '#3b82f6' : '#60a5fa';
      ctx.globalAlpha = isDense ? 0.8 : 0.4;
      ctx.beginPath();
      ctx.arc(px, py, isDense ? 2.5 : 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Phase Indicator Label
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(20, 20, 120, 25);
    ctx.fillStyle = isDense ? '#3b82f6' : '#60a5fa';
    ctx.font = 'bold 10px Inter';
    ctx.fillText(`FASE ${phase.toUpperCase()}`, 35, 36);

  }, [frame, phase]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex-1 bg-slate-950 rounded-[32px] overflow-hidden relative border border-white/5">
        <canvas ref={canvasRef} width={600} height={350} className="w-full h-full object-contain" />

        {/* Phase Toggle Controls */}
        <div className="absolute top-6 left-6 flex gap-2">
          {['dense', 'dilute'].map(p => (
            <button
              key={p}
              onClick={() => setPhase(p as any)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${phase === p ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
            >
              {p === 'dense' ? 'Fase Densa' : 'Fase Diluida'}
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl min-w-[240px]">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="size-1.5 bg-blue-400 rounded-full animate-pulse"></span>
              C40 PNEUMATIC TELEMETRY
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { l: 'Velocity', v: phase === 'dense' ? '4.2 m/s' : '22.8 m/s', u: 'm/s' },
                { l: 'Pressure', v: phase === 'dense' ? '3.8 bar' : '0.6 bar', u: 'bar' },
                { l: 'Material', v: phase === 'dense' ? '92 t/h' : '45 t/h', u: 't/h' }
              ].map(s => (
                <div key={s.l}>
                  <p className="text-[8px] font-bold text-gray-500 uppercase mb-1">{s.l}</p>
                  <p className="text-xs font-black text-white">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Simulation status</span>
            <span className="text-[10px] font-black text-green-500 uppercase">Solver Active (Euler-Euler)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const KilnFlameVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flicker, setFlicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFlicker(prev => prev + 0.1), 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, h / 2 - 60, w - 100, 120);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(50, h / 2 + 20, w - 100, 40);
    const gradient = ctx.createRadialGradient(150 + Math.sin(flicker) * 5, h / 2, 20, 250, h / 2, 250);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.1, 'rgba(255, 240, 100, 0.8)');
    gradient.addColorStop(0.3, 'rgba(255, 100, 0, 0.6)');
    gradient.addColorStop(0.6, 'rgba(150, 20, 0, 0.3)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(250 + Math.sin(flicker) * 2, h / 2, 250, 45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, h / 2 - 15, 80, 30);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(75, h / 2 - 10, 10, 20);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter';
    ctx.fillText('0m', 50, h / 2 + 80);
    ctx.fillText('10m', 250, h / 2 + 80);
    ctx.fillText('20m', 450, h / 2 + 80);
    ctx.fillText('TEMPERATURA GAS (°C)', 200, 40);
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.moveTo(50, h / 2 - 50);
    for (let i = 50; i < w - 50; i++) {
      const dist = i - 150;
      const temp = Math.exp(-(dist * dist) / 5000) * 1500;
      const y = h / 2 - 20 - (temp / 10);
      ctx.lineTo(i, y + Math.sin(flicker + i / 20) * 2);
    }
    ctx.stroke();
  }, [flicker]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex-1 bg-slate-950 rounded-[32px] overflow-hidden relative border border-white/5">
        <canvas ref={canvasRef} width={600} height={350} className="w-full h-full object-contain opacity-90" />
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-xl">
            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Burner Status</p>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-white text-xs font-bold">STABLE FLAME</span>
            </div>
          </div>
        </div>
        <div className="absolute top-6 right-6 h-32 w-10 flex flex-col items-center">
          <div className="flex-1 w-2 bg-gradient-to-t from-blue-500 via-orange-500 to-white rounded-full"></div>
          <span className="text-[8px] text-white font-bold mt-2">2200°C</span>
          <span className="text-[8px] text-white font-bold mt-auto">400°C</span>
        </div>
      </div>
    </div>
  );
};

const CementEngineeringDashboard: React.FC<{ plant: CementPlant }> = ({ plant }) => {
  const psdCanvasRef = useRef<HTMLCanvasElement>(null);
  const trompCanvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation State
  const [d50, setD50] = useState(28);
  const [slope, setSlope] = useState(1.1);
  const [position, setPosition] = useState(32);
  const [noise, setNoise] = useState({ b: 0, r: 0, d: 0, s: 0 });

  // Real-time process jitter simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setNoise({
        b: (Math.random() - 0.5) * 40,   // Blaine jitter +/- 20
        r: (Math.random() - 0.5) * 0.4,  // Residue jitter +/- 0.2
        d: (Math.random() - 0.5) * 0.8,   // d50 jitter +/- 0.4
        s: (Math.random() - 0.5) * 0.02  // Slope jitter
      });
    }, 800);
    return () => clearInterval(timer);
  }, []);

  // Sync position (product fineness) with d50 (separator cut)
  // In reality, x_p is influenced by separator d50 and milling efficiency
  const activePosition = position + (d50 - 28) * 0.5;
  const activeSlope = slope + noise.s;

  // Dynamic calculations based on Rosin-Rammler + Noise
  const baseResidue45 = Math.exp(-Math.pow(45 / activePosition, activeSlope)) * 100;
  const residue45 = Math.max(0.1, baseResidue45 + noise.r);

  const baseResidue32 = Math.exp(-Math.pow(32 / activePosition, activeSlope)) * 100;
  const residue32 = Math.max(0.1, baseResidue32 + (noise.r * 0.8));

  const baseBlaine = (120000 / activePosition) * (1 + (activeSlope - 1) * 0.2);
  const blaine = Math.round(baseBlaine + noise.b);

  const liveD50 = d50 + noise.d;

  // Statistical metrics
  const x50 = activePosition * Math.pow(Math.log(2), 1 / activeSlope);
  const stdDev = (10 / activeSlope).toFixed(2); // Simulated std dev based on n

  // Specific Energy Consumption Calculation (kWh/t)
  // Higher Blaine = Higher energy consumption
  const baseEnergy = 28;
  const finenessFactor = Math.max(0, (blaine - 2800) * 0.006);
  const specificEnergy = (baseEnergy + finenessFactor + (noise.b / 25)).toFixed(1);

  useEffect(() => {
    const psdCanvas = psdCanvasRef.current;
    if (!psdCanvas) return;
    const ctx = psdCanvas.getContext('2d');
    if (!ctx) return;
    const w = psdCanvas.width;
    const h = psdCanvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const x = (w / 4) * i;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      const y = (h / 4) * i;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;

    for (let x_val = 0.5; x_val < 100; x_val++) {
      const px = (x_val / 100) * w;
      // Inject slight jitter into the curve rendering too
      const jitterPos = activePosition + (noise.r * 2);
      const passing = (1 - Math.exp(-Math.pow(x_val / jitterPos, activeSlope))) * 100;
      const py = h - (passing / 100) * h;
      if (x_val === 0.5) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '8px Inter';
    ctx.fillText('1µm', 5, h - 5);
    ctx.fillText('100µm', w - 30, h - 5);
    ctx.fillText('PSD Cum %', 5, 12);
  }, [activeSlope, activePosition, noise]);

  useEffect(() => {
    const trompCanvas = trompCanvasRef.current;
    if (!trompCanvas) return;
    const ctx = trompCanvas.getContext('2d');
    if (!ctx) return;
    const w = trompCanvas.width;
    const h = trompCanvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, w, h);

    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;

    for (let x_val = 0; x_val < 100; x_val++) {
      const px = (x_val / 100) * w;
      const eff = 1 / (1 + Math.exp(-0.2 * (x_val - liveD50)));
      const py = h - (eff * h);
      if (x_val === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    const d50x = (liveD50 / 100) * w;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(d50x, h);
    ctx.lineTo(d50x, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(d50x, h / 2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'black 9px Inter';
    ctx.fillText(`d50 = ${liveD50.toFixed(1)}µm`, d50x + 8, h / 2);
  }, [liveD50]);

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-[48px] p-10 border border-white/10 shadow-3xl relative overflow-hidden group/dash">
      {/* Background Cyber-Grid Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute -top-24 -right-24 size-64 bg-primary/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-24 -left-24 size-64 bg-indigo-500/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 flex flex-col gap-12">
        {/* Header and Core Metrics */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="size-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <span className="material-symbols-outlined text-2xl font-bold">query_stats</span>
              </div>
              <div>
                <h4 className="text-white font-black text-2xl uppercase tracking-tighter">Control de Molienda Dinámico</h4>
                <p className="text-blue-400/60 text-[10px] font-black uppercase tracking-[0.3em]">C40 Engine • Real-Time Digital Twin • {plant.name}</p>
              </div>
            </div>
          </div>

          {/* Primary Engineering KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 w-full xl:w-auto">
            {[
              { label: 'Blaine', value: blaine.toLocaleString(), unit: 'cm²/g', color: 'primary' },
              { label: 'Consumo Esp.', value: specificEnergy, unit: 'kWh/t', color: 'green-400' },
              { label: 'Desv. Est. (σ)', value: stdDev, unit: 'n-factor', color: 'indigo-400' },
              { label: 'x50 median', value: x50.toFixed(1), unit: 'µm', color: 'white' },
              { label: 'Retenido 32µ', value: residue32.toFixed(1) + '%', unit: 'Ref: 12%', color: 'orange-400' },
              { label: 'Retenido 45µ', value: residue45.toFixed(1) + '%', unit: 'Lim: 5.0%', color: residue45 > 5 ? 'red-400' : 'cyan-400' }
            ].map(kpi => (
              <div key={kpi.label} className="bg-white/5 border border-white/10 px-5 py-4 rounded-[24px] text-center min-w-[130px] backdrop-blur-sm hover:border-white/20 transition-all group/kpi relative overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-${kpi.color} opacity-30 shadow-[0_0_10px_rgba(59,130,246,0.5)]`}></div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">{kpi.label}</p>
                <p className={`text-2xl font-black text-${kpi.color} leading-none tabular-nums tracking-tighter mb-2`}>{kpi.value}</p>
                <p className="text-[8px] font-bold text-gray-500 uppercase">{kpi.unit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="bg-slate-950/50 p-8 rounded-[40px] border border-white/5 flex flex-wrap gap-12 items-center justify-around shadow-inner relative group/controls overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-indigo-500/5 opacity-50"></div>

          {[
            { label: 'Corte Separador d50', value: d50, unit: 'µm', min: 10, max: 60, step: 1, setter: setD50, accent: 'amber-500' },
            { label: 'Pendiente RR (n)', value: slope.toFixed(2), unit: 'Slope', min: 0.8, max: 1.5, step: 0.05, setter: setSlope, accent: 'indigo-500' },
            { label: 'Posición RR (x_p)', value: position, unit: 'µm', min: 15, max: 60, step: 1, setter: setPosition, accent: 'blue-500' }
          ].map(ctrl => (
            <div key={ctrl.label} className="flex flex-col gap-4 relative z-10">
              <div className="flex justify-between items-center w-56">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{ctrl.label}</label>
                <span className={`text-sm font-black text-${ctrl.accent} tabular-nums`}>{ctrl.value}{ctrl.unit === 'µm' ? 'µm' : ''}</span>
              </div>
              <input
                type="range"
                min={ctrl.min}
                max={ctrl.max}
                step={ctrl.step}
                value={typeof ctrl.value === 'string' ? parseFloat(ctrl.value) : ctrl.value}
                onChange={(e) => ctrl.setter(ctrl.step % 1 === 0 ? parseInt(e.target.value) : parseFloat(e.target.value))}
                className={`w-56 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-${ctrl.accent} hover:scale-x-105 transition-transform`}
              />
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-slate-950/40 p-8 rounded-[40px] border border-white/5 relative overflow-hidden group/chart">
            <div className="absolute top-0 right-0 p-6 flex gap-2">
              <div className="size-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
              <div className="size-1.5 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
              <div className="size-1.5 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h5 className="text-gray-100 text-xs font-black uppercase tracking-[0.2em] mb-1">Granulometría de Producto</h5>
                <p className="text-indigo-400/60 text-[9px] font-bold uppercase tracking-widest">Digital Twin PSD • Rosin-Rammler</p>
              </div>
              <span className="material-symbols-outlined text-indigo-500/50">Leaderboard</span>
            </div>
            <div className="h-64 w-full relative">
              <canvas ref={psdCanvasRef} width={600} height={256} className="w-full h-full" />
            </div>
            <div className="mt-6 flex justify-between text-[9px] font-black text-gray-600 uppercase tracking-widest px-2">
              <span className="flex items-center gap-2"><div className="size-1.5 bg-indigo-500 rounded-full"></div> Ultra-Finos</span>
              <span>Distribución por Tamaño (µm)</span>
              <span className="flex items-center gap-2">Gruesos <div className="size-1.5 bg-transparent border border-gray-600 rounded-full"></div></span>
            </div>
          </div>

          <div className="bg-slate-950/40 p-8 rounded-[40px] border border-white/5 relative overflow-hidden group/chart">
            <div className="absolute top-0 right-0 p-6">
              <div className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md text-[8px] font-black text-amber-500 uppercase tracking-widest">Auto-Scale ON</div>
            </div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h5 className="text-gray-100 text-xs font-black uppercase tracking-[0.2em] mb-1">Eficiencia del Separador</h5>
                <p className="text-amber-500/60 text-[9px] font-bold uppercase tracking-widest">Tromp Efficiency Curve</p>
              </div>
              <span className="material-symbols-outlined text-amber-500/50">settings_input_component</span>
            </div>
            <div className="h-64 w-full">
              <canvas ref={trompCanvasRef} width={600} height={256} className="w-full h-full" />
            </div>
            <div className="mt-6 flex justify-between text-[9px] font-black text-gray-600 uppercase tracking-widest px-2">
              <span>Bypass / Circulante</span>
              <span className="text-amber-500/40 italic">Punto de Corte Dinámico d50</span>
              <span>Sharpness Index</span>
            </div>
          </div>
        </div>

        {/* Process Auxiliary Intelligence */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Carga Bolas', value: '38%', icon: 'settings_slow_motion', trend: 'Optimal' },
            { label: 'Caudal Aire', value: '42k m³/h', icon: 'air', trend: 'Stable' },
            { label: 'Return Feed', value: '185 t/h', icon: 'refresh', trend: 'Nominal' },
            { label: 'Temp. Salida', value: '92°C', icon: 'thermostat', trend: 'Warning' }
          ].map(item => (
            <div key={item.label} className="bg-white/[0.02] border border-white/5 p-5 rounded-[28px] flex items-center gap-5 hover:bg-white/[0.05] transition-all">
              <div className="size-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 border border-white/10 group-hover/dash:text-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-base font-black text-white">{item.value}</p>
                  <span className={`text-[8px] font-black uppercase ${item.trend === 'Optimal' || item.trend === 'Stable' ? 'text-green-500' : item.trend === 'Warning' ? 'text-red-400' : 'text-blue-400'}`}>{item.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('proceso');
  const [currentPage, setCurrentPage] = useState<'home' | 'proyectos' | 'experiencia' | 'contacto' | 'alianzas'>('home');
  const [selectedPlant, setSelectedPlant] = useState<CementPlant | null>(null);
  const [proposal, setProposal] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentHistory, setSentHistory] = useState<SentProposal[]>([]);
  const [activeCfdDemo, setActiveCfdDemo] = useState<CfdDemo>(CFD_DEMOS[0]);

  useEffect(() => {
    if (currentPage !== 'home') return;

    // Configurar Intersection Observer para el Sidebar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Manejar scroll hacia hash si existe tras cambio de página o carga inicial
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    return () => observer.disconnect();
  }, [currentPage]);

  const handleGenerateProposal = async (plant: CementPlant) => {
    setSelectedPlant(plant);
    setIsGenerating(true);
    setProposal('');
    try {
      const text = await generateProposal(plant.name, plant.company, plant.focus.join(', '));
      setProposal(text || 'No se pudo generar la propuesta.');
    } catch (error) {
      setProposal('Error al conectar con Gemini AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendProposal = () => {
    if (!selectedPlant || !proposal) return;
    setIsSending(true);
    setTimeout(() => {
      const newSent: SentProposal = {
        plantId: selectedPlant.id,
        date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        content: proposal,
        status: 'Entregado'
      };
      setSentHistory(prev => [newSent, ...prev]);
      setIsSending(false);
      setProposal('');
      alert(`Propuesta técnica enviada con éxito a ${selectedPlant.company} - ${selectedPlant.name}`);
    }, 2500);
  };

  const renderHome = () => (
    <>
      <Hero />
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row py-12 px-4 lg:px-10 gap-12">
        <Sidebar activeSection={activeSection} />
        <main className="flex-1 flex flex-col gap-24 lg:gap-32 pb-24">

          {/* SECCIÓN 1: PROCESO */}
          <section id="proceso" className="scroll-mt-28">
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex items-center gap-2.5 text-primary">
                <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">factory</span></div>
                <span className="uppercase tracking-[0.25em] text-[10px] font-black">Ingeniería de Proceso</span>
              </div>
              <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight leading-tight">Auditoría de Procesos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="balances" className="scroll-mt-32">
                <ServiceCard title="Balances de Masa y Energía" description="Determinación de eficiencia térmica mediante auditorías integrales de campo." image={IMAGES.balances} />
              </div>
              <div id="hornos" className="scroll-mt-32">
                <ServiceCard title="Optimización de Llama" description="Ajuste de perfiles térmicos para estabilización de la zona de sinterización." image={IMAGES.hornos} />
              </div>
              <div id="molienda" className="scroll-mt-32">
                <ServiceCard title="Molienda de Crudo y Cemento" description="Optimización de carga de bolas y ajuste de separadores de alta eficiencia." image={IMAGES.molienda} />
              </div>
              <div id="auditorias" className="scroll-mt-32">
                <ServiceCard title="Auditorías Técnicas" description="Evaluación de KPI térmicos y eléctricos para reducción de huella de carbono." image={IMAGES.optimizacion} />
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: OPTIMIZACIÓN DE PLANTAS CEMENTERAS */}
          <section id="optimizacion_plantas" className="scroll-mt-28">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">speed</span></div>
                  <span className="uppercase tracking-[0.25em] text-[10px] font-black">Optimización Integral</span>
                </div>
                <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight leading-tight">Servicios para Plantas Cementeras</h2>
                <p className="text-gray-600 text-lg max-w-3xl font-medium">Soluciones enfocadas en la rentabilidad operativa y la descarbonización mediante eficiencia térmica.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-black text-gray-900 mb-6">Kiln & Cooler Efficiency</h3>
                  <ul className="space-y-6">
                    <li id="clinkerizacion" className="flex gap-5 scroll-mt-32">
                      <div className="size-12 shrink-0 bg-blue-50 text-primary rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined">thermostat</span>
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-sm">Reducción de Consumo Térmico</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Implementación de estrategias para reducir el consumo específico (kCal/kg clk) mediante el control de aire secundario y terciario.</p>
                      </div>
                    </li>
                    <li id="afr_opt" className="flex gap-5 scroll-mt-32">
                      <div className="size-12 shrink-0 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined">local_fire_department</span>
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-sm">Combustibles Alternativos (AFR)</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Diseño y optimización de cámaras de combustión para maximizar la tasa de sustitución térmica (TSR) de residuos.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div id="molienda_finos" className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group scroll-mt-32">
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black mb-6 text-primary">Grinding Circuit Optimization</h3>
                      <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">Mejoramos el consumo eléctrico específico (kWh/t) en molinos de bolas y prensas de rodillos, asegurando la finura Blaine deseada.</p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-xs font-bold text-gray-400">Incremento de Producción</span>
                          <span className="text-primary font-black">+15% TPH</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-xs font-bold text-gray-400">Ahorro Energético</span>
                          <span className="text-green-400 font-black">-10 kWh/t</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-10 py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl font-black text-xs tracking-widest transition-all border border-white/20 uppercase">
                      Solicitar Auditoría de Molienda
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-[180px]">settings_suggest</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CFD y Simulaciones */}
          <section id="cfd" className="scroll-mt-28">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">fluid_med</span></div>
                  <span className="uppercase tracking-[0.25em] text-[10px] font-black">Dinámica de Fluidos (CFD)</span>
                </div>
                <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight leading-tight">Modelamiento OpenFOAM</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div id="combustion" className="scroll-mt-32">
                  <ServiceCard title="Combustión de Llama" description="Optimización de quemadores y dispersión de combustibles alternos." icon="local_fire_department" image={IMAGES.demoFlame} />
                </div>
                <div id="intercambiadores" className="scroll-mt-32">
                  <ServiceCard title="Intercambiadores de Calor" description="Enfriadores y torres de precalentamiento para recuperación térmica." icon="heat_pump" image={IMAGES.demoCooler} />
                </div>
                <div id="ciclones" className="scroll-mt-32">
                  <ServiceCard title="Separación Ciclónica" description="Modelado DPM para maximizar eficiencia de captura de polvos." icon="cyclone" image={IMAGES.demoCyclone} />
                </div>
                <div id="neumatico" className="scroll-mt-32">
                  <ServiceCard title="Transporte Neumático" description="Cálculo en fase diluida y densa, diseño completo del proyecto." icon="air" image={IMAGES.transporte} />
                </div>
              </div>

              <div className="bg-slate-900 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col xl:flex-row">
                <div className="w-full xl:w-80 bg-slate-950 border-r border-white/5 p-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Simulation Suite</h4>
                  <div className="flex flex-col gap-2">
                    {CFD_DEMOS.map(demo => (
                      <button
                        key={demo.id}
                        id={demo.id}
                        onClick={() => setActiveCfdDemo(demo)}
                        className={`flex flex-col text-left p-4 rounded-2xl transition-all scroll-mt-32 ${activeCfdDemo.id === demo.id ? 'bg-primary text-white scale-[1.02]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                      >
                        <span className="font-black text-sm">{demo.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
                    <div>
                      <h3 className="text-3xl font-black text-white mb-4">{activeCfdDemo.title}</h3>
                      <p className="text-gray-400 font-medium leading-relaxed mb-8">{activeCfdDemo.description}</p>
                      <div className="grid grid-cols-3 gap-4">
                        {activeCfdDemo.stats.map(stat => (
                          <div key={stat.label} className="flex flex-col bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</span>
                            <span className="text-lg font-black text-primary">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative group rounded-[32px] overflow-hidden bg-slate-950 flex items-center justify-center p-4 aspect-video">
                      {activeCfdDemo.id === 'combustion' ? <KilnFlameVisual /> :
                        activeCfdDemo.id === 'neumatico' ? <PneumaticTransportVisual /> :
                          <img src={activeCfdDemo.image} className="w-full h-full object-cover opacity-60 rounded-2xl" alt={activeCfdDemo.title} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 4: AUDITORÍA TÉCNICA */}
          <section id="auditoria" className="scroll-mt-28">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">clinical_notes</span></div>
                  <span className="uppercase tracking-[0.25em] text-[10px] font-black">Diagnóstico de Activos</span>
                </div>
                <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight leading-tight">Auditoría Técnica Maestro</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">description</span>
                    Entregables de Ingeniería
                  </h3>
                  <div className="space-y-4">
                    {[
                      { id: 'asset-health', label: 'Salud de Activos', desc: 'Mapa de Calor Refractario y Análisis Vibracional.' },
                      { id: 'safety-audit', label: 'Seguridad Operativa', desc: 'Auditoría de Sistemas de Gas y Estanqueidad.' },
                      { id: 'bottleneck', label: 'Cuellos de Botella', desc: 'Identificación de restricciones mediante gemelos digitales.' }
                    ].map((item, i) => (
                      <div key={i} id={item.id} className="p-4 rounded-2xl border border-gray-50 bg-gray-50/50 flex flex-col gap-1 scroll-mt-32">
                        <span className="text-sm font-black text-gray-800">{item.label}</span>
                        <span className="text-xs text-gray-500">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col justify-center">
                  <div className="relative z-10">
                    <div className="text-primary font-black text-[10px] uppercase tracking-widest mb-2">KPI de Confiabilidad</div>
                    <h4 className="text-4xl font-black text-white">99.2% MTBF</h4>
                    <p className="text-gray-400 text-sm mt-4">Nuestras auditorías previenen paradas no programadas mediante el uso de gemelos digitales y predictivos.</p>
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-10"><span className="material-symbols-outlined text-[150px]">health_and_safety</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 5: COMISIONAMIENTO */}
          <section id="comisionamiento" className="scroll-mt-28">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">rocket_launch</span></div>
                  <span className="uppercase tracking-[0.25em] text-[10px] font-black">Puesta en Marcha</span>
                </div>
                <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight leading-tight">Comisionamiento de Plantas</h2>
                <p className="text-gray-600 text-lg max-w-3xl font-medium">Garantizamos una transición segura y eficiente desde la construcción hasta la operación comercial.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: "pre-com", title: "Pre-comisionamiento", desc: "Verificación estática y chequeo de señales I/O.", icon: "list_alt" },
                  { id: "hot-tests", title: "Pruebas en Caliente", desc: "Arranque de equipos con carga y sintonía primaria.", icon: "local_fire_department" },
                  { id: "ramp-up", title: "Ramp-up Operativo", desc: "Estabilización de producción hasta capacidad nominal.", icon: "trending_up" },
                  { id: "guarantee", title: "Pruebas de Garantía", desc: "Verificación de KPIs contractuales y consumo.", icon: "verified" }
                ].map((item, i) => (
                  <div key={i} id={item.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group scroll-mt-32">
                    <div className="size-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <h4 className="font-black text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECCIÓN 6: AUTOMATIZACIÓN Y CONTROL */}
          <section id="automatizacion" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-between border border-white/5 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 text-primary mb-6">
                    <span className="material-symbols-outlined text-[24px]">memory</span>
                    <span className="uppercase tracking-[0.25em] text-[10px] font-black">Sistemas Industriales</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl xl:text-5xl font-black mb-6 tracking-tight">Automatización DCS / PLC</h2>
                  <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">Integración de sistemas de control líderes (ABB 800xA, Siemens PCS7, Rockwell) para una operación centralizada y segura.</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'dcs', label: 'DCS ABB' },
                      { id: 'plc', label: 'S7-1500 (PLC)' },
                      { id: 'scada', label: 'SCADA Ignitron' },
                      { id: 'ethernet', label: 'EtherNet/IP' }
                    ].map(tech => (
                      <span key={tech.id} id={tech.id} className="px-4 py-2 bg-white/5 rounded-xl text-xs font-bold border border-white/10 scroll-mt-32">{tech.label}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 opacity-5">
                  <span className="material-symbols-outlined text-[300px]">precision_manufacturing</span>
                </div>
              </div>

              <div id="control" className="bg-white rounded-[40px] p-10 border border-gray-100 flex flex-col justify-between scroll-mt-28">
                <div>
                  <div className="flex items-center gap-2.5 text-primary mb-6">
                    <span className="material-symbols-outlined text-[24px]">tune</span>
                    <span className="uppercase tracking-[0.25em] text-[10px] font-black">Capas de Control</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 font-primary">Control Avanzado (APC)</h2>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">Implementamos algoritmos de control predictivo basado en modelos para estabilizar variables críticas y maximizar throughput.</p>
                  <ul className="space-y-4">
                    {[
                      { id: 'pid', t: 'Sintonía de Lazos PID', d: 'Eliminación de oscilaciones en flujos de aire y combustible.' },
                      { id: 'apc', t: 'Control Experto de Horno', d: 'Reducción de desviación estándar en temperatura de clinker.' },
                      { id: 'waste', t: 'Reducción de Desperdicios', d: 'Al ser más precisos, se minimiza el material defectuoso.' },
                      { id: 'autonomy', t: 'Autonomía Operativa', d: 'Las máquinas pueden tomar "decisiones descentralizadas" sin esperar la orden de un supervisor.' },
                      { id: 'know-how', t: 'Preservación del Conocimiento', d: 'El "know-how" de los mejores ingenieros se codifica en el software, evitando que se pierda cuando el personal se jubila.' }
                    ].map((item, i) => (
                      <li key={i} id={item.id} className="flex gap-4 scroll-mt-32">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        <div>
                          <p className="text-sm font-black text-gray-900">{item.t}</p>
                          <p className="text-xs text-gray-500">{item.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 7: REINGENIERÍA */}
          <section id="reingenieria" className="scroll-mt-28">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5 text-primary">
                  <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">topic</span></div>
                  <span className="uppercase tracking-[0.25em] text-[10px] font-black">Ingeniería Digital</span>
                </div>
                <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight leading-tight">Digitalización y Reingeniería</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div id="digitalizacion" className="group relative h-80 rounded-[40px] overflow-hidden scroll-mt-32">
                  <img src={IMAGES.digitalization} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Plano As-Built" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent flex flex-col justify-end p-10">
                    <h3 className="text-white text-2xl font-black mb-2">Planos As-Built</h3>
                    <p className="text-gray-300 text-sm font-medium">Levantamiento preciso de instalaciones existentes y generación de documentación técnica actualizada.</p>
                  </div>
                </div>
                <div id="escaneo" className="group relative h-80 rounded-[40px] overflow-hidden scroll-mt-32">
                  <img src={IMAGES.scan3d} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Escaneo 3D" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-10">
                    <h3 className="text-white text-2xl font-black mb-2">Escaneo 3D Laser</h3>
                    <p className="text-white/80 text-sm font-medium">Nubes de puntos masivas para ingeniería de detalle y detección de interferencias en proyectos brownfield.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nueva Sección: Industria 4.0 */}
            <div id="industria40" className="pt-32 scroll-mt-28">
              <div className="flex flex-col gap-6 mb-16">
                <div className="flex items-center gap-2.5 text-primary">
                  <span className="material-symbols-outlined">precision_manufacturing</span>
                  <span className="uppercase tracking-[0.3em] text-[10px] font-black">Next-Gen Engineering</span>
                </div>
                <h2 className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight leading-tight">Ingeniería Industria 4.0</h2>
                <p className="text-gray-600 text-lg max-w-3xl font-medium leading-relaxed">
                  Conducimos sus plantas con datos y conocimiento a través de soluciones disruptivas para la toma de decisiones en tiempo real.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div id="gemelos-digitales" className="scroll-mt-32">
                  <ServiceCard
                    title="Gemelos Digitales"
                    desc="Réplicas virtuales sincronizadas con la planta física para simulación y predicción de escenarios operativos."
                    icon="dynamic_feed"
                    image={IMAGES.gemelo}
                  />
                </div>
                <div id="ml-optimization" className="scroll-mt-32">
                  <ServiceCard
                    title="Machine Learning"
                    desc="Algoritmos avanzados para la detección temprana de fallas y optimización autónoma de procesos críticos."
                    icon="psychology"
                    image={IMAGES.machine}
                  />
                </div>
                <div id="uns" className="scroll-mt-32">
                  <ServiceCard
                    title="Unified Namespace"
                    desc="Arquitectura de datos unificada para una interoperabilidad total entre el piso de planta y la gerencia."
                    icon="hub"
                    image={IMAGES.unified}
                  />
                </div>
                <div id="edge" className="scroll-mt-32">
                  <ServiceCard
                    title="Edge Computing"
                    desc="Procesamiento de datos en el origen para respuestas de baja latencia y alta disponibilidad de información."
                    icon="router"
                    image={IMAGES.edge}
                  />
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );

  const renderProjects = () => (
    <div className="max-w-[1440px] mx-auto py-20 px-4 lg:px-10">
      <div className="flex flex-col gap-6 mb-16">
        <div className="flex items-center gap-2.5 text-primary">
          <span className="material-symbols-outlined">rocket</span>
          <span className="uppercase tracking-[0.3em] text-[10px] font-black">Track Record</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">Proyectos Ejecutados</h1>
        <p className="text-gray-600 text-lg max-w-2xl font-medium">Resultados tangibles en las plantas más importantes de la región.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
            <div className="h-64 relative overflow-hidden">
              <img src={project.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                <span className="text-primary font-black text-sm">{project.kpi}</span>
              </div>
              <div className="absolute bottom-6 left-6">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg">{project.category}</span>
              </div>
            </div>
            <div className="p-8">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{project.client} • {project.location}</p>
              <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="max-w-[1440px] mx-auto py-20 px-4 lg:px-10">
      <div className="flex flex-col gap-6 mb-16 text-center items-center">
        <div className="flex items-center gap-2.5 text-primary">
          <span className="material-symbols-outlined">workspace_premium</span>
          <span className="uppercase tracking-[0.3em] text-[10px] font-black">Senior Engineering Team</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">Nuestra Experiencia</h1>
        <p className="text-gray-600 text-lg max-w-3xl font-medium">Contamos con un equipo de especialistas con formación doctoral y décadas en la industria cementera global.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="bg-slate-900 rounded-[50px] p-10 text-white border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[180px]">school</span>
            </div>
            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl font-black mb-1">{member.name}</h3>
                <p className="text-primary font-bold text-sm uppercase tracking-widest">{member.role}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Estudios y Formación</h4>
                  <ul className="space-y-2">
                    {member.education.map((edu, i) => (
                      <li key={i} className="text-xs text-gray-300 flex gap-2">
                        <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Trayectoria</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{member.experience}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {member.expertise.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-wider text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlianzas = () => (
    <div className="max-w-[1440px] mx-auto py-20 px-4 md:px-10">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 animate-in fade-in duration-700">
        {/* Plant Selection Column */}
        <div className="flex-1">
          <div className="mb-12">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Business Intelligence</span>
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">Conexión con Cementeras en Colombia</h1>
            <p className="text-gray-600 font-medium text-lg max-w-2xl">Integración directa con los centros operativos más importantes del país para optimización en tiempo real.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COLOMBIAN_PLANTS.map((plant) => (
              <button key={plant.id} onClick={() => handleGenerateProposal(plant)} className={`p-6 rounded-3xl border text-left transition-all duration-300 relative group overflow-hidden ${selectedPlant?.id === plant.id ? 'bg-primary border-primary shadow-xl shadow-primary/30' : 'bg-white border-gray-100 hover:border-primary/50 hover:shadow-lg'}`}>
                <h3 className={`text-lg font-black ${selectedPlant?.id === plant.id ? 'text-white' : 'text-gray-900'}`}>{plant.name}</h3>
                <p className={`text-xs font-bold mb-4 ${selectedPlant?.id === plant.id ? 'text-white/80' : 'text-gray-500'}`}>{plant.company} • {plant.location}</p>
                <div className={`text-[10px] font-black uppercase tracking-widest ${selectedPlant?.id === plant.id ? 'text-white/60' : 'text-primary'}`}>
                  {plant.focus[0]} • {plant.capacity}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Proposal Sticky Sidebar */}
        <div className="w-full lg:w-[480px] lg:sticky lg:top-24">
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-10 shadow-2xl border border-white/10 min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <span className="material-symbols-outlined font-bold">auto_awesome</span>
              </div>
              <h2 className="text-white text-xl font-black tracking-tight">AI Proposal Engine</h2>
            </div>
            {selectedPlant ? (
              <div className="flex-1 flex flex-col relative z-10">
                {isGenerating || isSending ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-8">
                    <div className="relative">
                      <div className="size-24 border-[6px] border-primary/20 border-t-primary rounded-full animate-spin shadow-[0_0_30px_rgba(59,130,246,0.2)]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl animate-pulse">bolt</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-black text-xl mb-2 tracking-tight">{isSending ? 'Transmitiendo Datos...' : 'Generando Propuesta...'}</p>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{isSending ? 'Security: AES-256 TLS' : 'Model: Gemini 1.5 Ultra'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col animate-in fade-in duration-500">
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex-1 overflow-y-auto custom-scrollbar mb-6 max-h-[350px]">
                      <pre className="text-gray-300 text-[13px] font-sans whitespace-pre-wrap leading-relaxed italic">{proposal}</pre>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => handleGenerateProposal(selectedPlant)} className="py-4 bg-white/5 text-white rounded-2xl font-black text-[10px] border border-white/10 hover:bg-white/10 transition-colors uppercase tracking-widest">Re-generar</button>
                      <button onClick={handleSendProposal} className="py-4 bg-primary text-white rounded-2xl font-black text-[10px] shadow-xl shadow-primary/40 hover:bg-blue-600 transition-all uppercase tracking-widest">Enviar Propuesta</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="size-20 bg-primary/10 rounded-[28px] flex items-center justify-center text-primary mb-8 animate-bounce shadow-inner">
                  <span className="material-symbols-outlined text-5xl">ads_click</span>
                </div>
                <h3 className="text-white font-black text-2xl mb-4 tracking-tight leading-tight">Motor de Prospección AI</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Selecciona una planta cementera para generar automáticamente una propuesta técnica basada en sus focos operativos.</p>
              </div>
            )}
            <div className="absolute -bottom-20 -left-20 size-64 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Full Width Simulation Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-10">
          <div className="flex items-center gap-4">
            <div className="size-16 bg-primary/10 rounded-[28px] flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <span className="material-symbols-outlined text-3xl font-bold">hub</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Centro de Simulación Digital</h2>
              <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2 text-primary">
                <span className="size-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
                Protocolo de Comunicación Industrial Activo
              </p>
            </div>
          </div>
          {sentHistory.length > 0 && (
            <div className="flex items-center gap-3 px-6 py-3 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-green-700 text-[11px] font-black uppercase tracking-widest leading-none">Live Engineering Feed</span>
            </div>
          )}
        </div>

        <div className="space-y-12">
          {sentHistory.length > 0 ? (
            sentHistory.map((sent, i) => {
              const plant = COLOMBIAN_PLANTS.find(p => p.id === sent.plantId);
              return (
                <div key={i} className="flex flex-col bg-slate-900 p-8 md:p-12 rounded-[60px] shadow-3xl border border-white/5 animate-in slide-in-from-bottom-10 duration-1000">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/5">
                    <div className="flex items-center gap-8">
                      <div className="size-20 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary relative shadow-inner border border-primary/20">
                        <span className="material-symbols-outlined text-4xl font-bold">sensors</span>
                        <div className="absolute -top-1 -right-1 size-5 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse"></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase text-primary tracking-widest leading-none bg-primary/10 px-2.5 py-1.5 rounded-lg border border-primary/20">{sent.status}</span>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">TLS 1.3 / EDGE-COMPUTE / H256</span>
                        </div>
                        <h4 className="font-black text-white text-3xl tracking-tight">{plant?.company} • {plant?.name}</h4>
                        <p className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-widest italic opacity-60">Sincronización establecida: {sent.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase mb-1.5">Tráfico de Red</p>
                        <p className="text-2xl font-black text-white tabular-nums tracking-tighter">1.2 MB/s</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase mb-1.5">Latencia</p>
                        <p className="text-2xl font-black text-green-400 tabular-nums tracking-tighter">42ms</p>
                      </div>
                      <div className="h-12 w-px bg-white/5 mx-2"></div>
                      <button className="size-14 bg-white/5 hover:bg-primary text-white rounded-[20px] flex items-center justify-center transition-all border border-white/10 group shadow-lg">
                        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">terminal</span>
                      </button>
                    </div>
                  </div>

                  {/* Full Width Dashboard Simulation */}
                  <div className="w-full pt-4">
                    {plant && <CementEngineeringDashboard plant={plant} />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-32 border-2 border-dashed border-gray-100 rounded-[60px] text-center flex flex-col items-center bg-gray-50/20">
              <div className="size-24 bg-white rounded-[32px] flex items-center justify-center text-gray-200 mb-8 shadow-sm">
                <span className="material-symbols-outlined text-6xl">monitoring</span>
              </div>
              <h3 className="text-gray-400 text-2xl font-black mb-2 tracking-tight">Sin Transmisiones Digitales</h3>
              <p className="text-gray-500 text-base font-medium italic max-w-sm">Genera y envía una propuesta técnica para activar la capa de visualización de datos de ingeniería.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderContacto = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-slate-900 py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block">Global Engineering Network</span>
          <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">Hablemos de su Planta</h1>
          <p className="text-gray-400 text-xl font-medium max-w-2xl mx-auto">Expertos en optimización de procesos térmicos y digitalización industrial de alta precisión.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Main Professional Card - Industry 4.0 Leader */}
          <div className="group">
            <div className="bg-slate-900 rounded-[48px] p-10 md:p-12 shadow-3xl border border-white/10 relative overflow-hidden flex flex-col min-h-[600px] transition-transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <span className="material-symbols-outlined text-[200px] text-white">lan</span>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="size-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                    <span className="material-symbols-outlined text-4xl">engineering</span>
                  </div>
                  <div>
                    <h3 className="text-white text-3xl font-black tracking-tight">Cemento40</h3>
                    <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">Industrial Engineering Solutions</p>
                  </div>
                </div>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-6">
                    <div className="size-12 bg-white/5 rounded-xl flex items-center justify-center text-primary border border-white/10">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">HQ Central</p>
                      <p className="text-white font-bold">Santiago de los Caballeros, RD</p>
                      <p className="text-gray-400 text-sm">Operaciones en Colombia, Panamá y Perú.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="size-12 bg-white/5 rounded-xl flex items-center justify-center text-green-400 border border-white/10">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Consultoría Directa</p>
                      <p className="text-white font-bold text-lg">josediaz69@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="size-12 bg-white/5 rounded-xl flex items-center justify-center text-blue-400 border border-white/10">
                      <span className="material-symbols-outlined">hub</span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Especialidad Industria 4.0</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Digital Twins', 'ML Optimization', 'CFD Simulation', 'APC Control'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-300 border border-white/5">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-white/5 pt-10">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-full overflow-hidden border-2 border-primary">
                      <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Jose M. Diaz" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-black">Jose M. Diaz</h4>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Lead Process Engineer - Industry 4.0 Pioneer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -bottom-20 -right-20 size-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
            </div>

            <div className="mt-8 flex gap-4">
              <a href="#" className="flex-1 bg-gray-50 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-xs text-gray-900 border border-gray-100 hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined">description</span>
                CATÁLOGO TÉCNICO
              </a>
              <a href="#" className="flex-1 bg-slate-900 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-xs text-white hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-primary">video_call</span>
                PROGRAMAR TEAMS
              </a>
            </div>
          </div>

          {/* Futuristic Contact Form */}
          <div className="bg-white p-10 md:p-12 rounded-[48px] border border-gray-100 shadow-xl">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Solicitud de Ingeniería</h3>
              <p className="text-gray-500 font-medium">Complete el perfil técnico para una respuesta especializada.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Nombre Completo</label>
                  <input type="text" className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all" placeholder="Ej: Ing. Carlos Pérez" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Empresa / Planta</label>
                  <input type="text" className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all" placeholder="Ej: Cementos Argos" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Correo Corporativo</label>
                <input type="email" className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all" placeholder="c.perez@empresa.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Área de Interés</label>
                <select className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer">
                  <option>Optimización de Hornos Rotativos</option>
                  <option>Eficiencia de Molienda</option>
                  <option>Simulación CFD / DPM</option>
                  <option>Gemelos Digitales & ML</option>
                  <option>Auditoría Energética Integral</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Mensaje Técnico</label>
                <textarea rows={4} className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all" placeholder="Describa brevemente el desafío técnico de su planta..."></textarea>
              </div>

              <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95">
                ENVIAR REQUERIMIENTO
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background-light overflow-x-hidden">
      <Navbar setPage={setCurrentPage} activePage={currentPage} />
      <div className="flex-1 animate-fade-in">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'proyectos' && renderProjects()}
        {currentPage === 'experiencia' && renderExperience()}
        {currentPage === 'alianzas' && renderAlianzas()}
        {currentPage === 'contacto' && renderContacto()}
      </div>
      <footer className="bg-slate-900 py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">engineering</span>
            <span className="text-white font-black text-xl tracking-tighter">Cemento40</span>
          </div>
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">© 2024 Cemento40 Engineering S.A.S.</p>
        </div>
      </footer>
      <GeminiChat />
    </div>
  );
};

export default App;
