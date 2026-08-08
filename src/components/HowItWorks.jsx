import { useRef, useEffect, useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Enter your topic',
    description: 'Tell ContentFlow AI what you want to create content about — a word, phrase, or idea.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI generates ideas',
    description: 'Get multiple content angles, hooks, and formats instantly — pick your favourite.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Create scripts & captions',
    description: 'Turn any idea into a full script, caption, and hashtag set — ready to record and post.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Publish and grow',
    description: 'Export or copy your content and post across all your platforms with confidence.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
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
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
        className="h-full bg-brand-gradient origin-left rounded-full"
      />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-surface-off">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="section-heading mb-4">
            From idea to post in{' '}
            <span className="gradient-text">4 simple steps</span>
          </h2>
          <p className="section-subheading">
            No setup, no complexity. Just open ContentFlow AI and start creating.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <AnimatedLine />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15} direction="up">
                <div className="flex flex-col items-center text-center group">
                  {/* Step number circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full icon-gradient flex items-center justify-center text-white shadow-btn-glow group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center">
                      <span className="text-brand-blue text-xs font-bold">{i + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-lg text-text-heading mb-2">{step.title}</h3>
                  <p className="text-text-body text-sm leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
