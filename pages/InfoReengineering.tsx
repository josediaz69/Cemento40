import React from 'react';
import { Link } from 'react-router-dom';

const DataLevelCard = ({ level, title, description, tools }: { level: string, title: string, description: string, tools: string }) => (
    <div className="relative pl-8 pb-12 border-l-2 border-slate-200 dark:border-slate-700 last:border-0 group">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary group-hover:bg-primary transition-colors"></div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">{level}</span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{description}</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-[14px]">code</span>
            {tools}
        </div>
    </div>
);

const BenefitCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
        <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
        </p>
    </div>
);

const InfoReengineering: React.FC = () => {
    return (
        <div className="animate-fade-in bg-background-light dark:bg-background-dark">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 opacity-40" style={{ 
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="material-symbols-outlined text-sm">hub</span>
                            IT / OT Convergence
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Reingeniería de la Información
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            Transformamos datos aislados en activos estratégicos. Integramos el piso de planta con la toma de decisiones gerenciales mediante arquitecturas de datos unificadas.
                        </p>
                        <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-blue-600 transition-all">
                            Diagnóstico Digital
                        </Link>
                    </div>
                </div>
            </div>

            {/* The Challenge Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">El Problema: "Data Rich, Information Poor"</h2>
                        <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300">
                            <p className="mb-4">
                                En una planta de cemento moderna se generan millones de puntos de datos diarios (temperaturas, amperajes, calidad química). Sin embargo, esta información suele quedar atrapada en silos desconectados:
                            </p>
                            <ul className="space-y-2 mb-6 list-disc pl-4 marker:text-primary">
                                <li>El operador de sala ve el SCADA en tiempo real.</li>
                                <li>El jefe de calidad usa un LIMS aislado.</li>
                                <li>Mantenimiento registra fallas en SAP o Excel.</li>
                                <li>La gerencia recibe reportes estáticos con días de retraso.</li>
                            </ul>
                            <p className="font-medium text-slate-900 dark:text-white">
                                La Reingeniería de la Información rompe estos silos para crear una "Única Fuente de Verdad" (Single Source of Truth).
                            </p>
                        </div>
                    </div>
                    <div className="relative h-80 bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                        {/* Abstract Representation of Silos vs Unified */}
                        <div className="grid grid-cols-3 gap-4 text-center w-full">
                            <div className="flex flex-col items-center opacity-40">
                                <div className="w-16 h-24 bg-slate-300 dark:bg-slate-600 rounded-lg mb-2"></div>
                                <span className="text-xs font-bold">Lab (LIMS)</span>
                            </div>
                            <div className="flex flex-col items-center opacity-40">
                                <div className="w-16 h-24 bg-slate-300 dark:bg-slate-600 rounded-lg mb-2"></div>
                                <span className="text-xs font-bold">Control (DCS)</span>
                            </div>
                            <div className="flex flex-col items-center opacity-40">
                                <div className="w-16 h-24 bg-slate-300 dark:bg-slate-600 rounded-lg mb-2"></div>
                                <span className="text-xs font-bold">ERP</span>
                            </div>
                            
                            {/* Overlay Arrow */}
                            <div className="col-span-3 mt-4 flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-primary animate-bounce">arrow_downward</span>
                            </div>

                            <div className="col-span-3 bg-white dark:bg-slate-900 border-2 border-primary rounded-xl p-4 shadow-xl z-10 -mt-2">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-3xl">database</span>
                                    <span className="font-black text-lg text-slate-900 dark:text-white">Unified Data Lake</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Process / Stack */}
            <div className="bg-slate-50 dark:bg-slate-900/50 py-20 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider text-sm uppercase">Arquitectura de Datos</span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">La Pirámide de Automatización Digitalizada</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Diagram Side */}
                        <div>
                            <DataLevelCard 
                                level="Nivel 4 - Negocio"
                                title="ERP & Business Intelligence"
                                description="Visualización de KPIs financieros, costos por tonelada y logística. Toma de decisiones basada en márgenes reales."
                                tools="SAP, PowerBI, Tableau"
                            />
                            <DataLevelCard 
                                level="Nivel 3 - Gestión"
                                title="MES / MOM"
                                description="Manufacturing Execution Systems. Gestión de órdenes de producción, trazabilidad de calidad y OEE (Overall Equipment Effectiveness)."
                                tools="PI System, SQL, PIMS"
                            />
                            <DataLevelCard 
                                level="Nivel 1 & 2 - Control"
                                title="SCADA & PLC"
                                description="Control en tiempo real de motores, válvulas y lazos PID. Generación del dato crudo operativo."
                                tools="Siemens PCS7, Allen Bradley"
                            />
                             <DataLevelCard 
                                level="Nivel 0 - Campo"
                                title="Sensores & IIoT"
                                description="Instrumentación inteligente, analizadores de gases y sensores de vibración conectados."
                                tools="4-20mA, Hart, Profibus"
                            />
                        </div>

                        {/* Visual Context */}
                        <div className="sticky top-24 h-fit">
                            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                                <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                                    <span className="text-xs font-mono text-green-400">● Live Data Stream</span>
                                    <span className="material-symbols-outlined text-slate-500 text-sm">settings</span>
                                </div>
                                <div className="p-8">
                                    {/* Fake Dashboard Code visualization */}
                                    <div className="font-mono text-xs md:text-sm text-blue-300 space-y-2">
                                        <p><span className="text-purple-400">const</span> <span className="text-yellow-300">kilnEfficiency</span> = calculateHeatBalance(</p>
                                        <p className="pl-4">inputs.coalFeedRate,</p>
                                        <p className="pl-4">inputs.clinkerOutput,</p>
                                        <p className="pl-4">sensors.preheaterExitGas</p>
                                        <p>);</p>
                                        <p className="text-slate-500">// Real-time Contextualization</p>
                                        <p><span className="text-purple-400">if</span> (kilnEfficiency &lt; target) &#123;</p>
                                        <p className="pl-4"><span className="text-cyan-400">alertManager</span>(<span className="text-green-300">'High Specific Consumption'</span>);</p>
                                        <p>&#125;</p>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-slate-700 grid grid-cols-2 gap-4">
                                        <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                                            <span className="text-[10px] text-slate-500 uppercase">Clinker Prod</span>
                                            <div className="text-xl font-bold text-white">285 tph</div>
                                        </div>
                                        <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                                            <span className="text-[10px] text-slate-500 uppercase">Spec. Heat</span>
                                            <div className="text-xl font-bold text-yellow-400">760 kCal</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-center text-slate-500 mt-4">
                                Ejemplo: Contextualización de variables de proceso en tiempo real.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-20">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Valor Agregado en Cemento</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <BenefitCard 
                        icon="query_stats"
                        title="OEE Transparente"
                        description="Cálculo automático de disponibilidad, rendimiento y calidad. Eliminación de 'maquillaje' de reportes manuales."
                    />
                    <BenefitCard 
                        icon="sync_problem"
                        title="Correlación Calidad-Proceso"
                        description="Cruce automático de datos de laboratorio (Blaine, CaO libre) con parámetros de operación del horno y molinos para ajustar consignas."
                    />
                    <BenefitCard 
                        icon="energy_savings_leaf"
                        title="Gestión Energética (ISO 50001)"
                        description="Monitoreo granular del consumo eléctrico por departamento (Crudo, Horno, Cemento) para identificar picos de demanda."
                    />
                    <BenefitCard 
                        icon="inventory_2"
                        title="Inventarios en Tiempo Real"
                        description="Integración de básculas y niveles de silos con ERP para una gestión de stock de materias primas y clinker sin errores."
                    />
                    <BenefitCard 
                        icon="history_edu"
                        title="Digital Twin (Gemelo Digital)"
                        description="Base histórica estructurada que permite alimentar modelos de simulación y Machine Learning para mantenimiento predictivo."
                    />
                    <BenefitCard 
                        icon="mobile_friendly"
                        title="Movilidad"
                        description="Acceso a dashboards críticos desde tablets y smartphones para jefes de turno y gerentes de planta en movimiento."
                    />
                </div>
            </div>

            {/* CTA */}
            <div className="bg-primary py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black text-white mb-4">¿Su planta sigue operando con Excel?</h2>
                    <p className="text-blue-100 text-lg mb-8">
                        La reingeniería de la información es el primer paso real hacia la Industria 4.0. Déjenos auditar su flujo de datos actual.
                    </p>
                    <Link to="/contact" className="inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-all shadow-xl">
                        Agendar Consultoría IT/OT
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InfoReengineering;