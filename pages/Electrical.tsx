import React from 'react';
import { Link } from 'react-router-dom';

const ElectricalServiceCard = ({ title, icon, features }: { title: string, icon: string, features: string[] }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-all duration-300 group h-full">
        <div className="w-14 h-14 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
        <ul className="space-y-3">
            {features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 leading-snug">
                    <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">bolt</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const SoftwareBadge = ({ name }: { name: string }) => (
    <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-600">
        {name}
    </span>
);

const Electrical: React.FC = () => {
    return (
        <div className="animate-fade-in bg-background-light dark:bg-background-dark">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ 
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mb-6 inline-block">
                        Media & Baja Tensión
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Ingeniería Eléctrica Industrial
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        Diseño robusto de sistemas de potencia para la industria pesada. Desde el cálculo de transformadores hasta la coordinación de protecciones y sistemas de puesta a tierra.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-20">
                
                {/* Intro */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Potencia y Confiabilidad</h2>
                        <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300">
                            <p className="mb-4">
                                En la industria del cemento y minería, la continuidad operativa depende de una infraestructura eléctrica sólida. Cemento40 ofrece ingeniería de detalle y conceptual para sistemas de distribución (MV/LV).
                            </p>
                            <p>
                                Utilizamos software de última generación para modelar flujos de carga, cortocircuito y arco eléctrico, asegurando el cumplimiento de normativas internacionales como <strong>IEC, IEEE y NFPA 70E</strong>.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <SoftwareBadge name="ETAP" />
                            <SoftwareBadge name="SKM PowerTools" />
                            <SoftwareBadge name="DigSilent PowerFactory" />
                            <SoftwareBadge name="AutoCAD Electrical" />
                        </div>
                    </div>
                    <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoFje1QM3nMfN_cNmoGjIE5UXc3TMn1qLMYkD03-sUxEE-HCZG5a_pbtSy7eQTJ01W7_JKzla7aEgJmCsYnYChH5VqiMhbfAOgZnNVFbTPLj6nvOEnhn6l80gSPrd5rZKRTUjU2XS38VTDrEzjXnZCK5HS1Mmvl2ZC1tLmKbHul1Bi0-MS-AXcErjRlq0HN_0kGoUFJrwcRJqFwvTlVDjCninURH864NoJm01sQhQxSk6cisRENI8kuhHkxA942GjrrdCGBO4HmBw-')" }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="text-xs font-bold uppercase bg-primary px-2 py-1 rounded mb-2 inline-block">Subestaciones</span>
                            <h4 className="text-xl font-bold">Diseño de CCMs y Switchgear</h4>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Power Engineering */}
                    <ElectricalServiceCard 
                        title="Ingeniería de Potencia"
                        icon="settings_power"
                        features={[
                            "Cálculo y dimensionamiento de Transformadores de Potencia (ONAN/ONAF).",
                            "Diseño de Subestaciones principales y unitarias.",
                            "Estudios de Flujo de Carga y Factor de Potencia.",
                            "Especificación de bancos de capacitores y filtros de armónicos."
                        ]}
                    />

                    {/* Protections */}
                    <ElectricalServiceCard 
                        title="Protecciones Eléctricas"
                        icon="security"
                        features={[
                            "Estudios de Cortocircuito (ANSI/IEC).",
                            "Coordinación de Protecciones (Selectividad TCC).",
                            "Análisis de Arc Flash (NFPA 70E) y etiquetado de seguridad.",
                            "Configuración de relés de protección (50/51, 87, 67)."
                        ]}
                    />

                    {/* Cabling & Routing */}
                    <ElectricalServiceCard 
                        title="Conductores y Rutas"
                        icon="cable"
                        features={[
                            "Cálculo de ampacidad y caída de tensión en alimentadores.",
                            "Diseño de rutas de cableado (Cable Trays/Conduits) en 3D.",
                            "Listas de cables (Cable Schedules) y ruteo automático.",
                            "Selección de tipo de aislamiento (XLPE, EPR) según ambiente."
                        ]}
                    />

                    {/* Grounding & Lightning */}
                    <ElectricalServiceCard 
                        title="Aterrizaje y Pararrayos"
                        icon="electrical_services"
                        features={[
                            "Diseño de mallas de puesta a tierra (IEEE 80).",
                            "Cálculo de tensión de paso y contacto.",
                            "Sistemas de protección contra descargas atmosféricas (SPCR - IEC 62305).",
                            "Apantallamiento de estructuras altas (Torres de precalentador)."
                        ]}
                    />

                    {/* Lighting & Services */}
                    <ElectricalServiceCard 
                        title="Alumbrado y Servicios"
                        icon="lightbulb"
                        features={[
                            "Estudios luminotécnicos (Dialux) para naves industriales y exteriores.",
                            "Sistemas de alumbrado de emergencia.",
                            "Diseño de tableros de servicios auxiliares.",
                            "Sistemas de alimentación ininterrumpida (UPS)."
                        ]}
                    />

                    {/* Motors & Drives */}
                    <ElectricalServiceCard 
                        title="Motores y Accionamientos"
                        icon="motion_sensor_active"
                        features={[
                            "Especificación de motores de MT y BT (NEMA/IEC).",
                            "Dimensionamiento de Variadores de Frecuencia (VFD) y Soft Starters.",
                            "Análisis de arranque de motores grandes y caída de tensión.",
                            "Sistemas de refrigeración para salas eléctricas."
                        ]}
                    />
                </div>

                {/* CTA */}
                <div className="mt-20 bg-slate-900 rounded-2xl p-8 md:p-12 relative overflow-hidden border border-slate-700">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">¿Necesita actualizar su diagrama unifilar?</h3>
                            <p className="text-slate-400 max-w-xl">
                                Realizamos levantamientos en sitio y actualización de planos As-Built para asegurar la seguridad eléctrica de su planta.
                            </p>
                        </div>
                        <Link to="/contact" className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-8 py-4 rounded-lg transition-all shadow-lg shadow-yellow-500/20">
                            Solicitar Estudio Eléctrico
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Electrical;