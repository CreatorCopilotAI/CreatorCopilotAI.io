import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Features',    href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Showcase',    href: '#showcase' },
];

const APP_URL = 'https://creatorcopilotai.io';

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActive] = useState('');
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const doc  = document.documentElement;
      const pct  = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero','features','how-it-works','showcase','cta'];
    const obs = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div id="scroll-progress" style={{ width: `${scrollPct}%` }} />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={e => scrollTo(e, '#hero')} className="flex items-center gap-2.5 group">
            <img
              src="/images/logo.png"
              alt="CreatorCopilotAI logo"
              className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
            <span className="font-display font-bold text-lg text-text-heading tracking-tight">
              Creator<span className="gradient-text">CopilotAI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={e => scrollTo(e, href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-brand-blue relative pb-1 ${
                  activeSection === href.slice(1) ? 'text-brand-blue' : 'text-text-body'
                }`}
              >
                {label}
                {activeSection === href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(to right,#2563EB,#6D28D9)' }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-5 py-2.5 shimmer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Try Web App
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-text-heading rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-text-heading rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-text-heading rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={  { opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="container-custom py-4 flex flex-col gap-4">
                {NAV_LINKS.map(({ label, href }) => (
                  <a key={href} href={href} onClick={e => scrollTo(e, href)}
                    className="text-base font-medium text-text-body hover:text-brand-blue transition-colors py-1">
                    {label}
                  </a>
                ))}
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center mt-2">
                  Try Web App
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
