import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import ProcessEngineering from './pages/ProcessEngineering';
import Automation from './pages/Automation';
import CFD from './pages/CFD';
import Projects from './pages/Projects';
import About from './pages/About';
import ColombiaConnect from './pages/ColombiaConnect';
import VenezuelaConnect from './pages/VenezuelaConnect';
import Commissioning from './pages/Commissioning';
import Optimization from './pages/Optimization';
import Audits from './pages/Audits';
import InfoReengineering from './pages/InfoReengineering';
import Electrical from './pages/Electrical';

// Placeholder components for other pages
const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 animate-fade-in">
        <div className="text-center max-w-2xl bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
             <div className="mb-6 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-primary">construction</span>
                </div>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{title}</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                This section of our digital presence is currently under active development. 
                We are preparing detailed case studies and technical specifications for our {title.toLowerCase()}.
            </p>
            <a href="#/" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20">
                <span className="material-symbols-outlined mr-2 text-lg">arrow_back</span> Return Home
            </a>
        </div>
    </div>
);

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark transition-colors duration-200 font-display">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/process" element={<ProcessEngineering />} />
                        <Route path="/automation" element={<Automation />} />
                        <Route path="/cfd" element={<CFD />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/colombia" element={<ColombiaConnect />} />
                        <Route path="/venezuela" element={<VenezuelaConnect />} />
                        <Route path="/commissioning" element={<Commissioning />} />
                        <Route path="/optimization" element={<Optimization />} />
                        <Route path="/audits" element={<Audits />} />
                        <Route path="/info-reengineering" element={<InfoReengineering />} />
                        <Route path="/electrical" element={<Electrical />} />
                        
                        {/* Service Placeholders */}
                        <Route path="/control" element={<PlaceholderPage title="Control Services" />} />
                        
                        {/* Other Pages */}
                        <Route path="/insights" element={<PlaceholderPage title="Industry Insights" />} />
                        <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
                        <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
                        <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
                    </Routes>
                </main>
                <ChatWidget />
                <Footer />
            </div>
        </HashRouter>
    );
};

export default App;
