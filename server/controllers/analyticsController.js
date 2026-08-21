const Task = require("../models/Task");
// GET TASK ANALYTICS
const getAnalytics = async (req, res) => {
  try {
    // Get total tasks
    const totalTasks = await Task.countDocuments({
      user: req.user._id
    });

    // Get completed tasks
    const completedTasks = await Task.countDocuments({
      user: req.user._id,
      status: "done"
    });

    // Get in-progress tasks
    const inProgressTasks = await Task.countDocuments({
      user: req.user._id,
      status: "in-progress"
    });

    // Get todo tasks
    const todoTasks = await Task.countDocuments({
      user: req.user._id,
      status: "todo"
    });

    // Pending tasks = everything except completed
    const pendingTasks = totalTasks - completedTasks;

    // Calculate completion percentage
    const completionPercentage =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.status(200).json({
      success: true,
      totalTasks,
      completedTasks,
      pendingTasks,
      todoTasks,
      inProgressTasks,
      completionPercentage
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAnalytics
};