import AnimatedSection from './AnimatedSection';

const PLAY_STORE_URL = 'https://creatorcopilotai.io';
const APP_URL        = 'https://creatorcopilotai.io';

export default function CTA() {
  return (
    <section id="cta" className="section-padding bg-[#F8F9FA] border-t border-surface-grayBorder">
      <div className="container-custom">
        <AnimatedSection>
          <div
            className="relative overflow-hidden rounded-xl px-8 py-16 md:px-16 md:py-20 text-center border border-surface-grayBorder bg-white shadow-sm"
          >
            {/* Minimalist Grid Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{ backgroundImage: 'radial-gradient(#0A2540 1px, transparent 1px)', backgroundSize: '16px 16px' }}
              aria-hidden="true"
            />

            {/* Minimalist 3D perspective logo replacement (Clean bordered card logo) */}
            <div className="relative z-10 mb-6 flex justify-center">
              <div className="w-12 h-12 rounded border border-[#E6E8EB] bg-white flex items-center justify-center shadow-sm">
                <img src="/images/logo.png" alt="CreatorCopilotAI logo" className="w-8 h-8 object-contain" />
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[#635BFF] text-xs font-semibold uppercase tracking-widest mb-3">Enterprise Acceleration</p>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#0A2540] tracking-tight leading-tight mb-4 max-w-2xl mx-auto">
                Accelerate Content Production
              </h2>
              <p className="text-text-body text-base md:text-lg mb-8 max-w-xl mx-auto">
                Implement CreatorCopilotAI across your marketing workspace to automate copywriting tasks and scale publishing outputs.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-play-store"
                  className="btn-primary text-sm px-6 py-3"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.058 10.292L5.437.319c-.5-.3-1.16-.3-1.66 0-.5.3-.8.83-.8 1.4V22.28c0 .57.3 1.1.8 1.4.25.15.53.22.81.22.28 0 .56-.07.81-.22l16.666-9.973c.49-.3.79-.83.79-1.4s-.3-1.1-.79-1.4zM4.978 2.585l12.44 7.452L4.978 17.49V2.585z"/></svg>
                  Get it on Play Store
                </a>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-webapp"
                  className="btn-secondary text-sm px-6 py-3"
                >
                  Access Web Console
                </a>
              </div>
              <p className="text-text-muted text-xs mt-4">
                Enterprise SLA terms apply. No configuration required to begin.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
