export const HTTP_STATUS = {
    // 2xx Success
    OK: 200, // Request succeeded
    CREATED: 201, // Resource created successfully
    ACCEPTED: 202, // Request accepted but not completed yet
    NO_CONTENT: 204, // Request successful but no content to send back
  
    // 3xx Redirection
    MOVED_PERMANENTLY: 301, // Resource moved permanently
    FOUND: 302, // Resource found at a different location temporarily
    NOT_MODIFIED: 304, // Resource not modified, use cached version
  
    // 4xx Client Errors
    BAD_REQUEST: 400, // Malformed request or validation error
    UNAUTHORIZED: 401, // Authentication required
    FORBIDDEN: 403, // Client authenticated but not allowed access
    NOT_FOUND: 404, // Resource not found
    METHOD_NOT_ALLOWED: 405, // HTTP method not supported
    CONFLICT: 409, // Conflict in request (e.g., duplicate resource)
    UNPROCESSABLE_ENTITY: 422, // Validation error in request
  
    // 5xx Server Errors
    INTERNAL_SERVER_ERROR: 500, // Generic server error
    NOT_IMPLEMENTED: 501, // Server does not support requested functionality
    BAD_GATEWAY: 502, // Received an invalid response from upstream server
    SERVICE_UNAVAILABLE: 503, // Server is temporarily overloaded or down
  } as const;
  
  export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];