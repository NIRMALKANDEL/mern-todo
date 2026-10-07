import { Search } from "lucide-react";
import { SORTS } from "../utils/todo";

const FILTERS = ["all", "active", "completed"];

function Toolbar({ filter, setFilter, search, setSearch, sort, setSort, counts }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex rounded-xl bg-zinc-200/60 p-1 dark:bg-zinc-800/60" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition sm:flex-none ${
              filter === f
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {f}
            <span className="ml-1.5 text-xs tabular-nums text-zinc-400">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-1 gap-2">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 focus-within:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900">
          <Search size={16} className="shrink-0 text-zinc-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks"
            aria-label="Search tasks"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort by"
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none focus:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        >
          {Object.entries(SORTS).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Toolbar;
