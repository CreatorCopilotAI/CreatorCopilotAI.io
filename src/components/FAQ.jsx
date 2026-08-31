import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    q: 'How does CreatorCopilotAI detect and intercept AI hallucinations?',
    a: 'CreatorCopilotAI uses deterministic runtime guardrails, strict JSON schema validators, and semantic assertion matrices. Every generation and tool invocation is analyzed in <8ms before the response reaches users. If an unsupported factual claim, malformed parameters, or dangerous command is detected, the engine blocks or self-corrects the output automatically.',
  },
  {
    q: 'Is the core platform genuinely Apache 2.0 open source?',
    a: 'Yes! The entire orchestration core, evaluation suite, MCP guardrail filters, and local CLI are 100% open source under Apache 2.0. You are free to inspect, fork, embed, and deploy it inside commercial proprietary systems with zero licensing fees or open-core tricks.',
  },
  {
    q: 'How does self-hosting in my own VPC guarantee zero data egress?',
    a: 'When you run CreatorCopilotAI via Docker or Helm in your own VPC, all telemetry, traces, prompt datasets, and evaluations remain entirely within your private network boundaries. No external pings or telemetry are sent to our servers.',
  },
  {
    q: 'How does it integrate with LangChain, CrewAI, and OpenAI Assistants?',
    a: 'We provide lightweight drop-in SDK wrappers for TypeScript and Python. You can wrap your existing LLM chains, agent graphs, or API endpoints in one line of code: `engine.wrap(agent)` to gain instant observability, guardrails, and scenario simulation.',
  },
  {
    q: 'What is the latency impact on streaming generations?',
    a: 'Our regex inspection engines and deterministic schema validators run in compiled native code (Rust/C++) with sub-millisecond execution time. Overall latency overhead is typically under 8ms, ensuring no noticeable delay in real-time token streams.',
  },
  {
    q: 'Can we fine-tune self-improving prompt datasets from human feedback?',
    a: 'Yes. Every time a creator edits a generated draft or flags a hallucination, CreatorCopilotAI records the diff pair. The self-improving optimizer analyzes these edits and generates optimized few-shot exemplars and system instructions automatically.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-zinc-50/70 border-t border-zinc-200 blueprint-grid-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono mb-4">
            <span>TECHNICAL SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
            Frequently asked <span className="font-semibold text-zinc-950">questions.</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            Everything you need to know about self-hosting, guardrails, and creator agent orchestration.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-zinc-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-zinc-900 text-sm sm:text-base hover:text-indigo-600 transition-colors"
                >
                  <span>{item.q}</span>
                  <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-500">
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-zinc-900' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
