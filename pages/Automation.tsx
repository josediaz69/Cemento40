import React from 'react';

const Automation: React.FC = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section className="relative w-full">
                <div className="mx-auto max-w-7xl px-4 md:px-10 py-10">
                    <div className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-12 md:px-12 md:pb-16 shadow-xl overflow-hidden relative" style={{ backgroundImage: "linear-gradient(180deg, rgba(16, 22, 34, 0.2) 0%, rgba(16, 22, 34, 0.8) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT')" }}>
                        <div className="flex flex-col gap-4 text-left relative z-10 max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-3 py-1 backdrop-blur-sm w-fit">
                                <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                                <span className="text-xs font-bold uppercase tracking-wide text-white">Industry 4.0 Ready</span>
                            </div>
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">Intelligent Automation</h1>
                            <h2 className="text-gray-200 text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                                Optimize production, reduce downtime, and gain real-time insights with our custom SCADA and PLC solutions.
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section className="bg-white dark:bg-slate-900/50 py-8 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Trusted Integration Partners</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-xl md:text-2xl font-black text-slate-400 dark:text-slate-500 tracking-tighter">SIEMENS</span>
                        <span className="text-xl md:text-2xl font-black text-slate-400 dark:text-slate-500 tracking-tighter">Rockwell Automation</span>
                        <span className="text-xl md:text-2xl font-black text-slate-400 dark:text-slate-500 tracking-tighter">Schneider Electric</span>
                        <span className="text-xl md:text-2xl font-black text-slate-400 dark:text-slate-500 tracking-tighter">ABB</span>
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4 text-center md:text-left">
                            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">Core Automation Capabilities</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-primary/50 transition-all">
                                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <span className="material-symbols-outlined text-3xl">memory</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Industrial Control Systems</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Robust PLC/DCS architecture design. S7 and ControlLogix platforms.</p>
                            </div>
                            <div className="group bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-primary/50 transition-all">
                                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <span className="material-symbols-outlined text-3xl">monitor_heart</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">SCADA & HMI</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Real-time monitoring interfaces and historical data analysis.</p>
                            </div>
                            <div className="group bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-primary/50 transition-all">
                                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <span className="material-symbols-outlined text-3xl">trending_up</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Process Optimization</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Advanced loop tuning and predictive maintenance algorithms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Automation;