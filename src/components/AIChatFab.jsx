import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROMPT_SUGGESTIONS = [
  'How to run CreatorCopilot in my VPC?',
  'How do MCP guardrails stop hallucinations?',
  'What is included in the Apache 2.0 license?',
];

const MOCK_ANSWERS = {
  vpc: 'To run CreatorCopilotAI in your private VPC with zero data egress, simply run `docker run -d -p 8080:8080 ghcr.io/creatorcopilotai/engine:latest`. All prompt telemetry and traces remain 100% offline.',
  guardrails: 'CreatorCopilotAI enforces deterministic compiled regex rules, JSON schema validators, and blocked tool lists in <8ms. Dangerous commands (like shell_exec) are immediately blocked before LLM execution.',
  license: 'The entire core engine is Apache 2.0 licensed. You can fork, self-host, and embed it into commercial production software with zero licensing cost.',
};

export default function AIChatFab() {
  const [chatOpen, setChatOpen] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am CreatorCopilot Assistant. Ask me anything about self-hosting, MCP guardrails, or scenario simulations.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Formulate AI response
    setTimeout(() => {
      let reply = "CreatorCopilotAI is engineered to prevent hallucinations, enforce deterministic safety guardrails, and run on your private infrastructure under the Apache 2.0 license.";
      const lower = text.toLowerCase();
      if (lower.includes('vpc') || lower.includes('deploy') || lower.includes('docker') || lower.includes('infra')) {
        reply = MOCK_ANSWERS.vpc;
      } else if (lower.includes('guardrail') || lower.includes('hallucinat') || lower.includes('safe')) {
        reply = MOCK_ANSWERS.guardrails;
      } else if (lower.includes('license') || lower.includes('apache') || lower.includes('free') || lower.includes('cost')) {
        reply = MOCK_ANSWERS.license;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Prompt Bubble on Desktop (when chat closed) */}
      {!chatOpen && (
        <div className="fixed bottom-24 right-6 z-40 hidden sm:flex flex-col items-end gap-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer px-3.5 py-2 rounded-2xl rounded-br-sm bg-white/95 backdrop-blur-md border border-zinc-200 text-xs text-zinc-800 shadow-card hover:border-indigo-300 hover:shadow-card-hover transition-all flex items-center gap-2"
            onClick={() => {
              setChatOpen(true);
              handleSend(PROMPT_SUGGESTIONS[bubbleIndex]);
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{PROMPT_SUGGESTIONS[bubbleIndex]}</span>
          </motion.div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="ai-fab-btn relative w-14 h-14 rounded-full bg-white border border-zinc-200 shadow-xl flex items-center justify-center text-zinc-900 hover:scale-105 active:scale-95 transition-all overflow-hidden group"
          title="CreatorCopilot AI Assistant"
        >
          {/* Animated subtle rotating halo */}
          <div className="ai-fab-ring absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 via-emerald-500/20 to-transparent pointer-events-none" />

          {chatOpen ? (
            <svg className="w-5 h-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-zinc-900 group-hover:text-indigo-600 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>

      {/* Popout Interactive Chat Dialog */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-96 max-h-[520px] h-[500px] bg-white rounded-3xl border border-zinc-200 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-100 bg-zinc-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-white text-xs">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-900">CreatorCopilot Assistant</div>
                  <div className="text-[10px] font-mono text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Online · Local VPC Engine
                  </div>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
                aria-label="Close Chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-zinc-900 text-white rounded-br-xs'
                        : 'bg-zinc-100 text-zinc-800 rounded-bl-xs border border-zinc-200/60'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-3 py-2 bg-zinc-50 border-t border-zinc-100 flex items-center gap-1.5 overflow-x-auto text-[10px]">
              {PROMPT_SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-indigo-600 hover:border-indigo-200 whitespace-nowrap transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-zinc-100 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about VPC, guardrails, or CLI..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:border-zinc-400"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
