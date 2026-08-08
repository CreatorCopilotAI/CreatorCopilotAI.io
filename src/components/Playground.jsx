import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const TOOLS = [
  { id: 'ideas', label: 'Idea Generator', placeholder: 'Enter a topic (e.g. productivity, web development)...' },
  { id: 'script', label: 'Script Writer', placeholder: 'Enter a hook topic (e.g. why Rust is popular, B2B SaaS)...' },
  { id: 'caption', label: 'Caption Generator', placeholder: 'Enter a post brief (e.g. launching my new portfolio site)...' },
];

const PRESETS = {
  ideas: {
    'productivity': [
      '💡 The "3-Second Rule" that saves me 10 hours a week.',
      '💡 5 productivity habits I stole from high-performing developers.',
      '💡 Why waking up at 5 AM is actually ruining your focus index.',
    ],
    'web development': [
      '💡 5 modern CSS properties you need to start using today.',
      '💡 Why we migrated our backend from Node to Go (Honest review).',
      '💡 The developer roadmap to junior-to-senior in 12 months.',
    ],
  },
  script: {
    'rust': {
      hook: '🔥 Everyone is talking about Rust, but nobody tells you the real cost...',
      body: 'Rust is blazing fast, memory safe without garbage collection, and has a great compiler. But the borrow checker will make you pull your hair out. Here is why the learning curve is 100% worth it.',
      cta: '👉 Follow for dev insights. Web trial at creatorcopilotai.io.',
    },
    'productivity': {
      hook: '🔥 The biggest focus trap you fall into every single morning is this...',
      body: 'Checking email first thing sets your day on defense. Instead, time-block the first 90 minutes for deep work. No Slack, no notifications, no check-ins. Watch your output double.',
      cta: '👉 Save this for later. Try the app at creatorcopilotai.io.',
    },
  },
  caption: {
    'portfolio': {
      text: '🚀 After 3 months of late nights, my new portfolio is finally live! Built with Next.js, Tailwind, and Framer Motion. Focused on clean typography and SLA loading speeds.',
      tags: '#webdev #javascript #nextjs #portfolio #frontend #career',
    },
    'creator': {
      text: '✍️ Consistently publishing content is a full-time job. That is why I built CreatorCopilotAI — to automate scripting, ideation, and posting workflows.',
      tags: '#creatoreconomy #contentcreator #solopreneur #ai #saas',
    },
  },
};

