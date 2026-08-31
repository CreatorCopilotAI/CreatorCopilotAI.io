const STORAGE_KEY = 'creatorcopilot_feedbacks';
const UPVOTES_KEY = 'creatorcopilot_user_upvotes';

// Curated initial seed items showcasing both feature requests and issues
export const INITIAL_FEEDBACKS = [
  {
    id: 'fb-001',
    type: 'feature',
    title: 'Native Ollama & vLLM Local Engine Integration',
    description: 'Add one-click offline model routing for local llama.cpp, Ollama, and vLLM servers inside air-gapped VPC clusters with zero egress.',
    category: 'Integrations',
    priority: 'High',
    status: 'Planned',
    author: '@dev_sarah',
    timestamp: '2026-08-30T14:22:00Z',
    upvotes: 42,
  },
  {
    id: 'fb-002',
    type: 'issue',
    title: 'MCP tool execution timeout during recursive graph runs',
    description: 'When running an agent graph with >15 recursive sub-agent calls, the MCP interceptor occasionally drops connection before receiving exit code.',
    category: 'Guardrails & MCP',
    priority: 'Critical',
    status: 'In Progress',
    author: '@alex_mcp',
    timestamp: '2026-08-29T10:15:00Z',
    upvotes: 19,
  },
  {
    id: 'fb-003',
    type: 'feature',
    title: 'Real-time Token Cost & Latency Trimmer Visualizer',
    description: 'Provide an interactive latency breakdown chart on the Live Radar dashboard showing exact millisecond cost per guardrail rule pass.',
    category: 'Live Radar & Tracing',
    priority: 'Medium',
    status: 'Under Review',
    author: '@chen_ai',
    timestamp: '2026-08-28T18:40:00Z',
    upvotes: 27,
  },
  {
    id: 'fb-004',
    type: 'issue',
    title: 'Copy docker run command button misses port mapping in Safari',
    description: 'On Safari 18 desktop, clicking the quick copy button occasionally truncates the -p 8080:8080 flag when clipboard permissions are delayed.',
    category: 'UI/UX',
    priority: 'Low',
    status: 'Resolved',
    author: '@frontend_dan',
    timestamp: '2026-08-27T09:05:00Z',
    upvotes: 8,
  },
  {
    id: 'fb-005',
    type: 'feature',
    title: 'Discord & Slack Webhook notifications for security alerts',
    description: 'Allow configuring incoming webhooks whenever a deterministic guardrail intercepts an injection attack or unauthorized tool execution.',
    category: 'Security',
    priority: 'High',
    status: 'Under Review',
    author: '@sec_ops_guru',
    timestamp: '2026-08-26T12:00:00Z',
    upvotes: 35,
  }
];

export function getStoredFeedbacks() {
  if (typeof window === 'undefined') return INITIAL_FEEDBACKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FEEDBACKS));
      return INITIAL_FEEDBACKS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load feedbacks from localStorage:', e);
    return INITIAL_FEEDBACKS;
  }
}

export function saveNewFeedback({ type, title, description, category, priority, author }) {
  const current = getStoredFeedbacks();
  const newFeedback = {
    id: `fb-${Date.now()}`,
    type: type || 'feature',
    title: title.trim(),
    description: description.trim(),
    category: category || 'General',
    priority: priority || 'Medium',
    status: 'Under Review',
    author: author?.trim() ? (author.startsWith('@') ? author : `@${author}`) : '@community_user',
    timestamp: new Date().toISOString(),
    upvotes: 1,
  };

  const updated = [newFeedback, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Also mark as upvoted by the author
    const upvotedIds = getUserUpvotedIds();
    if (!upvotedIds.includes(newFeedback.id)) {
      upvotedIds.push(newFeedback.id);
      localStorage.setItem(UPVOTES_KEY, JSON.stringify(upvotedIds));
    }
    window.dispatchEvent(new CustomEvent('creatorcopilot_feedback_updated'));
  } catch (e) {
    console.error('Failed to save feedback:', e);
  }

  return newFeedback;
}

export function getUserUpvotedIds() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(UPVOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleUpvoteFeedback(id) {
  const current = getStoredFeedbacks();
  const upvotedIds = getUserUpvotedIds();
  const isUpvoted = upvotedIds.includes(id);

  let newUpvotedIds;
  if (isUpvoted) {
    newUpvotedIds = upvotedIds.filter((item) => item !== id);
  } else {
    newUpvotedIds = [...upvotedIds, id];
  }

  const updated = current.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        upvotes: Math.max(0, item.upvotes + (isUpvoted ? -1 : 1)),
      };
    }
    return item;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(UPVOTES_KEY, JSON.stringify(newUpvotedIds));
    window.dispatchEvent(new CustomEvent('creatorcopilot_feedback_updated'));
  } catch (e) {
    console.error('Failed to toggle upvote:', e);
  }

  return { isUpvoted: !isUpvoted, updatedList: updated };
}

export function updateFeedbackStatus(id, newStatus) {
  const current = getStoredFeedbacks();
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('creatorcopilot_feedback_updated'));
  } catch (e) {
    console.error('Failed to update status:', e);
  }
  return updated;
}

export function deleteFeedback(id) {
  const current = getStoredFeedbacks();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('creatorcopilot_feedback_updated'));
  } catch (e) {
    console.error('Failed to delete feedback:', e);
  }
  return updated;
}

export function resetFeedbacksToDefault() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FEEDBACKS));
    localStorage.removeItem(UPVOTES_KEY);
    window.dispatchEvent(new CustomEvent('creatorcopilot_feedback_updated'));
  } catch (e) {
    console.error('Failed to reset feedbacks:', e);
  }
  return INITIAL_FEEDBACKS;
}
