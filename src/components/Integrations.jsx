import { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'LLM Models', 'Agent Frameworks', 'Vector DBs', 'Observability'];

const INTEGRATIONS_LIST = [
  { name: 'OpenAI (GPT-4o & o3)', category: 'LLM Models', latency: '4ms', desc: 'Direct function calling with strict schema enforcement', status: 'Active' },
  { name: 'Anthropic (Claude 3.5)', category: 'LLM Models', latency: '6ms', desc: 'Extended context streaming & tool validation', status: 'Active' },
  { name: 'Google Gemini 2.0', category: 'LLM Models', latency: '5ms', desc: 'Multimodal creator assets and video analysis', status: 'Active' },
  { name: 'DeepSeek (V3 & R1)', category: 'LLM Models', latency: '8ms', desc: 'High-throughput open reasoning inference', status: 'Active' },
  { name: 'Meta Llama 3.3', category: 'LLM Models', latency: '2ms', desc: 'Local self-hosted VPC execution via Ollama/vLLM', status: 'Active' },
  { name: 'LangChain & LangGraph', category: 'Agent Frameworks', latency: '0ms', desc: 'Stateful multi-actor agent orchestration', status: 'Native' },
  { name: 'CrewAI', category: 'Agent Frameworks', latency: '0ms', desc: 'Autonomous multi-role creator team workflows', status: 'Native' },
  { name: 'Microsoft AutoGen', category: 'Agent Frameworks', latency: '0ms', desc: 'Conversational agent swarm coordination', status: 'Native' },
  { name: 'LlamaIndex', category: 'Agent Frameworks', latency: '0ms', desc: 'Advanced indexing and RAG observability', status: 'Native' },
  { name: 'Pinecone', category: 'Vector DBs', latency: '12ms', desc: 'Serverless semantic memory and vector indexing', status: 'Active' },
  { name: 'Qdrant', category: 'Vector DBs', latency: '4ms', desc: 'Self-hosted high performance vector memory', status: 'Active' },
  { name: 'ChromaDB', category: 'Vector DBs', latency: '1ms', desc: 'Local zero-latency embedded vector store', status: 'Active' },
  { name: 'OpenTelemetry', category: 'Observability', latency: '0ms', desc: 'Standardized distributed tracing and span export', status: 'Active' },
  { name: 'Datadog', category: 'Observability', latency: '0ms', desc: 'Real-time alert metrics and error monitoring', status: 'Active' },
  { name: 'PostHog', category: 'Observability', latency: '0ms', desc: 'Product analytics and session trace replay', status: 'Active' },
  { name: 'Redis', category: 'Vector DBs', latency: '1ms', desc: 'Distributed prompt caching and session lock', status: 'Active' },
];

export default function Integrations() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = INTEGRATIONS_LIST.filter((item) => {
    const matchCategory = selectedCat === 'All' || item.category === selectedCat;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section id="integrations" className="py-24 bg-zinc-50/60 border-t border-zinc-200 blueprint-grid-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono mb-4">
            <span>MISSION CONTROL SWITCHBOARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
            Dock with your <span className="font-semibold text-zinc-950">existing systems.</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            Seamlessly connect any LLM provider, vector database, agent framework, and telemetry sink in seconds.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200 shadow-2xs overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCat === cat
                    ? 'bg-zinc-900 text-white shadow-2xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 24+ integrations..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-zinc-200 bg-white text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 shadow-2xs"
            />
            <svg
              className="w-4 h-4 text-zinc-400 absolute left-3 top-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
              className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-card hover:shadow-card-hover hover:border-zinc-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.latency}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-1.5">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item.status}
                </span>
                <span>VPC Safe</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Connector Notice */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-mono font-bold">
              +
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Need a proprietary LLM or private database adapter?</span>
              <p className="text-zinc-500">Write custom adapters in under 10 lines of Python or TypeScript with the Open Connector SDK.</p>
            </div>
          </div>
          <a
            href="#open-source"
            className="btn-light-secondary text-xs"
          >
            Read Adapter Spec →
          </a>
        </div>
      </div>
    </section>
  );
}
