import React, { useState } from 'react';

interface SimulationDemoProps {
    title: string;
    category: string;
    description: string;
    metrics: { label: string; value: string }[];
    imageUrl: string;
}

const SimulationDemo: React.FC<SimulationDemoProps> = ({ title, category, description, metrics, imageUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
            <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                <div 
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100 group-hover:scale-105'}`}
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                ></div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all transform hover:scale-110 active:scale-95 group/btn"
                    >
                        <span className="material-symbols-outlined text-4xl fill-current pl-1 group-hover/btn:text-white">
                            {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                    </button>
                </div>

                <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white shadow-lg">
                        {category}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                    {description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    {metrics.map((metric, idx) => (
                        <div key={idx}>
                            <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider">{metric.label}</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CFD: React.FC = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <div className="flex justify-center pt-5 pb-10 bg-background-light dark:bg-background-dark">
                <div className="flex flex-col max-w-7xl w-full px-4 md:px-10">
                    <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl items-start justify-end px-6 pb-10 md:px-10 relative overflow-hidden shadow-2xl" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwN8soMJUxEzWSX0kj1zu_6h62v17Sbck5kztWZKB6YkiTOt5zXDjUjwg4qOQI_P2h1Gx4h974iqM59vVh8nfvrWvsYXaAPAlzsWgxM-J0yseKK4v0C1cJ9EMEItOKfXohgVxtZwQpNqf2bm3CXvn26VTaJX-f7tSHSkt_VLD2viptT18EMg4SopMqyA7UorpFL-EgOqkQZxaxI1s1L-5RIG3Yr5f-m6uLHRF-bgzptS5ghCZM7Q5GbnT9Kp9iqH9LDyQbGpsPZ00q')" }}>
                        <div className="flex flex-col gap-4 text-left max-w-[700px] z-10">
                            <div className="inline-flex items-center rounded-full bg-primary/20 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white ring-1 ring-inset ring-white/20 w-fit">
                                <span className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                                Ingeniería Avanzada
                            </div>
                            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl drop-shadow-sm">
                                Optimización de Procesos con CFD y OpenFOAM
                            </h1>
                            <h2 className="text-gray-200 text-base font-normal leading-relaxed md:text-lg max-w-2xl drop-shadow-sm">
                                Simulación de alta fidelidad para hornos rotatorios, combustión y flujos multifásicos. Reduzca el riesgo operativo y asegure el cumplimiento de emisiones.
                            </h2>
                            <div className="mt-4 flex gap-4">
                                <button className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                                    Solicitar Simulación
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Demos Section */}
            <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider text-sm uppercase">Casos de Estudio</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-2 mb-4">Simulaciones Reales y Control de Emisiones</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Desde la eficiencia térmica hasta la captura de partículas. Nuestros modelos validados ayudan a cumplir con los estándares ambientales más estrictos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SimulationDemo 
                            title="Combustión en Horno Rotatorio"
                            category="Multiphase Combustion"
                            description="Modelado multifásico de la llama principal integrando inyección de combustibles sólidos (llantas, RDF). Análisis acoplado de cinética química, radiación térmica y formación de NOx para optimizar el perfil de temperatura del clinker."
                            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAwN8soMJUxEzWSX0kj1zu_6h62v17Sbck5kztWZKB6YkiTOt5zXDjUjwg4qOQI_P2h1Gx4h974iqM59vVh8nfvrWvsYXaAPAlzsWgxM-J0yseKK4v0C1cJ9EMEItOKfXohgVxtZwQpNqf2bm3CXvn26VTaJX-f7tSHSkt_VLD2viptT18EMg4SopMqyA7UorpFL-EgOqkQZxaxI1s1L-5RIG3Yr5f-m6uLHRF-bgzptS5ghCZM7Q5GbnT9Kp9iqH9LDyQbGpsPZ00q"
                            metrics={[
                                { label: 'Resolución', value: '15M Cells' },
                                { label: 'TSR Logrado', value: '65%' }
                            ]}
                        />
                        <SimulationDemo 
                            title="Eficiencia de Ciclones"
                            category="Gas-Solid Separation"
                            description="Optimización aerodinámica de ciclones de precalentador. Balance crítico entre eficiencia de separación y caída de presión mediante modificación paramétrica del tubo de inmersión (vortex finder) y geometría de entrada helicoidal."
                            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT"
                            metrics={[
                                { label: 'Delta P', value: '-2.5 mbar' },
                                { label: 'Eficiencia', value: '96.5%' }
                            ]}
                        />
                        <SimulationDemo 
                            title="Filtro de Mangas (Bag House)"
                            category="Emissions Control"
                            description="Simulación CFD del flujo de gases cargados de polvo en la cámara de distribución. Aseguramiento de velocidades de ascenso (can velocity) uniformes para evitar la re-deposición de partículas y extender la vida útil de las mangas."
                            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT"
                            metrics={[
                                { label: 'Uniformidad', value: '+92%' },
                                { label: 'Vida Útil', value: '+2 Años' }
                            ]}
                        />
                        <SimulationDemo 
                            title="Precipitador Electrostático (ESP)"
                            category="Electrohydrodynamics"
                            description="Modelado avanzado de electrohidrodinámica (EHD) acoplando flujo turbulento y campos eléctricos. Diseño de placas perforadas para corregir la maldistribución del gas, maximizando la eficiencia de colección de partículas finas."
                            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDmPYweqO3F10VFcu0WTCutAWt_viv-6evxUvQBlnzX6Pt0xZuBmdYzWl_ui6H25rCo77BL6XqQ7bIb2UAn_me0yP5FcC0iDTdbYI0KQPk-AtB51H7IHPRZoCshjc1QYqCED-VZac5tVh75g9kuvXjmSdYMKUmGH6qnPGYcMrlhcfJQPJT-vtZJJkI72b7v8scKbHqNyrZ_TnXnpySF3f1iRHKSOLUvuwOGlxhHXyhbMeUmOPaYF7y1OZp_5eFeyfl6kaB2W4nCMbYS"
                            metrics={[
                                { label: 'Eficiencia', value: '>99.9%' },
                                { label: 'Emisiones', value: '<10 mg/Nm³' }
                            ]}
                        />
                         <SimulationDemo 
                            title="Transporte Neumático de Ceniza"
                            category="Particle Transport"
                            description="Simulación Euleriana-Lagrangiana para transporte neumático de ceniza volante. Predicción de zonas de erosión crítica en codos y optimización del régimen de transporte para minimizar el desgaste abrasivo sin comprometer la capacidad de carga."
                            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDmPYweqO3F10VFcu0WTCutAWt_viv-6evxUvQBlnzX6Pt0xZuBmdYzWl_ui6H25rCo77BL6XqQ7bIb2UAn_me0yP5FcC0iDTdbYI0KQPk-AtB51H7IHPRZoCshjc1QYqCED-VZac5tVh75g9kuvXjmSdYMKUmGH6qnPGYcMrlhcfJQPJT-vtZJJkI72b7v8scKbHqNyrZ_TnXnpySF3f1iRHKSOLUvuwOGlxhHXyhbMeUmOPaYF7y1OZp_5eFeyfl6kaB2W4nCMbYS"
                            metrics={[
                                { label: 'Vida Útil', value: '+3 Años' },
                                { label: 'Consumo', value: '-12% kWh' }
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Why OpenFOAM */}
            <div className="flex justify-center py-20 bg-background-light dark:bg-background-dark">
                <div className="flex flex-col max-w-7xl w-full px-4 md:px-10">
                    <div className="flex flex-col gap-12">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Por qué elegimos OpenFOAM</h2>
                            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl">
                                Nuestra plataforma de simulación se basa en código abierto robusto, permitiéndonos total transparencia y personalización para la industria del cemento.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group flex flex-1 gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 flex-col hover:border-primary/50 transition-colors shadow-sm">
                                <div className="text-primary bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-3xl">code</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Flexibilidad Total</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Acceso al código fuente para implementar modelos físicos personalizados específicos para clinker y combustibles alternativos.</p>
                                </div>
                            </div>
                            <div className="group flex flex-1 gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 flex-col hover:border-primary/50 transition-colors shadow-sm">
                                <div className="text-primary bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-3xl">science</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Precisión Científica</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Resultados validados con datos de planta y literatura académica de alto nivel. Solvers probados por la comunidad global.</p>
                                </div>
                            </div>
                             <div className="group flex flex-1 gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 flex-col hover:border-primary/50 transition-colors shadow-sm">
                                <div className="text-primary bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-3xl">savings</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Eficiencia de Costos</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Sin costos de licencia recurrentes. Su inversión va 100% a horas de ingeniería y potencia de cálculo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CFD;