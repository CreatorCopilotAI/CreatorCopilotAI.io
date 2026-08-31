import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEARCH_ITEMS = [
  { category: 'Platform', title: 'Simulations & Scenarios', desc: 'Stress-test AI creator agents with synthetic runs', href: '#features', badge: 'v2.4' },
  { category: 'Platform', title: 'Agent IDE & Playground', desc: 'Iterate, debug, and test multi-agent pipelines', href: '#features', badge: 'Core' },
  { category: 'Platform', title: 'MCP Guardrails & Evals', desc: 'Detect hallucinations and intercept bad tool outputs', href: '#features', badge: 'Security' },
  { category: 'Open Source', title: 'Self-Hosted VPC Deployment', desc: 'Deploy via Docker, Helm, or docker-compose', href: '#open-source', badge: 'Apache 2.0' },
  { category: 'Open Source', title: 'Local Terminal CLI (creatorcopilot)', desc: 'Run offline without data leaving your network', href: '#open-source', badge: 'CLI' },
  { category: 'Integrations', title: 'Model Switchboard (OpenAI, Claude, Gemini)', desc: 'Connect 20+ LLM providers and vector stores', href: '#integrations', badge: '24+' },
  { category: 'Use Cases', title: 'Content & Scriptwriting Agents', desc: 'Automated viral hooks, scripts, and multi-format assets', href: '#use-cases', badge: 'Popular' },
  { category: 'Use Cases', title: 'Autonomous Multi-Agent Workflows', desc: 'Self-improving feedback loops for publishing', href: '#use-cases', badge: 'New' },
  { category: 'Metrics', title: 'Hallucination & Latency Benchmarks', desc: '<8ms latency overhead, 99.4% interception rate', href: '#metrics', badge: 'SLA' },
  { category: 'Pricing', title: 'Free Open Source & Enterprise VPC', desc: 'Zero licensing cost on Apache 2.0 core', href: '#pricing', badge: 'Plans' },
  { category: 'FAQ', title: 'Frequently Asked Questions', desc: 'Common technical, security, and VPC questions', href: '#faq', badge: 'Docs' },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent, or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = SEARCH_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100 bg-zinc-50/50">
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search platform, tools, commands, or docs..."
                className="w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 bg-white border border-zinc-200 rounded shadow-xs">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-100">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => {
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-xs font-semibold text-zinc-800 group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</span>
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {item.badge}
                    </span>
                  </a>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-zinc-400">
                  No matching tools or documentation found for "{query}".
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 border-t border-zinc-100 text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <span>Navigation:</span>
                <span className="px-1 py-0.5 rounded bg-white border border-zinc-200 text-zinc-600">↑</span>
                <span className="px-1 py-0.5 rounded bg-white border border-zinc-200 text-zinc-600">↓</span>
                <span className="px-1 py-0.5 rounded bg-white border border-zinc-200 text-zinc-600">↵</span>
              </div>
              <span>CreatorCopilotAI QuickNav</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