export default function Playground() {
  const [activeTool, setActiveTool] = useState('ideas');
  const [inputVal, setInputVal]     = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput]         = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setIsGenerating(true);
    setOutput(null);

    setTimeout(() => {
      setIsGenerating(false);
      const query = inputVal.toLowerCase();

      // Find matching preset or generate a dynamic fallback
      if (activeTool === 'ideas') {
        const foundKey = Object.keys(PRESETS.ideas).find(k => query.includes(k)) || 'productivity';
        setOutput({ type: 'ideas', items: PRESETS.ideas[foundKey] });
      } else if (activeTool === 'script') {
        const foundKey = Object.keys(PRESETS.script).find(k => query.includes(k)) || 'productivity';
        setOutput({ type: 'script', ...PRESETS.script[foundKey] });
      } else {
        const foundKey = Object.keys(PRESETS.caption).find(k => query.includes(k)) || 'portfolio';
        setOutput({ type: 'caption', ...PRESETS.caption[foundKey] });
      }
    }, 1500);
  };

  return (
    <section id="playground" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#635BFF] font-semibold text-xs uppercase tracking-widest mb-3">Interactive Console</p>
          <h2 className="section-heading mb-4">
            Test the AI Engine Playground
          </h2>
          <p className="section-subheading">
            Experience CreatorCopilotAI right now. Enter a topic below and generate preview marketing assets.
          </p>
        </AnimatedSection>

        {/* Console Box */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto rounded-xl border border-slate-200 shadow-lg bg-[#0A2540] overflow-hidden flex flex-col md:flex-row">
            {/* Left Console Input Controls */}
            <div className="w-full md:w-[45%] p-6 bg-slate-50 border-r border-[#E6E8EB] flex flex-col justify-between">
              <div>
                <label className="text-xs font-bold text-text-heading uppercase tracking-wider block mb-4">
                  Select Tool Output
                </label>
                <div className="flex flex-col gap-2.5 mb-6">
                  {TOOLS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setActiveTool(t.id);
                        setOutput(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded border text-xs font-bold transition-all duration-150 ${
                        activeTool === t.id
                          ? 'bg-[#0A2540] border-[#0A2540] text-white'
                          : 'bg-white border-slate-200 text-text-heading hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleGenerate}>
                  <label className="text-xs font-bold text-text-heading uppercase tracking-wider block mb-2">
                    Enter Subject
                  </label>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={TOOLS.find(t => t.id === activeTool).placeholder}
                    className="w-full px-3 py-2.5 rounded border border-slate-300 text-xs text-text-heading bg-white focus:outline-none focus:border-[#635BFF] mb-4"
                  />
                  <button
                    type="submit"
                    disabled={isGenerating || !inputVal.trim()}
                    className="w-full btn-primary text-xs justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Compiling Output...' : 'Run Generation'}
                  </button>
                </form>
              </div>
              <p className="text-[10px] text-text-muted mt-6 leading-relaxed">
                *Uses pre-configured models for sandbox preview demo.
              </p>
            </div>

            {/* Right Live Simulation Output Terminal */}
            <div className="flex-1 p-6 flex flex-col justify-between text-neutral-300 min-h-[300px]">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-[10px] font-mono text-slate-400">
                  <span>TERMINAL CONSOLE</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#635BFF] animate-pulse" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isGenerating && (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-xs text-[#00D4B2] space-y-2 mt-4"
                    >
                      <p>&gt; Loading creatorcopilot model...</p>
                      <p>&gt; Mapped input parameters</p>
                      <p>&gt; Compiling hook and scoring CTR metric...</p>
                      <span className="inline-block w-2.5 h-4 bg-[#00D4B2] animate-pulse" />
                    </motion.div>
                  )}

                  {!isGenerating && !output && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-mono text-xs text-neutral-500 flex flex-col justify-center items-center h-44 text-center"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-40"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      <p>Enter a topic and click "Run Generation" to test outputs.</p>
                    </motion.div>
                  )}

                  {!isGenerating && output && (
                    <motion.div
                      key="output"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {output.type === 'ideas' && (
                        <div className="space-y-3">
                          <p className="text-[10px] font-mono text-[#00D4B2] font-semibold uppercase tracking-wider">// 3 ENGAGEMENT IDEAS GENERATED</p>
                          <div className="space-y-2.5">
                            {output.items.map((item, idx) => (
                              <div key={idx} className="bg-neutral-950/40 border border-neutral-800 p-3 rounded text-sm text-white font-medium">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {output.type === 'script' && (
                        <div className="font-mono text-xs space-y-3 text-neutral-300">
                          <p className="text-[10px] text-[#00D4B2] font-semibold uppercase tracking-wider">// BRANDED CONTENT SCRIPT COMPILED</p>
                          <div className="bg-neutral-950/50 border border-neutral-800 rounded p-3 text-[11px] leading-relaxed space-y-2">
                            <p><strong className="text-[#635BFF] block">[HOOK (0-5s)]:</strong> {output.hook}</p>
                            <p><strong className="text-[#635BFF] block mt-2">[BODY (5-30s)]:</strong> {output.body}</p>
                            <p><strong className="text-[#635BFF] block mt-2">[CTA (30s+)]:</strong> {output.cta}</p>
                          </div>
                        </div>
                      )}

                      {output.type === 'caption' && (
                        <div className="font-mono text-xs space-y-3 text-neutral-300">
                          <p className="text-[10px] text-[#00D4B2] font-semibold uppercase tracking-wider">// SOCIAL POST COPY DEPLOY-READY</p>
                          <div className="bg-neutral-950/50 border border-neutral-800 rounded p-3 text-[11px] leading-relaxed space-y-2.5">
                            <p className="text-white font-medium">{output.text}</p>
                            <p className="text-neutral-400 mt-2 text-[10px]">{output.tags}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {output && !isGenerating && (
                <div className="mt-8 pt-4 border-t border-neutral-800/40 text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>COMPILE: COMPLETED</span>
                  <span>TIME: 1.45s</span>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
