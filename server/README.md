

## **Summary of All Routes**

| **HTTP Method** | **Endpoint**                             | **Description**                                                         | **Authentication-Protected** | **Authorization**   |
|-----------------|------------------------------------------|-------------------------------------------------------------------------|------------------------------|----------------------|
| **POST**        | `/api/v1/auth/register`                  | Register a new user (Employee or Manager).                             | No                           | None                 |
| **POST**        | `/api/v1/auth/login`                     | Authenticate user and provide JWT token.                               | No                           | None                 |
| **POST**        | `/api/v1/users/`                          | Create a new user (Employee or Manager).                               | Yes                          | Manager              |
| **GET**         | `/api/v1/users/`                          | Retrieve all users, accessible to Managers.                            | Yes                          | Manager              |
| **POST**        | `/api/v1/timesheets/clockin`             | Clock in an Employee or Manager, creating a new timesheet entry.       | Yes                          | User + Manager       |
| **PUT**         | `/api/v1/timesheets/clockout`            | Clock out an Employee or Manager, updating the active timesheet.       | Yes                          | User + Manager       |
| **GET**         | `/api/v1/timesheets/status`              | Get the clock-in status of the authenticated user.                     | Yes                          | User + Manager       |
| **GET**         | `/api/v1/timesheets/manager/pending`     | Get all pending timesheets for a Manager with pagination.              | Yes                          | Manager              |
| **GET**         | `/api/v1/timesheets/manager/reports`     | Get all timesheets (pending, approved, rejected) for a Manager with pagination. | Yes                    | Manager              |
| **PUT**         | `/api/v1/timesheets/:timesheetId/status` | Approve or reject a specific timesheet by its ID.                      | Yes                          | Manager              |

---

## **Additional Notes**

1. **Middleware Applied to Routes:**
   - **`authenticateJWT`**: Ensures that the user is authenticated via JWT for protected routes.
   - **`authorizeRoles`**: Restricts access based on user roles (e.g., `MANAGER`).

2. **Role Definitions (`Roles`):**
   - **`EMPLOYEE`**: Regular employee role with permissions to clock in/out and view their own timesheets.
   - **`MANAGER`**: Manager role with additional permissions to approve/reject timesheets and view reports.

3. **Data Models:**
   - **User Model (`user.model.ts`)**: Represents users with fields like `firstName`, `lastName`, `email`, `password`, `role`, and optional `manager`.
   - **Timesheet Model (`timesheet.model.ts`)**: Represents timesheet entries with fields like `employee`, `manager`, `startTime`, `endTime`, `reportText`, `status`, and `isActive`.
   - **Archive Timesheet Model (`archive-timesheet.model.ts`)**: Represents archived timesheets for historical records.

4. **Data Access Layer (DAL):**
   - **User DAL (`user.dal.ts`)**: Handles database interactions related to users.
   - **Timesheet DAL (`timesheet.dal.ts`)**: Manages database operations for timesheets.
   - **Archive Timesheet DAL (`archive-timesheet.dal.ts`)**: Manages archiving of timesheets.

5. **Error Handling:**
   - **`ApiError`**: Custom error class used to handle and propagate errors consistently across the application.
   - **Error Middleware (`error.middleware.ts`)**: Catches and formats errors before sending responses to the client.

6. **Environment Variables:**
   - **`MONGO_URI`**: MongoDB connection string.
   - **`JWT_SECRET`**: Secret key for signing JWT tokens.
   - **`PORT`**: Port number on which the server runs (defaults to `3000` if not specified).

