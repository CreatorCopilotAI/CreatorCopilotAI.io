export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 text-zinc-600 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-zinc-200">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-display font-bold text-base text-zinc-900 tracking-tight">
                CreatorCopilot<span className="text-zinc-500 font-normal">AI</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              The complete open source platform to simulate, guard, and observe autonomous creator agents. Apache 2.0 licensed for zero data egress VPC self-hosting.
            </p>
            {/* Live Status Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-[11px] font-mono text-zinc-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (SLA 99.99%)</span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-zinc-900 uppercase tracking-wider">
              Platform
            </div>
            <ul className="space-y-2 text-zinc-500">
              <li><a href="#features" className="hover:text-zinc-900 transition-colors">Simulations Matrix</a></li>
              <li><a href="#features" className="hover:text-zinc-900 transition-colors">Agent IDE & Graphs</a></li>
              <li><a href="#hero" className="hover:text-zinc-900 transition-colors">MCP Tool Guardrails</a></li>
              <li><a href="#hero" className="hover:text-zinc-900 transition-colors">Live Tracing & Radar</a></li>
              <li><a href="#integrations" className="hover:text-zinc-900 transition-colors">24+ Model Switchboard</a></li>
            </ul>
          </div>

          {/* Col 3: Open Source */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-zinc-900 uppercase tracking-wider">
              Open Source
            </div>
            <ul className="space-y-2 text-zinc-500">
              <li><a href="#open-source" className="hover:text-zinc-900 transition-colors">GitHub Repository</a></li>
              <li><a href="#open-source" className="hover:text-zinc-900 transition-colors">VPC Deployment Docs</a></li>
              <li><a href="#open-source" className="hover:text-zinc-900 transition-colors">Docker Hub Image</a></li>
              <li><a href="#open-source" className="hover:text-zinc-900 transition-colors">Helm Kubernetes Charts</a></li>

            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-zinc-900 uppercase tracking-wider">
              Security & Legal
            </div>
            <ul className="space-y-2 text-zinc-500">
              <li><a href="#" className="hover:text-zinc-900 transition-colors">SOC 2 Type II</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Air-gapped Architecture</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Responsible Disclosure</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} CreatorCopilotAI.io. Apache 2.0 Open Source Platform.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <a href="https://github.com/CreatorCopilotAI" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">GitHub</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">Twitter (X)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
