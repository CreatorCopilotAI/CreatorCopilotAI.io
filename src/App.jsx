import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Features from './components/Features';
import OpenSource from './components/OpenSource';
import Integrations from './components/Integrations';
import ProblemSolution from './components/ProblemSolution';
import Metrics from './components/Metrics';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import AIChatFab from './components/AIChatFab';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Nav onOpenSearch={() => setSearchOpen(true)} />

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenSandbox={() => setSearchOpen(true)} />
        <Features />
        <OpenSource />
        <Integrations />
        <ProblemSolution />
        <Metrics />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      {/* Footer & Floating AI Copilot */}
      <Footer />
      <AIChatFab />
    </div>
  );
}
