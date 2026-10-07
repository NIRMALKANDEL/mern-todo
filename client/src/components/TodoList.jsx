import { ClipboardList, SearchX } from "lucide-react";
import TodoItem from "./TodoItem";

function EmptyState({ searching, filter }) {
  const Icon = searching ? SearchX : ClipboardList;
  const message = searching
    ? "No tasks match your search."
    : filter === "completed"
      ? "Nothing completed yet. You've got this!"
      : filter === "active"
        ? "All caught up — no active tasks."
        : "No tasks yet. Add your first one above.";

  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-zinc-300 py-14 text-center dark:border-zinc-700">
      <Icon size={36} className="text-zinc-300 dark:text-zinc-600" />
      <p className="mt-3 text-sm text-zinc-500">{message}</p>
    </div>
  );
}

function TodoList({ todos, searching, filter, ...handlers }) {
  if (todos.length === 0) return <EmptyState searching={searching} filter={filter} />;

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} {...handlers} />
      ))}
    </ul>
  );
}

export default TodoList;
