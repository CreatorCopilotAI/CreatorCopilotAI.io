import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const STEPS = [
  {
    number: '01',
    title: 'Initialize Topic Input',
    description: 'Provide a keyword or campaign parameter to map out target audience segments.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  },
  {
    number: '02',
    title: 'Review Algorithmic Concepts',
    description: 'Select from 10+ engagement-modeled options tailored specifically for reach indices.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  },
  {
    number: '03',
    title: 'Generate Assets & Scripting',
    description: 'Instantly build structured copy drafts, pacing notes, and optimal hashtag sets.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  },
  {
    number: '04',
    title: 'Export & Deploy',
    description: 'Instantly export clean assets to cross-publish across marketing channels.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
];

function AnimatedLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-slate-100 z-0">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
        className="h-full origin-left bg-[#635BFF] rounded-full"
      />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-surface-off border-b border-surface-grayBorder">
      <div className="container-custom">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[#635BFF] font-semibold text-xs uppercase tracking-widest mb-3">Implementation Flow</p>
          <h2 className="section-heading mb-4">
            Deployment Architecture
          </h2>
          <p className="section-subheading">
            A simple, integrated setup. Go from initial target to distribution-ready assets.
          </p>
        </AnimatedSection>

        <div className="relative">
          <AnimatedLine />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, i) => {
              return (
                <AnimatedSection key={i} delay={i * 0.1} direction="up">
                  <div className="flex flex-col items-center text-center group">
                    {/* Circle icon (MNC: Navy/Teal block with strict number badge) */}
                    <div className="relative mb-6">
                      <div className="w-12 h-12 rounded bg-[#0A2540] text-white flex items-center justify-center shadow-md">
                        {step.icon}
                      </div>
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-[#E6E8EB] flex items-center justify-center shadow-sm">
                        <span className="text-[#635BFF] text-[10px] font-extrabold">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-display font-bold text-[#0A2540] text-base mb-2.5">{step.title}</h3>
                    <p className="text-text-body text-sm leading-relaxed px-2">{step.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
