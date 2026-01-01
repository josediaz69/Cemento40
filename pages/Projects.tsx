import React, { useState } from 'react';

type Category = 'All' | 'Retrofit' | 'Greenfield' | 'Automation' | 'Sustainability';

interface Project {
    id: string;
    title: string;
    location: string;
    category: Exclude<Category, 'All'>;
    image: string;
    description: string;
    stats?: { label: string; value: string }[];
}

const projects: Project[] = [
    {
        id: '1',
        title: 'Kiln Line 4 Modernization',
        location: 'Monterrey, Mexico',
        category: 'Retrofit',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWJcOJiRvW9JT9oiLyqoEi28RiqLsD6lSM4njMvZgaj5Yartj5f_hMGexIZdwcZILI8OiVqdMA5Sn6DAu9BFEyQSyUuPieC18KtUxnL-ju80Io43jQuI7Q4qCXI9Ora5kiFEA4QkllU1hBiLOnB6qRmsl9wkGmvI0Hy7aRbyB5dL_DDfx9EzGKP0kz1rfePRypapzG_ap_sWGcWgXmRfrVsAuKbOw0x4tn7sneZvJ9SMb0vkPthZ76aQVhsj8bryYeCDg6AjneRs2v',
        description: 'Complete pyro-processing upgrade including preheater modification and cooler replacement, resulting in significant thermal efficiency gains.',
        stats: [{ label: 'Efficiency Gain', value: '+15%' }, { label: 'Capacity', value: '3,500 tpd' }]
    },
    {
        id: '2',
        title: 'Greenfield Grinding Station',
        location: 'Java, Indonesia',
        category: 'Greenfield',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoFje1QM3nMfN_cNmoGjIE5UXc3TMn1qLMYkD03-sUxEE-HCZG5a_pbtSy7eQTJ01W7_JKzla7aEgJmCsYnYChH5VqiMhbfAOgZnNVFbTPLj6nvOEnhn6l80gSPrd5rZKRTUjU2XS38VTDrEzjXnZCK5HS1Mmvl2ZC1tLmKbHul1Bi0-MS-AXcErjRlq0HN_0kGoUFJrwcRJqFwvTlVDjCninURH864NoJm01sQhQxSk6cisRENI8kuhHkxA942GjrrdCGBO4HmBw-',
        description: 'Design, engineering, and commissioning of a 2.0 MTPA cement grinding unit featuring state-of-the-art Vertical Roller Mill technology.',
        stats: [{ label: 'Capacity', value: '2.0 MTPA' }, { label: 'Timeline', value: '18 Months' }]
    },
    {
        id: '3',
        title: 'Alternative Fuels System',
        location: 'Bavaria, Germany',
        category: 'Sustainability',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwN8soMJUxEzWSX0kj1zu_6h62v17Sbck5kztWZKB6YkiTOt5zXDjUjwg4qOQI_P2h1Gx4h974iqM59vVh8nfvrWvsYXaAPAlzsWgxM-J0yseKK4v0C1cJ9EMEItOKfXohgVxtZwQpNqf2bm3CXvn26VTaJX-f7tSHSkt_VLD2viptT18EMg4SopMqyA7UorpFL-EgOqkQZxaxI1s1L-5RIG3Yr5f-m6uLHRF-bgzptS5ghCZM7Q5GbnT9Kp9iqH9LDyQbGpsPZ00q',
        description: 'Implementation of a high-substitution alternative fuel feeding system, allowing the plant to reach 85% thermal substitution rate.',
        stats: [{ label: 'TSR', value: '85%' }, { label: 'CO2 Reduction', value: '40k tons/yr' }]
    },
    {
        id: '4',
        title: 'Plant-Wide Automation Migration',
        location: 'Texas, USA',
        category: 'Automation',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3O9sszyC-gdlw4ZhnUnnr5rLnWz296rwrbQtywDsKzQOwnTNDVyDVa1xWzbQqugBRv4cEYGv5UIWxsLm7K4aE8ME04hZm5DwXBmg9TLIypHu_WZLw4wROFsxiMqiCfGp4fZoe626PTpgslrjhmY0ZQ2RHpuU3qlkMYtQONwBbKysoTjNWQb97mViNSGgA5KmrxPv33apDJQyiHqXXeun1SgbW5OSPLpkQvsf9gva8FCGkqVQ5Nad4CXGjMkA_OHC3pmTYki8iB7eT',
        description: 'Migration of legacy control systems to a modern DCS architecture with minimal production downtime and enhanced data analytics.',
        stats: [{ label: 'I/O Points', value: '5,000+' }, { label: 'Downtime', value: '< 48 hrs' }]
    },
     {
        id: '5',
        title: 'Clinker Silo Rehabilitation',
        location: 'São Paulo, Brazil',
        category: 'Retrofit',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW8UlJdOR12cf1fH4U7SS-OAbyHIUy4ycNZgTGgYxMFl94VzTX5OKrlXTK91dgwmBA9K4oNmce4kET4qYw7wky-SGAfc5vutBx4y12p070JcI_jjOd_uhMXGxq9KZhn7HujIeqOcNQAkEllGBQnbMix3P_PoArlK_9JC4uaZvM8zTQwOcA83dQ-AA83j9Hd3sWSA1pKUerWoCLB_FFjklSq4oBLnQgpo0BILJXmjBa1s6F24W6kuDV8mVhoE3zCUMVQdF-DOpNAsFw',
        description: 'Structural reinforcement and post-tensioning repair of a 50,000t clinker silo extending its operational life by 20 years.',
        stats: [{ label: 'Capacity', value: '50kt' }, { label: 'Life Extension', value: '20 Years' }]
    },
    {
        id: '6',
        title: 'Calcined Clay Pilot Plant',
        location: 'Lyon, France',
        category: 'Sustainability',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5daHB5TwKjRhoMsHM9d5eIHLdLeUEYE0mFcmWjPjpL6PM6tDbdF__ou9E64mR7EomvqeqyC32gwESCFLvm7hVz0_fxn1ZMar9TXyD33vM-yCUTsY3NTdfXP4xwYj9hDW2csy-XZ0GSfC_R-rzRCg2fZ1H9PwGXIugQloyDXHd_lNCkKfo-IMzPDB0Iz0x_ukwYOw5ITsm0gYj1s5a_b7Secfs2c5eMFOPA6lhUD2aaAkZXDEokMtiuvi2cR3kOnh4IFlORCDw4T9-',
        description: 'Engineering and setup of a pilot LC3 production line to test local clay suitability for low-carbon cement production.',
        stats: [{ label: 'Reduction', value: '-40% CO2' }, { label: 'Type', value: 'LC3' }]
    }
];

const Projects: React.FC = () => {
    const [filter, setFilter] = useState<Category>('All');

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.category === filter);

    return (
        <div className="animate-fade-in bg-background-light dark:bg-background-dark min-h-screen">
             {/* Hero */}
            <div className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-black text-white sm:text-5xl mb-4">Our Global Footprint</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Delivering engineering excellence across continents. From brownfield optimizations to greenfield innovations.
                    </p>
                </div>
            </div>

            {/* Filter */}
            <div className="sticky top-16 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        {['All', 'Retrofit', 'Greenfield', 'Automation', 'Sustainability'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category as Category)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                    filter === category
                                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
                            <div className="relative h-64 overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${project.image}')` }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white uppercase tracking-wide">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                                        {project.location}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                                
                                {project.stats && (
                                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-4">
                                        {project.stats.map((stat, idx) => (
                                            <div key={idx}>
                                                <div className="text-lg font-black text-slate-900 dark:text-white">{stat.value}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;