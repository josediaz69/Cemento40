
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
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p2',
    title: 'Optimización CFD de Torre de Precalentamiento',
    client: 'Holcim',
    location: 'Nobsa, Boyacá',
    category: 'CFD',
    description: 'Modelamiento de pérdida de presión en ciclones de etapa 4 y 5 mediante OpenFOAM.',
    kpi: '-5 mbar ΔP',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p3',
    title: 'Auditoría Integral de Molienda de Cemento',
    client: 'Cemex',
    location: 'Maceo, Antioquia',
    category: 'Audit',
    description: 'Balance de masa y energía en circuito cerrado con separador de alta eficiencia.',
    kpi: '+8 tph Producción',
    image: 'https://images.unsplash.com/photo-1565608087341-404b254583c3?auto=format&fit=crop&q=80&w=800'
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
      'Ingeniero Industrial Universidad Madre y Maestra - Santiago, Re',
      'Maestria en Energias Renovables - Universidad Catlica Madre y Maestra, Santiago '
    ],
    experience: 'Especialista en simulación numérica para la industria pesada. Experta en OpenFOAM y solvers multifásicos.',
    expertise: ['Modelado DPM', 'Intercambiadores de Calor', 'Diseño de Ciclones']
  },
  {
    id: 'm3',
    name: 'Ing. Carlos Ruiz',
    role: 'Automation & Control Lead',
    education: [
      'Especialización en Automatización Industrial - Universidad de São Paulo',
      'Ingeniero Electrónico - Universidad Javeriana'
    ],
    experience: 'Líder de migraciones DCS y control experto APC en más de 10 plantas de Latam.',
    expertise: ['Sistemas DCS ABB/Siemens', 'Control Avanzado (APC)', 'Sintonía PID']
  }
];

export const IMAGES = {
  hero: "/images/cemento40.jpg",
  balances: "https://lh3.googleusercontent.com/aida-public/AB6AXuAugMjm54yg_t86Z1iDF9kbTAIAnIK4-yL_sKYDpq-6mHN0MvpySxwZtrlBABP3NEsLC38aKSXpxMesqgvxHezbq3xx1tOVDfoDtX8E_PUe66dRLeaoq_6O56KvCFshVgnohmLvoirAkvDjA20-EtyaD0ELrONafAgew7dsuufiY_WxEjJKT-L-jHEAif3QvLhxVVfn-idP7GCpNzwdCOzq_T_QYs8pGmipOLKRQDF-s0WhpHau2_nj5YbkATTXAU8_l14ONTEjGBg",
  hornos: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-cGb7Fz5gYUJUcfwHhB-IgaAh-SXTMbcd9mEDQwGcde8yCXIAqU8e9BkeOZ-nfngrfszrVlqd3MakWZ4AzRBEK1611NBsJdZ0VSVJgqwdnCh6OejMaynKP1i8agcZfKPuFIewGBiPAWsyrVdov_Qm0_eqRwYjQGHSjXMVZ1zsqaSphyFF1S8b19G4sfoWB1nZ1WkAeS0YuJ60V41f5TZrdPwZuiuVdisLi_Od9i8z7zOQh18JZRcPttNFCPG9xv0sXAi5r8j8qA4",
  molienda: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNnUloRkbcxlyhH_rD_tcPbCPh7xjOvQ6qVZWGuuE8AF5sQxE2e0Ol_k3DgBwwc38e3VgkCtyF4RDBzwDAM4OZ7CFGpYUpgoJRJIvK1VscMECaDLlNoVeupLGlehckeYQKC-23TuN1x-YCW4pLdqo9e2CZY_qeHT4EmF4sd9O2ARBXTHUaaOTqwVL8533oqZy50tnS583ql1HF2gDRWGpxLAngOrxjts-pm-u8PzwCDAC-5fr0RJRUQy_LZQHqBNgPmN-8jmA6qmA",
  controlRoom: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2qelGGCxsKE35dMWZb1KOwHlDiTNAAZaUlCPqrlLT8rghjiXQENad_9UkRuOSRDPZv1DXB0ZlUS_RjNcHF5ZmHOITfz60wMoMW6605CjiA0yy-zN69SAcsF5YFAr41t_LLbsw-LKrBifVJIRHXn9M2NUl8Kqa3VLnf_wnc6NihMABRjQTsMq9Tzxf654OCSN1ZRjbgGslVZw7TqxJg1vdYM-ylgbggH45Nv5P7REvmAdT5UY0H6hz6wqGOGIQcrCqKNCaqB7YAEU",
  digitalization: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzL8IEmr-JMMYGGY5os-_PJiHNZzzYTllEDUtKjlRKaUnyugdn6tr6CqLngX1HKOXfk1EFdgE0fqTUS4v3fVWEf4ei1tgff5rzGaS6f09qVVmHrAm3sOPmRoGTEmsUUX7UNE9pGFV4e6OS6JgQPn3zy1Iom2np13Pl0vDqVKI_J-y8jFffMTR0Yi9QW1hcnDA-gtSijy9sw9mpWGMOknn9HDM-MwSUNaRBfk0VGXBsu2vZKfc-RgODiKPciOUlRZNrByF5SUJggao",
  scan3d: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRVWthWHgd9AyC_KWtKb1mXu0TgSZJUVFg0COnNFO_sWFgvdnLp2ceasX9qIikAHPtYIl12c2ljkGDVu52gW439Vhv_s1ZjbVz1M6DeRJO6t5mHoJk-_KkjpygXmUxlq_w6qtYJD8HcwYN52Ba7eXRJfuG6-AxSW3MqP2cMgdkGtzJC952m5pqMVk1dOEeAoHDvgz7lHyPJEJQLR0BSG9RhJOflQgTbgS02OTdBXTeA8ec5sL19PR54Oio_vziM5h6ayZ9L0c130E",
  cfd: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000",
  comisionamiento: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1000",
  auditoria: "https://images.unsplash.com/photo-1454165833767-027eeed15689?auto=format&fit=crop&q=80&w=1000",
  optimizacion: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",

  // CFD Demos
  demoFlame: "https://images.unsplash.com/photo-1542125387-c71274d94f0a?auto=format&fit=crop&q=80&w=1000",
  demoCyclone: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000",
  demoCooler: "https://images.unsplash.com/photo-1581093196277-9f608ebab48c?auto=format&fit=crop&q=80&w=1000",
  industry40: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
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
      { id: 'apc_kiln', label: 'Control Experto' }
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
