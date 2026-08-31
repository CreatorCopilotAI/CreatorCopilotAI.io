import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getStoredFeedbacks,
  getUserUpvotedIds,
  toggleUpvoteFeedback,
  updateFeedbackStatus,
  deleteFeedback,
  resetFeedbacksToDefault,
} from '../utils/feedbackStorage';

export default function FeedbackViewerModal({ isOpen, onClose, onOpenSubmitModal }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [upvotedIds, setUpvotedIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'feature' | 'issue' | 'general'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Under Review' | 'Planned' | 'In Progress' | 'Resolved'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('upvotes'); // 'upvotes' | 'newest' | 'oldest'
  const [actionNotice, setActionNotice] = useState(null);

  // Sync feedbacks on load or custom event
  const refreshFeedbacks = () => {
    setFeedbacks(getStoredFeedbacks());
    setUpvotedIds(getUserUpvotedIds());
  };

  useEffect(() => {
    if (isOpen) {
      refreshFeedbacks();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      refreshFeedbacks();
    };
    window.addEventListener('creatorcopilot_feedback_updated', handleUpdate);
    return () => window.removeEventListener('creatorcopilot_feedback_updated', handleUpdate);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const showToast = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 2500);
  };

  const handleUpvote = (id) => {
    toggleUpvoteFeedback(id);
    setUpvotedIds(getUserUpvotedIds());
  };

  const handleStatusChange = (id, newStatus) => {
    updateFeedbackStatus(id, newStatus);
    showToast(`Status updated to "${newStatus}"`);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete feedback item "${title}"?`)) {
      deleteFeedback(id);
      showToast('Feedback item removed');
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(feedbacks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `creatorcopilot_feedback_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported feedback data as JSON');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all feedback items to initial sample data?')) {
      resetFeedbacksToDefault();
      refreshFeedbacks();
      showToast('Reset to default items');
    }
  };

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return feedbacks
      .filter((item) => {
        if (activeTab !== 'all' && item.type !== activeTab) return false;
        if (statusFilter !== 'all' && item.status !== statusFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = item.title?.toLowerCase().includes(q);
          const matchesDesc = item.description?.toLowerCase().includes(q);
          const matchesCategory = item.category?.toLowerCase().includes(q);
          const matchesAuthor = item.author?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesAuthor) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return (b.upvotes || 0) - (a.upvotes || 0);
        } else if (sortBy === 'newest') {
          return new Date(b.timestamp) - new Date(a.timestamp);
        } else {
          return new Date(a.timestamp) - new Date(b.timestamp);
        }
      });
  }, [feedbacks, activeTab, statusFilter, searchQuery, sortBy]);

  // Summary Metrics
  const stats = useMemo(() => {
    const total = feedbacks.length;
    const features = feedbacks.filter((f) => f.type === 'feature').length;
    const issues = feedbacks.filter((f) => f.type === 'issue').length;
    const resolved = feedbacks.filter((f) => f.status === 'Resolved').length;
    return { total, features, issues, resolved };
  }, [feedbacks]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl border border-zinc-200 shadow-2xl flex flex-col overflow-hidden z-10 font-sans"
          >
            {/* Top Blueprint Gradient Accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-amber-500" />

            {/* Notification Toast */}
            <AnimatePresence>
              {actionNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-medium shadow-lg flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{actionNotice}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-200 bg-zinc-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center shadow-xs">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                    </svg>
                  </div>
                  <h2 className="font-display font-bold text-lg text-zinc-900 tracking-tight">
                    Community Feedback & Roadmap Hub
                  </h2>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-200/80 text-zinc-700 font-semibold">
                    Live Data
                  </span>
                </div>
                <p className="text-xs text-zinc-500 max-w-xl">
                  Public requests, submitted bugs, and product improvements reported by users. Stored in real-time in local storage.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenSubmitModal) onOpenSubmitModal();
                  }}
                  className="btn-light-primary text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>+</span>
                  <span>Submit Feedback</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  className="p-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-600 text-xs transition-colors"
                  title="Export Feedbacks to JSON"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="p-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-500 text-xs transition-colors"
                  title="Reset Seed Data"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200 bg-white text-center text-xs">
              <div className="py-2.5 px-4">
                <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider block">Total Submissions</span>
                <span className="font-display font-semibold text-zinc-900 text-base">{stats.total}</span>
              </div>
              <div className="py-2.5 px-4">
                <span className="text-indigo-600 font-mono text-[10px] uppercase tracking-wider block">Feature Requests</span>
                <span className="font-display font-semibold text-indigo-700 text-base">{stats.features}</span>
              </div>
              <div className="py-2.5 px-4">
                <span className="text-rose-600 font-mono text-[10px] uppercase tracking-wider block">Reported Issues</span>
                <span className="font-display font-semibold text-rose-700 text-base">{stats.issues}</span>
              </div>
              <div className="py-2.5 px-4">
                <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-wider block">Resolved / Shipped</span>
                <span className="font-display font-semibold text-emerald-700 text-base">{stats.resolved}</span>
              </div>
            </div>

            {/* Search, Filter & Controls Toolbar */}
            <div className="p-4 border-b border-zinc-200 bg-zinc-50/50 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
              {/* Type Tabs */}
              <div className="flex items-center gap-1 p-1 bg-zinc-200/60 rounded-xl">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'feature', label: 'Requests' },
                  { id: 'issue', label: 'Issues' },
                  { id: 'general', label: 'General' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === t.id
                        ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title, category, error, author..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 text-xs"
                />
                <svg
                  className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>

              {/* Status & Sort Selectors */}
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-700 text-xs focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-700 text-xs focus:outline-none"
                >
                  <option value="upvotes">Most Upvoted</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Scrollable Feedbacks Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-zinc-100 space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const hasUpvoted = upvotedIds.includes(item.id);
                  const isIssue = item.type === 'issue';
                  const isFeature = item.type === 'feature';

                  return (
                    <div
                      key={item.id}
                      className="pt-4 first:pt-0 group flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-2xl hover:bg-zinc-50/80 border border-transparent hover:border-zinc-200/80 transition-all"
                    >
                      {/* Upvote Button */}
                      <button
                        onClick={() => handleUpvote(item.id)}
                        className={`sm:w-14 py-2 px-3 sm:px-0 rounded-xl border flex sm:flex-col items-center justify-center gap-1 transition-all shrink-0 ${
                          hasUpvoted
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold shadow-xs'
                            : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100/50'
                        }`}
                        title={hasUpvoted ? 'Remove upvote' : 'Upvote this submission'}
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-transform ${hasUpvoted ? 'text-indigo-600 scale-110' : 'text-zinc-400'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 4l-8 8h5v8h6v-8h5z" />
                        </svg>
                        <span className="font-mono text-xs">{item.upvotes || 0}</span>
                      </button>

                      {/* Content Body */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          {/* Type Pill */}
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium flex items-center gap-1.5 ${
                              isIssue
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : isFeature
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                            }`}
                          >
                            {isIssue ? (
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                              </svg>
                            ) : isFeature ? (
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                              </svg>
                            )}
                            <span className="capitalize">{item.type}</span>
                          </span>

                          {/* Category Tag */}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-100 text-zinc-600 border border-zinc-200">
                            {item.category}
                          </span>

                          {/* Priority Pill (if high/critical) */}
                          {item.priority === 'Critical' && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-red-100 text-red-700 font-bold border border-red-200">
                              CRITICAL
                            </span>
                          )}
                          {item.priority === 'High' && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-100 text-amber-700 font-semibold border border-amber-200">
                              HIGH
                            </span>
                          )}

                          {/* Status Pill */}
                          <span
                            className={`ml-auto px-2 py-0.5 rounded-md text-[10px] font-mono font-medium ${
                              item.status === 'Resolved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : item.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : item.status === 'Planned'
                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                            }`}
                          >
                            ● {item.status}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-semibold text-sm text-zinc-900 group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-zinc-600 mt-1 leading-relaxed whitespace-pre-line">
                          {item.description}
                        </p>

                        {/* Meta and Status Switcher */}
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 text-[11px] text-zinc-400 font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-600">{item.author}</span>
                            <span>·</span>
                            <span>
                              {new Date(item.timestamp).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>

                          {/* Quick Status / Admin Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-400 text-[10px]">Change Status:</span>
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className="text-[10px] bg-white border border-zinc-200 rounded px-1.5 py-0.5 text-zinc-600 focus:outline-none hover:border-zinc-400"
                            >
                              <option value="Under Review">Under Review</option>
                              <option value="Planned">Planned</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>

                            <button
                              onClick={() => handleDelete(item.id, item.title)}
                              className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                              title="Delete feedback"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-sm text-zinc-800">No feedback items match your filters</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    Try adjusting your search terms or clearing status filters, or be the first to submit feedback!
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setActiveTab('all');
                    }}
                    className="mt-3 text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-200 flex flex-wrap items-center justify-between text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Persisted in Browser LocalStorage · Real-Time Sync</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenSubmitModal) onOpenSubmitModal();
                  }}
                  className="text-zinc-900 font-medium hover:text-indigo-600 underline"
                >
                  Have an idea? Submit here →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
