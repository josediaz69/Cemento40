import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 md:py-16 border-t border-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6 group w-fit">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white group-hover:bg-blue-600 transition-colors">
                                <span className="material-symbols-outlined">factory</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Cemento40</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400 mb-6">
                            Engineering partners for the world's leading cement manufacturers. We deliver precision, efficiency, and innovation.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">public</span></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">share</span></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">mail</span></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Expertise</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/process" className="hover:text-primary transition-colors">Process Engineering</Link></li>
                            <li><Link to="/audits" className="hover:text-primary transition-colors">Structural Audits</Link></li>
                            <li><Link to="/automation" className="hover:text-primary transition-colors">Automation</Link></li>
                            <li><Link to="/optimization" className="hover:text-primary transition-colors">Alternative Fuels</Link></li>
                            <li><Link to="/commissioning" className="hover:text-primary transition-colors">Commissioning</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link to="/insights" className="hover:text-primary transition-colors">News & Insights</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Global Offices</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <span>Zurich, Switzerland<br/><span className="text-xs text-slate-500">Headquarters</span></span>
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <span>Monterrey, Mexico<br/><span className="text-xs text-slate-500">Americas Hub</span></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
                    © 2024 Cemento40 Engineering Group. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;