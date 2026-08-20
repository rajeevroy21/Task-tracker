import { ListChecks } from "lucide-react";
import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  loading,
  error,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreateTask,
}) {
  if (loading) {
    return (
      <div className="py-14 text-center text-sm text-slate-500">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-14 text-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div
        className="
          min-h-[280px]
          border-2
          border-dashed
          border-slate-200
          dark:border-slate-800
          rounded-xl
          flex
          flex-col
          items-center
          justify-center
          px-4
          text-center
          bg-white/30
          dark:bg-slate-900/30
        "
      >
        <ListChecks
          size={40}
          className="mb-4 text-slate-400"
        />

        <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
          No tasks found
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Create your first task to get started.
        </p>

        <button
          onClick={onCreateTask}
          className="
            mt-5
            rounded-xl
            bg-slate-900
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-slate-800
            active:scale-[0.98]
            dark:bg-white
            dark:text-slate-900
          "
        >
          Create Task
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;