const validateTask = (req, res, next) => {
  const {
    title,
    status,
    priority,
    dueDate
  } = req.body;

  // Title
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required"
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
  if (!dueDate) {
    return res.status(400).json({
      success: false,
      message: "Due date is required"
    });
  }

  const date = new Date(dueDate);

  if (isNaN(date.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid due date"
    });
  }

  next();
};

module.exports = validateTask;