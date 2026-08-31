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
import FeedbackModal from './components/FeedbackModal';
import FeedbackViewerModal from './components/FeedbackViewerModal';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackViewerOpen, setFeedbackViewerOpen] = useState(false);

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
      <Nav
        onOpenSearch={() => setSearchOpen(true)}
        onOpenFeedback={() => setFeedbackOpen(true)}
        onOpenFeedbackViewer={() => setFeedbackViewerOpen(true)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenFeedback={() => setFeedbackOpen(true)}
        onOpenFeedbackViewer={() => setFeedbackViewerOpen(true)}
      />

      {/* Feedback Submission Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        onViewBoard={() => setFeedbackViewerOpen(true)}
      />

      {/* Community Feedback & Roadmap Viewer Modal */}
      <FeedbackViewerModal
        isOpen={feedbackViewerOpen}
        onClose={() => setFeedbackViewerOpen(false)}
        onOpenSubmitModal={() => setFeedbackOpen(true)}
      />

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
        <CTA
          onOpenFeedback={() => setFeedbackOpen(true)}
          onOpenFeedbackViewer={() => setFeedbackViewerOpen(true)}
        />
      </main>

      {/* Footer & Floating AI Copilot */}
      <Footer
        onOpenFeedback={() => setFeedbackOpen(true)}
        onOpenFeedbackViewer={() => setFeedbackViewerOpen(true)}
      />
      <AIChatFab />

      {/* Floating Community Feedback Quick Action (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setFeedbackViewerOpen(true)}
          className="group px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-card hover:shadow-card-hover hover:border-indigo-300 text-xs text-zinc-700 hover:text-zinc-900 transition-all flex items-center gap-2"
          title="Open Community Feedback & Roadmap Hub"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-medium font-sans">Feedback & Roadmap</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            Live
          </span>
        </button>
        <button
          onClick={() => setFeedbackOpen(true)}
          className="w-8 h-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 flex items-center justify-center text-xs shadow-md transition-transform hover:scale-105"
          title="Submit new issue or feature request"
          aria-label="Submit Feedback"
        >
          +
        </button>
      </div>
    </div>
  );
}
