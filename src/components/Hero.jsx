import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PLAY_STORE_URL = 'https://creatorcopilotai.io';
const APP_URL        = 'https://creatorcopilotai.io';

const TYPING_PHRASES = [
  '"Generate 5 hooks for B2B marketing campaign..."',
  '"Draft a script for product release update..."',
  '"Write short captions for LinkedIn announcement..."',
];

const FLOATING_CARDS = [
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    text: 'Enterprise ideas ready', bg: 'bg-white', border: 'border-slate-200', pos: 'top-[8%] -left-[6%]', delay: 0,
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    text: 'Copywriting optimized', bg: 'bg-white', border: 'border-slate-200', pos: 'top-[56%] -left-[4%]', delay: 0.4,
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
    text: '10K+ professionals', bg: 'bg-white', border: 'border-slate-200', pos: 'top-[16%] -right-[6%]', delay: 0.25,
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    text: '4.8 App Rating', bg: 'bg-slate-50', border: 'border-slate-200', pos: 'top-[66%] -right-[4%]', delay: 0.6,
  },
];

function CountUp({ end, duration = 1.5, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - t0) / 1000 / duration, 1);
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
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText,  setDisplayText]  = useState('');
  const [isDeleting,   setIsDeleting]   = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    let t;
    if (!isDeleting && displayText === phrase) {
      t = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex(p => (p + 1) % TYPING_PHRASES.length);
    } else {
      t = setTimeout(() =>
        setDisplayText(isDeleting
          ? phrase.slice(0, displayText.length - 1)
          : phrase.slice(0, displayText.length + 1)
        ), isDeleting ? 25 : 45);
    }
    return () => clearTimeout(t);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-24 corporate-bg-pattern">
      <div className="container-custom relative z-10 w-full py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* ── Left copy ── */}
          <div className="w-full lg:w-[46%] flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded bg-[#635BFF]/10 text-[#635BFF] text-xs font-semibold tracking-wide uppercase">
                Enterprise AI Engine
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-heading tracking-tight leading-[1.1] mb-6"
            >
              Scale Content Workflows <span className="text-[#635BFF]">Instantly</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-text-body leading-relaxed mb-6 max-w-xl"
            >
              Generate high-performing copy, automate multi-channel script output, and accelerate growth metrics using secure, compliance-ready generative models.
            </motion.p>

            {/* Structured Search/Command Box style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-8 bg-slate-50 border border-[#E6E8EB] rounded-lg px-4 py-3 w-full max-w-xl flex items-center gap-2.5 shadow-sm"
            >
              <span className="text-[#635BFF] font-mono text-sm select-none">&gt;</span>
              <span className="text-text-body font-mono text-sm md:text-base flex-1">{displayText}</span>
              <span className="w-1.5 h-4 bg-[#635BFF]/75 animate-pulse" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3.5 mb-10 w-full sm:w-auto"
            >
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" id="hero-play-store-cta"
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md bg-black text-white hover:bg-neutral-900 transition-colors duration-200 border border-neutral-800 shadow-sm"
              >
                <img
                  src="/images/play_store_logo.png"
                  alt="Google Play logo"
                  className="w-5.5 h-5.5 object-contain flex-shrink-0"
                />
                <div className="text-left flex flex-col justify-center leading-none">
                  <span className="text-[8px] font-bold text-neutral-300 tracking-wider uppercase">GET IT ON</span>
                  <span className="text-sm font-semibold text-white tracking-tight mt-0.5">Google Play</span>
                </div>
              </a>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" id="hero-webapp-cta"
                className="btn-secondary text-sm px-6 py-3">
                Start Web App Trial
              </a>
            </motion.div>

            {/* Clean Tech Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex flex-wrap items-center gap-6 text-sm text-text-muted border-t border-[#E6E8EB] pt-6 w-full max-w-xl"
            >
              <div>
                <strong className="text-[#0A2540] text-lg font-bold block"><CountUp end={10000} suffix="+" /></strong>
                <span className="text-xs">Active Users</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <strong className="text-[#0A2540] text-lg font-bold block"><CountUp end={250000} suffix="+" /></strong>
                <span className="text-xs">Assets Generated</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <strong className="text-[#0A2540] text-lg font-bold block">99.9%</strong>
                <span className="text-xs">Uptime SLA</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: app screenshot ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[42%] relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-full app-screenshot-container">
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src="/images/hero_mockup.png"
                  alt="CreatorCopilotAI Enterprise Dashboard Mockup"
                  className="w-full object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                  loading="eager"
                  fetchpriority="high"
                />
              </div>

              {/* Staggered Floating Cards (MNC styling: flat white cards, clean borders) */}
              {FLOATING_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.7 + card.delay }}
                  className={`absolute hidden xl:flex items-center gap-2 px-3.5 py-2.5 rounded-lg ${card.bg} border ${card.border} shadow-md text-xs font-semibold text-text-heading whitespace-nowrap ${card.pos}`}
                >
                  {card.icon}
                  <span>{card.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
