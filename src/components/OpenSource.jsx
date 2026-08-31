import { useState } from 'react';
import { motion } from 'framer-motion';

const COMMANDS = {
  docker: `# Pull and run CreatorCopilotAI with self-hosted guardrails\ndocker run -d -p 8080:8080 \\\n  -v ~/.creatorcopilot:/data \\\n  -e AGENT_ENV=production \\\n  ghcr.io/creatorcopilotai/engine:latest`,
  helm: `# Install via Helm into your Kubernetes cluster\nhelm repo add creatorcopilot https://charts.creatorcopilotai.io\nhelm repo update\nhelm install copilot-engine creatorcopilot/agent-stack \\\n  --set guardrails.strictMode=true \\\n  --set persistence.enabled=true`,
  pip: `# Install Python SDK for local agent orchestration\npip install creatorcopilot-ai\n\n# Initialize local offline workspace\ncreatorcopilot init --offline --vpc`,
  compose: `# Run complete multi-container stack (Engine, UI, Redis, VectorDB)\ncurl -sL https://creatorcopilotai.io/docker-compose.yml > docker-compose.yml\ndocker compose up -d`,
};

export default function OpenSource() {
  const [activeTab, setActiveTab] = useState('docker');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMMANDS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="open-source" className="relative py-24 bg-white overflow-hidden blueprint-grid-light border-t border-zinc-200">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-emerald-100/40 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching FutureAGI */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-dashed border-zinc-300 bg-zinc-50/80 mb-6 shadow-2xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold text-emerald-700 uppercase tracking-wider">
                Apache 2.0
              </span>
            </div>
            <div className="w-px h-3.5 bg-zinc-300" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Open Source Core
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-zinc-900 mb-5 tracking-tight">
            Run it on your <br />
            <span className="font-semibold text-zinc-950">own infra.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            The full CreatorCopilotAI platform — observability, evaluations, prompt experiments, and MCP guardrails — is Apache 2.0 licensed. Your data never leaves your network.
          </p>
        </div>

        {/* ── Central Terminal Runner Card ── */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl overflow-hidden mb-8">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-900/90">
            {/* Terminal Window Dots & Tabs */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Package Tabs */}
              <div className="flex items-center gap-1 bg-zinc-950/80 p-1 rounded-lg border border-zinc-800 text-xs font-mono">
                {[
                  { id: 'docker', label: 'Docker' },
                  { id: 'helm', label: 'Helm / K8s' },
                  { id: 'pip', label: 'pip / Python' },
                  { id: 'compose', label: 'docker-compose' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-zinc-800 text-white font-medium shadow-xs'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Group: Copy Button & Stars */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/CreatorCopilotAI"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>986 stars</span>
              </a>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Terminal Code Display */}
          <div className="p-5 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-zinc-300">
            <pre>
              <code>{COMMANDS[activeTab]}</code>
            </pre>
          </div>

          {/* Terminal Footer */}
          <div className="px-5 py-2.5 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Air-gapped safe · Zero telemetry · Works 100% offline
            </span>
            <span className="hidden sm:inline text-zinc-400">License: Apache-2.0</span>
          </div>
        </div>

        {/* ── 3 Feature Cards ── */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-8">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-card hover:shadow-card-hover hover:border-zinc-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4 text-zinc-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-900 mb-2">Your data, your VPC</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Traces, evals, prompts, and training data never leave your internal network. SOC 2 and HIPAA compliance by default.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-card hover:shadow-card-hover hover:border-zinc-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4 text-zinc-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-900 mb-2">Apache 2.0 — no strings</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Use it commercially, fork it, and embed it directly into your own products. No "open-core" gating or artificial limits.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-card hover:shadow-card-hover hover:border-zinc-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-4 text-indigo-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.85 6.467 6.467 0 00.998-3.08A7.848 7.848 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-900 mb-2">Help when you need it</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Active Discord community, GitHub discussions, and core maintainers available 24/7. Public roadmap and rapid releases.
            </p>
          </div>
        </div>

        {/* ── Community Contributor Strip ── */}
        <div className="max-w-5xl mx-auto p-5 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Built with the Open Source Community
            </div>
            <div className="text-sm font-semibold text-zinc-800 mt-0.5">
              986 stars · 191 forks · 179 resolved PRs · 42 contributors
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/CreatorCopilotAI"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light-secondary text-xs"
            >
              Star on GitHub ⭐
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
