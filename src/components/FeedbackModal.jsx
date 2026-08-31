import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveNewFeedback } from '../utils/feedbackStorage';

const CATEGORIES = [
  'General',
  'Feature Request',
  'Integrations',
  'Guardrails & MCP',
  'Agent IDE & Graphs',
  'VPC & Deployment',
  'UI/UX & Design',
  'Performance & Latency',
  'Security & Compliance',
  'Documentation & CLI',
];

export default function FeedbackModal({ isOpen, onClose, onViewBoard }) {
  const [type, setType] = useState('feature'); // 'feature' | 'issue' | 'general'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Feature Request');
  const [priority, setPriority] = useState('Medium');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Adjust default category depending on selected type
  useEffect(() => {
    if (type === 'issue') {
      setCategory('Guardrails & MCP');
    } else if (type === 'feature') {
      setCategory('Feature Request');
    } else {
      setCategory('General');
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveNewFeedback({
        type,
        title,
        description,
        category,
        priority,
        author: author.trim() || undefined,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 350);
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setAuthor('');
    setPriority('Medium');
    setSubmitted(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-zinc-950/50 backdrop-blur-sm transition-opacity"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Blueprint Grid Accent */}
            <div className="absolute top-0 right-0 w-64 h-32 blueprint-grid-light opacity-50 pointer-events-none" />

            {/* Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-zinc-900 tracking-tight">
                    Submit App Feedback & Requests
                  </h3>
                  <p className="text-xs text-zinc-500 font-sans">
                    Share bugs, report issues, or tell us what feature you want next.
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              /* Success State */
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-zinc-900">Feedback Submitted Successfully!</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
                    Your {type === 'issue' ? 'issue report' : type === 'feature' ? 'feature request' : 'feedback'} has been logged into the community roadmap board and saved locally.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      handleClose();
                      if (onViewBoard) onViewBoard();
                    }}
                    className="btn-light-primary text-xs flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    View Community Board
                  </button>

                  <button
                    onClick={handleReset}
                    className="btn-light-secondary text-xs"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              /* Submission Form */
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-xs">
                {/* Mode Selector Tabs */}
                <div>
                  <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-2">
                    Feedback Category Type
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-100/80 rounded-xl border border-zinc-200/80">
                    <button
                      type="button"
                      onClick={() => setType('feature')}
                      className={`py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${
                        type === 'feature'
                          ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Feature Request</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setType('issue')}
                      className={`py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${
                        type === 'issue'
                          ? 'bg-white text-rose-700 shadow-xs font-semibold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Report Issue</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setType('general')}
                      className={`py-2 px-3 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${
                        type === 'general'
                          ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      <span>General</span>
                    </button>
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                    {type === 'issue' ? 'Issue Summary / Bug Title' : type === 'feature' ? 'What do you want to see built?' : 'Feedback Title'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      type === 'issue'
                        ? 'e.g., Radar trace drops WebSocket connection on retry'
                        : type === 'feature'
                        ? 'e.g., Add webhook support for Slack guardrail alerts'
                        : 'e.g., Loving the scenario matrix design!'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 text-xs transition-all"
                  />
                </div>

                {/* Description Textarea */}
                <div>
                  <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                    {type === 'issue' ? 'Steps to Reproduce or Error Details' : 'Detailed Explanation / Use Case'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={
                      type === 'issue'
                        ? 'Describe what happened, browser/environment, expected vs actual behavior...'
                        : 'Why would this feature help your agent workflows? Any specific tools or providers needed?'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 text-xs transition-all resize-none"
                  />
                </div>

                {/* Category & Priority Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                      Module / Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-800 text-xs focus:outline-none focus:border-zinc-500"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                      Priority / Severity
                    </label>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {['Low', 'Medium', 'High', 'Critical'].map((p) => {
                        const active = priority === p;
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPriority(p)}
                            className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                              active
                                ? p === 'Critical'
                                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold'
                                  : p === 'High'
                                  ? 'bg-amber-50 border-amber-300 text-amber-700 font-semibold'
                                  : 'bg-zinc-900 border-zinc-900 text-white font-semibold'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Author Name or GitHub handle (optional) */}
                <div>
                  <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                    Your Name or GitHub / Discord handle (optional)
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="@yourhandle or email for updates"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 text-xs"
                  />
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      if (onViewBoard) onViewBoard();
                    }}
                    className="text-xs text-zinc-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Browse existing requests ({'>'})</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 rounded-xl text-xs text-zinc-600 hover:bg-zinc-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !title.trim() || !description.trim()}
                      className="btn-light-primary px-5 py-2 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
