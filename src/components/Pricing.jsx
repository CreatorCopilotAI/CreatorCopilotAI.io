import { useState } from 'react';
import { motion } from 'framer-motion';

const TIERS = [
  {
    name: 'Developer (OSS)',
    tagline: 'Self-hosted & local sandbox',
    price: '$0',
    frequency: 'forever',
    badge: 'Apache 2.0',
    popular: false,
    ctaText: 'Deploy Locally',
    ctaHref: '#open-source',
    features: [
      'Apache 2.0 licensed core engine',
      'Unlimited local simulation runs',
      'Deterministic MCP guardrail rules',
      'Docker & Helm deployment charts',
      'Community Discord & GitHub support',
      '100% offline & zero telemetry',
    ],
  },
  {
    name: 'Team & Pro',
    tagline: 'Cloud acceleration & managed sandboxes',
    price: '$29',
    frequency: 'per month',
    badge: 'Most Popular',
    popular: true,
    ctaText: 'Start Pro Sandbox',
    ctaHref: '#open-source',
    features: [
      'Everything in Developer, plus:',
      'Managed cloud scenario clusters',
      '100,000 automated eval runs / mo',
      'Automated prompt RL optimization',
      'Full trace replays and error logs',
      'Team workspace & shared prompt library',
      'Priority email & chat assistance',
    ],
  },
  {
    name: 'Enterprise VPC',
    tagline: 'Air-gapped dedicated deployment',
    price: 'Custom',
    frequency: 'annual billing',
    badge: 'SOC 2 Ready',
    popular: false,
    ctaText: 'Contact Architecture Team',
    ctaHref: 'mailto:enterprise@creatorcopilotai.io',
    features: [
      'Dedicated on-prem or AWS/GCP VPC',
      'Custom LLM & database connectors',
      'Strict zero data retention guarantee',
      '99.99% Enterprise Uptime SLA',
      'SAML SSO & Role-based Access Control',
      'Dedicated Solutions Architect (24/7)',
      'Custom regulatory audit reports',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono mb-4">
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
            Start for free. <span className="font-semibold text-zinc-950">Scale securely.</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            No credit card required for open source self-hosting. Generous free capabilities across every tier.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                tier.popular
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-xl relative'
                  : 'bg-white text-zinc-900 border-zinc-200 shadow-card hover:shadow-card-hover'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      tier.popular
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30'
                        : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 className={`text-xl font-bold ${tier.popular ? 'text-white' : 'text-zinc-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-xs mt-1 ${tier.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {tier.tagline}
                </p>

                <div className="mt-6 mb-8 flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${tier.popular ? 'text-white' : 'text-zinc-900'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-xs font-mono ${tier.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    / {tier.frequency}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-6 border-t border-zinc-200/20">
                  {tier.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <svg
                        className={`w-4 h-4 mt-0.5 shrink-0 ${tier.popular ? 'text-emerald-400' : 'text-emerald-600'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={tier.popular ? 'text-zinc-200' : 'text-zinc-700'}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="mt-10">
                <a
                  href={tier.ctaHref}
                  className={`w-full py-3 px-4 rounded-xl text-center text-xs font-semibold block transition-all ${
                    tier.popular
                      ? 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-md'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm'
                  }`}
                >
                  {tier.ctaText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
