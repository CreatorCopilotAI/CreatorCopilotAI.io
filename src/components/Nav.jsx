import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Showcase', href: '#showcase' },
];

const APP_URL = 'https://creatorcopilotai.io';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'features', 'how-it-works', 'showcase', 'cta'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl icon-gradient flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,0.2)"/>
              <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="18" cy="5" r="2" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg text-text-heading tracking-tight">
            Content<span className="gradient-text">Flow</span> AI
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`text-sm font-medium transition-colors duration-200 hover:text-brand-blue relative ${
                activeSection === href.slice(1) ? 'text-brand-blue' : 'text-text-body'
              }`}
            >
              {label}
              {activeSection === href.slice(1) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gradient rounded-full"
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-5 py-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5.89 3.06L13.31 10.5L5.89 17.94C5.62 17.54 5.5 17.07 5.5 16.5V7.5C5.5 6.93 5.62 6.46 5.89 3.06ZM17 12L19.78 13.56C20.37 13.9 20.37 14.1 19.78 14.44L17 16L14.31 10.5L17 12ZM6.79 2.5L14.5 10.5L6.79 18.5C6.38 18.3 6 17.93 6 17.5V3.5C6 3.07 6.38 2.7 6.79 2.5Z"/></svg>
            Try Web App
          </a>
        </div>

        {/* Mobile hamburger */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-base font-medium text-text-body hover:text-brand-blue transition-colors py-1"
                >
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
  );
}
