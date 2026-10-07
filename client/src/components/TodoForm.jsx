import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { PRIORITIES, parseDateInput } from "../utils/todo";

const MAX_LENGTH = 120;

const fieldClass =
  "rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    const ok = await addTodo({
      title: title.trim(),
      priority,
      dueDate: parseDateInput(dueDate),
    });
    setSubmitting(false);

    if (ok) {
      setTitle("");
      setDueDate("");
      setPriority("medium");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition focus-within:border-indigo-300 focus-within:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-indigo-500/50"
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        maxLength={MAX_LENGTH}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task title"
        className="w-full bg-transparent text-base outline-none placeholder:text-zinc-400"
      />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Priority"
          className={fieldClass}
        >
          {Object.entries(PRIORITIES).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label} priority
            </option>
          ))}
        </select>

        <label className={`flex items-center gap-2 ${fieldClass}`}>
          <CalendarDays size={16} className="text-zinc-400" />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Due date"
            className="bg-transparent outline-none"
          />
        </label>

        <span className="ml-auto text-xs tabular-nums text-zinc-400">
          {title.length}/{MAX_LENGTH}
        </span>

        <button
          type="submit"
          disabled={!title.trim() || submitting}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add task
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
