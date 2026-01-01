import React from 'react';
import { Link } from 'react-router-dom';

const ProcessEngineering: React.FC = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <div className="w-full bg-white dark:bg-slate-900">
                <div className="mx-auto max-w-7xl px-4 md:px-10 py-12 md:py-20">
                    <div className="flex flex-col gap-12 lg:flex-row items-center">
                        <div className="flex flex-col gap-6 flex-1 lg:pr-10">
                            <div className="flex flex-col gap-4 text-left">
                                <span className="text-primary font-bold tracking-wider text-sm uppercase">Service Overview</span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                                    Ingeniería de Proceso
                                </h1>
                                <p className="text-lg md:text-xl font-normal leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
                                    Optimizing the heart of cement manufacturing with world-class engineering solutions designed for global mining standards.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-blue-700 text-white text-base font-bold transition-colors">
                                    Consult Our Experts
                                </button>
                                <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-transparent border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-base font-bold transition-colors">
                                    Download Brochure
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative w-full aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-2xl">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYerunAmWqbbegb3g-LSyvpOYnQXMhcD5O4O7Gl0rYWigqhYf01P4TwPCnZLzrRnxMDqGogQVO8CM9sx0yyAWSGFCmgFRhSE8f7D1Q0wK9l0WYGmrVQDKzxMnT581xU48Hv85HcrGc3GGiFiDoh7atRsOJinU333wAk8LSGHNp20cEekXYBYN3KbhwXukEI7FAgNz_o0DEB3TwbAvV2XZgsVwcdSTeZF4NyGrClrLneneNBWfIymivYyAyNCK8fEOCZAYl_rWF7fd2')" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-28 flex flex-col gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">On this page</span>
                        <a href="#approach" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-primary bg-blue-50 dark:bg-blue-900/20 rounded-lg">Our Approach</a>
                        <a href="#scope" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Scope of Services</a>
                        <a href="#benefits" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Key Benefits</a>
                    </div>
                </aside>

                <div className="lg:col-span-9 flex flex-col gap-16">
                    {/* Methodology */}
                    <section id="approach">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-primary"></div>
                            <span className="text-primary font-bold text-sm uppercase tracking-wider">Methodology</span>
                        </div>
                        <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white mb-6">Strategic Process Engineering</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                            <p className="mb-4">
                                We provide comprehensive process engineering services focused on maximizing the efficiency and longevity of cement manufacturing plants globally. Our methodology isn't just about fixing immediate problems; it's about establishing a foundation for long-term operational excellence through data-driven analysis.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                <span className="block text-4xl font-black text-primary mb-2">15%</span>
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Avg. Energy Reduction</span>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                <span className="block text-4xl font-black text-primary mb-2">30+</span>
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Plants Optimized</span>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                <span className="block text-4xl font-black text-primary mb-2">24/7</span>
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Technical Support</span>
                            </div>
                        </div>
                    </section>

                    {/* Scope */}
                    <section id="scope">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">Detailed Technical Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Mass & Energy Balances */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary mb-5">
                                    <span className="material-symbols-outlined text-[28px]">balance</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Mass & Energy Balances</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                    We conduct rigorous heat and mass balance audits for the entire kiln line (Preheater, Kiln, Cooler). By accurately quantifying inputs and outputs—including false air infiltration, radiation losses, and reaction enthalpies—we pinpoint precise areas for thermal efficiency gains.
                                </p>
                                <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc pl-4">
                                    <li>Kiln Heat Consumption audits (kCal/kg clinker)</li>
                                    <li>False air detection in preheaters</li>
                                    <li>Cooler efficiency evaluation</li>
                                </ul>
                            </div>

                            {/* Grinding Calculations */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary mb-5">
                                    <span className="material-symbols-outlined text-[28px]">settings_motion_mode</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Cement Grinding Calculations</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                    Specialized mathematical modeling for Ball Mills and Vertical Roller Mills (VRM). We optimize specific power consumption (kWh/ton) while improving product quality (Blaine/Residue).
                                </p>
                                <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc pl-4">
                                    <li>Ball charge grading design & optimization</li>
                                    <li>Separator Tromp Curve analysis</li>
                                    <li>Circulating load & mill ventilation calculations</li>
                                </ul>
                            </div>

                            {/* Pyro-process */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary mb-5">
                                    <span className="material-symbols-outlined text-[28px]">tune</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Pyro-process Optimization</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                    Identifying production bottlenecks in cyclone pressure drop, calciner residence time, and burner momentum to maximize clinker throughput.
                                </p>
                            </div>

                            {/* Plant Design */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary mb-5">
                                    <span className="material-symbols-outlined text-[28px]">architecture</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Plant Design & Flowsheets</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                    Development of comprehensive Process Flow Diagrams (PFD) and heat balance simulations for greenfield projects and major brownfield upgrades.
                                </p>
                            </div>

                            {/* Clay Calcination / Clinker Replacement */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary mb-5">
                                    <span className="material-symbols-outlined text-[28px]">landscape</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Calcinación de Arcillas y LC3</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                    Estudios de factibilidad técnica y diseño de proceso para la implementación de líneas de arcilla calcinada. Ayudamos a reducir drásticamente el factor clinker mediante la producción de cementos LC3 (Limestone Calcined Clay Cement).
                                </p>
                                <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc pl-4">
                                    <li>Caracterización térmica de arcillas y temperatura de activación</li>
                                    <li>Diseño de calcinadores flash y hornos rotatorios dedicados</li>
                                    <li>Estrategias de control de color (re-oxidación)</li>
                                </ul>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProcessEngineering;