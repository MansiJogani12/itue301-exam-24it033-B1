const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(
      (item) => item.message
    );

    return res.status(400).json({
      success: false,
      errors: messages
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate value. Email already exists."
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};

module.exports = errorHandler;