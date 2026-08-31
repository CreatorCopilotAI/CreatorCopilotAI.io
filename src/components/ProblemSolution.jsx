import { useState } from 'react';
import { motion } from 'framer-motion';

const USE_CASES = [
  {
    id: 'content',
    tag: 'CONTENT AGENTS',
    title: 'Viral Script & Hook Generation',
    desc: 'Autonomous creator agents that analyze trending hooks, generate multi-scene video scripts, and adapt tone for LinkedIn, X, and YouTube.',
    stat: '10x Faster Turnaround',
    previewText: 'Generated: 5 High-Retention Hooks · 1.2k words/min · 0 Hallucinations',
  },
  {
    id: 'voice',
    tag: 'VOICE & MULTIMODAL',
    title: 'Video Narration & Speech Sync',
    desc: 'Generate voiceover-ready pacing markers, phonetic guides, and timestamped teleprompter tracks for video creators.',
    stat: '<120ms Generation',
    previewText: 'Timeline: 00:00 [Hook] → 00:15 [Value Prop] → 00:45 [Call-to-Action]',
  },
  {
    id: 'workflows',
    tag: 'AUTONOMOUS SWARMS',
    title: 'Multi-Agent Publishing Workflows',
    desc: 'Chained agents where Researcher gathers insights, Writer crafts drafts, and Critic verifies factual accuracy before queuing for review.',
    stat: '100% Policy Compliant',
    previewText: 'Agent Swarm: Researcher → Writer → FactChecker → Publisher',
  },
  {
    id: 'rag',
    tag: 'BRAND RAG MEMORY',
    title: 'Private Knowledge & Style Guidelines',
    desc: 'Index your past viral posts, brand guidelines, and product documentation with exact semantic retrieval and zero data leakage.',
    stat: 'Zero Egress VPC',
    previewText: 'Indexed: 14 Brand Stylebooks · Vector Retrieval: 4ms · SOC 2',
  },
  {
    id: 'compliance',
    tag: 'DETERMINISTIC EVALS',
    title: 'Brand Safety & Hallucination Defense',
    desc: 'Guardrails intercept unsupported factual claims, off-brand voice shifts, or dangerous hallucinated links before anything goes live.',
    stat: '99.4% Interception',
    previewText: 'Firewall: 0 Hallucinations · Fact Verification Engine: Active',
  },
  {
    id: 'enterprise',
    tag: 'GROWTH TEAMS',
    title: 'Enterprise Campaign Scale',
    desc: 'Deploy localized, multi-language variants for global marketing campaigns with synchronized messaging and approval hierarchies.',
    stat: '50M+ API Requests',
    previewText: 'Localized: 18 Languages · Centralized Admin Console · SSO / RBAC',
  },
];

export default function ProblemSolution() {
  return (
    <section id="use-cases" className="py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono mb-4">
            <span>PRODUCTION SCENARIOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
            See how it works. <span className="font-semibold text-zinc-950">For your AI.</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            From solo content creators to enterprise growth teams, CreatorCopilotAI provides resilient infrastructure for every workflow.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc, idx) => (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-card hover:shadow-card-hover hover:border-zinc-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                    {uc.tag}
                  </span>
                  <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {uc.stat}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {uc.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  {uc.desc}
                </p>
              </div>

              {/* Console preview snippet */}
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-[11px] text-zinc-600">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Agent Stream</span>
                </div>
                <div className="text-zinc-800 font-medium truncate">
                  {uc.previewText}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
