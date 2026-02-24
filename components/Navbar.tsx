
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  setPage: (page: 'home' | 'proyectos' | 'experiencia' | 'alianzas' | 'contacto') => void;
  activePage: string;
}

const Navbar: React.FC<NavbarProps> = ({ setPage, activePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Estados para el menú móvil
  const [isMobileServiciosOpen, setIsMobileServiciosOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServiciosOpen(false);
    setMobileActiveCategory(null);
  };

  const handleNavClick = (page: 'home' | 'proyectos' | 'experiencia' | 'alianzas' | 'contacto', skipScroll = false) => {
    setPage(page);
    if (!skipScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  const toggleMobileCategory = (id: string) => {
    setMobileActiveCategory(mobileActiveCategory === id ? null : id);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'
        } border-b border-gray-100 px-4 lg:px-10`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group">
          <div className="size-10 flex items-center justify-center bg-primary/10 rounded-xl text-primary transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-3xl font-bold">engineering</span>
          </div>
          <h2 className="text-gray-900 text-4xl font-black tracking-tighter leading-none">Cemento40</h2>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('servicios')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePage === 'home' ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-primary'
                }`}
            >
              Servicios
              <span className={`material-symbols-outlined text-lg transition-transform ${activeDropdown === 'servicios' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Megamenu Content */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[700px] transition-all duration-300 origin-top ${activeDropdown === 'servicios' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 grid grid-cols-3 gap-8">
                {NAV_ITEMS.map((section) => (
                  <div key={section.id} className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-xl">{section.icon}</span>
                      <h4 className="font-black text-xs uppercase tracking-widest">{section.label}</h4>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {section.subItems?.map((sub) => (
                        <li key={sub.id}>
                          <a
                            href={`#${sub.id}`}
                            onClick={() => {
                              setActiveDropdown(null);
                              handleNavClick('home', true);
                            }}
                            className="text-gray-500 hover:text-primary text-[13px] font-medium transition-colors flex items-center gap-1 group"
                          >
                            <span className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-primary transition-all"></span>
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => handleNavClick('proyectos')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePage === 'proyectos' ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>Proyectos</button>
          <button onClick={() => handleNavClick('alianzas')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePage === 'alianzas' ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>Colombia Connect</button>
          <button onClick={() => handleNavClick('experiencia')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePage === 'experiencia' ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>Experiencia</button>
          <button onClick={() => handleNavClick('contacto')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activePage === 'contacto' ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>Contacto</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button onClick={() => handleNavClick('contacto')} className="hidden sm:flex items-center justify-center rounded-xl h-11 px-6 bg-primary hover:bg-blue-700 transition-all text-white text-sm font-bold shadow-lg shadow-primary/20 active:scale-95">
            Cotizar Proyecto
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col p-6 animate-in fade-in slide-in-from-right duration-300 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary font-bold">engineering</span>
              <h2 className="text-xl font-black">Menú Técnico</h2>
            </div>
            <button onClick={closeMobileMenu} className="p-2 bg-gray-50 rounded-xl">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {/* Servicios Accordion */}
            <div className="flex flex-col border-b border-gray-100 pb-4 mb-4">
              <button
                onClick={() => setIsMobileServiciosOpen(!isMobileServiciosOpen)}
                className="flex items-center justify-between text-2xl font-black py-2"
              >
                Servicios
                <span className={`material-symbols-outlined transition-transform duration-300 ${isMobileServiciosOpen ? 'rotate-180 text-primary' : ''}`}>
                  expand_more
                </span>
              </button>

              <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-500 ${isMobileServiciosOpen ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                {NAV_ITEMS.map((section) => (
                  <div key={section.id} className="flex flex-col bg-gray-50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleMobileCategory(section.id)}
                      className={`flex items-center justify-between px-5 py-4 transition-colors ${mobileActiveCategory === section.id ? 'bg-primary text-white' : 'text-gray-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]">{section.icon}</span>
                        <span className="font-black text-sm uppercase tracking-widest">{section.label}</span>
                      </div>
                      <span className={`material-symbols-outlined text-sm transition-transform ${mobileActiveCategory === section.id ? 'rotate-90' : ''}`}>
                        chevron_right
                      </span>
                    </button>

                    <div className={`flex flex-col gap-3 px-12 overflow-hidden transition-all duration-300 ${mobileActiveCategory === section.id ? 'max-h-64 py-4 border-t border-white/10' : 'max-h-0'}`}>
                      {section.subItems?.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          onClick={() => { handleNavClick('home', true); }}
                          className={`text-xs font-bold flex items-center gap-2 ${mobileActiveCategory === section.id ? 'text-white/80' : 'text-gray-500'}`}
                        >
                          <span className="size-1 bg-current opacity-30 rounded-full"></span>
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleNavClick('home')}
                  className="mt-2 text-center text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 py-3 rounded-xl"
                >
                  Ver Todo en Home
                </button>
              </div>
            </div>

            <button onClick={() => handleNavClick('alianzas')} className="text-2xl font-black text-left py-2 border-b border-gray-100 flex items-center justify-between group">
              Colombia Connect
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">arrow_forward</span>
            </button>

            <button onClick={() => handleNavClick('proyectos')} className="text-2xl font-black text-left py-2 border-b border-gray-100 flex items-center justify-between group">
              Proyectos
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">arrow_forward</span>
            </button>

            <button onClick={() => handleNavClick('experiencia')} className="text-2xl font-black text-left py-2 border-b border-gray-100 flex items-center justify-between group">
              Experiencia
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">arrow_forward</span>
            </button>

            <button onClick={() => handleNavClick('contacto')} className="text-2xl font-black text-left py-2 text-primary flex items-center justify-between group">
              Contacto
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          <div className="mt-12 space-y-6">
            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
              <h4 className="text-gray-900 font-black text-sm mb-2">Ingeniería Senior</h4>
              <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4">Asistencia técnica directa para plantas cementeras y minería en toda Latam.</p>
              <button onClick={() => handleNavClick('contacto')} className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20">
                SOLICITAR REUNIÓN
              </button>
            </div>

            <div className="flex justify-center gap-6">
              {['linked_camera', 'mail', 'phone_in_talk'].map(icon => (
                <div key={icon} className="size-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
