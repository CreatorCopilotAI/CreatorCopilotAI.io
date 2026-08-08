import AnimatedSection from './AnimatedSection';

const COMPARISONS = [
  {
    topic: 'Ideation Speed',
    traditional: 'Manual brainstorming, keyword scanning, hours of creative blocker search.',
    creatorCopilot: 'Instant generation of 10+ custom trending hooks & titles within 3 seconds.',
  },
  {
    topic: 'Script Drafting',
    traditional: 'Rough outlining, complex formatting, high writer draft friction.',
    creatorCopilot: 'Ready-to-record structured script generation (Hook, Content, CTA) in 1 click.',
  },
  {
    topic: 'Distribution Prep',
    traditional: 'Guesswork tags, formatting captions manually for every separate network.',
    creatorCopilot: 'Platform-optimized auto-captions and 15+ relevant hashtags ready to publish.',
  },
  {
    topic: 'Team Planning',
    traditional: 'Fragmented spreadsheets, calendar mismatches, unscheduled delivery.',
    creatorCopilot: 'Integrated unified plan pipeline to directly queue ideas into structured slots.',
  },
];

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="section-padding bg-surface-off border-y border-surface-grayBorder">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#635BFF] font-semibold text-xs uppercase tracking-widest mb-3">Enterprise Comparison</p>
          <h2 className="section-heading mb-4">
            Simplify Your Content Supply Chain
          </h2>
          <p className="section-subheading">
            See how CreatorCopilotAI stacks up against traditional manual production workflows.
          </p>
        </AnimatedSection>

        {/* Structural Comparison Table */}
        <AnimatedSection>
          <div className="w-full overflow-hidden rounded-xl border border-surface-grayBorder bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-50 border-b border-surface-grayBorder text-xs md:text-sm font-bold uppercase tracking-wider text-text-heading">
              <div className="p-4 md:p-6">Content Stage</div>
              <div className="p-4 md:p-6 border-t md:border-t-0 md:border-l border-surface-grayBorder text-red-500">Traditional Bottlenecks</div>
              <div className="p-4 md:p-6 border-t md:border-t-0 md:border-l border-surface-grayBorder text-emerald-600 bg-emerald-50/20">With CreatorCopilotAI</div>
            </div>

            <div className="divide-y divide-surface-grayBorder">
              {COMPARISONS.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 text-sm transition-colors hover:bg-slate-50/50">
                  <div className="p-5 md:p-6 font-bold text-[#0A2540]">{row.topic}</div>
                  <div className="p-5 md:p-6 border-t md:border-t-0 md:border-l border-surface-grayBorder text-text-body">
                    {row.traditional}
                  </div>
                  <div className="p-5 md:p-6 border-t md:border-t-0 md:border-l border-surface-grayBorder text-text-heading font-medium bg-emerald-50/5">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      {row.creatorCopilot}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
