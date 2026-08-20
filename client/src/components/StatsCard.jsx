function StatsCard({
  title,
  value,
  icon,
  iconClass = "bg-slate-100 text-slate-700",
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
      
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconClass}`}
      >
        {icon}
      </div>

      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-4">
        {value}
      </h2>

      <p className="text-slate-500 mt-1">
        {title}
      </p>

    </div>
  );
}

export default StatsCard;