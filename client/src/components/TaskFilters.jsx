import { Search, ArrowDownUp } from "lucide-react";

function TaskFilters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
}) {
  return (
    <div className="mb-5">

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 mb-4 lg:flex-row">

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              h-14
              pl-12
              pr-4
              rounded-xl
              border
              border-slate-200
              bg-white
              text-sm
              text-slate-800
              outline-none
              transition
              focus:border-slate-400
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
            "
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            w-full
            lg:w-52
            h-14
            px-4
            rounded-xl
            border
            border-slate-200
            bg-white
            text-sm
            text-slate-800
            outline-none
            transition
            focus:border-slate-400
            dark:bg-slate-900
            dark:border-slate-700
            dark:text-white
          "
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">
            In Progress
          </option>
          <option value="done">Done</option>
        </select>

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="
            w-full
            lg:w-52
            h-14
            px-4
            rounded-xl
            border
            border-slate-200
            bg-white
            text-sm
            text-slate-800
            outline-none
            transition
            focus:border-slate-400
            dark:bg-slate-900
            dark:border-slate-700
            dark:text-white
          "
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

      </div>

      {/* Sort Section */}
      <div className="flex flex-wrap items-center gap-2">

        <div className="flex items-center gap-1.5 mr-1 text-sm text-slate-500 dark:text-slate-400">
          <ArrowDownUp size={18} />

          <span>
            Sort:
          </span>
        </div>

        {/* Due Date */}
        <button
          onClick={() => setSort("dueDate")}
          className={`
            px-4
            py-2.5
            rounded-lg
            text-sm
            font-medium
            transition
            ${
              sort === "dueDate"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }
          `}
        >
          Due Date
        </button>

        {/* Priority */}
        <button
          onClick={() => setSort("priority")}
          className={`
            px-4
            py-2.5
            rounded-lg
            text-sm
            font-medium
            transition
            ${
              sort === "priority"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }
          `}
        >
          Priority
        </button>

        {/* Created */}
        <button
          onClick={() => setSort("newest")}
          className={`
            px-4
            py-2.5
            rounded-lg
            text-sm
            font-medium
            transition
            ${
              sort === "newest"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }
          `}
        >
          Created ↓
        </button>

      </div>
    </div>
  );
}

export default TaskFilters;