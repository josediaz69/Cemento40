import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, icon, colorClass }: { title: string, description: string, icon: string, colorClass: string }) => (
    <div className="group bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        <div className={`w-14 h-14 rounded-xl ${colorClass} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <span className={`material-symbols-outlined text-3xl ${colorClass.replace('bg-', 'text-')}`}>{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
);

const TechBadge = ({ label }: { label: string }) => (
    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">
        {label}
    </span>
);

const Automation: React.FC = () => {
    return (
        <div className="animate-fade-in bg-background-light dark:bg-background-dark">
            {/* Hero */}
            <section className="relative w-full bg-slate-900 py-20 px-4 md:px-10 border-b border-slate-800 overflow-hidden">
                 {/* Background Image & Overlay */}
                 <div className="absolute inset-0 opacity-40" style={{ 
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-center h-full">
                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 px-3 py-1 backdrop-blur-sm w-fit mb-6">
                        <span className="material-symbols-outlined text-cyan-400 text-sm">hub</span>
                        <span className="text-xs font-bold uppercase tracking-wide text-cyan-400">Industria 4.0 Ready</span>
                    </div>
                    <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                        Automatización Inteligente
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
                        Más allá del control PID convencional. Integramos Inteligencia Artificial, computación en la nube y analítica avanzada para convertir su planta en una operación autónoma y predictiva.
                    </p>
                </div>
            </section>

            {/* Partners Strip */}
            <section className="bg-white dark:bg-slate-900/50 py-8 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">Tecnologías & Partners de Integración</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-xl md:text-2xl font-black text-slate-500 tracking-tighter">SIEMENS</span>
                        <span className="text-xl md:text-2xl font-black text-slate-500 tracking-tighter">Rockwell Automation</span>
                        <span className="text-xl md:text-2xl font-black text-slate-500 tracking-tighter">Schneider Electric</span>
                        <span className="text-xl md:text-2xl font-black text-slate-500 tracking-tighter">ABB</span>
                        <span className="text-xl md:text-2xl font-black text-slate-500 tracking-tighter">AWS IoT</span>
                    </div>
                </div>
            </section>

            {/* Core Automation (Traditional) */}
            <section className="py-20 max-w-7xl mx-auto px-4 md:px-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Fundamentos de Control</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Arquitecturas robustas para el control determinista de procesos críticos. Diseño, migración y puesta en marcha.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        title="DCS & PLC Systems"
                        description="Diseño de arquitecturas distribuidas (PCS7, PlantPAx). Migración de sistemas obsoletos (S5 a S7, SLC a Logix) sin paradas de planta prolongadas."
                        icon="memory"
                        colorClass="bg-blue-500"
                    />
                    <FeatureCard 
                        title="SCADA & HMI de Alto Rendimiento"
                        description="Interfaces diseñadas bajo norma ISA-101 para mejorar la conciencia situacional del operador y reducir tiempos de reacción ante alarmas."
                        icon="monitor_heart"
                        colorClass="bg-indigo-500"
                    />
                    <FeatureCard 
                        title="Instrumentación & Redes"
                        description="Ingeniería de detalle para buses de campo (Profibus DP/PA, Ethernet/IP, Modbus). Selección y calibración de instrumentación inteligente."
                        icon="router"
                        colorClass="bg-purple-500"
                    />
                </div>
            </section>

            {/* Industry 4.0 & AI Section (New Content) */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                {/* Background accents */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <span className="text-cyan-400 font-bold tracking-wider text-sm uppercase mb-2 block">Transformación Digital</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Industria 4.0 & <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inteligencia Artificial</span>
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Pasamos del mantenimiento reactivo al predictivo. Nuestras soluciones conectan el piso de planta con la nube para desbloquear insights ocultos en sus datos.
                            </p>
                            
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                                        <span className="material-symbols-outlined text-2xl">psychology</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Mantenimiento Predictivo con IA</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Modelos de Machine Learning entrenados para detectar anomalías en patrones de vibración, temperatura y consumo de corriente. Prediga fallas en rodamientos de molinos y reductores principales con semanas de antelación.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                                        <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Digitalización en la Nube</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Arquitecturas híbridas Edge-to-Cloud. Llevamos datos de proceso a lagos de datos seguros (AWS/Azure) para análisis de Big Data, dashboards ejecutivos globales y benchmarking entre plantas.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                                        <span className="material-symbols-outlined text-2xl">security</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Ciberseguridad OT</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Protección de infraestructuras críticas según norma IEC 62443. Segmentación de redes, firewalls industriales y monitoreo de amenazas en tiempo real para proteger su operación de ataques.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-slate-800 flex flex-wrap gap-3">
                                <TechBadge label="Python" />
                                <TechBadge label="TensorFlow" />
                                <TechBadge label="MQTT" />
                                <TechBadge label="OPC UA" />
                                <TechBadge label="InfluxDB" />
                                <TechBadge label="Grafana" />
                            </div>
                        </div>

                        {/* Visual Right Side */}
                        <div className="flex-1 w-full">
                            <div className="relative bg-slate-800 rounded-2xl border border-slate-700 p-2 shadow-2xl overflow-hidden group">
                                <img 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT" 
                                    alt="AI Dashboard" 
                                    className="rounded-xl w-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                
                                {/* Overlay Card */}
                                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-6 rounded-xl border border-slate-600 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-white font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                            Alerta Predictiva
                                        </h4>
                                        <span className="text-xs text-slate-400 font-mono">ID: PRED-4092</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Activo</span>
                                                <span>Molino de Cemento 2</span>
                                            </div>
                                            <div className="text-sm text-white font-medium">Rodamiento Lado Accionamiento</div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>Probabilidad de Falla (30 días)</span>
                                                <span className="text-red-400 font-bold">87%</span>
                                            </div>
                                            <div className="w-full bg-slate-700 rounded-full h-1.5">
                                                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '87%' }}></div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-300 mt-2 p-2 bg-slate-800 rounded border border-slate-700">
                                            Recomendación: Programar inspección de vibraciones y posible cambio en próxima parada menor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* CTA */}
            <section className="py-20 text-center px-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">¿Listo para modernizar su planta?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-blue-600 transition-all">
                        Solicitar Auditoría de Automatización
                    </Link>
                    <Link to="/projects" className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-8 py-3 text-base font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        Ver Casos de Éxito
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Automation;