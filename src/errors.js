export class NotFoundError extends Error {

  code = 404;

  error = "Not Found.";

}

export class ServerError extends Error {

  code = 500;

  message = "Internal Server Error";

  error = "Server Error";

}

export class BadRequestError extends Error {

  code = 400;

  error = "Bad Request.";

}

export class ForbiddenError extends Error {

  code = 403;

  message = "Access Denied";

  error = "Forbidden.";

}