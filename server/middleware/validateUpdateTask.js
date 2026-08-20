const validateUpdateTask = (req, res, next) => {
  const {
    title,
    status,
    priority,
    dueDate
  } = req.body;

  // Title
  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title cannot be empty"
    });
  }

  // Status
  const validStatus = [
    "todo",
    "in-progress",
    "done"
  ];

  if (status && !validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status"
    });
  }

  // Priority
  const validPriority = [
    "low",
    "medium",
    "high"
  ];

  if (priority && !validPriority.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority"
    });
  }

  // Due Date
  if (dueDate !== undefined) {
    const date = new Date(dueDate);

    if (isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid due date"
      });
    }
  }

  next();
};

module.exports = validateUpdateTask;