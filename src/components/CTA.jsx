import { useState } from 'react';

export default function CTA({ onOpenFeedback, onOpenFeedbackViewer }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('docker run -d -p 8080:8080 ghcr.io/creatorcopilotai/engine:latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cta" className="relative py-24 bg-white border-t border-zinc-200 overflow-hidden blueprint-grid-light">
      {/* Background glow horizon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-100/60 via-emerald-100/40 to-indigo-100/60 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-zinc-200 shadow-elevated">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>INSTANT ZERO-CONFIG DEPLOYMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight leading-tight">
            Ship reliable AI creator agents <br />
            <span className="font-semibold text-zinc-950">in under 5 minutes.</span>
          </h2>

          <p className="mt-4 text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Eliminate hallucinations, enforce deterministic safety guardrails, and keep all data inside your VPC with Apache 2.0 open source.
          </p>

          {/* Terminal Command Box */}
          <div className="mt-8 max-w-xl mx-auto flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-xs border border-zinc-800 shadow-md">
            <div className="flex items-center gap-2 overflow-x-auto px-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="truncate">docker run -d -p 8080:8080 ghcr.io/creatorcopilotai/engine</span>
            </div>
            <button
              onClick={copyCommand}
              className="ml-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-sans font-medium transition-colors shrink-0"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#open-source"
              className="btn-light-primary px-6 py-2.5 text-xs shadow-sm"
            >
              Get Free Sandbox Access
            </a>
            <button
              onClick={onOpenFeedbackViewer}
              className="btn-light-secondary px-5 py-2.5 text-xs flex items-center gap-1.5 hover:border-indigo-300"
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>Feedback & Roadmap Hub</span>
            </button>
            <a
              href="https://github.com/CreatorCopilotAI"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light-secondary px-5 py-2.5 text-xs flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>Star on GitHub (986)</span>
            </a>
          </div>

          {/* Community feedback hint */}
          <div className="mt-5 text-xs text-zinc-500">
            Have a feature request or found an issue?{' '}
            <button
              onClick={onOpenFeedback}
              className="text-indigo-600 hover:text-indigo-700 font-medium underline"
            >
              Submit feedback directly to our team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
