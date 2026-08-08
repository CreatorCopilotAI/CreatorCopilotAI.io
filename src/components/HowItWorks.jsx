import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const STEPS = [
  {
    number: '01',
    title: 'Enter your topic',
    description: 'Tell CreatorCopilotAI what you want to create content about — a word, phrase, or idea.',
    detail: 'Simply type a keyword like "fitness", "travel photography", or "morning routine" and let the AI understand your niche instantly.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  },
  {
    number: '02',
    title: 'AI generates ideas',
    description: 'Get multiple content angles, hooks, and formats instantly — pick your favourite.',
    detail: 'Receive 5–10 unique content angles with estimated engagement potential. Each idea is tailored to trending formats on your platform of choice.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  },
  {
    number: '03',
    title: 'Create scripts & captions',
    description: 'Turn any idea into a full script, caption, and hashtag set — ready to record and post.',
    detail: 'One click expands your idea into a full structured script with hook, main content, and CTA — plus an optimised caption and 15 relevant hashtags.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  },
  {
    number: '04',
    title: 'Publish and grow',
    description: 'Export or copy your content and post across all your platforms with confidence.',
    detail: 'Copy to clipboard, export as text, or push directly to your planning calendar. Your content is ready for Reels, Shorts, TikTok, Twitter, and more.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
];

function AnimatedLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-slate-100 z-0">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
        className="h-full origin-left rounded-full"
        style={{ background: 'linear-gradient(to right,#2563EB,#6D28D9)' }}
      />
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(null);

  return (
    <section id="how-it-works" className="section-padding bg-surface-off">
      <div className="container-custom">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="section-heading mb-4">
            From idea to post in{' '}
            <span className="gradient-text">4 simple steps</span>
          </h2>
          <p className="section-subheading">
            No setup, no complexity. Just open CreatorCopilotAI and start creating.
          </p>
        </AnimatedSection>

        <div className="relative">
          <AnimatedLine />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {STEPS.map((step, i) => {
              const isActive = active === i;
              return (
                <AnimatedSection key={i} delay={i * 0.15}>
                  <motion.div
                    className="flex flex-col items-center text-center cursor-pointer group"
                    onClick={() => setActive(isActive ? null : i)}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && setActive(isActive ? null : i)}
                    aria-expanded={isActive}
                  >
                    {/* Circle */}
                    <div className="relative mb-5">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-400 ${
                          isActive ? 'ring-pulse scale-110' : 'group-hover:scale-105'
                        }`}
                        style={{ background: 'linear-gradient(135deg,#2563EB,#6D28D9)', boxShadow: isActive ? '0 0 0 4px rgba(37,99,235,.2)' : '0 4px 20px rgba(37,99,235,.25)' }}
                      >
                        {step.icon}
                      </div>
                      {/* Number badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center">
                        <span className="text-brand-blue text-xs font-bold">{i + 1}</span>
                      </div>
                    </div>

                    {/* Title & base description */}
                    <h3 className="font-display font-semibold text-lg text-text-heading mb-2">{step.title}</h3>
                    <p className="text-text-body text-sm leading-relaxed mb-3">{step.description}</p>

                    {/* Expandable detail */}
                    <motion.div
                      initial={false}
                      animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden w-full"
                    >
                      <div className="bg-white rounded-xl p-4 text-xs text-text-body leading-relaxed border border-slate-100 shadow-sm text-left mt-1">
                        {step.detail}
                      </div>
                    </motion.div>

                    {/* Chevron indicator */}
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-text-muted"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </motion.div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
