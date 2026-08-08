import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const TIERS = [
  {
    name: 'Starter Console',
    desc: 'Core assets output pipeline for hobby creators.',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      '5 AI generations per month',
      'Basic scripting outline tool',
      'Unified hashtags helper',
      'Platform formatting filters',
      'Standard model queue speed',
    ],
    cta: 'Start Free Sandbox',
    recommended: false,
    url: 'https://creatorcopilotai.io',
  },
  {
    name: 'Professional Tier',
    desc: 'Volume scaling outputs for active developers and professionals.',
    priceMonthly: 19,
    priceYearly: 15,
    features: [
      'Unlimited script & hook compiling',
      'Algorithmic content score insights',
      'Platform-safe compliance checks',
      'Interactive unified planning calendar',
      'Priority SLA queue processing',
      'Dedicated email console support',
    ],
    cta: 'Start Pro Trial',
    recommended: true,
    url: 'https://creatorcopilotai.io',
  },
  {
    name: 'Studio Enterprise',
    desc: 'Multi-seat licensing and custom model weights training.',
    priceMonthly: 49,
    priceYearly: 39,
    features: [
      'Unlimited seats & team licensing',
      'Custom fine-tuned voice models',
      'Outbound API console endpoint access',
      '99.9% uptime SLA compliance guarantee',
      'Dedicated account solutions manager',
      'Direct team onboarding training sessions',
    ],
    cta: 'Contact Enterprise',
    recommended: false,
    url: 'https://creatorcopilotai.io',
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="section-padding bg-surface-off border-y border-surface-grayBorder">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[#635BFF] font-semibold text-xs uppercase tracking-widest mb-3">Pricing Plans</p>
          <h2 className="section-heading mb-4">
            Licensing Options
          </h2>
          <p className="section-subheading">
            SLA-backed tiers designed to grow with your content output volume. No hidden terms.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-xs font-semibold ${!isAnnual ? 'text-[#0A2540]' : 'text-text-muted'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-10 h-6 rounded-full bg-slate-300 p-0.5 transition-colors focus:outline-none"
              aria-label="Toggle annual pricing"
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#635BFF] transition-transform duration-200 ${
                  isAnnual ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${isAnnual ? 'text-[#0A2540]' : 'text-text-muted'}`}>Yearly billing</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Save 20%</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TIERS.map((tier, i) => {
            const price = isAnnual ? tier.priceYearly : tier.priceMonthly;
            return (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div
                  className={`card-mnc h-full p-8 flex flex-col justify-between relative ${
                    tier.recommended ? 'border-2 border-[#635BFF] shadow-card-hover' : ''
                  }`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#635BFF] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded shadow-sm">
                      Recommended
                    </span>
                  )}

                  <div>
                    <h3 className="font-display font-bold text-lg text-[#0A2540] mb-2">{tier.name}</h3>
                    <p className="text-text-muted text-xs leading-relaxed mb-6 min-h-[32px]">{tier.desc}</p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-3xl font-extrabold text-[#0A2540]">${price}</span>
                      <span className="text-text-body text-xs font-semibold">/ month</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-text-body">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={tier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded text-center text-xs font-bold transition-all duration-200 ${
                      tier.recommended
                        ? 'bg-[#635BFF] text-white hover:bg-[#0A2540] shadow-md'
                        : 'bg-slate-100 text-[#0A2540] hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
