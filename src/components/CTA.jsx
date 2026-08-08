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
                  className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-black text-white hover:bg-neutral-900 transition-colors duration-200 border border-neutral-800 shadow-sm"
                >
                  <img
                    src="/images/play_store_logo.png"
                    alt="Google Play logo"
                    className="w-[24px] h-[24px] object-contain flex-shrink-0"
                  />
                  <div className="text-left flex flex-col justify-center leading-none">
                    <span className="text-[7.5px] font-bold text-neutral-300 tracking-wider uppercase">GET IT ON</span>
                    <span className="text-xs font-semibold text-white tracking-tight mt-0.5">Google Play</span>
                  </div>
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
