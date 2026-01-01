import React, { useState, useEffect, useRef } from 'react';

interface Plant {
    id: string;
    name: string;
    location: string;
    type: 'Integrated' | 'Grinding';
    status: 'Optimal' | 'Warning' | 'Maintenance';
    ip: string;
}

interface LogEntry {
    id: number;
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

const ColombiaConnect: React.FC = () => {
    const [scanActive, setScanActive] = useState(false);
    const [connected, setConnected] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    
    // Console Logs State
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);

    // Live Telemetry State
    const [telemetry, setTelemetry] = useState({
        kilnTemp: 1450,
        feedRate: 280,
        mainDriveAmps: 450,
        nox: 350,
        vibration: 2.1
    });

    // Simulated Colombian Plants Data
    const plants: Plant[] = [
        { id: 'p1', name: 'Planta Rio Claro', location: 'Antioquia', type: 'Integrated', status: 'Warning', ip: '192.168.10.45' },
        { id: 'p2', name: 'Planta Sogamoso', location: 'Boyacá', type: 'Integrated', status: 'Optimal', ip: '10.5.2.112' },
        { id: 'p3', name: 'Molienda Cartagena', location: 'Bolívar', type: 'Grinding', status: 'Maintenance', ip: '172.16.0.55' },
        { id: 'p4', name: 'Planta Yumbo', location: 'Valle del Cauca', type: 'Integrated', status: 'Warning', ip: '10.0.4.22' },
    ];

    const addLog = (message: string, type: LogEntry['type'] = 'info') => {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
        setLogs(prev => [...prev, { id: Date.now(), timestamp: timeString, message, type }]);
    };

    // Auto-scroll logs
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // Simulate Telemetry Fluctuation
    useEffect(() => {
        if (connected && selectedPlant) {
            const interval = setInterval(() => {
                setTelemetry(prev => ({
                    kilnTemp: Math.round(prev.kilnTemp + (Math.random() * 10 - 5)),
                    feedRate: Math.round((prev.feedRate + (Math.random() * 4 - 2)) * 10) / 10,
                    mainDriveAmps: Math.round(prev.mainDriveAmps + (Math.random() * 6 - 3)),
                    nox: Math.round(prev.nox + (Math.random() * 15 - 7.5)),
                    vibration: Math.max(0, Math.round((prev.vibration + (Math.random() * 0.2 - 0.1)) * 100) / 100)
                }));
            }, 800);
            return () => clearInterval(interval);
        }
    }, [connected, selectedPlant]);

    const handleConnect = () => {
        setScanActive(true);
        setLogs([]);
        addLog('Iniciando protocolo de conexión segura (TLS 1.3)...');
        
        setTimeout(() => addLog('Resolviendo DNS regionales para *.cement.co...', 'info'), 500);
        setTimeout(() => addLog('Estableciendo túnel VPN con Nodo Bogotá...', 'success'), 1200);
        setTimeout(() => addLog('Autenticando credenciales de ingeniería...', 'info'), 1800);
        setTimeout(() => addLog('Escaneando endpoints OPC-UA disponibles...', 'warning'), 2500);
        
        setTimeout(() => {
            setScanActive(false);
            setConnected(true);
            addLog('Conexión establecida. 4 Plantas detectadas.', 'success');
        }, 3000);
    };

    const selectPlant = (plant: Plant) => {
        if (isAnalyzing) return;
        setSelectedPlant(plant.id);
        setAnalysisComplete(false);
        addLog(`Conectando a SCADA local: ${plant.name} (${plant.ip})...`, 'info');
        setTimeout(() => addLog(`Lectura de registros Modbus iniciada. Bloques 40001-45000.`, 'success'), 600);
    };

