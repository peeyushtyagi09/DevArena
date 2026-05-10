// src/utils/apiResponse.js

class ApiResponse {
    constructor(success, message, data = null, errors = null) {
      this.success = success;
      this.message = message;
      this.data = data;
      this.errors = errors;
    }
  }
  
  // Success Response
  const successResponse = (
    res,
    message = "Success",
    data = null,
    statusCode = 200
  ) => {
    return res.status(statusCode).json(
      new ApiResponse(true, message, data)
    );
  };
  
  // Error Response
  const errorResponse = (
    res,
    message = "Something went wrong",
    errors = null,
    statusCode = 500
  ) => {
    return res.status(statusCode).json(
      new ApiResponse(false, message, null, errors)
    );
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };