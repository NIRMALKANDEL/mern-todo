import { Moon, Sun } from "lucide-react";

function Header({ theme, toggleTheme }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{today}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">My Tasks</h1>
      </div>

      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-600 shadow-sm transition hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

export default Header;
