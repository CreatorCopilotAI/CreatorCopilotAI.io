import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PLAY_STORE_URL = 'https://creatorcopilotai.io';
const APP_URL = 'https://creatorcopilotai.io';

const TYPING_PHRASES = [
  '"5 viral hook ideas for fitness content..."',
  '"Write a 60-second Reels script about morning routines..."',
  '"Generate captions for my travel photography..."',
];

const FLOATING_CARDS = [
  { icon: '💡', text: '3 ideas generated', color: 'from-blue-50 to-blue-100', border: 'border-blue-200', top: '12%', left: '-18%', delay: 0 },
  { icon: '✅', text: 'Caption ready', color: 'from-violet-50 to-violet-100', border: 'border-violet-200', top: '60%', left: '-16%', delay: 0.3 },
  { icon: '🚀', text: '10K+ creators', color: 'from-indigo-50 to-indigo-100', border: 'border-indigo-200', top: '20%', right: '-15%', delay: 0.6 },
  { icon: '⭐', text: '4.8 rating', color: 'from-amber-50 to-amber-100', border: 'border-amber-200', top: '70%', right: '-12%', delay: 0.9 },
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    let timeout;

    if (!isDeleting && displayText === phrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
    } else {
      const speed = isDeleting ? 35 : 60;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? phrase.slice(0, displayText.length - 1)
            : phrase.slice(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
      {/* Background blob */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blob-gradient absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-60" />
        <div className="blob-gradient absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-40" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="container-custom relative z-10 w-full py-16 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide border border-brand-blue/20">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                AI-Powered Content Creation
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-heading leading-tight mb-6"
            >
              Create Content{' '}
              <span className="gradient-text">Faster</span>{' '}
              with AI
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-text-body leading-relaxed mb-4 max-w-lg"
            >
              Generate ideas, write scripts, and grow your audience using powerful AI tools.
            </motion.p>

            {/* Typing demo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mb-8 text-sm text-text-muted bg-surface-off rounded-xl px-4 py-3 border border-slate-100 w-full max-w-lg min-h-[48px] flex items-center"
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
            >
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-play-store-cta"
                className="btn-primary text-base px-7 py-3.5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.37.2.8.21 1.2-.01L17.54 16.5l-3.07-3.07L3.18 23.76z"/>
                  <path d="M22.67 10.22c-.56-.37-1.35-.37-1.91 0L17.54 11.86l-3.07-3.07L21.54 1.53C22.21 1.18 22.21.97 21.54.62 20.87.27 20.18.55 19.54 1L6.79 8.5 3.72 5.43 2.45 6.71l3.07 3.07L1 12.43l1.45 1.46 4.34-2.51 3.07 3.07-3.34 1.94 1.45 1.45 2.43-1.41L20.5 23.5c.64.45 1.33.73 2 .38.67-.35.67-.56 0-.91L17.54 16.5l3.07-3.07 2.26 1.39c.56.37 1.35.37 1.91 0 .56-.38.56-.99 0-1.36l-1.91-1.24V10.22z"/>
                </svg>
                Get it on Play Store
              </a>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-webapp-cta"
                className="btn-secondary text-base px-7 py-3.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Try Web App
              </a>
            </motion.div>

            {/* Trust signals */}
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
                <span className="font-medium text-text-heading">4.8 rating</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <span><strong className="text-text-heading">10,000+</strong> creators</span>
              <div className="w-px h-4 bg-slate-200" />
              <span>Free to start</span>
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 md:w-80 lg:w-72 xl:w-80 animate-float">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-brand-gradient rounded-[40px] blur-3xl opacity-20 scale-90 translate-y-4" aria-hidden="true" />

              {/* Phone frame */}
              <div className="relative bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-text-heading h-6 flex items-center justify-center gap-1.5 px-4">
                  <div className="w-16 h-1.5 bg-slate-700 rounded-full" />
                </div>
                <img
                  src="/images/hero_mockup.png"
                  alt="ContentFlow AI app showing AI-powered idea generation"
                  className="w-full object-cover"
                  loading="eager"
                  fetchpriority="high"
                />
                <div className="bg-text-heading h-8 flex items-center justify-center">
                  <div className="w-24 h-1 bg-slate-600 rounded-full" />
                </div>
              </div>

              {/* Floating micro-cards */}
              {FLOATING_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + card.delay }}
                  className={`absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${card.color} border ${card.border} shadow-md text-xs font-semibold text-text-heading whitespace-nowrap`}
                  style={{ top: card.top, left: card.left, right: card.right }}
                >
                  <span>{card.icon}</span>
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
