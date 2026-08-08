import AnimatedSection from './AnimatedSection';

const FEATURES = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    title: 'AI Idea Generator',
    description: 'Instantly generate brand-aligned, trend-optimized content concepts tailored for your enterprise audience.',
    accent: '#635BFF',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    title: 'Script Writing Assistant',
    description: 'Transform raw topics into copy-edited scripts containing structured hooks, clear pacing, and CTA anchors.',
    accent: '#635BFF',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    title: 'Caption & Hashtag Engine',
    description: 'Automatically output customized copy and hashtags with compliance-ready, brand-safe criteria.',
    accent: '#635BFF',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: 'Content Planning Pipeline',
    description: 'Sync drafts directly into an interactive project calendar view to streamline deployment schedules.',
    accent: '#635BFF',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/></svg>,
    title: 'Omni-Channel Optimization',
    description: 'Format content metrics automatically to match platform constraints for LinkedIn, YouTube, TikTok, and Reels.',
    accent: '#635BFF',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: 'SLA-Driven Core UI',
    description: 'Zero learning curve with a lightweight layout engineered to maximize production velocity with full accessibility.',
    accent: '#635BFF',
  },
];

function FeatureCard({ feature, index }) {
  return (
    <AnimatedSection delay={index * 0.06}>
      <div className="feature-card group h-full relative overflow-hidden bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-card-hover transition-all duration-200">
        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${feature.accent}08 0%, transparent 65%)` }}
        />

        {/* Icon (MNC standard: clean light blue container, crisp stroke) */}
        <div className="w-10 h-10 rounded bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center mb-6">
          {feature.icon}
        </div>

        {/* Content */}
        <div>
          <h3 className="font-display font-bold text-base text-[#0A2540] mb-2.5">
            {feature.title}
          </h3>
          <p className="text-text-body text-sm leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#635BFF] font-semibold text-xs uppercase tracking-widest mb-3">Enterprise Suite</p>
          <h2 className="section-heading mb-4">
            Production-Grade Capabilities
          </h2>
          <p className="section-subheading">
            CreatorCopilotAI equips growth and brand teams with the exact tools needed to maximize publishing volume.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}
