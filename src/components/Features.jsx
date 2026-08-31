import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    id: 'simulate',
    stepNumber: '01',
    category: 'SIMULATE & SCENARIOS',
    title: 'Test creator agents at scale before shipping',
    desc: 'Generate thousands of realistic edge-case creator prompts and test multi-step execution graphs against hallucination benchmarks.',
    snippets: {
      typescript: `import { CreatorEngine, ScenarioRunner } from '@creatorcopilot/sdk';

const engine = new CreatorEngine({
  vpcEndpoint: process.env.COPILOT_VPC_URL,
  guardrails: { strictJson: true, timeoutMs: 1500 }
});

const results = await ScenarioRunner.runMatrix({
  agent: 'ViralScriptwriter_v2',
  scenarios: ['prompt_injection', 'long_context_overflow'],
  concurrency: 20
});

console.log(\`Pass Rate: \${results.passPercentage}%\`);`,
      python: `from creatorcopilot import CreatorEngine, ScenarioRunner

engine = CreatorEngine(
    vpc_endpoint="http://localhost:8080",
    strict_guardrails=True
)

matrix = ScenarioRunner.run_matrix(
    agent_id="viral_hook_generator_v2",
    scenarios=["malformed_tools", "pii_leak_attempt"],
    concurrency=20
)

print(f"Matrix Evaluation Score: {matrix.score}%")`,
      curl: `curl -X POST http://localhost:8080/v1/scenarios/run \\
  -H "Authorization: Bearer cc_live_key_992" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent": "MarketingCopilot",
    "scenarios": ["injection_attack", "rate_limit"],
    "iterations": 50
  }'`,
    },
    uiPreview: {
      tag: 'SIMULATION MONITOR',
      status: 'Passed (99.2%)',
      metric: '50/50 Iterations Cleared',
      details: ['Prompt Injection: 0% vulnerability', 'Schema compliance: 100%', 'Average execution: 142ms'],
    },
  },
  {
    id: 'guard',
    stepNumber: '02',
    category: 'MCP GUARDRAILS',
    title: 'Intercept hallucinations with zero latency overhead',
    desc: 'Deterministic sandboxing catches malformed function calls, prompt injection attempts, and unauthorized data leakage in <8ms.',
    snippets: {
      typescript: `import { createGuardrail } from '@creatorcopilot/guardrails';

export const safePublishGuard = createGuardrail({
  rules: [
    { type: 'regex_block', pattern: /(?i)\\b(api.?key|password)\\b/ },
    { type: 'schema_strict', schema: ScriptOutputSchema },
    { type: 'tool_whitelist', allowed: ['search_web', 'generate_draft'] }
  ],
  onViolation: (violation) => {
    console.warn(\`Blocked unsafe tool call: \${violation.reason}\`);
  }
});`,
      python: `from creatorcopilot.guardrails import GuardrailConfig, inspect_payload

guard = GuardrailConfig(
    block_shell_execution=True,
    sanitize_pii=True,
    max_latency_overhead_ms=10
)

@guard.intercept
def execute_agent_step(prompt_context):
    return llm.invoke(prompt_context)`,
      curl: `curl -X POST http://localhost:8080/v1/guardrails/verify \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool_name": "shell_exec",
    "parameters": { "command": "rm -rf /" }
  }'
# Returns HTTP 403 Forbidden [Guardrail Intercepted in 4ms]`,
    },
    uiPreview: {
      tag: 'GUARDRAIL FIREWALL',
      status: 'Active (Strict Mode)',
      metric: '0 Unsafe Invocations',
      details: ['Deterministic regex filter: Active', 'Input validation latency: 4ms', 'Blocked tools: 4 registered'],
    },
  },
  {
    id: 'optimize',
    stepNumber: '03',
    category: 'OBSERVABILITY & OPTIMIZE',
    title: 'Self-improving feedback loops for every generation',
    desc: 'Track full execution traces, model latency, and token cost breakdown. Feed user corrections directly back into few-shot datasets.',
    snippets: {
      typescript: `import { AgentTracer } from '@creatorcopilot/telemetry';

const tracer = new AgentTracer({ project: 'CreatorPlatform_Prod' });

tracer.onTraceComplete(async (trace) => {
  if (trace.feedback === 'negative') {
    await tracer.datasets.appendFeedbackPair({
      input: trace.input,
      badOutput: trace.output,
      autoFixed: true
    });
  }
});`,
      python: `from creatorcopilot.telemetry import TraceCollector

collector = TraceCollector(auto_optimize=True)

with collector.trace("generate_youtube_script") as t:
    output = agent.generate(topic="AI in 2026")
    t.log_metric("tokens", output.token_count)
    t.log_metric("cost_usd", output.cost)`,
      curl: `curl http://localhost:8080/v1/analytics/overview \\
  -H "Authorization: Bearer cc_live_key_992"
# Returns 24h usage metrics, error rates, and token cost trends`,
    },
    uiPreview: {
      tag: 'COST & LATENCY TRACER',
      status: '184ms Avg Latency',
      metric: '$0.0018 / 1k Tokens',
      details: ['Total traces recorded: 1.4M', 'Cache hit efficiency: 68.4%', 'Error rate: 0.04%'],
    },
  },
];

export default function Features() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [lang, setLang] = useState('typescript');

  const current = STEPS[selectedStep];

  return (
    <section id="features" className="py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono mb-4">
            <span>ENGINE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
            Build, test, and <span className="font-semibold text-zinc-950">refine.</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            A unified suite to eliminate hallucinations, enforce hard tool boundaries, and optimize production creator agents.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setSelectedStep(idx)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                selectedStep === idx
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-md'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-300'
              }`}
            >
              <span className={`font-mono text-[11px] ${selectedStep === idx ? 'text-indigo-400' : 'text-zinc-400'}`}>
                {step.stepNumber}
              </span>
              <span>{step.category}</span>
            </button>
          ))}
        </div>

        {/* Two-Column Feature Presentation */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-zinc-50/70 p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-card">
          {/* Left Column: Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono text-indigo-600 font-semibold uppercase tracking-wider">
              Step {current.stepNumber} · {current.category}
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-900 leading-tight">
              {current.title}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {current.desc}
            </p>

            {/* UI Preview Card */}
            <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                  {current.uiPreview.tag}
                </span>
                <span className="font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {current.uiPreview.status}
                </span>
              </div>
              <div className="text-lg font-bold text-zinc-900">
                {current.uiPreview.metric}
              </div>
              <div className="space-y-1 pt-2 border-t border-zinc-100">
                {current.uiPreview.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-600">
                    <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Code Window with Language Tabs */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-xl overflow-hidden font-mono">
            {/* Tab header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="text-xs text-zinc-400 font-sans font-medium">SDK Integration</span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-zinc-950 p-0.5 rounded-lg border border-zinc-800 text-[11px]">
                {['typescript', 'python', 'curl'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-0.5 rounded capitalize transition-colors ${
                      lang === l ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {l === 'curl' ? 'cURL' : l}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <div className="p-5 text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-300">
              <pre>
                <code>{current.snippets[lang]}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
