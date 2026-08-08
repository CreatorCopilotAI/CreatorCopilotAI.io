import AnimatedSection from './AnimatedSection';

const PROBLEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    problem: 'Running out of content ideas',
    solution: 'ContentFlow AI generates dozens of fresh, trend-aware ideas for any topic in seconds.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    problem: 'Scripting takes too long',
    solution: 'Turn any idea into a ready-to-record script instantly — no writer\'s block, ever again.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    problem: 'Captions & hashtags are guesswork',
    solution: 'Auto-generate on-brand captions and trending hashtags optimised for every platform.',
  },
];

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="section-padding bg-surface-off">
      <div className="container-custom">
        {/* Section header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="section-heading mb-4">
            Content creation shouldn't feel like a{' '}
            <span className="gradient-text">full-time job</span>
          </h2>
          <p className="section-subheading">
            Every creator faces the same wall. ContentFlow AI tears it down.
          </p>
        </AnimatedSection>

        {/* Problem / Solution pairs */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {PROBLEMS.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-slate-100 flex flex-col md:flex-row gap-6 items-start">
                {/* Problem */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-400">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1">The Problem</p>
                      <p className="font-semibold text-text-heading text-base md:text-lg">{item.problem}</p>
                    </div>
                  </div>
                </div>

                {/* Divider Arrow */}
                <div className="hidden md:flex items-center self-center text-slate-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>

                {/* Solution */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl icon-gradient flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue mb-1">ContentFlow AI</p>
                      <p className="text-text-body text-sm md:text-base leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
