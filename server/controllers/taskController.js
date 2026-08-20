const Task = require("../models/Task");

// ===========================
// CREATE TASK
// ===========================

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    // Validation
    if (!title || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Title and due date are required"
      });
    }

    // Create Task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===========================
// GET ALL TASKS
// SEARCH + FILTER + SORT + PAGINATION
// ===========================

const getTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      search,
      sort = "newest",
      page = 1,
      limit = 5,
    } = req.query;

    // Base query
    const query = {
      user: req.user._id,
    };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Pagination
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    let tasks;

    // ===========================
    // PRIORITY SORT
    // High → Medium → Low
    // ===========================

    if (sort === "priority") {
      tasks = await Task.aggregate([
        {
          $match: query,
        },

        {
          $addFields: {
            priorityOrder: {
              $switch: {
                branches: [
                  {
                    case: {
                      $eq: ["$priority", "high"],
                    },
                    then: 1,
                  },
                  {
                    case: {
                      $eq: ["$priority", "medium"],
                    },
                    then: 2,
                  },
                  {
                    case: {
                      $eq: ["$priority", "low"],
                    },
                    then: 3,
                  },
                ],
                default: 4,
              },
            },
          },
        },

        {
          $sort: {
            priorityOrder: 1,
          },
        },

        {
          $skip: skip,
        },

        {
          $limit: limitNumber,
        },
      ]);
    } else {
      // ===========================
      // NORMAL SORTING
      // ===========================

      let sortOption = {};

      if (sort === "newest") {
        sortOption = {
          createdAt: -1,
        };
      }

      if (sort === "oldest") {
        sortOption = {
          createdAt: 1,
        };
      }

      if (sort === "dueDate") {
        sortOption = {
          dueDate: 1,
        };
      }

      tasks = await Task.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber);
    }

    // Total tasks
    const totalTasks = await Task.countDocuments(query);

    // Total pages
    const totalPages = Math.ceil(
      totalTasks / limitNumber
    );

    return res.status(200).json({
      success: true,
      page: pageNumber,
      totalPages,
      totalTasks,
      count: tasks.length,
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================
// GET SINGLE TASK
// ===========================

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===========================
// UPDATE TASK
// ===========================

const updateTask = async (req, res) => {
  try {
    // Find task and make sure it belongs to logged-in user
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    // Update fields
    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===========================
// DELETE TASK
// ===========================

const deleteTask = async (req, res) => {
  try {
    // Find task and make sure it belongs to logged-in user
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    // Delete task
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};