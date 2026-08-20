import { ListTodo, BarChart3, Plus } from "lucide-react";

function DashboardTabs({
  activeTab,
  setActiveTab,
  onNewTask,
}) {
  return (
    <div className="flex flex-col gap-4 mb-5 sm:flex-row sm:items-center sm:justify-between">
      
      {/* Tabs */}
      <div className="flex w-fit bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === "tasks"
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          <ListTodo size={17} />
          Tasks
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === "analytics"
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          <BarChart3 size={17} />
          Analytics
        </button>
      </div>

      {/* New Task Button */}
      {activeTab === "tasks" && (
        <button
          onClick={onNewTask}
          className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 text-sm font-semibold rounded-xl transition hover:opacity-90 active:scale-[0.98]"
        >
          <Plus size={17} />
          New Task
        </button>
      )}
    </div>
  );
}

export default DashboardTabs;