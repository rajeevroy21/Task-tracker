const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const validateTask = require("../middleware/validateTask");

const validateUpdateTask = require(
  "../middleware/validateUpdateTask"
);

const router = express.Router();

// Create Task
router.post(
  "/",
  protect,
  validateTask,
  createTask
);

// Get All Tasks
router.get("/", protect, getTasks);

// Get Single Task
router.get("/:id", protect, getTaskById);

// Update Task
router.put(
  "/:id",
  protect,
  validateUpdateTask,
  updateTask
);

// Delete Task
router.delete(
  "/:id",
  protect,
  deleteTask
);

module.exports = router;