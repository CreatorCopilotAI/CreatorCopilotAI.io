import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { use3DTilt } from '../hooks/use3DTilt';

const PROBLEMS = [
  {
    problemIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    ),
    problem:  'Running out of content ideas',
    solution: 'CreatorCopilotAI generates dozens of fresh, trend-aware ideas for any topic in seconds.',
  },
  {
    problemIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    problem:  'Scripting takes too long',
    solution: "Turn any idea into a ready-to-record script instantly — no writer's block, ever again.",
  },
  {
    problemIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    ),
    problem:  'Captions & hashtags are guesswork',
    solution: 'Auto-generate on-brand captions and trending hashtags optimised for every platform.',
  },
];

function ProblemCard({ item, index }) {
  const [flipped, setFlipped] = useState(false);
  const tilt = use3DTilt({ max: 10 });

  return (
    <AnimatedSection delay={index * 0.12}>
      {/* 3D flip card container */}
      <div
        className="relative h-44 cursor-pointer"
        style={{ perspective: '1200px' }}
        onClick={() => setFlipped(f => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
        aria-label={`Toggle problem/solution for: ${item.problem}`}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.65s cubic-bezier(0.34,1.56,0.64,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            width: '100%', height: '100%', position: 'relative',
          }}
        >
          {/* Front — Problem */}
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
            className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex items-start gap-4"
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-400">
              {item.problemIcon}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1.5">The Problem</p>
              <p className="font-semibold text-text-heading text-base md:text-lg leading-snug">{item.problem}</p>
              <p className="text-xs text-text-muted mt-3 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                Tap to see the solution
              </p>
            </div>
          </div>

          {/* Back — Solution */}
          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
            className="rounded-2xl p-6 flex items-start gap-4"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#2563EB,#6D28D9)', borderRadius: '1rem' }}
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">CreatorCopilotAI</p>
              <p className="font-semibold text-white text-base leading-snug">{item.solution}</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="section-padding bg-surface-off">
      <div className="container-custom">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="section-heading mb-4">
            Content creation shouldn&apos;t feel like a{' '}
            <span className="gradient-text">full-time job</span>
          </h2>
          <p className="section-subheading">
            Every creator faces the same wall. CreatorCopilotAI tears it down.
          </p>
          <p className="text-xs text-text-muted mt-3 italic">Tap each card to flip it and see the solution</p>
        </AnimatedSection>

        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {PROBLEMS.map((item, i) => <ProblemCard key={i} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}
