import { useEffect, useRef, useState } from "react";
import { CalendarDays, Check, Pencil, Trash2, X } from "lucide-react";
import { PRIORITIES, getDueInfo, parseDateInput, toDateInput } from "../utils/todo";

const iconButton =
  "rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200";

function TodoItem({ todo, toggleTodo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [draft, setDraft] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  // Reset the "confirm delete" state after a few seconds
  useEffect(() => {
    if (!confirmDelete) return;
    const timer = setTimeout(() => setConfirmDelete(false), 3000);
    return () => clearTimeout(timer);
  }, [confirmDelete]);

  const startEditing = () => {
    setDraft({
      title: todo.title,
      priority: todo.priority,
      dueDate: toDateInput(todo.dueDate),
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    const title = draft.title.trim();
    if (!title) return;

    const ok = await updateTodo(
      todo._id,
      { title, priority: draft.priority, dueDate: parseDateInput(draft.dueDate) },
      "Task updated",
    );
    if (ok) setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setIsEditing(false);
  };

  const priority = PRIORITIES[todo.priority] || PRIORITIES.medium;
  const due = getDueInfo(todo.dueDate, todo.completed);

  if (isEditing) {
    return (
      <li className="rounded-xl border border-indigo-300 bg-white p-4 shadow-md dark:border-indigo-500/50 dark:bg-zinc-900">
        <input
          ref={inputRef}
          value={draft.title}
          maxLength={120}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          onKeyDown={handleKeyDown}
          aria-label="Edit task title"
          className="w-full bg-transparent font-medium outline-none"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select
            value={draft.priority}
            onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
            aria-label="Priority"
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            {Object.entries(PRIORITIES).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={draft.dueDate}
            onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
            aria-label="Due date"
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <div className="ml-auto flex gap-1">
            <button onClick={() => setIsEditing(false)} className={iconButton} aria-label="Cancel">
              <X size={18} />
            </button>
            <button
              onClick={handleSave}
              disabled={!draft.title.trim()}
              aria-label="Save"
              className="rounded-lg bg-indigo-600 p-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              <Check size={18} />
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="animate-item-in group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <button
        onClick={() => toggleTodo(todo)}
        aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${
          todo.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-zinc-300 hover:border-indigo-500 dark:border-zinc-600"
        }`}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      <div className="min-w-0 flex-1" onDoubleClick={startEditing}>
        <p
          className={`break-words font-medium transition ${
            todo.completed ? "text-zinc-400 line-through dark:text-zinc-500" : ""
          }`}
        >
          {todo.title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-medium ring-1 ring-inset ${priority.badge}`}>
            {priority.label}
          </span>
          {due && (
            <span
              className={`flex items-center gap-1 font-medium ${
                due.overdue
                  ? "text-rose-600 dark:text-rose-400"
                  : due.soon
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-zinc-500"
              }`}
            >
              <CalendarDays size={13} />
              {due.overdue ? `Overdue · ${due.label}` : due.label}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 gap-1 sm:opacity-0 sm:transition sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        {confirmDelete ? (
          <button
            onClick={() => deleteTodo(todo._id)}
            className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700"
          >
            Confirm
          </button>
        ) : (
          <>
            <button onClick={startEditing} className={iconButton} aria-label="Edit task">
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className={`${iconButton} hover:!bg-rose-50 hover:!text-rose-600 dark:hover:!bg-rose-500/10`}
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
