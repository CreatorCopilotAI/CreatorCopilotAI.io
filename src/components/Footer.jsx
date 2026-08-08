const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Contact', href: 'mailto:hello@creatorcopilotai.io' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: 'https://creatorcopilotai.io/privacy' },
  { label: 'Terms of Service', href: 'https://creatorcopilotai.io/terms' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://creatorcopilotai.io',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://creatorcopilotai.io',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://creatorcopilotai.io',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://creatorcopilotai.io',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="footer" className="bg-text-heading text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl icon-gradient flex items-center justify-center shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,0.2)"/>
                  <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="18" cy="5" r="2" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                ContentFlow <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              AI-powered content creation for creators who want to publish faster and grow smarter.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-blue flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-slate-400 mb-5">Product</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="text-slate-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + CTA */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-slate-400 mb-5">Legal</h4>
            <ul className="flex flex-col gap-3 mb-8">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="https://creatorcopilotai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-btn-glow"
            >
              Try Free Today →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 text-sm">
          <p>© 2026 ContentFlow AI. All rights reserved.</p>
          <p className="text-slate-600">Made with ❤️ for creators</p>
        </div>
      </div>
    </footer>
  );
}
