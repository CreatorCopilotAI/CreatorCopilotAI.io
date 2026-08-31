import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'iterate', label: 'Iterate', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M21.015 4.356v4.992' },
  { id: 'simulate', label: 'Simulate', icon: 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z' },
  { id: 'evaluate', label: 'Evaluate', icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' },
  { id: 'optimize', label: 'Optimize', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' },
  { id: 'observe', label: 'Observe', icon: 'M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' },
  { id: 'command', label: 'Command Center', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
];

const REQUEST_LOGS = [
  { time: '16:42:01', model: 'gpt-4o', provider: 'OpenAI', status: '200 OK', latency: '241ms', cost: '$0.0024', tokens: '890', isBlocked: false },
  { time: '16:41:48', model: 'claude-3.5', provider: 'Anthropic', status: 'BLOCKED', latency: '6ms', cost: '$0.0000', tokens: '0', isBlocked: true },
  { time: '16:41:22', model: 'gemini-2.0', provider: 'Google', status: '200 OK', latency: '198ms', cost: '$0.0011', tokens: '1,420', isBlocked: false },
  { time: '16:40:55', model: 'deepseek-v3', provider: 'DeepSeek', status: '200 OK', latency: '310ms', cost: '$0.0006', tokens: '2,100', isBlocked: false },
  { time: '16:40:19', model: 'gpt-4o', provider: 'OpenAI', status: 'BLOCKED', latency: '4ms', cost: '$0.0000', tokens: '0', isBlocked: true },
];

export default function Hero({ onOpenSandbox }) {
  const [activeTab, setActiveTab] = useState('command');
  const [copied, setCopied] = useState(false);
  const [guardrailInputValidation, setGuardrailInput] = useState(true);
  const [guardrailOutputValidation, setGuardrailOutput] = useState(true);
  const [activeLogFilter, setActiveLogFilter] = useState('all');

  const copyCli = () => {
    navigator.clipboard.writeText('curl -sL https://creatorcopilotai.io/install.sh | bash');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-28 pb-20 bg-white overflow-hidden blueprint-grid-light">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-b from-indigo-100/50 via-emerald-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Copy */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Release Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-xs text-xs font-mono text-zinc-700 shadow-2xs mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-zinc-900">v2.4 Engine Live</span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-500">Apache 2.0 Self-Hosted VPC</span>
          </motion.div>

          {/* Main FutureAGI-style Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 leading-[1.15]"
          >
            AI Creator Agents hallucinate, <br />
            <span className="font-semibold text-zinc-950">fix it 10x faster.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed"
          >
            Build self-improving content and marketing agents. Catch hallucinations in real-time, enforce deterministic MCP tool guardrails, and run on your own VPC without telemetry.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#open-source"
              className="btn-light-primary px-6 py-2.5 text-sm shadow-sm"
            >
              Get Sandbox Access
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* Terminal Copy Button */}
            <button
              onClick={copyCli}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 font-mono text-xs text-zinc-800 shadow-2xs transition-all active:scale-[0.98]"
              title="Copy terminal installation"
            >
              <span className="text-emerald-600 font-bold">$</span>
              <span>curl -sL creatorcopilot.io | sh</span>
              <span className="ml-1 text-zinc-400 hover:text-zinc-600">
                {copied ? (
                  <span className="text-emerald-600 font-sans font-medium">✓ Copied!</span>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </span>
            </button>
          </motion.div>
        </div>

        {/* ── Interactive Command Center & Simulator ── */}
        <div className="relative max-w-5xl mx-auto rounded-2xl border border-zinc-200 bg-white shadow-elevated overflow-hidden">
          {/* Top Bar / Navigation Tabs */}
          <div className="flex border-b border-zinc-200 bg-zinc-50/80 overflow-x-auto">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[120px] py-3 px-3 text-center transition-all relative flex items-center justify-center gap-2 text-xs font-medium ${
                    active
                      ? 'text-zinc-900 bg-white shadow-xs font-semibold'
                      : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
                  }`}
                >
                  {/* Top indicator line for active tab */}
                  {active && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-900"
                    />
                  )}
                  <svg
                    className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-zinc-400'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Interactive Viewport */}
          <div className="p-5 sm:p-6 bg-white min-h-[380px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: ITERATE / AGENT PLAYGROUND */}
              {activeTab === 'iterate' && (
                <motion.div
                  key="iterate"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Agent Scripting Playground</div>
                      <div className="text-xs text-zinc-500">Live prompt iteration with token latency stream</div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ● Active Session (sess_90a)
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Prompt Box */}
                    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-xs">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-sans font-semibold">
                        Input Prompt & Variables
                      </div>
                      <div className="text-zinc-800 bg-white p-3 rounded-lg border border-zinc-200">
                        <span className="text-indigo-600">{"{role}"}</span>: "B2B SaaS Growth Lead"<br />
                        <span className="text-indigo-600">{"{task}"}</span>: "Draft 3 viral LinkedIn hooks explaining how self-improving agents stop hallucinations."<br />
                        <span className="text-zinc-400">{"{temperature}"}</span>: 0.3
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 font-sans">
                        <span>Model: <strong className="text-zinc-700">Claude-3.5-Sonnet</strong></span>
                        <span className="text-emerald-600 font-mono">Stream: 128 tok/s</span>
                      </div>
                    </div>

                    {/* Agent Generated Stream Output */}
                    <div className="p-3.5 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-xs border border-zinc-800 shadow-inner">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-sans font-semibold flex items-center justify-between">
                        <span>Live Agent Output</span>
                        <span className="text-emerald-400">Guardrail Passed ✓</span>
                      </div>
                      <div className="space-y-2 text-zinc-300 leading-relaxed">
                        <p className="text-emerald-400 font-semibold">Hook 1:</p>
                        <p>Most AI agents fail in production not because of the LLM, but because of unchecked tool side-effects. Here is how we enforce deterministic guardrails:</p>
                        <p className="text-emerald-400 font-semibold">Hook 2:</p>
                        <p>Why 99% of RAG pipelines hallucinate at scale (and how self-improving feedback loops fix it in &lt;10ms).</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: SIMULATE / SCENARIO MATRIX */}
              {activeTab === 'simulate' && (
                <motion.div
                  key="simulate"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Synthetic Scenario Matrix</div>
                      <div className="text-xs text-zinc-500">50 parallel stress runs across edge-case variations</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        98.4% Pass Rate
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { title: 'Prompt Injection', count: '100/100', status: 'Passed', color: 'emerald' },
                      { title: 'Invalid JSON Args', count: '50/50', status: 'Passed', color: 'emerald' },
                      { title: 'Tool Timeout Resiliency', count: '48/50', status: '96%', color: 'amber' },
                      { title: 'Context Overflow', count: '50/50', status: 'Passed', color: 'emerald' },
                    ].map((m, i) => (
                      <div key={i} className="p-3 rounded-xl border border-zinc-200 bg-zinc-50">
                        <div className="text-[11px] text-zinc-500 font-medium">{m.title}</div>
                        <div className="text-base font-semibold text-zinc-900 mt-1">{m.count}</div>
                        <div className="text-[10px] font-mono text-emerald-600 mt-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {m.status}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs font-mono text-zinc-700">
                    <span className="text-zinc-400">Simulation Run:</span> creatorcopilot test --matrix --scenarios=all --concurrency=16 <span className="text-emerald-600 font-semibold">[Completed in 1.4s]</span>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: EVALUATE & GUARDRAILS */}
              {activeTab === 'evaluate' && (
                <motion.div
                  key="evaluate"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Deterministic MCP Guardrails Config</div>
                      <div className="text-xs text-zinc-500">Intercept dangerous tools, injection attempts, and schema errors</div>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Rules Active: 14</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Guardrails Toggles */}
                    <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 space-y-3">
                      <div className="text-xs font-semibold text-zinc-800">General Policies</div>
                      <label className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-zinc-200 cursor-pointer">
                        <div className="text-xs text-zinc-800 font-medium">Validate Tool Inputs (Check Injection)</div>
                        <input
                          type="checkbox"
                          checked={guardrailInputValidation}
                          onChange={(e) => setGuardrailInput(e.target.checked)}
                          className="w-4 h-4 text-indigo-600 rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-zinc-200 cursor-pointer">
                        <div className="text-xs text-zinc-800 font-medium">Strict JSON Schema Output Validator</div>
                        <input
                          type="checkbox"
                          checked={guardrailOutputValidation}
                          onChange={(e) => setGuardrailOutput(e.target.checked)}
                          className="w-4 h-4 text-indigo-600 rounded"
                        />
                      </label>
                    </div>

                    {/* Blocked Tools List */}
                    <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 space-y-3">
                      <div className="text-xs font-semibold text-zinc-800">Blocked Tools (Sandbox Level)</div>
                      <div className="flex flex-wrap gap-1.5">
                        {['shell_exec', 'file_delete', 'db_drop_table', 'aws_iam_modify'].map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-rose-50 border border-rose-200 text-rose-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            {tool}
                          </span>
                        ))}
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        Any invocation of blocked tools returns instantaneous 0ms HTTP 403 block.
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: OPTIMIZE */}
              {activeTab === 'optimize' && (
                <motion.div
                  key="optimize"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Self-Improving Prompt & RL Optimizer</div>
                      <div className="text-xs text-zinc-500">Automatic few-shot generation and token cost reduction</div>
                    </div>
                    <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      -38% Token Cost
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50">
                      <div className="text-xs text-zinc-500">Latency Before/After</div>
                      <div className="text-lg font-bold text-zinc-900 mt-1">428ms → 184ms</div>
                      <div className="text-[10px] font-mono text-emerald-600 mt-1">57% Speed Improvement</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50">
                      <div className="text-xs text-zinc-500">Average Token Usage</div>
                      <div className="text-lg font-bold text-zinc-900 mt-1">3,410 → 1,890</div>
                      <div className="text-[10px] font-mono text-emerald-600 mt-1">1,520 Tokens Trimmed</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50">
                      <div className="text-xs text-zinc-500">Accuracy & Coherence</div>
                      <div className="text-lg font-bold text-zinc-900 mt-1">99.1%</div>
                      <div className="text-[10px] font-mono text-emerald-600 mt-1">Verified on 10k Evals</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: OBSERVE / REQUEST LOGS */}
              {activeTab === 'observe' && (
                <motion.div
                  key="observe"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Real-Time Request & Trace Stream</div>
                      <div className="text-xs text-zinc-500">Inspect payload size, millisecond latency, cost, and blocked attempts</div>
                    </div>
                    <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg text-[11px] font-medium">
                      {['all', 'blocked', 'fast'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveLogFilter(filter)}
                          className={`px-2.5 py-0.5 rounded-md capitalize transition-colors ${
                            activeLogFilter === filter ? 'bg-white text-zinc-900 shadow-2xs font-semibold' : 'text-zinc-600 hover:text-zinc-900'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto rounded-xl border border-zinc-200">
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-[11px]">
                        <tr>
                          <th className="px-3 py-2">Timestamp</th>
                          <th className="px-3 py-2">Model</th>
                          <th className="px-3 py-2">Provider</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Latency</th>
                          <th className="px-3 py-2">Cost</th>
                          <th className="px-3 py-2">Tokens</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 text-zinc-700">
                        {REQUEST_LOGS.filter((l) => {
                          if (activeLogFilter === 'blocked') return l.isBlocked;
                          if (activeLogFilter === 'fast') return parseInt(l.latency) < 200;
                          return true;
                        }).map((log, idx) => (
                          <tr key={idx} className={log.isBlocked ? 'bg-rose-50/30' : 'hover:bg-zinc-50/80'}>
                            <td className="px-3 py-2 text-zinc-400">{log.time}</td>
                            <td className="px-3 py-2 font-medium text-zinc-900">{log.model}</td>
                            <td className="px-3 py-2 text-zinc-500">{log.provider}</td>
                            <td className="px-3 py-2">
                              {log.isBlocked ? (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                                  BLOCKED
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                  200 OK
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2 text-zinc-600">{log.latency}</td>
                            <td className="px-3 py-2 text-zinc-600">{log.cost}</td>
                            <td className="px-3 py-2 text-zinc-600">{log.tokens}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* TAB 6: COMMAND CENTER / ANALYTICS */}
              {activeTab === 'command' && (
                <motion.div
                  key="command"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-5"
                >
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { label: 'Total Requests', val: '128,472', diff: '↑ 24.3%', positive: true },
                      { label: 'Total Cost', val: '$47.82', diff: '↓ 18.2%', positive: true },
                      { label: 'Avg Latency', val: '184ms', diff: '↓ 42.1%', positive: true },
                      { label: 'Error Rate', val: '0.04%', diff: '0 Incident', positive: true },
                      { label: 'Cache Hit Rate', val: '68.4%', diff: '↑ 14.8%', positive: true },
                    ].map((stat, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70">
                        <div className="text-[11px] text-zinc-500 font-medium truncate">{stat.label}</div>
                        <div className="text-base font-bold text-zinc-900 mt-1">{stat.val}</div>
                        <div className="text-[10px] font-mono text-emerald-600 mt-0.5">{stat.diff}</div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Chart Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Chart 1: Requests Over Time */}
                    <div className="p-4 rounded-xl border border-zinc-200 bg-white shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-semibold text-zinc-900">Requests Over Time (24h)</div>
                        <span className="text-[10px] font-mono text-zinc-400">Peak: 14.2k req/h</span>
                      </div>
                      <div className="flex items-end gap-1.5 h-20 pt-2 border-b border-zinc-100">
                        {[25, 34, 45, 60, 52, 78, 85, 92, 70, 88, 96, 82, 75, 90, 84, 98].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-zinc-800 hover:bg-indigo-600 rounded-t transition-all cursor-pointer"
                            style={{ height: `${h}%` }}
                            title={`Hour ${i + 1}: ${h * 150} requests`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-zinc-400 mt-1">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>24:00</span>
                      </div>
                    </div>

                    {/* Chart 2: Stacked Tokens (Input / Output) */}
                    <div className="p-4 rounded-xl border border-zinc-200 bg-white shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-semibold text-zinc-900">Token Consumption</div>
                        <div className="flex items-center gap-3 text-[10px] font-mono">
                          <span className="flex items-center gap-1 text-zinc-600">
                            <span className="w-2 h-2 rounded-xs bg-indigo-500 inline-block" /> Input
                          </span>
                          <span className="flex items-center gap-1 text-zinc-600">
                            <span className="w-2 h-2 rounded-xs bg-amber-500 inline-block" /> Output
                          </span>
                        </div>
                      </div>
                      <div className="flex items-end gap-1.5 h-20 pt-2 border-b border-zinc-100">
                        {[
                          { in: 30, out: 40 },
                          { in: 40, out: 35 },
                          { in: 25, out: 50 },
                          { in: 55, out: 35 },
                          { in: 45, out: 45 },
                          { in: 60, out: 30 },
                          { in: 50, out: 40 },
                          { in: 65, out: 28 },
                        ].map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col justify-end gap-0.5 h-full">
                            <div
                              className="w-full bg-amber-400/90 rounded-t"
                              style={{ height: `${item.out}%` }}
                            />
                            <div
                              className="w-full bg-indigo-500/90"
                              style={{ height: `${item.in}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-zinc-400 mt-1">
                        <span>12.4M Input Tok</span>
                        <span>8.1M Output Tok</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 border-t border-zinc-200 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                All Engines Nominal
              </span>
              <span className="hidden sm:inline text-zinc-400">|</span>
              <span className="hidden sm:inline text-zinc-500">Zero Data Egress Mode (VPC)</span>
            </div>
            <a
              href="#open-source"
              className="text-indigo-600 hover:text-indigo-700 font-sans font-medium flex items-center gap-1"
            >
              Self-Host Locally →
            </a>
          </div>
        </div>

        {/* ── Marquee / Trusted By ── */}
        <div className="mt-14 pt-8 border-t border-zinc-200/70 text-center">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-6">
            Powering AI creators & autonomous engineering teams from prototype to production
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            {['Meta Llama', 'Anthropic Claude', 'OpenAI', 'Google Gemini', 'Mistral AI', 'Hugging Face'].map((name, i) => (
              <span key={i} className="text-sm font-semibold font-mono tracking-tight text-zinc-800">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
