import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Helper to check active state
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-all duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white group-hover:bg-blue-700 transition-colors">
                            <span className="material-symbols-outlined">factory</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Cemento40</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}>Home</Link>
                        
                        {/* Dropdown for Services */}
                        <div className="relative group h-16 flex items-center">
                            <button className={`text-sm font-medium transition-colors flex items-center gap-1 ${['/process', '/electrical', '/automation', '/control', '/cfd', '/optimization', '/commissioning', '/audits', '/info-reengineering'].includes(location.pathname) ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}>
                                Expertise <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            <div className="absolute top-16 left-0 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-2 grid gap-1 z-50">
                                <Link to="/process" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">Process Engineering</Link>
                                <Link to="/electrical" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">Electrical</Link>
                                <Link to="/automation" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">Automation</Link>
                                <Link to="/control" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">Control Services</Link>
                                <Link to="/cfd" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">CFD Modeling</Link>
                                <Link to="/optimization" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">Plant Optimization</Link>
                                <Link to="/commissioning" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">Commissioning</Link>
                                <Link to="/audits" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">Technical Audits</Link>
                                <Link to="/info-reengineering" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors">Info Reengineering</Link>
                            </div>
                        </div>

                        <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}>About Us</Link>
                        <Link to="/projects" className={`text-sm font-medium transition-colors ${isActive('/projects') ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}>Projects</Link>
                        
                        {/* Colombia Special Link */}
                        <Link to="/colombia" className={`flex items-center gap-1 text-sm font-bold transition-colors ${isActive('/colombia') ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-600 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-400'}`}>
                             <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                             Colombia
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link to="/contact" className="hidden md:flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            Contact Us
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300">
                            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </header>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 absolute w-full shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto">
                    <nav className="flex flex-col gap-4">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium ${isActive('/') ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>Home</Link>
                        
                        <div className="border-l-2 border-slate-100 dark:border-slate-800 pl-4 flex flex-col gap-3">
                            <span className="text-xs font-bold text-slate-400 uppercase">Expertise</span>
                            <Link to="/process" onClick={() => setIsMenuOpen(false)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Process Engineering</Link>
                            <Link to="/electrical" onClick={() => setIsMenuOpen(false)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Electrical</Link>
                            <Link to="/automation" onClick={() => setIsMenuOpen(false)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Automation</Link>
                            <Link to="/control" onClick={() => setIsMenuOpen(false)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Control Services</Link>
                            <Link to="/cfd" onClick={() => setIsMenuOpen(false)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">CFD Modeling</Link>
                            <Link to="/optimization" onClick={() => setIsMenuOpen(false)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Plant Optimization</Link>
                            <Link to="/commissioning" onClick={() => setIsMenuOpen(false)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Commissioning</Link>
                            <Link to="/audits" onClick={() => setIsMenuOpen(false)} className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary">Technical Audits</Link>
                        </div>
                        
                        <Link to="/about" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium ${isActive('/about') ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>About Us</Link>
                        <Link to="/projects" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium ${isActive('/projects') ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>Projects</Link>
                        <Link to="/colombia" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium text-yellow-600 dark:text-yellow-400`}>Colombia Portal</Link>
                        
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="w-full h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90">
                            Contact Us
                        </Link>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;