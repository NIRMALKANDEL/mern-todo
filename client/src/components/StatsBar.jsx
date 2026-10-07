function Stat({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${accent}`}>{value}</p>
    </div>
  );
}

function StatsBar({ todos }) {
  const total = todos.length;
  const done = todos.filter((t) => t.completed).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <section className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Total" value={total} accent="text-zinc-900 dark:text-zinc-100" />
        <Stat label="Active" value={total - done} accent="text-amber-600 dark:text-amber-400" />
        <Stat label="Done" value={done} accent="text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="flex items-center gap-3">
        <div
          className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="w-10 text-right text-sm font-semibold tabular-nums text-zinc-600 dark:text-zinc-400">
          {percent}%
        </span>
      </div>
    </section>
  );
}

export default StatsBar;
