import {
  CheckCircle2,
  Circle,
  Clock3,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

function TaskCard({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const isDone = task.status === "done";

  const priorityStyles = {
    low: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    medium:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
    high: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  };

  const statusStyles = {
    todo: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    "in-progress":
      "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  };

  const formatDate = (date) => {
    if (!date) return "No due date";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      
      <div className="flex gap-3">

        {/* Status Toggle */}
        <button
          onClick={() => onToggleStatus(task)}
          className="mt-0.5 flex-shrink-0"
        >
          {isDone ? (
            <CheckCircle2
              size={22}
              className="text-emerald-500"
            />
          ) : (
            <Circle
              size={22}
              className="text-slate-400"
            />
          )}
        </button>

        {/* Task Content */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

            <h3
              className={`text-base font-semibold ${
                isDone
                  ? "text-slate-400 line-through"
                  : "text-slate-800 dark:text-white"
              }`}
            >
              {task.title}
            </h3>

            {/* Status + Priority */}
            <div className="flex flex-wrap gap-1.5">
              
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                  statusStyles[task.status] ||
                  statusStyles.todo
                }`}
              >
                {task.status === "in-progress"
                  ? "In Progress"
                  : task.status}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                  priorityStyles[task.priority] ||
                  priorityStyles.medium
                }`}
              >
                {task.priority}
              </span>

            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              {task.description}
            </p>
          )}

          {/* Task Info */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">

            <div className="flex items-center gap-1.5">
              <CalendarDays size={15} />

              <span>
                Due {formatDate(task.dueDate)}
              </span>
            </div>

            {task.status === "in-progress" && (
              <div className="flex items-center gap-1.5">
                <Clock3 size={15} />
                <span>In Progress</span>
              </div>
            )}

          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 self-start">

          <button
            onClick={() => onEdit(task)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            title="Edit task"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default TaskCard;