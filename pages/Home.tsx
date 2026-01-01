import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative">
                <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
                <div className="h-[600px] w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7jNnonTag33JDyU6IoOuVr2yFgb1ihnfMxPOd41_iTMPHhOD0QWj13m-Lw8i_X23BHkeRdpAEYzKivvXdf1Ut6WNLd1T6MjNs55kyLIb9mNtUDmPtCTXPgY7OrJAmCOXQlGJtSAsvudY1SVBT1SsjgfzpPLOX9-JiXQKsYTzmnKvXifJc94sMBxUzB11zOXrobGq4w4wXuIDlDnPJjxjHB3TzK8_fwzElziSZsELHUJwonAINlds3PAdWTWfUudx3YebG8hU9POV_')" }}>
                </div>
                <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md border border-white/20">
                            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span> Available for Global Projects
                        </div>
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                            Engineering Excellence for the Global Cement Industry
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200 sm:text-xl leading-relaxed">
                            Bridging mining operations and cement manufacturing with world-class engineering solutions. We specialize in plant optimization, structural integrity, and sustainable retrofitting.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/process" className="flex items-center justify-center h-12 min-w-[160px] rounded-lg bg-primary px-6 text-base font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
                                Explore Services
                            </Link>
                            <Link to="/projects" className="flex items-center justify-center h-12 min-w-[160px] rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-6 text-base font-bold text-white hover:bg-white/20 transition-all">
                                View Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white dark:bg-slate-900 py-12 border-b border-slate-200 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-4xl font-black text-primary">25+</span>
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Years Experience</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-4xl font-black text-primary">140</span>
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Projects Delivered</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-4xl font-black text-primary">12</span>
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Countries Served</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-4xl font-black text-primary">98%</span>
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Client Retention</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-background-light dark:bg-background-dark">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Our Expertise</h2>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Comprehensive Engineering Solutions</h3>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Service Card 1 */}
                        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                            <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmPYweqO3F10VFcu0WTCutAWt_viv-6evxUvQBlnzX6Pt0xZuBmdYzWl_ui6H25rCo77BL6XqQ7bIb2UAn_me0yP5FcC0iDTdbYI0KQPk-AtB51H7IHPRZoCshjc1QYqCED-VZac5tVh75g9kuvXjmSdYMKUmGH6qnPGYcMrlhcfJQPJT-vtZJJkI72b7v8scKbHqNyrZ_TnXnpySF3f1iRHKSOLUvuwOGlxhHXyhbMeUmOPaYF7y1OZp_5eFeyfl6kaB2W4nCMbYS')" }}></div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-2xl">settings_suggest</span>
                                </div>
                                <h4 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Process Engineering</h4>
                                <p className="mb-6 flex-1 text-slate-600 dark:text-slate-300">
                                    Comprehensive optimization of kiln lines, grinding stations, and pyro-processing systems to maximize throughput.
                                </p>
                                <Link to="/process" className="flex items-center text-sm font-bold text-primary group-hover:underline">
                                    Learn more <span className="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
                                </Link>
                            </div>
                        </div>

                        {/* Service Card 2 */}
                        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                            <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCW8UlJdOR12cf1fH4U7SS-OAbyHIUy4ycNZgTGgYxMFl94VzTX5OKrlXTK91dgwmBA9K4oNmce4kET4qYw7wky-SGAfc5vutBx4y12p070JcI_jjOd_uhMXGxq9KZhn7HujIeqOcNQAkEllGBQnbMix3P_PoArlK_9JC4uaZvM8zTQwOcA83dQ-AA83j9Hd3sWSA1pKUerWoCLB_FFjklSq4oBLnQgpo0BILJXmjBa1s6F24W6kuDV8mVhoE3zCUMVQdF-DOpNAsFw')" }}></div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-2xl">architecture</span>
                                </div>
                                <h4 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Structural Integrity</h4>
                                <p className="mb-6 flex-1 text-slate-600 dark:text-slate-300">
                                    Advanced silo inspections, heavy machinery foundations, and structural audits ensuring safety and longevity.
                                </p>
                                <Link to="/audits" className="flex items-center text-sm font-bold text-primary group-hover:underline">
                                    Learn more <span className="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
                                </Link>
                            </div>
                        </div>

                        {/* Service Card 3 */}
                        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                            <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUgQMDpuBxLNgfNuotyflii6QgB3XrHn-t8W_DwY1Om9ni81Ld4oiHBLjkn9_L0AYXFwcuGubOSvkTfj1JtRXaqI1j8vO85K7l7d_HQbKiiGW7jysOJcm7QWwJb-J2Sie864ybe6ykFtWOaoB5PCYXfkMCnQkYdiD1RcZqH7xBKb-s81T6ogpFcGcxEDZPfv_cp7Ar3SaF-LRmaFVdzI9-4kfugs9XpNkIfUDtJNJ2iRuazL3CSSPulxzp5y5rTerI9edZRoh0opyy')" }}></div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-2xl">local_shipping</span>
                                </div>
                                <h4 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Mining Logistics</h4>
                                <p className="mb-6 flex-1 text-slate-600 dark:text-slate-300">
                                    Optimizing the flow from quarry to crusher. We design efficient material handling systems.
                                </p>
                                <Link to="/optimization" className="flex items-center text-sm font-bold text-primary group-hover:underline">
                                    Learn more <span className="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Projects Section */}
            <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Our Portfolio</h2>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Featured Projects</h3>
                        </div>
                        <a className="hidden md:flex items-center text-primary font-bold hover:underline mt-4 md:mt-0" href="#">
                            View all projects <span className="material-symbols-outlined ml-1">arrow_forward</span>
                        </a>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Project 1 */}
                        <div className="relative overflow-hidden rounded-xl group aspect-video">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWJcOJiRvW9JT9oiLyqoEi28RiqLsD6lSM4njMvZgaj5Yartj5f_hMGexIZdwcZILI8OiVqdMA5Sn6DAu9BFEyQSyUuPieC18KtUxnL-ju80Io43jQuI7Q4qCXI9Ora5kiFEA4QkllU1hBiLOnB6qRmsl9wkGmvI0Hy7aRbyB5dL_DDfx9EzGKP0kz1rfePRypapzG_ap_sWGcWgXmRfrVsAuKbOw0x4tn7sneZvJ9SMb0vkPthZ76aQVhsj8bryYeCDg6AjneRs2v')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                <span className="mb-2 inline-block rounded bg-primary px-2 py-1 text-xs font-bold text-white">Retrofit</span>
                                <h4 className="text-2xl font-bold text-white mb-2">Kiln Line 4 Modernization</h4>
                                <p className="text-slate-200 text-sm max-w-md line-clamp-2">Complete pyro-processing upgrade resulting in 15% thermal efficiency gain for a major plant in Mexico.</p>
                            </div>
                        </div>
                        {/* Project 2 */}
                        <div className="relative overflow-hidden rounded-xl group aspect-video">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoFje1QM3nMfN_cNmoGjIE5UXc3TMn1qLMYkD03-sUxEE-HCZG5a_pbtSy7eQTJ01W7_JKzla7aEgJmCsYnYChH5VqiMhbfAOgZnNVFbTPLj6nvOEnhn6l80gSPrd5rZKRTUjU2XS38VTDrEzjXnZCK5HS1Mmvl2ZC1tLmKbHul1Bi0-MS-AXcErjRlq0HN_0kGoUFJrwcRJqFwvTlVDjCninURH864NoJm01sQhQxSk6cisRENI8kuhHkxA942GjrrdCGBO4HmBw-')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                <span className="mb-2 inline-block rounded bg-primary px-2 py-1 text-xs font-bold text-white">Greenfield</span>
                                <h4 className="text-2xl font-bold text-white mb-2">Grinding Station Setup</h4>
                                <p className="text-slate-200 text-sm max-w-md line-clamp-2">Design and commissioning of a 2M tpy grinding unit in Indonesia, featuring state-of-the-art VRM technology.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Insights */}
            <section className="py-20 bg-background-light dark:bg-background-dark">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h3 className="mb-10 text-2xl font-bold text-slate-900 dark:text-white border-l-4 border-primary pl-4">Industry Insights</h3>
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 grid gap-8 sm:grid-cols-2">
                            <article className="flex flex-col gap-3">
                                <div className="aspect-[4/3] w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5daHB5TwKjRhoMsHM9d5eIHLdLeUEYE0mFcmWjPjpL6PM6tDbdF__ou9E64mR7EomvqeqyC32gwESCFLvm7hVz0_fxn1ZMar9TXyD33vM-yCUTsY3NTdfXP4xwYj9hDW2csy-XZ0GSfC_R-rzRCg2fZ1H9PwGXIugQloyDXHd_lNCkKfo-IMzPDB0Iz0x_ukwYOw5ITsm0gYj1s5a_b7Secfs2c5eMFOPA6lhUD2aaAkZXDEokMtiuvi2cR3kOnh4IFlORCDw4T9-')" }}></div>
                                <div>
                                    <span className="text-xs font-bold text-primary uppercase tracking-wide">Trends</span>
                                    <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white hover:text-primary transition-colors cursor-pointer">The Rise of Calcined Clay Cement</h4>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">Exploring how LC3 technology is reshaping the carbon footprint of the cement industry.</p>
                                </div>
                            </article>
                            <article className="flex flex-col gap-3">
                                <div className="aspect-[4/3] w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCq2EZ62mCA9CkM1uLx117j_psVwjUwfqDAijTqbLwBhDoSCGouVQZ3Qrvu3u29Kq35T6s3bz-MfJRi78-QUG7mLEcUCclO9W7AYG5TuN3cOdcU58c8s0ZFjiGIKyv4y40ITYl5uxpkG1z29htCRYiMwlwRKuLDh_3IEU5pzQAOq5sHcpzH1hGMeyLeSnGcuOaV8LSBR301YbcuprJkxS2cn5ZDrAKtrtpQWlm8uFrc02JzjkLpHVDZPaDaVBD-3lDyphyp0o4FQtfz')" }}></div>
                                <div>
                                    <span className="text-xs font-bold text-primary uppercase tracking-wide">Sustainability</span>
                                    <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white hover:text-primary transition-colors cursor-pointer">Alternative Fuels: Beyond 50% TSR</h4>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">Technical challenges and engineering solutions for pushing thermal substitution rates higher.</p>
                                </div>
                            </article>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-fit">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Subscribe to Cemento40 Journal</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Get the latest engineering insights delivered to your inbox.</p>
                            <div className="flex flex-col gap-3">
                                <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-4 py-2 text-sm text-slate-900 dark:text-white focus:border-primary focus:ring-primary" placeholder="Your email address" type="email" />
                                <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-colors">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;