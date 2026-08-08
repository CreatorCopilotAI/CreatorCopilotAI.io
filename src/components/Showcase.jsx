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
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section id="showcase" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-3">App Showcase</p>
          <h2 className="section-heading mb-4">
            See <span className="gradient-text">ContentFlow AI</span> in action
          </h2>
          <p className="section-subheading">
            A beautifully simple app designed so you can focus on creating, not figuring out tools.
          </p>
        </AnimatedSection>

        {/* Carousel */}
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Labels */}
            <div className="flex flex-row lg:flex-col gap-3 order-2 lg:order-1">
              {SLIDES.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    active === i
                      ? 'bg-brand-gradient text-white shadow-btn-glow'
                      : 'bg-surface-off text-text-body hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${active === i ? 'bg-white' : 'bg-slate-300'}`} />
                  <div className="hidden sm:block">
                    <p className={`text-xs font-semibold ${active === i ? 'text-white/80' : 'text-text-muted'}`}>
                      {slide.description}
                    </p>
                    <p className={`text-sm font-medium ${active === i ? 'text-white' : 'text-text-heading'}`}>
                      {slide.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Phone mockup display */}
            <div className="relative flex-1 flex justify-center order-1 lg:order-2">
              {/* Glow */}
              <div className="absolute inset-0 bg-brand-gradient rounded-full blur-3xl opacity-15 scale-50" aria-hidden="true" />

              <div className="relative w-64 md:w-72 lg:w-64 xl:w-72">
                {/* Phone frame */}
                <div className="bg-text-heading rounded-[44px] p-2 shadow-2xl">
                  <div className="bg-white rounded-[36px] overflow-hidden">
                    <div className="bg-text-heading h-6 flex items-center justify-center">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full" />
                    </div>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '9/16' }}>
                      {SLIDES.map((slide, i) => (
                        <img
                          key={i}
                          src={slide.img}
                          alt={slide.label}
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                            active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="bg-text-heading h-8 flex items-center justify-center">
                      <div className="w-24 h-1 bg-slate-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dot indicators (mobile) */}
            <div className="flex gap-2 order-3 lg:hidden">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? 'w-6 bg-brand-blue' : 'w-1.5 bg-slate-300'
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
