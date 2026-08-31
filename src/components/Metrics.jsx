import { motion } from 'framer-motion';

const METRICS = [
  {
    value: '99.4%',
    label: 'Fewer Hallucinations',
    desc: 'Deterministic guardrails intercept unsupported statements and tool execution failures before output reaches users.',
    badge: 'Benchmark',
  },
  {
    value: '10x',
    label: 'Faster Deployment',
    desc: 'Ship verified agent scripts from local terminal sandbox to production clusters in minutes with one command.',
    badge: 'Velocity',
  },
  {
    value: '99.99%',
    label: 'Uptime SLA',
    desc: 'Redundant multi-region failover and distributed state persistence engineered for enterprise scale.',
    badge: 'Reliability',
  },
  {
    value: '<8ms',
    label: 'Latency Overhead',
    desc: 'Sub-millisecond Rust and C++ regex filters check inputs and outputs without slowing token generation streams.',
    badge: 'Real-time',
  },
];

export default function Metrics() {
  return (
    <section id="metrics" className="py-24 bg-zinc-50/70 border-t border-zinc-200 blueprint-grid-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono mb-4">
            <span>VALIDATED BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
            Performance <span className="font-semibold text-zinc-950">metrics.</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            Engineered to operate at high throughput with zero compromise on safety, latency, or compliance.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-card hover:shadow-card-hover hover:border-zinc-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {m.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-3 font-display">
                  {m.value}
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-2">
                  {m.label}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-100 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Verified v2.4</span>
                <span className="text-emerald-600 font-medium">Passed ✓</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
