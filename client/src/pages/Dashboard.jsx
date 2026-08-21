import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import DashboardTabs from "../components/DashboardTabs";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import Analytics from "../components/Analytics";
import TaskForm from "../components/TaskForm";
import Pagination from "../components/Pagination";

import useTasks from "../hooks/useTasks";
import useTheme from "../hooks/useTheme";

function Dashboard() {
  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useTheme();

  const {
    tasks,
    allTasks,
    loading,
    error,
    pagination,
    fetchTasks,
    fetchAllTasks,
    addTask,
    editTask,
    removeTask,
  } = useTasks();

  // UI STATE

  const [activeTab, setActiveTab] = useState("tasks");

  // FILTERS

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("newest");

  // Pagination
  const [page, setPage] = useState(1);

  // MODAL

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // FETCH PAGINATED TASKS

  useEffect(() => {
    if (activeTab !== "tasks") return;

    const timer = setTimeout(() => {
      fetchTasks({
        search,
        status,
        priority,
        sort,
        page,
        limit: 5,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [
    activeTab,
    search,
    status,
    priority,
    sort,
    page,
  ]);
  // FETCH ALL TASKS FOR ANALYTICS 

  useEffect(() => {
    if (activeTab === "analytics") {
      fetchAllTasks();
    }
  }, [activeTab]);

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // NEW TASK

  const handleNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // EDIT TASK

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // CLOSE FORM

  const handleCloseForm = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  // CREATE / UPDATE TASK

  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        await editTask(
          editingTask._id,
          formData
        );
      } else {
        await addTask(formData);

        // Go to first page after creating task
        setPage(1);
      }

      handleCloseForm();

      // Refresh current task page
      fetchTasks({
        search,
        status,
        priority,
        sort,
        page: editingTask ? page : 1,
        limit: 5,
      });

      // Refresh analytics data
      fetchAllTasks();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // DELETE TASK

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    await removeTask(id);

    // Refresh current page
    fetchTasks({
      search,
      status,
      priority,
      sort,
      page,
      limit: 5,
    });

    // Refresh analytics
    fetchAllTasks();
  };

  // COMPLETE / UNDO

  const handleToggleStatus = async (task) => {
    const newStatus =
      task.status === "done"
        ? "todo"
        : "done";

    await editTask(task._id, {
      ...task,
      status: newStatus,
    });

    // Refresh current page
    fetchTasks({
      search,
      status,
      priority,
      sort,
      page,
      limit: 5,
    });

    // Refresh analytics
    fetchAllTasks();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
      />

      <main className="max-w-5xl mx-auto px-4 py-7">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Welcome back
            {user.name ? `, ${user.name}` : ""}
          </h1>
        </div>

        {/* Tabs */}
        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNewTask={handleNewTask}
        />

        {/* =========================
            TASKS TAB
        ========================== */}

        {activeTab === "tasks" && (
          <>
            <TaskFilters
              search={search}
              setSearch={(value) => {
                setSearch(value);
                setPage(1);
              }}
              status={status}
              setStatus={(value) => {
                setStatus(value);
                setPage(1);
              }}
              priority={priority}
              setPriority={(value) => {
                setPriority(value);
                setPage(1);
              }}
              sort={sort}
              setSort={(value) => {
                setSort(value);
                setPage(1);
              }}
            />

            <TaskList
              tasks={tasks}
              loading={loading}
              error={error}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onCreateTask={handleNewTask}
            />

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              totalTasks={pagination.totalTasks}
              onPageChange={setPage}
            />
          </>
        )}

        {/* =========================
            ANALYTICS TAB
        ========================== */}

        {activeTab === "analytics" && (
          <Analytics tasks={allTasks} />
        )}

      </main>
      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

    </div>
  );
}

export default Dashboard;