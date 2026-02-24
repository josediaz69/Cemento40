
import { NavItem } from './types';

export interface SubItem {
  id: string;
  label: string;
}

export interface DetailedNavItem extends NavItem {
  subItems?: SubItem[];
}

export interface CementPlant {
  id: string;
  name: string;
  location: string;
  company: string;
  capacity: string;
  focus: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  category: 'Kiln' | 'Grinding' | 'CFD' | 'Audit';
  description: string;
  kpi: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  education: string[];
  experience: string;
  expertise: string[];
}

export const COLOMBIAN_PLANTS: CementPlant[] = [
  { id: '1', name: 'Planta Cartagena', company: 'Argos', location: 'Bolívar', capacity: '2.5 MTPA', focus: ['Exportación', 'Hornos Rotativos'] },
  { id: '2', name: 'Planta Nobsa', company: 'Holcim', location: 'Boyacá', capacity: '2.1 MTPA', focus: ['Co-procesamiento', 'Ciclones'] },
  { id: '3', name: 'Planta Maceo', company: 'Cemex', location: 'Antioquia', capacity: '1.2 MTPA', focus: ['Eficiencia Energética', 'Molienda'] },
  { id: '4', name: 'Planta Galapa', company: 'Ultracem', location: 'Atlántico', capacity: '1.0 MTPA', focus: ['Transporte Neumático', 'Ciclones'] },
  { id: '5', name: 'Planta San Marcos', company: 'Cementos San Marcos', location: 'Valle del Cauca', capacity: '0.6 MTPA', focus: ['Optimización de Llama', 'Combustibles'] },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Modernización de Enfriador de Clinker',
    client: 'Argos',
    location: 'Cartagena, Colombia',
    category: 'Kiln',
    description: 'Rediseño de flujos de aire secundario y terciario para mejorar la recuperación térmica.',
    kpi: '-12 kCal/kg clk',
    image: '/images/enfriador_clinker.jpg'
  },
  {
    id: 'p2',
    title: 'Optimización CFD de Torre de Precalentamiento',
    client: 'Holcim',
    location: 'Nobsa, Boyacá',
    category: 'CFD',
    description: 'Modelamiento de pérdida de presión en ciclones de etapa 4 y 5 mediante OpenFOAM.',
    kpi: '-5 mbar ΔP',
    image: '/images/optimizacion_preca.jpg'
  },
  {
    id: 'p3',
    title: 'Auditoría Integral de Molienda de Cemento',
    client: 'Cemex',
    location: 'Maceo, Antioquia',
    category: 'Audit',
    description: 'Balance de masa y energía en circuito cerrado con separador de alta eficiencia.',
    kpi: '+8 tph Producción',
    image: '/images/auditoria_integral_molienda.jpg'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'm1',
    name: 'Jose M. Diaz',
    role: 'Lead Process Engineer',
    education: [
      'Master Ingenieria Ambiental-Ingeniero Electronico - Universidad del Cauca-Colombia',
      'Especialista en Machine Learning-Image Processing - Coursera U. Standford',
      'Diseno de Software - Modelamiento con OpenFoam - IBM Rational Rose'
    ],
    experience: '30+ años en optimización de hornos rotativos y balances térmicos globales (Cemento Panam).',
    expertise: ['Balances de Masa', 'Combustión Alterna (AFR)', 'Puesta en Marcha']
  },
  {
    id: 'm2',
    name: 'Ing. Jose Daniel Diaz',
    role: 'Ingeniero de Proceso',
    education: [
      'Ingeniero Industrial Universidad Madre y Maestra - Santiago, Republica Dominicana',
      'Maestria en Energias Renovables - Universidad Catlica Madre y Maestra, Santiago, Republica Dominicana'
    ],
    experience: 'Especialista en ingenieria de Procesos y Comisionamiento.',
    expertise: ['Molienda de Cemento', 'Intercambiadores de Calor', 'Clinkerizacion']
  },
  {
    id: 'm3',
    name: 'Ing. Andres Diaz Serna',
    role: 'Automation & Control Lead',
    education: [
      'Especialización en Ciencia de Datos - Coursera',
      'Especialista en Networking, CCNA Cisco System',
      'Ingeniero Telematico - Universidad Catolica Madre y Maestra, Santiago, Republica Dominicana'
    ],
    experience: 'Líder de migraciones DCS y control experto APC en más de 10 plantas de Latam.',
    expertise: ['Sistemas DCS ABB/Siemens', 'Control Avanzado (APC)', 'Sintonía PID']
  }
];

