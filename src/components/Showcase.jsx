import { useState, useRef, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';

const SLIDES = [
  {
    img: '/images/hero_mockup.png',
    label: 'Generate ideas instantly',
    description: 'AI Idea Generator',
  },
  {
    img: '/images/showcase_script.png',
    label: 'Write scripts in seconds',
    description: 'Script Writing Assistant',
  },
  {
    img: '/images/showcase_caption.png',
    label: 'Auto-create captions & hashtags',
    description: 'Caption & Hashtag Generator',
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const goTo = (idx) => {
    setActive(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % SLIDES.length);
    }, 4500);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section id="showcase" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#635BFF] font-semibold text-xs uppercase tracking-widest mb-3">App Showcase</p>
          <h2 className="section-heading mb-4">
            Unified Interface Console
          </h2>
          <p className="section-subheading">
            A look inside the CreatorCopilotAI platform engine designed for maximum daily asset production.
          </p>
        </AnimatedSection>

        {/* Carousel */}
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Slide selectors (MNC style: clean slate borders, crisp active states) */}
            <div className="flex flex-row lg:flex-col gap-3 order-2 lg:order-1">
              {SLIDES.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`group flex items-center gap-3 px-5 py-3.5 rounded border text-left transition-all duration-200 ${
                    active === i
                      ? 'bg-[#0A2540] border-[#0A2540] text-white shadow-sm'
                      : 'bg-white border-[#E6E8EB] text-text-body hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active === i ? 'bg-white' : 'bg-slate-300'}`} />
                  <div className="hidden sm:block">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${active === i ? 'text-white/70' : 'text-text-muted'}`}>
                      {slide.description}
                    </p>
                    <p className={`text-sm font-semibold mt-0.5 ${active === i ? 'text-white' : 'text-text-heading'}`}>
                      {slide.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Screenshot display */}
            <div className="relative flex-1 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-sm bg-white rounded-xl border border-[#E6E8EB] shadow-lg p-2.5 overflow-hidden">
                {SLIDES.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.img}
                    alt={slide.label}
                    loading="lazy"
                    style={{ mixBlendMode: 'multiply' }}
                    className={`w-full object-contain transition-all duration-500 ${
                      active === i
                        ? 'opacity-100 scale-100 relative'
                        : 'opacity-0 scale-95 absolute inset-0'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile dot indicators */}
            <div className="flex gap-2 order-3 lg:hidden">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    active === i ? 'w-6 bg-[#635BFF]' : 'w-1.5 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
