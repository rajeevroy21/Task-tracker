import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Pagination({
  page,
  totalPages,
  totalTasks,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Page {page} of {totalPages}
        {" · "}
        {totalTasks} tasks
      </p>

      <div className="flex items-center gap-2">

        {/* Previous */}
        <button
          onClick={() =>
            onPageChange(page - 1)
          }
          disabled={page === 1}
          className="
            w-10 h-10
            flex items-center justify-center
            rounded-lg
            border border-slate-200
            dark:border-slate-700
            disabled:opacity-40
            disabled:cursor-not-allowed
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() =>
              onPageChange(pageNumber)
            }
            className={`
              w-10 h-10
              rounded-lg
              font-medium
                 ${pageNumber === page
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }
            `}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() =>
            onPageChange(page + 1)
          }
          disabled={page === totalPages}
          className="
            w-10 h-10
            flex items-center justify-center
            rounded-lg
            border border-slate-200
            dark:border-slate-700
            disabled:opacity-40
            disabled:cursor-not-allowed
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
        >
          <ChevronRight size={20} />
        </button>

      </div>
    </div>
  );
}

export default Pagination;