    const runDiagnostics = () => {
        if (!selectedPlant) return;
        setIsAnalyzing(true);
        setAnalysisComplete(false);
        
        addLog('Iniciando Motor de IA Cemento40...', 'info');
        
        const steps = [
            { msg: 'Analizando perfil térmico del horno...', delay: 800 },
            { msg: 'Correlacionando consumo de combustible vs clinker producido...', delay: 1600 },
            { msg: 'Detectando anomalías en ventiladores de tiro inducido...', delay: 2400 },
            { msg: 'Verificando cumplimiento de normativa ambiental (NOx/SOx)...', delay: 3200 },
            { msg: 'Calculando potenciales de ahorro energético...', delay: 4000 },
        ];

        steps.forEach(({ msg, delay }) => {
            setTimeout(() => addLog(msg, 'warning'), delay);
        });

        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            addLog('Diagnóstico completado. Reporte generado.', 'success');
        }, 4500);
    };

    // Helper to render telemetry bars
    const TelemetryBar = ({ label, value, max, unit, color }: any) => {
        const percent = Math.min(100, Math.max(0, (value / max) * 100));
        return (
            <div className="mb-3">
                <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-500 dark:text-slate-400">{label}</span>
                    <span className={`font-bold ${color}`}>{value} {unit}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${color.replace('text-', 'bg-')}`} 
                        style={{ width: `${percent}%` }}
                    ></div>
                </div>
            </div>
        );
    };

    const activePlantData = plants.find(p => p.id === selectedPlant);

    return (
        <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 min-h-screen font-display">
            {/* Header / Map Hero */}
            <div className="relative bg-slate-900 text-white py-12 px-4 md:px-10 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 opacity-10" style={{ 
                    backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)",
                    backgroundSize: '50px 50px'
                }}></div>
                
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                Hub Regional: Colombia
                            </div>
                            {connected && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[10px]">lock</span>
                                    Conexión Cifrada (AES-256)
                                </div>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
                            Centro de Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">Andino</span>
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
                            Plataforma de ingeniería remota. Conecte sus sistemas SCADA/DCS para recibir auditorías de proceso, análisis de eficiencia energética y diagnósticos predictivos en tiempo real.
                        </p>
                        
                        {!connected ? (
                            <button 
                                onClick={handleConnect}
                                disabled={scanActive}
                                className="group relative overflow-hidden rounded-lg bg-yellow-500 text-slate-900 px-8 py-4 font-bold transition-all hover:bg-yellow-400 disabled:opacity-70 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {scanActive ? 'Estableciendo Enlace Satelital...' : 'Iniciar Conexión Remota'}
                                    {!scanActive && <span className="material-symbols-outlined">satellite_alt</span>}
                                </span>
                            </button>
                        ) : (
                            <div className="flex gap-6 text-sm font-mono text-slate-400">
                                <div>
                                    <span className="block text-xs text-slate-500 uppercase">Latencia</span>
                                    <span className="text-green-400">42 ms</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-500 uppercase">Ancho de Banda</span>
                                    <span className="text-white">1.2 GB/s</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-500 uppercase">Protocolo</span>
                                    <span className="text-white">OPC UA / MQTT</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Dashboard Interface */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
                {connected ? (
                    <div className="grid lg:grid-cols-12 gap-6 h-full lg:h-[800px]">
                        {/* Sidebar: Plant List */}
                        <div className="lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto pr-2">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Red de Plantas</h3>
                                <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">4 Activos</span>
                            </div>
                            {plants.map((plant) => (
                                <button
                                    key={plant.id}
                                    onClick={() => selectPlant(plant)}
                                    className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden group ${
                                        selectedPlant === plant.id 
                                        ? 'bg-slate-900 border-yellow-500 ring-1 ring-yellow-500 shadow-lg' 
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                    }`}
                                >
                                    {selectedPlant === plant.id && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>
                                    )}
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className={`font-bold ${selectedPlant === plant.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plant.name}</h4>
                                            {plant.status === 'Warning' && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span></span>}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className={`text-xs ${selectedPlant === plant.id ? 'text-slate-300' : 'text-slate-500'} flex items-center gap-1`}>
                                                <span className="material-symbols-outlined text-[10px]">dns</span> {plant.ip}
                                            </div>
                                            <div className={`text-xs ${selectedPlant === plant.id ? 'text-slate-300' : 'text-slate-500'} flex items-center gap-1`}>
                                                <span className="material-symbols-outlined text-[10px]">location_on</span> {plant.location}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Center: Real-time Telemetry & Logs */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            
                            {/* Telemetry Panel */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm relative overflow-hidden">
                                {!selectedPlant ? (
                                     <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center flex-col text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">sensors_off</span>
                                        <span className="text-sm font-bold">Seleccione una planta para ver telemetría</span>
                                     </div>
                                ) : null}
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">monitor_heart</span>
                                        Variables de Proceso (Tiempo Real)
                                    </h3>
                                    {selectedPlant && <span className="text-[10px] font-mono text-green-500 animate-pulse">● LIVE</span>}
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                                            <span className="text-[10px] text-slate-500 uppercase block mb-1">Temp. Zona Sinterización</span>
                                            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{telemetry.kilnTemp} <span className="text-sm text-slate-400 font-normal">°C</span></span>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                                            <span className="text-[10px] text-slate-500 uppercase block mb-1">Alimentación Horno</span>
                                            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{telemetry.feedRate} <span className="text-sm text-slate-400 font-normal">tph</span></span>
                                        </div>
                                    </div>
                                    <TelemetryBar label="Amperaje Motor Principal" value={telemetry.mainDriveAmps} max={600} unit="Amps" color="text-blue-500" />
                                    <TelemetryBar label="Emisiones NOx" value={telemetry.nox} max={800} unit="mg/Nm³" color={telemetry.nox > 600 ? "text-red-500" : "text-green-500"} />
                                    <TelemetryBar label="Vibración Molino Crudo" value={telemetry.vibration} max={5} unit="mm/s" color={telemetry.vibration > 3 ? "text-amber-500" : "text-slate-500"} />
                                </div>
                            </div>

                            {/* Console Logs */}
                            <div className="flex-grow bg-black rounded-xl border border-slate-700 p-4 font-mono text-xs overflow-hidden flex flex-col shadow-inner">
                                <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2 mb-2">
                                    <span>System Output</span>
                                    <span className="material-symbols-outlined text-sm">terminal</span>
                                </div>
                                <div className="flex-grow overflow-y-auto space-y-1.5 custom-scrollbar h-64 lg:h-auto">
                                    {logs.map((log) => (
                                        <div key={log.id} className="flex gap-3 animate-fade-in">
                                            <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                                            <span className={`${
                                                log.type === 'error' ? 'text-red-400' : 
                                                log.type === 'warning' ? 'text-yellow-400' : 
                                                log.type === 'success' ? 'text-green-400' : 'text-slate-300'
                                            }`}>
                                                {log.type === 'success' && '✓ '}
                                                {log.type === 'warning' && '⚠ '}
                                                {log.message}
                                            </span>
                                        </div>
                                    ))}
                                    <div ref={logsEndRef} />
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions & Report */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {/* Action Card */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                                <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4">Herramientas de Ingeniería</h3>
                                <button 
                                    onClick={runDiagnostics}
                                    disabled={!selectedPlant || isAnalyzing}
                                    className="w-full py-4 bg-primary hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:shadow-none"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Ejecutando Análisis...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">troubleshoot</span>
                                            Ejecutar Auditoría IA
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-center text-slate-400 mt-3">
                                    El sistema analizará 500+ variables de proceso para detectar ineficiencias térmicas y mecánicas.
                                </p>
                            </div>

                            {/* Result Card */}
                            <div className={`flex-grow bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-0 shadow-sm overflow-hidden transition-all duration-500 ${analysisComplete ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                                {!analysisComplete ? (
                                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
                                        <span className="material-symbols-outlined text-5xl mb-3 opacity-20">assignment</span>
                                        <p className="text-sm">El reporte se generará aquí automáticamente al finalizar el diagnóstico.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col h-full">
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Reporte Técnico #COL-882</h4>
                                                <span className="text-[10px] text-slate-500 uppercase">Generado por Gemini AI</span>
                                            </div>
                                            <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">download</span></button>
                                        </div>
                                        <div className="p-5 flex-grow overflow-y-auto">
                                            {/* Summary KPI */}
                                            <div className="mb-6">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Hallazgo Crítico</span>
                                                <div className="flex items-start gap-3 mt-2">
                                                    <div className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg">
                                                        <span className="material-symbols-outlined">local_fire_department</span>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-slate-900 dark:text-white leading-tight">Consumo Térmico Excesivo</h5>
                                                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">El consumo específico es 860 kCal/kg, un <span className="font-bold text-red-500">+12%</span> sobre la línea base teórica.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Graph Placeholder */}
                                            <div className="mb-6">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 block">Comparativa Benchmark</span>
                                                <div className="flex items-end gap-2 h-24 border-b border-slate-200 dark:border-slate-700 pb-1">
                                                    <div className="w-1/3 bg-slate-300 dark:bg-slate-700 rounded-t h-[60%] relative group">
                                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">750</span>
                                                    </div>
                                                    <div className="w-1/3 bg-green-500 rounded-t h-[65%] relative group opacity-50">
                                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600">780</span>
                                                    </div>
                                                    <div className="w-1/3 bg-red-500 rounded-t h-[85%] relative group">
                                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-600">860</span>
                                                    </div>
                                                </div>
                                                <div className="flex text-[10px] text-slate-400 justify-between pt-1">
                                                    <span className="w-1/3 text-center">BAT*</span>
                                                    <span className="w-1/3 text-center">Promedio</span>
                                                    <span className="w-1/3 text-center font-bold text-slate-600 dark:text-slate-300">Actual</span>
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-1 italic">*Best Available Technology</p>
                                            </div>

                                            {/* Recommendation */}
                                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                                <h5 className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase mb-2">Recomendación</h5>
                                                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc pl-4">
                                                    <li>Ajustar aire primario del quemador (-5%)</li>
                                                    <li>Revisar sellos del enfriador (falsos aires detectados)</li>
                                                </ul>
                                                <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800/30 flex justify-between items-center">
                                                    <span className="text-xs font-bold text-slate-500">Ahorro Est:</span>
                                                    <span className="text-sm font-black text-green-600">$450k USD/año</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Initial State: Empty Map / Invite to Connect */
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center opacity-40">
                         <div className="w-24 h-24 border-4 border-slate-300 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-5xl text-slate-300">hub</span>
                         </div>
                         <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sistema Desconectado</h2>
                         <p className="text-slate-500">Inicie la conexión segura arriba para acceder a la red de plantas.</p>
                    </div>
                )}
            </div>
            
            {/* Trust Section */}
            <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 mt-8">
                <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Protocolos Compatibles</p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-black text-slate-500">OPC UA</span>
                        <span className="text-sm font-black text-slate-500">MODBUS TCP</span>
                        <span className="text-sm font-black text-slate-500">PROFINET</span>
                        <span className="text-sm font-black text-slate-500">ETHERNET/IP</span>
                        <span className="text-sm font-black text-slate-500">MQTT</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColombiaConnect;