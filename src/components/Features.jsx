import AnimatedSection from './AnimatedSection';
import { use3DTilt } from '../hooks/use3DTilt';

const FEATURES = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    title: 'AI Idea Generator',
    description: 'Get fresh, trend-aware content ideas in seconds — never face a blank page again.',
    highlight: '#2563EB',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    title: 'Script Writing Assistant',
    description: 'Turn any topic into a ready-to-record script in minutes, with hooks and CTAs built in.',
    highlight: '#4F46E5',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    title: 'Caption & Hashtag Generator',
    description: 'Auto-generate on-brand captions and relevant hashtags optimized for every platform.',
    highlight: '#6D28D9',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: 'Content Planning Workflow',
    description: 'Organize ideas into a simple content calendar and never miss a posting window.',
    highlight: '#2563EB',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/></svg>,
    title: 'Multi-Platform Support',
    description: 'Optimized output for Reels, Shorts, TikTok, and more — all in one workflow.',
    highlight: '#4F46E5',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: 'Fast and Simple UI',
    description: 'No learning curve — go from idea to publish-ready content in a single seamless flow.',
    highlight: '#6D28D9',
  },
];

function FeatureCard({ feature, index }) {
  const tilt = use3DTilt({ max: 14, scale: 1.04 });

  return (
    <AnimatedSection delay={index * 0.08}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="feature-card group h-full relative overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${feature.highlight}18 0%, transparent 60%)` }}
        />

        {/* Icon — lifted in Z */}
        <div
          className="w-12 h-12 rounded-xl icon-gradient flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300"
          style={{ transform: 'translateZ(20px)' }}
        >
          {feature.icon}
        </div>

        {/* Text — slightly lifted */}
        <div style={{ transform: 'translateZ(10px)' }}>
          <h3 className="font-display font-semibold text-lg text-text-heading mb-2">
            {feature.title}
          </h3>
          <p className="text-text-body text-sm leading-relaxed">{feature.description}</p>
        </div>

        {/* Animated bottom bar */}
        <div
          className="mt-5 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
          style={{ background: `linear-gradient(to right, ${feature.highlight}, #6D28D9)`, transform: 'translateZ(10px)' }}
        />
      </div>
    </AnimatedSection>
  );
}

export default function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-3">Features</p>
          <h2 className="section-heading mb-4">
            Everything you need to{' '}
            <span className="gradient-text">create &amp; grow</span>
          </h2>
          <p className="section-subheading">
            Six powerful AI tools, one intuitive app — built for creators who want results, not complexity.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}
