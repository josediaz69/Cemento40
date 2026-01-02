import React from 'react';
import { Link } from 'react-router-dom';

const StandardCard = ({ code, title, description }: { code: string, title: string, description: string }) => (
    <div className="flex flex-col p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-all group">
        <span className="text-xs font-black text-primary uppercase tracking-widest mb-2">{code}</span>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
);

const ProtocolStep = ({ number, title, content }: { number: string, title: string, content: string }) => (
    <div className="relative pl-10 md:pl-12 py-2 group">
        <div className="absolute left-0 top-0 flex flex-col items-center h-full">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary group-hover:bg-primary group-hover:text-white text-slate-500 flex items-center justify-center font-bold text-sm transition-all z-10">
                {number}
            </div>
            <div className="w-0.5 flex-grow bg-slate-200 dark:bg-slate-700 my-1 group-last:hidden"></div>
        </div>
        <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{content}</p>
        </div>
    </div>
);

const Commissioning: React.FC = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <div className="relative bg-slate-900 text-white py-20 px-4 md:px-10 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 opacity-20" style={{ 
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWJcOJiRvW9JT9oiLyqoEi28RiqLsD6lSM4njMvZgaj5Yartj5f_hMGexIZdwcZILI8OiVqdMA5Sn6DAu9BFEyQSyUuPieC18KtUxnL-ju80Io43jQuI7Q4qCXI9Ora5kiFEA4QkllU1hBiLOnB6qRmsl9wkGmvI0Hy7aRbyB5dL_DDfx9EzGKP0kz1rfePRypapzG_ap_sWGcWgXmRfrVsAuKbOw0x4tn7sneZvJ9SMb0vkPthZ76aQVhsj8bryYeCDg6AjneRs2v')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Start-up & Ramp-up
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Commissioning de Precisión
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            Transición segura y eficiente desde la construcción mecánica hasta la operación nominal. Garantizamos el cumplimiento de garantías de performance mediante protocolos rigurosos.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/25">
                                Ver Metodología
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-bold backdrop-blur-sm border border-white/20 transition-all">
                                Descargar Checklist
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column: Protocols & Process */}
                <div className="lg:col-span-8">
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-primary pl-4">Gestión de Protocolos</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            Nuestro enfoque se basa en una estructura de desglose de sistemas (System Breakdown Structure) que permite la validación granular de cada componente antes de la integración total.
                        </p>
                        
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <ProtocolStep 
                                number="01" 
                                title="Pre-Commissioning (Cold Testing)" 
                                content="Verificación estática. Chequeo de cableado punto a punto (I/O check), pruebas de aislamiento de motores (Megger test), alineación de acoples, carga de lubricantes y configuración de instrumentos." 
                            />
                            <ProtocolStep 
                                number="02" 
                                title="Dry Commissioning (No Load)" 
                                content="Pruebas dinámicas en vacío. Verificación de sentido de giro, pruebas de enclavamientos (interlocks) de seguridad en el DCS, ajuste de lazos PID y secuencias de arranque de grupos." 
                            />
                            <ProtocolStep 
                                number="03" 
                                title="Wet Commissioning (With Load)" 
                                content="Introducción de material. Ajuste de básculas dosificadoras, optimización de curvas de molienda, estabilización térmica del horno y primeras pruebas de calidad del clinker/cemento." 
                            />
                            <ProtocolStep 
                                number="04" 
                                title="Performance Guarantee Tests (PGT)" 
                                content="Prueba de estrés de 72 horas continuas para validar capacidades contractuales (TPH), consumo específico de energía (kWh/t) y emisiones ambientales." 
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-l-4 border-primary pl-4">Estándares y Normativa</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <StandardCard 
                                code="IEC 62381" 
                                title="FAT & SAT Procedures" 
                                description="Estrictos protocolos para Pruebas de Aceptación en Fábrica (FAT) y en Sitio (SAT) para sistemas de automatización." 
                            />
                            <StandardCard 
                                code="ASTM C114" 
                                title="Chemical Analysis" 
                                description="Validación de calidad de producto durante el arranque utilizando métodos de prueba estándar para análisis químico de cemento hidráulico." 
                            />
                            <StandardCard 
                                code="IEEE 519" 
                                title="Power Quality" 
                                description="Monitoreo de armónicos y calidad de energía durante el arranque de grandes accionamientos (VFDs y Soft Starters)." 
                            />
                            <StandardCard 
                                code="OSHA 1910" 
                                title="Safety LOTO" 
                                description="Implementación rigurosa de bloqueo y etiquetado (Lockout/Tagout) durante la energización progresiva de subestaciones y MCCs." 
                            />
                        </div>
                    </section>
                </div>

                {/* Right Column: Key Features & Contact */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">engineering</span>
                            Equipo Especializado
                        </h3>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-green-500 text-lg">check</span>
                                Ingenieros de Proceso (Pyro & Grinding)
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-green-500 text-lg">check</span>
                                Especialistas en Automatización (DCS/PLC)
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-green-500 text-lg">check</span>
                                Supervisores Mecánicos y Eléctricos
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-green-500 text-lg">check</span>
                                Expertos en Seguridad Industrial (HSE)
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg shadow-blue-600/20 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-2xl"></div>
                        <h3 className="font-bold text-xl mb-2 relative z-10">¿Proyecto Greenfield o Brownfield?</h3>
                        <p className="text-blue-100 text-sm mb-6 relative z-10">
                            Asegure el retorno de inversión con una puesta en marcha sin contratiempos.
                        </p>
                        <Link to="/contact" className="inline-flex items-center justify-center w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors relative z-10">
                            Solicitar Propuesta
                        </Link>
                    </div>

                    <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Digital Handover</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                            Entregamos toda la documentación de comisionamiento digitalizada e indexada.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono text-slate-600 dark:text-slate-300">Test Sheets</span>
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono text-slate-600 dark:text-slate-300">As-Built</span>
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono text-slate-600 dark:text-slate-300">Punch List</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Commissioning;