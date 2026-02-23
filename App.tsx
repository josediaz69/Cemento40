
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
    id: 'flame',
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
    id: 'cyclone',
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
    id: 'cooler',
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
  }
];

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
    ctx.strokeRect(50, h/2 - 60, w - 100, 120);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(50, h/2 + 20, w - 100, 40);
    const gradient = ctx.createRadialGradient(150 + Math.sin(flicker) * 5, h/2, 20, 250, h/2, 250);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); 
    gradient.addColorStop(0.1, 'rgba(255, 240, 100, 0.8)'); 
    gradient.addColorStop(0.3, 'rgba(255, 100, 0, 0.6)');  
    gradient.addColorStop(0.6, 'rgba(150, 20, 0, 0.3)');   
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(250 + Math.sin(flicker) * 2, h/2, 250, 45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, h/2 - 15, 80, 30);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(75, h/2 - 10, 10, 20);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter';
    ctx.fillText('0m', 50, h/2 + 80);
    ctx.fillText('10m', 250, h/2 + 80);
    ctx.fillText('20m', 450, h/2 + 80);
    ctx.fillText('TEMPERATURA GAS (°C)', 200, 40);
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.moveTo(50, h/2 - 50);
    for (let i = 50; i < w - 50; i++) {
      const dist = i - 150;
      const temp = Math.exp(-(dist * dist) / 5000) * 1500;
      const y = h/2 - 20 - (temp / 10);
      ctx.lineTo(i, y + Math.sin(flicker + i/20) * 2);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard title="Balances de Masa y Energía" description="Determinación de eficiencia térmica mediante auditorías integrales de campo." image={IMAGES.balances} />
              <ServiceCard title="Optimización de Llama" description="Ajuste de perfiles térmicos para estabilización de la zona de sinterización." image={IMAGES.hornos} />
              <ServiceCard title="Molienda de Crudo y Cemento" description="Optimización de carga de bolas y ajuste de separadores de alta eficiencia." image={IMAGES.molienda} />
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
                    <li className="flex gap-5">
                      <div className="size-12 shrink-0 bg-blue-50 text-primary rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined">thermostat</span>
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-sm">Reducción de Consumo Térmico</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Implementación de estrategias para reducir el consumo específico (kCal/kg clk) mediante el control de aire secundario y terciario.</p>
                      </div>
                    </li>
                    <li className="flex gap-5">
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

                <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
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
              <div className="bg-slate-900 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col xl:flex-row">
                <div className="w-full xl:w-80 bg-slate-950 border-r border-white/5 p-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Simulation Suite</h4>
                  <div className="flex flex-col gap-2">
                    {CFD_DEMOS.map(demo => (
                      <button key={demo.id} onClick={() => setActiveCfdDemo(demo)} className={`flex flex-col text-left p-4 rounded-2xl transition-all ${activeCfdDemo.id === demo.id ? 'bg-primary text-white scale-[1.02]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
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
                        {activeCfdDemo.id === 'flame' ? <KilnFlameVisual /> : <img src={activeCfdDemo.image} className="w-full h-full object-cover opacity-60 rounded-2xl" alt={activeCfdDemo.title} />}
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIONES RESTANTES (AUDITORIA, ETC) */}
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
                    {['Mapa de Calor Refractario', 'Análisis Vibracional de Rodamientos', 'Medición de Espesores UT', 'Auditoría de Sistemas de Gas'].map((label, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-gray-50 bg-gray-50/50 flex flex-col gap-1">
                        <span className="text-sm font-black text-gray-800">{label}</span>
                        <span className="text-xs text-gray-500">Diagnóstico detallado con recomendaciones de mantenimiento.</span>
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
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
        <div className="flex-1">
          <div className="mb-12">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Business Intelligence</span>
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">Conexión con Cementeras en Colombia</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COLOMBIAN_PLANTS.map((plant) => (
              <button key={plant.id} onClick={() => handleGenerateProposal(plant)} className={`p-6 rounded-3xl border text-left transition-all duration-300 relative group overflow-hidden ${selectedPlant?.id === plant.id ? 'bg-primary border-primary shadow-xl shadow-primary/30' : 'bg-white border-gray-100 hover:border-primary/50 hover:shadow-lg'}`}>
                <h3 className={`text-lg font-black ${selectedPlant?.id === plant.id ? 'text-white' : 'text-gray-900'}`}>{plant.name}</h3>
                <p className={`text-xs font-bold mb-4 ${selectedPlant?.id === plant.id ? 'text-white/80' : 'text-gray-500'}`}>{plant.company} • {plant.location}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[480px] sticky top-24">
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-10 shadow-2xl border border-white/10 min-h-[600px] flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><span className="material-symbols-outlined">auto_awesome</span></div>
              <h2 className="text-white text-xl font-black">AI Proposal Engine</h2>
            </div>
            {selectedPlant ? (
              <div className="flex-1 flex flex-col relative z-10">
                {isGenerating || isSending ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <div className="size-20 border-[6px] border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-white font-black text-lg">Procesando...</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col animate-in fade-in duration-500">
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex-1 overflow-y-auto custom-scrollbar mb-6 max-h-[400px]">
                      <pre className="text-gray-300 text-[13px] font-sans whitespace-pre-wrap leading-relaxed italic">{proposal}</pre>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => handleGenerateProposal(selectedPlant)} className="py-4 bg-white/5 text-white rounded-2xl font-black text-xs border border-white/10">RE-GENERAR</button>
                      <button onClick={handleSendProposal} className="py-4 bg-primary text-white rounded-2xl font-black text-xs shadow-xl shadow-primary/30">ENVIAR AHORA</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <span className="material-symbols-outlined text-5xl text-primary mb-8 animate-bounce">ads_click</span>
                <h3 className="text-white font-black text-2xl mb-4">Motor de Prospección AI</h3>
              </div>
            )}
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
