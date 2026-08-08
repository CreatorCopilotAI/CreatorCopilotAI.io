import AnimatedSection from './AnimatedSection';

const PLAY_STORE_URL = 'https://creatorcopilotai.io';
const APP_URL = 'https://creatorcopilotai.io';

export default function CTA() {
  return (
    <section id="cta" className="section-padding">
      <div className="container-custom">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-8 py-16 md:px-16 md:py-20 text-center">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">Get Started Today</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4 max-w-2xl mx-auto">
                Start Creating Smarter Today
              </h2>
              <p className="text-white/80 text-base md:text-lg mb-3 max-w-xl mx-auto">
                Join 10,000+ creators who use ContentFlow AI to publish faster, grow their audience, and reclaim their time.
              </p>
              <p className="text-white/60 text-sm mb-10">
                Free to start · No credit card required
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-play-store"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-brand-blue font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.37.2.8.21 1.2-.01L17.54 16.5l-3.07-3.07L3.18 23.76z"/>
                    <path d="M22.67 10.22c-.56-.37-1.35-.37-1.91 0l-2.22 1.37L17.54 11.86l-2.68-2.68L17.54 6.86l3.13 1.91c.66.41.66.62 0 1.03l-1.91 1.17V10.22z"/>
                    <path d="M6.79 2.5L14.5 10.5L6.79 18.5C6.38 18.3 6 17.93 6 17.5V3.5C6 3.07 6.38 2.7 6.79 2.5z"/>
                    <path d="M3.18 23.76c.37.2.8.21 1.2-.01L17.54 16.5l-3.07-3.07L3.18 23.76z"/>
                  </svg>
                  Download on Play Store
                </a>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-webapp"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/50 text-white font-semibold text-base hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Open Web App
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
