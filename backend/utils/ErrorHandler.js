class intError extends Error {
  constructor(msg, status) {
    super(msg)
    this.status = status
  }
}

function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error for debugging (optional)

  // Send an appropriate error response to the client
  res.status(err.status).json({
    error: err.message || "internal server error",
  });
}

export { intError, errorHandler };