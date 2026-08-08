import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Features',    href: '#features' },
  { label: 'Playground',  href: '#playground' },
  { label: 'Pricing',     href: '#pricing' },
  { label: 'FAQ',         href: '#faq' },
];

const APP_URL = 'https://creatorcopilotai.io';

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero','features','playground','pricing','faq','cta'];
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
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-100 py-3.5' : 'bg-white/50 backdrop-blur-sm border-transparent py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={e => scrollTo(e, '#hero')} className="flex items-center gap-2.5 group">
            <img
              src="/images/logo.png"
              alt="CreatorCopilotAI logo"
              className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <span className="font-display font-extrabold text-lg text-[#0A2540] tracking-tight">
              Creator<span className="text-[#635BFF]">CopilotAI</span>
            </span>
          </a>

          {/* Right Group: Nav Link & CTA */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={e => scrollTo(e, href)}
                  className={`text-sm font-medium transition-colors duration-150 hover:text-[#635BFF] py-1 ${
                    activeSection === href.slice(1) ? 'text-[#635BFF]' : 'text-[#425466]'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-4 py-2"
            >
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
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-slate-150 overflow-hidden"
            >
              <div className="container-custom py-4 flex flex-col gap-4">
                {NAV_LINKS.map(({ label, href }) => (
                  <a key={href} href={href} onClick={e => scrollTo(e, href)}
                    className="text-sm font-semibold text-text-body hover:text-brand-blue transition-colors py-1">
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
