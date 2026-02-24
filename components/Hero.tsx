
import React from 'react';
import { IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full">
      <div
        className="w-full bg-cover bg-center bg-no-repeat h-[480px] md:h-[600px] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.75) 100%), url("${IMAGES.hero}")` }}
      >
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col gap-6 items-center">
          <div className="animate-fade-in-down">
            <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
              Ingeniería Integral para Minería y Cemento
            </span>
          </div>

          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight max-w-4xl">
            Soluciones que <span className="text-primary italic">Transforman</span> la Industria
          </h1>

          <p className="text-gray-100 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Expertos en Proceso, Automatización, Industria 4.0, Eléctrica, Control y Reingeniería para el sector industrial global.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all shadow-xl hover:shadow-primary/40 active:scale-95 group">
              Consultar experto
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button className="flex cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-base font-bold transition-all active:scale-95">
              Descargar Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