export const IMAGES = {
  hero: "/images/cemento40.jpg",
  balances: "/images/balances.jpg",
  hornos: "/images/horno.png",
  molienda: "/images/molienda.jpg",
  controlRoom: "/images/control_room.png",
  digitalization: "/images/digitalizacion.png",
  scan3d: "/images/scan_3d.png",
  cfd: "/images/cfd.avif",
  comisionamiento: "/images/comisionamiento.avif",
  auditoria: "/images/auditoria.jpg",
  optimizacion: "/images/optimizacion.avif",

  // CFD Demos
  demoFlame: "/images/combustion_llama.jpg",
  demoCyclone: "/images/separacion_ciclonica.jpg",
  demoCooler: "/images/demo_cooler.jpg",
  transporte: "/images/transporte_neumatico.jpg",
  //Industry_4.0
  gemelo: "images/gemelo_digital.jpg",
  machine: "images/machine_learning.jpg",
  unified: "images/unified_namespace.jpg",
  edge: "images/edge_computing.jpg",
};

export const NAV_ITEMS: DetailedNavItem[] = [
  {
    id: 'proceso',
    label: 'Proceso',
    icon: 'factory',
    subItems: [
      { id: 'balances', label: 'Balances de Masa' },
      { id: 'hornos', label: 'Optimización de Hornos' },
      { id: 'molienda', label: 'Eficiencia de Molienda' },
      { id: 'auditorias', label: 'Auditorías Energéticas' }
    ]
  },
  {
    id: 'optimizacion_plantas',
    label: 'Optimización de Plantas',
    icon: 'speed',
    subItems: [
      { id: 'clinkerizacion', label: 'Clinkerización' },
      { id: 'molienda_finos', label: 'Sistemas de Molienda' },
      { id: 'afr_opt', label: 'Combustibles Alternos' },
      { id: 'apc', label: 'Control Experto' }
    ]
  },
  {
    id: 'cfd',
    label: 'Modelamiento CFD',
    icon: 'fluid_med',
    subItems: [
      { id: 'combustion', label: 'Combustión' },
      { id: 'intercambiadores', label: 'Intercambiadores' },
      { id: 'ciclones', label: 'Diseño de Ciclones' },
      { id: 'neumatico', label: 'Transporte Neumático' }
    ]
  },
  {
    id: 'comisionamiento',
    label: 'Comisionamiento',
    icon: 'rocket_launch',
    subItems: [
      { id: 'pre-com', label: 'Pre-comisionamiento' },
      { id: 'hot-tests', label: 'Pruebas en Caliente' },
      { id: 'ramp-up', label: 'Ramp-up Operativo' },
      { id: 'guarantee', label: 'Pruebas de Garantía' }
    ]
  },
  {
    id: 'auditoria',
    label: 'Auditoría Técnica',
    icon: 'clinical_notes',
    subItems: [
      { id: 'asset-health', label: 'Salud de Activos' },
      { id: 'safety-audit', label: 'Seguridad Operativa' },
      { id: 'bottleneck', label: 'Cuellos de Botella' }
    ]
  },
  {
    id: 'automatizacion',
    label: 'Automatización',
    icon: 'memory',
    subItems: [
      { id: 'dcs', label: 'Sistemas DCS' },
      { id: 'plc', label: 'Lógica PLC' },
      { id: 'scada', label: 'HMI / SCADA' }
    ]
  },
  {
    id: 'control',
    label: 'Control',
    icon: 'tune',
    subItems: [
      { id: 'pid', label: 'Sintonía PID' },
      { id: 'apc', label: 'Control Avanzado' },
      { id: 'instrumentacion', label: 'Instrumentación' }
    ]
  },
  {
    id: 'reingenieria',
    label: 'Reingeniería',
    icon: 'topic',
    subItems: [
      { id: 'digitalizacion', label: 'Planos As-Built' },
      { id: 'escaneo', label: 'Nube de Puntos' },
      { id: 'bim', label: 'Modelado BIM' }
    ]
  },
  {
    id: 'industria40',
    label: 'Industria 4.0',
    icon: 'precision_manufacturing',
    subItems: [
      { id: 'gemelos-digitales', label: 'Gemelos Digitales' },
      { id: 'ml-optimization', label: 'Machine Learning' },
      { id: 'uns', label: 'Unified Namespace' },
      { id: 'edge', label: 'Edge Computing' }
    ]
  },
];
