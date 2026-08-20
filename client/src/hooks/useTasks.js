import { useState } from "react";
import api from "../services/api";

function useTasks() {
  // =========================
  // STATE
  // =========================

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalTasks: 0,
  });

  // =========================
  // FETCH ALL TASKS
  // FOR ANALYTICS
  // =========================

  const fetchAllTasks = async () => {
    try {
      const response = await api.get("/tasks", {
        params: {
          limit: 1000,
        },
      });

      setAllTasks(response.data.tasks);

    } catch (error) {
      console.error(
        "Failed to fetch all tasks",
        error
      );
    }
  };

  // =========================
  // FETCH PAGINATED TASKS
  // =========================

  const fetchTasks = async (filters = {}) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks", {
        params: filters,
      });

      setTasks(response.data.tasks);

      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalTasks: response.data.totalTasks,
      });

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD TASK
  // =========================

  const addTask = async (taskData) => {
    const response = await api.post(
      "/tasks",
      taskData
    );

    return response.data;
  };

  // =========================
  // EDIT TASK
  // =========================

  const editTask = async (id, taskData) => {
    const response = await api.put(
      `/tasks/${id}`,
      taskData
    );

    return response.data;
  };

  // =========================
  // DELETE TASK
  // =========================

  const removeTask = async (id) => {
    const response = await api.delete(
      `/tasks/${id}`
    );

    return response.data;
  };

  // =========================
  // RETURN
  // =========================

  return {
    tasks,
    allTasks, // IMPORTANT

    loading,
    error,
    pagination,

    fetchTasks,
    fetchAllTasks,

    addTask,
    editTask,
    removeTask,
  };
}

export default useTasks;