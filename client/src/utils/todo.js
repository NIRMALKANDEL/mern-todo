export const PRIORITIES = {
  high: { label: "High", rank: 0, badge: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30" },
  medium: { label: "Medium", rank: 1, badge: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30" },
  low: { label: "Low", rank: 2, badge: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30" },
};

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// "2026-10-07" (from <input type="date">) -> local Date, avoiding UTC day shift
export const parseDateInput = (value) => {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const toDateInput = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const getDueInfo = (dueDate, completed) => {
  if (!dueDate) return null;

  const days = Math.round((startOfDay(dueDate) - startOfDay(new Date())) / 86400000);
  let label;
  if (days === 0) label = "Today";
  else if (days === 1) label = "Tomorrow";
  else if (days === -1) label = "Yesterday";
  else
    label = new Date(dueDate).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });

  return { label, overdue: !completed && days < 0, soon: !completed && days >= 0 && days <= 1 };
};

export const SORTS = {
  newest: { label: "Newest", fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  due: {
    label: "Due date",
    fn: (a, b) => (a.dueDate ? new Date(a.dueDate) : Infinity) - (b.dueDate ? new Date(b.dueDate) : Infinity),
  },
  priority: { label: "Priority", fn: (a, b) => PRIORITIES[a.priority].rank - PRIORITIES[b.priority].rank },
};
