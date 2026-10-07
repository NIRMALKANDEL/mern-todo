import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import useTodos from "../hooks/useTodos";
import useTheme from "../hooks/useTheme";
import { SORTS } from "../utils/todo";

import Header from "../components/Header";
import StatsBar from "../components/StatsBar";
import TodoForm from "../components/TodoForm";
import Toolbar from "../components/Toolbar";
import TodoList from "../components/TodoList";

function Skeleton() {
  return (
    <div className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-[74px] animate-pulse rounded-xl bg-zinc-200/70 dark:bg-zinc-800/70" />
      ))}
    </div>
  );
}

function Home() {
  const { todos, loading, error, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted } =
    useTodos();
  const { theme, toggleTheme } = useTheme();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const counts = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    return { all: todos.length, active: todos.length - completed, completed };
  }, [todos]);

  const visibleTodos = useMemo(() => {
    const query = search.trim().toLowerCase();
    return todos
      .filter((t) => (filter === "active" ? !t.completed : filter === "completed" ? t.completed : true))
      .filter((t) => t.title.toLowerCase().includes(query))
      .sort(SORTS[sort].fn);
  }, [todos, filter, search, sort]);

  return (
    <div className="min-h-screen px-4 py-10 sm:py-16">
      <main className="mx-auto max-w-2xl space-y-6">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <StatsBar todos={todos} />

        <TodoForm addTodo={addTodo} />

        <Toolbar
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          counts={counts}
        />

        {loading ? (
          <Skeleton />
        ) : error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-500/30 dark:bg-rose-500/10">
            <p className="font-medium text-rose-700 dark:text-rose-300">Couldn't load your tasks</p>
            <p className="mt-1 text-sm text-rose-600/80 dark:text-rose-300/70">{error}</p>
            <button
              onClick={fetchTodos}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        ) : (
          <TodoList
            todos={visibleTodos}
            searching={Boolean(search.trim())}
            filter={filter}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        )}

        {counts.completed > 0 && (
          <div className="flex items-center justify-between text-sm text-zinc-500">
            <span>
              {counts.active} {counts.active === 1 ? "task" : "tasks"} left
            </span>
            <button
              onClick={clearCompleted}
              className="font-medium transition hover:text-rose-600 dark:hover:text-rose-400"
            >
              Clear completed ({counts.completed})
            </button>
          </div>
        )}
      </main>

      <footer className="mt-16 text-center text-xs text-zinc-400">
        Built with MongoDB · Express · React · Node.js — double-click a task to edit
      </footer>
    </div>
  );
}

export default Home;
