import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const FAQS = [
  {
    question: 'How does the AI model generate brand-aligned scripts?',
    answer: 'CreatorCopilotAI maps key audience segments and keywords based on your initial topic input. Our custom generative model applies pre-configured hooks, structure guidelines, and target voice metrics to ensure outputs are optimized for engagement while remaining safe and compliant.',
  },
  {
    question: 'What content platform outputs are currently supported?',
    answer: 'Our platform formats content output configurations automatically to match posting constraints for LinkedIn, YouTube, TikTok, and Instagram Reels. This covers script pacing, character counts, and hashtag distribution parameters.',
  },
  {
    question: 'Is there a free trial or sandbox environment?',
    answer: 'Yes. You can access the Starter Console tier completely free of charge. This plan gives you 5 AI generation credits per month to test ideation, scripting, and caption outputs with no credit card details required.',
  },
  {
    question: 'Does the application support multi-seat studio licensing?',
    answer: 'Absolutely. The Studio Enterprise tier supports multi-user seat licensing, custom fine-tuned voice models, and outbound API endpoint console access. Contact our solutions desk for SLA terms and volume contract pricing details.',
  },
  {
    question: 'How secure is our prompt input data?',
    answer: 'CreatorCopilotAI is built on secure, sandbox-isolated endpoints. Prompt inputs are strictly protected and never used to train public foundational models, satisfying strict corporate governance and compliance requirements.',
  },
];

function FAQItem({ item, idx }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E6E8EB] py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none py-2"
        aria-expanded={isOpen}
      >
        <span className="font-display font-bold text-sm md:text-base text-[#0A2540] hover:text-[#635BFF] transition-colors">
          {item.question}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="text-text-body text-xs md:text-sm leading-relaxed mt-2.5 pr-6 pb-2">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#635BFF] font-semibold text-xs uppercase tracking-widest mb-3">Resource Center</p>
          <h2 className="section-heading mb-4">
            Frequently Asked Questions
          </h2>
          <p className="section-subheading">
            Answers to common questions regarding deployment, licensing, and security infrastructure.
          </p>
        </AnimatedSection>

        {/* Accordions */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => (
              <FAQItem key={idx} item={faq} idx={idx} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
