import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
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
            <a
              href="https://github.com/CreatorCopilotAI"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light-secondary px-5 py-2.5 text-xs"
            >
              Star on GitHub ⭐ (986)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
