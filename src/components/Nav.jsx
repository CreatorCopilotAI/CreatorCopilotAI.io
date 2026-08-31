import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MEGA_MENU_MODULES = [
  {
    num: '1',
    category: 'SIMULATIONS',
    title: 'Test at scale',
    links: [
      { name: 'Simulations', href: '#features' },
      { name: 'Scenario Matrix', href: '#features' },
      { name: 'Synthetic Datasets', href: '#features' },
    ],
    svg: (
      <svg className="w-16 h-16 text-zinc-400 group-hover/col:text-indigo-600 transition-colors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="50" cy="50" r="38" strokeDasharray="3 3" opacity="0.4" />
        <path d="M50 20 L62 38 L62 62 L50 78 L38 62 L38 38 Z" strokeWidth="1.5" />
        <circle cx="50" cy="38" r="4" fill="currentColor" opacity="0.3" />
        <path d="M38 42 L20 34 L18 46 L38 46" strokeDasharray="2 2" />
        <path d="M62 42 L80 34 L82 46 L62 46" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    num: '2',
    category: 'AGENTS',
    title: 'Iterate & refine',
    links: [
      { name: 'Agent IDE & Graph', href: '#features' },
      { name: 'Prompt Datasets', href: '#features' },
      { name: 'A/B Experiments', href: '#features' },
    ],
    svg: (
      <svg className="w-16 h-16 text-zinc-400 group-hover/col:text-indigo-600 transition-colors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="20" y="20" width="60" height="60" rx="6" strokeDasharray="4 3" opacity="0.4" />
        <path d="M50 16 L80 46 L80 54 L50 70 L20 54 L20 46 Z" strokeWidth="1.5" />
        <line x1="32" y1="46" x2="50" y2="60" opacity="0.5" />
        <line x1="68" y1="46" x2="50" y2="60" opacity="0.5" />
      </svg>
    ),
  },
  {
    num: '3',
    category: 'EVALUATE',
    title: 'Catch issues',
    links: [
      { name: 'Live Error Feed', href: '#hero' },
      { name: 'Eval Benchmarks', href: '#metrics' },
      { name: 'Tool Guardrails', href: '#hero' },
    ],
    svg: (
      <svg className="w-16 h-16 text-zinc-400 group-hover/col:text-indigo-600 transition-colors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="50" cy="50" r="32" strokeDasharray="6 3" opacity="0.4" />
        <circle cx="50" cy="50" r="22" strokeDasharray="3 2" opacity="0.6" />
        <circle cx="50" cy="50" r="10" strokeWidth="1.5" />
        <line x1="50" y1="12" x2="50" y2="35" />
        <line x1="50" y1="65" x2="50" y2="88" />
        <line x1="12" y1="50" x2="35" y2="50" />
        <line x1="65" y1="50" x2="88" y2="50" />
      </svg>
    ),
  },
  {
    num: '4',
    category: 'OPTIMIZE',
    title: 'Improve with data',
    links: [
      { name: 'Self-Improving Loops', href: '#features' },
      { name: 'Token Compression', href: '#features' },
      { name: 'Latency Trimmer', href: '#metrics' },
    ],
    svg: (
      <svg className="w-16 h-16 text-zinc-400 group-hover/col:text-indigo-600 transition-colors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M16 60 Q16 20 50 14 Q84 20 84 60" strokeWidth="1.6" />
        <path d="M24 60 Q24 28 50 22 Q76 28 76 60" strokeDasharray="3 2" opacity="0.6" />
        <polygon points="50,32 58,46 52,46 55,62 44,50 48,50" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: '5',
    category: 'OBSERVE',
    title: 'Mission control',
    links: [
      { name: 'Live Tracing & Radar', href: '#hero' },
      { name: 'Cost Intelligence', href: '#hero' },
      { name: 'OpenTelemetry Sync', href: '#integrations' },
    ],
    svg: (
      <svg className="w-16 h-16 text-zinc-400 group-hover/col:text-indigo-600 transition-colors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="50" cy="80" rx="32" ry="8" strokeDasharray="3 2" opacity="0.3" />
        <circle cx="50" cy="44" r="28" strokeDasharray="4 2" opacity="0.4" />
        <line x1="50" y1="44" x2="68" y2="26" strokeWidth="1.8" />
        <circle cx="68" cy="26" r="3" fill="currentColor" />
        <circle cx="36" cy="38" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="58" cy="56" r="2" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
];

export default function Nav({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-zinc-200/80 shadow-xs py-2.5'
            : 'bg-white/60 backdrop-blur-md border-b border-zinc-100 py-3.5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Star/Blueprint Icon */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-display font-semibold text-base text-zinc-900 tracking-tight flex items-center gap-1">
                CreatorCopilot<span className="text-zinc-500 font-normal">AI</span>
                <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-100 border border-zinc-200 text-zinc-600">
                  v2.4
                </span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-zinc-600">
              {/* Platform Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setPlatformOpen(true)}
                onMouseLeave={() => setPlatformOpen(false)}
              >
                <button
                  onClick={() => setPlatformOpen(!platformOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors hover:text-zinc-900 hover:bg-zinc-100/70 ${platformOpen ? 'text-zinc-900 bg-zinc-100/70' : ''
                    }`}
                >
                  Platform
                  <svg
                    className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${platformOpen ? 'rotate-180 text-zinc-700' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Full Width Mega Menu */}
                <AnimatePresence>
                  {platformOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="fixed left-0 right-0 top-[56px] z-50 bg-white border-b border-zinc-200 shadow-xl overflow-hidden"
                    >
                      {/* Subtle blueprint grid overlay */}
                      <div className="absolute inset-0 blueprint-grid-light opacity-60 pointer-events-none" />

                      <div className="relative max-w-7xl mx-auto px-6 py-8">
                        {/* Dotted indicator line */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-6 pb-2 border-b border-zinc-100">
                          <span>Autonomous Engineering Pipeline</span>
                          <span className="text-emerald-600 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            5 Engine Modules Active
                          </span>
                        </div>

                        {/* 5 Column Grid */}
                        <div className="grid grid-cols-5 gap-6">
                          {MEGA_MENU_MODULES.map((col, idx) => (
                            <div
                              key={idx}
                              className="group/col relative p-4 rounded-xl border border-transparent hover:border-zinc-200 hover:bg-zinc-50/80 transition-all duration-200"
                            >
                              <div className="relative h-24 mb-4 flex items-center justify-center bg-zinc-50 rounded-lg border border-zinc-100">
                                {col.svg}
                                <span className="absolute top-2 right-2 w-5 h-5 rounded-full text-[10px] font-mono font-semibold flex items-center justify-center bg-white border border-zinc-200 text-zinc-600">
                                  {col.num}
                                </span>
                              </div>
                              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                                {col.category}
                              </div>
                              <div className="text-sm font-semibold text-zinc-900 mb-3">
                                {col.title}
                              </div>
                              <div className="space-y-1.5">
                                {col.links.map((link, lIdx) => (
                                  <a
                                    key={lIdx}
                                    href={link.href}
                                    onClick={() => setPlatformOpen(false)}
                                    className="block text-xs text-zinc-500 hover:text-indigo-600 transition-colors"
                                  >
                                    {link.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Bar in Mega Menu */}
                        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-zinc-400">Architecture:</span>
                            <span className="text-zinc-700">Self-Improving Loops · MCP Tool Execution · Air-gapped VPC</span>
                          </div>
                          <a
                            href="#open-source"
                            onClick={() => setPlatformOpen(false)}
                            className="font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                          >
                            Explore Open Source Core →
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#open-source"
                className="px-3 py-1.5 rounded-lg hover:text-zinc-900 hover:bg-zinc-100/70 transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Open Source
              </a>
              <a
                href="#integrations"
                className="px-3 py-1.5 rounded-lg hover:text-zinc-900 hover:bg-zinc-100/70 transition-colors"
              >
                Integrations
              </a>
              <a
                href="#use-cases"
                className="px-3 py-1.5 rounded-lg hover:text-zinc-900 hover:bg-zinc-100/70 transition-colors"
              >
                Use Cases
              </a>
              <a
                href="#pricing"
                className="px-3 py-1.5 rounded-lg hover:text-zinc-900 hover:bg-zinc-100/70 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="px-3 py-1.5 rounded-lg hover:text-zinc-900 hover:bg-zinc-100/70 transition-colors"
              >
                Docs / FAQ
              </a>
            </nav>
          </div>

          {/* Right Action Group */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80 text-zinc-500 text-xs transition-colors"
              title="Search website (Cmd+K)"
            >
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline text-zinc-400">Search</span>
              <kbd className="hidden sm:inline text-[10px] font-mono px-1 py-0.5 rounded bg-white border border-zinc-200 text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Stars link */}
            <a
              href="https://github.com/CreatorCopilotAI"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>

            </a>

            {/* Primary CTA */}
            <a
              href="#open-source"
              className="btn-light-primary text-xs"
            >
              Start Free
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-zinc-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Navigation</div>
                <div className="space-y-2">
                  <a
                    href="#features"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-zinc-800 hover:text-indigo-600"
                  >
                    Platform Features
                  </a>
                  <a
                    href="#open-source"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-emerald-600 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Open Source & VPC
                  </a>
                  <a
                    href="#integrations"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-zinc-800 hover:text-indigo-600"
                  >
                    Integrations Switchboard
                  </a>
                  <a
                    href="#use-cases"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-zinc-800 hover:text-indigo-600"
                  >
                    Use Cases
                  </a>
                  <a
                    href="#metrics"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-zinc-800 hover:text-indigo-600"
                  >
                    Benchmarks & Metrics
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-zinc-800 hover:text-indigo-600"
                  >
                    Pricing
                  </a>
                  <a
                    href="#faq"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-zinc-800 hover:text-indigo-600"
                  >
                    FAQ
                  </a>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
                  <a
                    href="#open-source"
                    onClick={() => setMenuOpen(false)}
                    className="btn-light-primary w-full text-center"
                  >
                    Get Sandbox Link
                  </a>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenSearch();
                    }}
                    className="btn-light-secondary w-full"
                  >
                    Open Search (⌘K)
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
