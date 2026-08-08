import AnimatedSection from './AnimatedSection';

const FEATURES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
      </svg>
    ),
    title: 'AI Idea Generator',
    description: 'Get fresh, trend-aware content ideas in seconds — never face a blank page again.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Script Writing Assistant',
    description: 'Turn any topic into a ready-to-record script in minutes, with hooks and CTAs built in.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
    title: 'Caption & Hashtag Generator',
    description: 'Auto-generate on-brand captions and relevant hashtags optimized for every platform.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Content Planning Workflow',
    description: 'Organize ideas into a simple content calendar and never miss a posting window.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>
      </svg>
    ),
    title: 'Multi-Platform Support',
    description: 'Optimized output for Reels, Shorts, TikTok, and more — all in one workflow.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Fast and Simple UI',
    description: 'No learning curve — go from idea to publish-ready content in a single seamless flow.',
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-3">Features</p>
          <h2 className="section-heading mb-4">
            Everything you need to{' '}
            <span className="gradient-text">create & grow</span>
          </h2>
          <p className="section-subheading">
            Six powerful AI tools, one intuitive app — built for creators who want results, not complexity.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="feature-card group h-full">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl icon-gradient flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-text-heading mb-2 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">{feature.description}</p>

                {/* Hover accent line */}
                <div className="mt-5 h-0.5 w-0 group-hover:w-full bg-brand-gradient rounded-full transition-all duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
