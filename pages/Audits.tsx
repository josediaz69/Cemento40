import React from 'react';
import { Link } from 'react-router-dom';

const AuditTypeCard = ({ title, icon, description, items }: { title: string, icon: string, description: string, items: string[] }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {description}
        </p>
        <ul className="space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-green-500 text-lg shrink-0 mt-0.5">check_circle</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const StandardBadge = ({ code, name }: { code: string, name: string }) => (
    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
        <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs px-2 py-1 rounded">
            {code}
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{name}</span>
    </div>
);

const Audits: React.FC = () => {
    return (
        <div className="animate-fade-in bg-background-light dark:bg-background-dark">
            {/* Hero */}
            <div className="relative bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ 
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCW8UlJdOR12cf1fH4U7SS-OAbyHIUy4ycNZgTGgYxMFl94VzTX5OKrlXTK91dgwmBA9K4oNmce4kET4qYw7wky-SGAfc5vutBx4y12p070JcI_jjOd_uhMXGxq9KZhn7HujIeqOcNQAkEllGBQnbMix3P_PoArlK_9JC4uaZvM8zTQwOcA83dQ-AA83j9Hd3sWSA1pKUerWoCLB_FFjklSq4oBLnQgpo0BILJXmjBa1s6F24W6kuDV8mVhoE3zCUMVQdF-DOpNAsFw')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6 inline-block">
                        Diagnóstico & Integridad
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Auditorías Técnicas Certificadas
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Evaluación integral de activos industriales. Identificamos cuellos de botella, riesgos estructurales y brechas de eficiencia utilizando protocolos internacionales.
                    </p>
                </div>
            </div>

            {/* Main Services Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Alcance del Servicio</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Nuestras auditorías cubren todo el ciclo de vida de la planta, desde la ingeniería de proceso hasta la integridad civil y mecánica.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <AuditTypeCard 
                        title="Auditoría de Proceso"
                        icon="settings_suggest"
                        description="Análisis termodinámico y aerodinámico de la línea de producción para maximizar el TPH y reducir el consumo específico."
                        items={[
                            "Balance de Masa y Energía (Heat Balance)",
                            "Medición de Aire Falso (Precalentador/Molino)",
                            "Eficiencia de Separadores y Ciclones",
                            "Análisis de Combustión y Llama"
                        ]}
                    />
                    <AuditTypeCard 
                        title="Integridad Estructural"
                        icon="foundation"
                        description="Inspección patológica de estructuras críticas para asegurar la seguridad operativa y extender la vida útil de los activos civiles."
                        items={[
                            "Inspección de Silos (Grietas/Postensado)",
                            "Vibración en Cimentaciones de Molinos",
                            "Estructura de Torres de Precalentador",
                            "Ensayos No Destructivos (NDT)"
                        ]}
                    />
                    <AuditTypeCard 
                        title="Mecánica & Mantenimiento"
                        icon="build_circle"
                        description="Evaluación del estado de la maquinaria rotativa y estática, enfocada en la confiabilidad y la prevención de fallas catastróficas."
                        items={[
                            "Alineación de Hornos (Hot Kiln Alignment)",
                            "Desgaste de Corazas y Llantas",
                            "Inspección de Reductores y Piñones",
                            "Termografía y Análisis de Vibraciones"
                        ]}
                    />
                </div>
            </div>

            {/* Remote Audits Section */}
            <section className="bg-slate-900 relative overflow-hidden py-24">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary/10 blur-3xl rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="material-symbols-outlined text-sm">wifi_tethering</span>
                                Servicio Disponible 24/7
                            </div>
                            <h2 className="text-4xl font-black text-white mb-6">Auditoría Remota 4.0</h2>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                No siempre es necesario viajar al sitio. Utilizando nuestra plataforma segura, realizamos auditorías de datos en tiempo real conectándonos a su historiador de planta (PIMS).
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-primary font-bold text-xl">01</div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Conexión Segura</h4>
                                        <p className="text-slate-400 text-sm">Transferencia de datos vía VPN o carga de archivos CSV/Excel encriptados.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-primary font-bold text-xl">02</div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Análisis IA + Experto</h4>
                                        <p className="text-slate-400 text-sm">Procesamiento con algoritmos propietarios validado por ingenieros senior.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-primary font-bold text-xl">03</div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Reporte Express</h4>
                                        <p className="text-slate-400 text-sm">Entrega de diagnóstico preliminar en &lt; 48 horas con plan de acción.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-10">
                                <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-blue-600 transition-all">
                                    Solicitar Demo Remota
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="relative bg-slate-800 rounded-2xl border border-slate-700 p-2 shadow-2xl">
                                <img 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT" 
                                    alt="Remote Dashboard" 
                                    className="rounded-xl w-full opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-slate-900/90 backdrop-blur border border-slate-600 p-6 rounded-xl text-center max-w-xs shadow-xl">
                                        <span className="material-symbols-outlined text-4xl text-green-500 mb-2">check_circle</span>
                                        <h4 className="text-white font-bold">Datos Validados</h4>
                                        <p className="text-xs text-slate-400 mt-2">Nuestros protocolos de limpieza de datos aseguran que el diagnóstico se base en información confiable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Standards & Protocols */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Estándares y Protocolos</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Cumplimiento normativo internacional en cada inspección.</p>
                    </div>
                    <button className="text-primary font-bold text-sm flex items-center hover:underline">
                        Descargar Lista Completa <span className="material-symbols-outlined text-lg ml-1">download</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StandardBadge code="ACI 318" name="Building Code for Structural Concrete" />
                    <StandardBadge code="ISO 10816" name="Mechanical Vibration Evaluation" />
                    <StandardBadge code="ASTM C114" name="Chemical Analysis of Hydraulic Cement" />
                    <StandardBadge code="API 650" name="Welded Tanks for Oil Storage (Fuel)" />
                    <StandardBadge code="IEC 61131" name="Programmable Controllers" />
                    <StandardBadge code="ASME VIII" name="Pressure Vessel Inspection" />
                    <StandardBadge code="ISO 50001" name="Energy Management Systems" />
                    <StandardBadge code="C40-PROT" name="Protocolo Interno Cemento40" />
                </div>
            </div>
        </div>
    );
};

export default Audits;