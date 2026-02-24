
import React from 'react';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  return (
    <aside className="hidden lg:flex w-72 flex-col gap-6 sticky top-24 self-start h-[calc(100vh-120px)]">
      <div className="flex flex-col bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
        <div className="mb-8">
          <h3 className="text-gray-900 text-lg font-black tracking-tight">Áreas Técnicas</h3>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mt-1">Especialidades Cemento40</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar pr-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <a
                href={`#${item.id}`}
                className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl transition-all duration-300 border ${activeSection === item.id
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary border-transparent'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${activeSection === item.id ? 'fill-1' : ''
                    }`}>
                    {item.icon}
                  </span>
                  <span className={`text-[13px] ${activeSection === item.id ? 'font-black' : 'font-bold'}`}>
                    {item.label}
                  </span>
                </div>
                {activeSection === item.id && (
                  <span className="material-symbols-outlined text-sm animate-pulse">arrow_right_alt</span>
                )}
              </a>

              {/* Nested Sub-items (visible when section is active or on hover container) */}
              <div className={`pl-11 pr-2 flex flex-col gap-1.5 overflow-hidden transition-all duration-500 ${activeSection === item.id ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0'
                }`}>
                {item.subItems?.map((sub) => (
                  <a
                    key={sub.id}
                    href={`#${sub.id}`}
                    className="text-[11px] font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                    {sub.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Ayuda en Línea</p>
            <h4 className="text-gray-900 text-xs font-black mb-3">¿Necesitas un diagnóstico técnico?</h4>
            <button className="w-full py-2.5 bg-white text-primary text-[10px] font-black rounded-xl shadow-sm border border-primary/10 hover:bg-primary hover:text-white transition-all">
              AGENDAR REUNIÓN
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
