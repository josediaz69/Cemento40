import React from 'react';

const TeamMember = ({ name, role, education, experience, image }: { name: string, role: string, education: string, experience: string, image: string }) => (
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
        <div className="w-32 h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-700">
            <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h3>
            <span className="text-primary font-bold text-sm uppercase tracking-wide">{role}</span>
            <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-primary">school</span>
                    <span>{education}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-primary">work_history</span>
                    <span>{experience}</span>
                </div>
            </div>
        </div>
    </div>
);

const About: React.FC = () => {
    return (
        <div className="animate-fade-in bg-background-light dark:bg-background-dark min-h-screen">
             {/* Hero */}
            <div className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-black text-white sm:text-5xl mb-4">Our Expertise & Team</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Decades of combined engineering experience backed by rigorous academic research.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Intro / Philosophy */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Bridging Theory and Practice</h2>
                        <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300">
                            <p className="mb-4">
                                At Cemento40, we believe that world-class engineering requires more than just field experience; it demands a deep understanding of the fundamental sciences governing cement manufacturing.
                            </p>
                            <p>
                                Our team is composed of veteran engineers who hold advanced degrees in Chemical Engineering, Structural Dynamics, and Control Systems. We actively collaborate with technical universities to keep our methodologies at the cutting edge of science.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                            <span className="block text-4xl font-black text-primary mb-2">100+</span>
                            <span className="text-xs font-bold text-slate-500 uppercase">Years Combined Experience</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                            <span className="block text-4xl font-black text-primary mb-2">15</span>
                            <span className="text-xs font-bold text-slate-500 uppercase">Published Technical Papers</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                            <span className="block text-4xl font-black text-primary mb-2">4</span>
                            <span className="text-xs font-bold text-slate-500 uppercase">Patents Held</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                            <span className="block text-4xl font-black text-primary mb-2">PhD</span>
                            <span className="text-xs font-bold text-slate-500 uppercase">Level Leadership</span>
                        </div>
                    </div>
                </div>

                {/* Team Grid */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-l-4 border-primary pl-4">Our Leadership</h2>
                <div className="grid lg:grid-cols-2 gap-6 mb-20">
                    <TeamMember 
                        name="Dr. Roberto Sanchez"
                        role="Principal Process Engineer"
                        education="PhD in Chemical Engineering, ETH Zurich"
                        experience="28 Years. Ex-Holcim, Ex-FLSmidth. Specialist in Pyro-processing thermodynamics."
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuB5daHB5TwKjRhoMsHM9d5eIHLdLeUEYE0mFcmWjPjpL6PM6tDbdF__ou9E64mR7EomvqeqyC32gwESCFLvm7hVz0_fxn1ZMar9TXyD33vM-yCUTsY3NTdfXP4xwYj9hDW2csy-XZ0GSfC_R-rzRCg2fZ1H9PwGXIugQloyDXHd_lNCkKfo-IMzPDB0Iz0x_ukwYOw5ITsm0gYj1s5a_b7Secfs2c5eMFOPA6lhUD2aaAkZXDEokMtiuvi2cR3kOnh4IFlORCDw4T9-"
                    />
                    <TeamMember 
                        name="Elena Weber"
                        role="Head of Automation & AI"
                        education="MSc in Control Systems, TU Munich"
                        experience="18 Years. Expert in Siemens PCS7 and fuzzy logic control loops for grinding optimization."
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCWJcOJiRvW9JT9oiLyqoEi28RiqLsD6lSM4njMvZgaj5Yartj5f_hMGexIZdwcZILI8OiVqdMA5Sn6DAu9BFEyQSyUuPieC18KtUxnL-ju80Io43jQuI7Q4qCXI9Ora5kiFEA4QkllU1hBiLOnB6qRmsl9wkGmvI0Hy7aRbyB5dL_DDfx9EzGKP0kz1rfePRypapzG_ap_sWGcWgXmRfrVsAuKbOw0x4tn7sneZvJ9SMb0vkPthZ76aQVhsj8bryYeCDg6AjneRs2v" 
                    />
                    <TeamMember 
                        name="Marco Rossi"
                        role="Senior Structural Engineer"
                        education="MSc in Civil Engineering, Politecnico di Milano"
                        experience="22 Years. Specialized in heavy machinery foundations and silo structural rehabilitation."
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCUgQMDpuBxLNgfNuotyflii6QgB3XrHn-t8W_DwY1Om9ni81Ld4oiHBLjkn9_L0AYXFwcuGubOSvkTfj1JtRXaqI1j8vO85K7l7d_HQbKiiGW7jysOJcm7QWwJb-J2Sie864ybe6ykFtWOaoB5PCYXfkMCnQkYdiD1RcZqH7xBKb-s81T6ogpFcGcxEDZPfv_cp7Ar3SaF-LRmaFVdzI9-4kfugs9XpNkIfUDtJNJ2iRuazL3CSSPulxzp5y5rTerI9edZRoh0opyy"
                    />
                    <TeamMember 
                        name="Sarah Chen"
                        role="Alternative Fuels Specialist"
                        education="PhD in Environmental Engineering, Stanford"
                        experience="15 Years. Focus on AFR combustion kinetics and emissions control systems."
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBoFje1QM3nMfN_cNmoGjIE5UXc3TMn1qLMYkD03-sUxEE-HCZG5a_pbtSy7eQTJ01W7_JKzla7aEgJmCsYnYChH5VqiMhbfAOgZnNVFbTPLj6nvOEnhn6l80gSPrd5rZKRTUjU2XS38VTDrEzjXnZCK5HS1Mmvl2ZC1tLmKbHul1Bi0-MS-AXcErjRlq0HN_0kGoUFJrwcRJqFwvTlVDjCninURH864NoJm01sQhQxSk6cisRENI8kuhHkxA942GjrrdCGBO4HmBw-"
                    />
                </div>

                {/* Certifications & Studies */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Certifications & Continuous Studies</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            We are committed to maintaining the highest industry standards. Our team holds certifications from globally recognized institutions.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                         <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">verified_user</span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Project Management</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">PMP® Certified Project Managers ensuring on-time, on-budget delivery.</p>
                         </div>
                         <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Sustainability</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">LEED Accredited Professionals and Envision Sustainability Professionals.</p>
                         </div>
                         <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">safety_check</span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Safety First</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">OSHA 30 and NEBOSH certified engineers for site supervision.</p>
                         </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;