import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const PLAY_STORE_URL = 'https://creatorcopilotai.io';
const APP_URL        = 'https://creatorcopilotai.io';

const TYPING_PHRASES = [
  '"5 viral hook ideas for fitness content..."',
  '"Write a 60-second Reels script about morning routines..."',
  '"Generate captions for my travel photography..."',
];

const FLOATING_CARDS = [
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    text: '3 ideas generated', bg: 'bg-white', border: 'border-blue-100',  pos: 'top-[10%] -left-[22%]', delay: 0,
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    text: 'Caption ready',     bg: 'bg-white', border: 'border-violet-100', pos: 'top-[58%] -left-[20%]', delay: 0.4,
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    text: '10K+ creators',    bg: 'bg-white', border: 'border-indigo-100', pos: 'top-[18%] -right-[20%]', delay: 0.25,
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    text: '4.8 rating',        bg: 'bg-amber-50', border: 'border-amber-200', pos: 'top-[68%] -right-[18%]', delay: 0.6,
  },
];

/* Animated counting number */
function CountUp({ end, duration = 1.5, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now) => {
          const elapsed = (now - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setVal(Math.floor(ease * end));
          if (progress < 1) requestAnimationFrame(tick);
          else setVal(end);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* Mouse-parallax hero wrapper */
function ParallaxHero({ children }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width  / 2) / width;
    const y = (e.clientY - top  - height / 2) / height;
    el.querySelectorAll('[data-depth]').forEach(child => {
      const d = parseFloat(child.getAttribute('data-depth'));
      child.style.transform = `translate(${x * d * 24}px, ${y * d * 24}px)`;
    });
  }, []);

  const onLeave = useCallback(() => {
    ref.current?.querySelectorAll('[data-depth]').forEach(c => {
      c.style.transform = 'translate(0,0)';
      c.style.transition = 'transform 0.8s ease';
    });
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="w-full">
      {children}
    </div>
  );
}

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText,  setDisplayText]  = useState('');
  const [isDeleting,   setIsDeleting]   = useState(false);

  /* typing effect */
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    let t;
    if (!isDeleting && displayText === phrase) {
      t = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex(p => (p + 1) % TYPING_PHRASES.length);
    } else {
      const speed = isDeleting ? 35 : 60;
      t = setTimeout(() =>
        setDisplayText(isDeleting
          ? phrase.slice(0, displayText.length - 1)
          : phrase.slice(0, displayText.length + 1)
        ), speed);
    }
    return () => clearTimeout(t);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blob-gradient absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full opacity-60" />
        <div className="blob-gradient absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-40" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Grid dots background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        aria-hidden="true"
      />

      <ParallaxHero>
        <div className="container-custom relative z-10 w-full py-16 md:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left copy ── */}
            <div className="flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-6"
                data-depth="0.3"
              >
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide border border-brand-blue/20">
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                  AI-Powered Content Creation
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-heading leading-tight mb-6"
                data-depth="0.5"
              >
                Create Content{' '}
                <span className="gradient-text">Faster</span>{' '}
                with AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-text-body leading-relaxed mb-4 max-w-lg"
                data-depth="0.4"
              >
                Generate ideas, write scripts, and grow your audience using powerful AI tools — built for creators by CreatorCopilotAI.
              </motion.p>

              {/* Typing demo box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mb-8 text-sm bg-surface-off rounded-xl px-4 py-3 border border-slate-100 w-full max-w-lg min-h-[48px] flex items-center shadow-inner"
                data-depth="0.35"
              >
                <span className="text-text-body font-mono text-sm">{displayText}</span>
                <span className="ml-0.5 inline-block w-px h-4 bg-brand-blue animate-pulse" />
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto"
                data-depth="0.2"
              >
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" id="hero-play-store-cta"
                  className="btn-primary text-base px-7 py-3.5 shimmer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.37.2.8.21 1.2-.01L17.54 16.5l-3.07-3.07L3.18 23.76z"/><path d="M6.79 2.5L14.5 10.5L6.79 18.5C6.38 18.3 6 17.93 6 17.5V3.5C6 3.07 6.38 2.7 6.79 2.5z"/><path d="M17.54 11.86l2.22-1.37c.66-.41.66-.62 0-1.03L17.54 7.94 14.86 10.5l2.68 1.36z"/><path d="M17.54 16.5l2.22 1.37c.56.37 1.35.37 1.91 0 .56-.38.56-.99 0-1.36L17.54 15l-3.07 3.07 3.07-1.57z"/></svg>
                  Get it on Play Store
                </a>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" id="hero-webapp-cta"
                  className="btn-secondary text-base px-7 py-3.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Try Web App
                </a>
              </motion.div>

              {/* Trust signals with CountUp */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-wrap items-center gap-5 text-sm text-text-muted"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <strong className="text-text-heading">4.8 rating</strong>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <span><strong className="text-text-heading"><CountUp end={10000} suffix="+" /></strong> creators</span>
                <div className="w-px h-4 bg-slate-200" />
                <span>Free to start</span>
              </motion.div>
            </div>

            {/* ── Right: 3D phone mockup ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22,1,0.36,1] }}
              className="relative flex justify-center lg:justify-end"
              data-depth="0.8"
            >
              <div className="relative w-72 md:w-80 phone-3d">

                {/* Phone frame */}
                <div className="relative bg-slate-900 rounded-[44px] p-2 shadow-2xl">
                  <div className="bg-white rounded-[36px] overflow-hidden">
                    <div className="bg-slate-900 h-6 flex items-center justify-center">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full" />
                    </div>
                    <img
                      src="/images/hero_mockup.png"
                      alt="CreatorCopilotAI app showing AI-powered idea generation"
                      className="w-full object-cover"
                      loading="eager"
                      fetchpriority="high"
                    />
                    <div className="bg-slate-900 h-8 flex items-center justify-center">
                      <div className="w-24 h-1 bg-slate-700 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating micro-cards */}
                {FLOATING_CARDS.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.9 + card.delay }}
                    className={`absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl ${card.bg} border ${card.border} shadow-lg text-xs font-semibold text-text-heading whitespace-nowrap float-card ${card.pos}`}
                    style={{ animationDelay: `${i * 0.8}s` }}
                  >
                    {card.icon}
                    <span>{card.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxHero>
    </section>
  );
}
