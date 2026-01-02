import React from 'react';
import { Link } from 'react-router-dom';

const KPICard = ({ value, label, icon, color }: { value: string, label: string, icon: string, color: string }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center group hover:border-primary/50 transition-all">
        <div className={`w-12 h-12 rounded-full ${color} bg-opacity-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <span className={`material-symbols-outlined text-2xl ${color.replace('bg-', 'text-')}`}>{icon}</span>
        </div>
        <span className="text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</span>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
    </div>
);

const FeatureSection = ({ title, description, items, image, reverse = false }: { title: string, description: string, items: string[], image: string, reverse?: boolean }) => (
    <div className={`flex flex-col lg:flex-row gap-12 items-center py-12 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">{title}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
            </p>
            <ul className="space-y-4 mt-4">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-green-500 text-xl mt-0.5 shrink-0">check_circle</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
        </div>
    </div>
);

const Optimization: React.FC = () => {
    return (
        <div className="animate-fade-in bg-background-light dark:bg-background-dark">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ 
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCq2EZ62mCA9CkM1uLx117j_psVwjUwfqDAijTqbLwBhDoSCGouVQZ3Qrvu3u29Kq35T6s3bz-MfJRi78-QUG7mLEcUCclO9W7AYG5TuN3cOdcU58c8s0ZFjiGIKyv4y40ITYl5uxpkG1z29htCRYiMwlwRKuLDh_3IEU5pzQAOq5sHcpzH1hGMeyLeSnGcuOaV8LSBR301YbcuprJkxS2cn5ZDrAKtrtpQWlm8uFrc02JzjkLpHVDZPaDaVBD-3lDyphyp0o4FQtfz')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 50%'
                }}></div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        ROI Driven Engineering
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Optimización Integral de Planta</h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Transformamos datos operativos en rentabilidad. Nuestro enfoque holístico reduce costos variables mientras asegura el cumplimiento ambiental y la estabilidad del proceso.
                    </p>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <KPICard value="-12%" label="Consumo Eléctrico" icon="bolt" color="bg-yellow-500" />
                    <KPICard value="+25%" label="Combustibles Alternativos" icon="recycling" color="bg-green-500" />
                    <KPICard value="-40%" label="Emisiones NOx" icon="cloud_off" color="bg-blue-500" />
                    <KPICard value="< 2%" label="Variabilidad Estándar" icon="analytics" color="bg-purple-500" />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
                
                {/* 1. Energy Efficiency */}
                <FeatureSection 
                    title="Eficiencia Energética (Power & Heat)"
                    description="El costo energético representa hasta el 40% del costo variable del cemento. Atacamos las ineficiencias tanto en la línea piro-procesadora como en los circuitos de molienda."
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT"
                    items={[
                        "Optimización de Molienda: Ajuste de carga de bolas, curvas de tromp en separadores y uso de aditivos químicos.",
                        "Gestión de Aire Falso: Detección y sellado de infiltraciones en precalentador y molinos para reducir carga en ventiladores.",
                        "Consumo Térmico Específico: Reducción de kCal/kg clinker mediante optimización de la combustión y recuperación de calor en enfriadores."
                    ]}
                />

                {/* 2. Emissions & Sustainability */}
                <FeatureSection 
                    reverse
                    title="Reducción de Emisiones y AFR"
                    description="La sostenibilidad es hoy una licencia para operar. Diseñamos estrategias para maximizar el coprocesamiento y minimizar la huella de carbono."
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuAwN8soMJUxEzWSX0kj1zu_6h62v17Sbck5kztWZKB6YkiTOt5zXDjUjwg4qOQI_P2h1Gx4h974iqM59vVh8nfvrWvsYXaAPAlzsWgxM-J0yseKK4v0C1cJ9EMEItOKfXohgVxtZwQpNqf2bm3CXvn26VTaJX-f7tSHSkt_VLD2viptT18EMg4SopMqyA7UorpFL-EgOqkQZxaxI1s1L-5RIG3Yr5f-m6uLHRF-bgzptS5ghCZM7Q5GbnT9Kp9iqH9LDyQbGpsPZ00q"
                    items={[
                        "Combustibles Alternativos (AFR): Ingeniería para inyección de llantas enteras, RDF y biomasa. Análisis de impacto en la calidad del clinker.",
                        "Control de NOx/SOx: Implementación y ajuste de sistemas SNCR (Inyección de Urea/Amoníaco) y optimización de etapas de combustión escalonada.",
                        "Factor Clinker: Estrategias para aumentar la adición de puzolana, caliza o arcilla calcinada (LC3) en el cemento final."
                    ]}
                />

                {/* 3. Cost Reduction */}
                <FeatureSection 
                    title="Reducción de Costos Operativos (OPEX)"
                    description="Más allá de la ingeniería dura, optimizamos la estrategia operativa para mejorar el margen EBITDA por tonelada."
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCWJcOJiRvW9JT9oiLyqoEi28RiqLsD6lSM4njMvZgaj5Yartj5f_hMGexIZdwcZILI8OiVqdMA5Sn6DAu9BFEyQSyUuPieC18KtUxnL-ju80Io43jQuI7Q4qCXI9Ora5kiFEA4QkllU1hBiLOnB6qRmsl9wkGmvI0Hy7aRbyB5dL_DDfx9EzGKP0kz1rfePRypapzG_ap_sWGcWgXmRfrVsAuKbOw0x4tn7sneZvJ9SMb0vkPthZ76aQVhsj8bryYeCDg6AjneRs2v"
                    items={[
                        "Vida Útil de Refractarios: Zonificación inteligente de ladrillos y hormigones para extender campañas del horno.",
                        "Consumo de Medios Molturantes: Selección de aleaciones óptimas para reducir g/ton de desgaste en molinos.",
                        "Mantenimiento Predictivo: Uso de analítica de vibraciones y termografía para evitar paradas no programadas costosas."
                    ]}
                />

                {/* Strategy Methodology Box */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">Nuestra Metodología de Auditoría</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                        
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm w-64">
                            <span className="text-4xl font-black text-primary block mb-2">01</span>
                            <h4 className="font-bold text-slate-900 dark:text-white">Diagnóstico</h4>
                            <p className="text-xs text-slate-500 mt-2">Medición de línea base, auditoría de aire falso y muestreo de proceso.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm w-64">
                            <span className="text-4xl font-black text-primary block mb-2">02</span>
                            <h4 className="font-bold text-slate-900 dark:text-white">Simulación</h4>
                            <p className="text-xs text-slate-500 mt-2">Modelado de escenarios para validar ROI de intervenciones (CAPEX vs OPEX).</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm w-64">
                            <span className="text-4xl font-black text-primary block mb-2">03</span>
                            <h4 className="font-bold text-slate-900 dark:text-white">Ejecución</h4>
                            <p className="text-xs text-slate-500 mt-2">Implementación de mejoras, ajuste de lazos de control y entrenamiento.</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-blue-600 transition-all">
                            Solicitar Auditoría de Planta
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Optimization;