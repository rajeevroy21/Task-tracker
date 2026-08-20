import StatsCard from "./StatsCard";
import {
  ListTodo,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

function Analytics({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <StatsCard
          title="Total Tasks"
          value={totalTasks}
          icon={<ListTodo size={22} />}
        />

        <StatsCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle size={22} />}
        />

        <StatsCard
          title="Pending"
          value={pendingTasks}
          icon={<Clock size={22} />}
        />

        <StatsCard
          title="In Progress"
          value={inProgressTasks}
          icon={<TrendingUp size={22} />}
        />

      </div>

      {/* Completion Rate */}
      <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Completion Rate
          </h2>

          <span className="font-bold text-slate-800 dark:text-white">
            {completionRate}%
          </span>
        </div>

        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{
              width: `${completionRate}%`,
            }}
          />
        </div>

        <p className="text-slate-500 dark:text-slate-400 mt-3">
          {completedTasks} of {totalTasks} tasks completed
        </p>

      </div>
    </div>
  );
}

export default Analytics;