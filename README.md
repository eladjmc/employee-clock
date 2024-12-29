[![Typing SVG](https://readme-typing-svg.demolab.com?font=Roboto&weight=900&size=40&duration=3000&pause=2000&color=A849FF&center=true&width=1000&height=90&lines=Time+Clock+Management+System;MERN+Stack+App)](https://github.com/eladjmc/employee-clock)
## **Project Overview**


The **Time Clock Management System** is a full-stack application that enables:
- **Employees/Managers** to clock in/out and track their work hours.
- **Managers** to approve/reject timesheets and view reports.
- **Cold Collection Storage**: Older records are archived in a cold collection for historical purposes, with reports available for up to **90 days**.
- **Secure authentication** and role-based access control using **JWT**.


The system is designed with modularity, scalability, and best practices in mind, utilizing **Docker** for containerization and **TypeScript** for type safety.

---

<br>

## [Demo application link](https://clock-mdclone.netlify.app/)

**Note**: Might wait 30 seconds after the first request - The backend docker is sleeping if inactive for over 10 minutes

<br>

---

## **Architecture**

The project is composed of:
1. **Backend**: An **Express.js** server with **MongoDB** as the database.
2. **Frontend**: A **Vite-based React** application for the user interface.
3. **Database**: A **MongoDB** instance managed using Docker.

<br>

![plot](./readme_images/ClockAppDiagram.jpg)

<br>

---

## **Prerequisites**

To run this project locally, you’ll need:
- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**
- **Git**
- **ENV configured**.
- **Cup of coffee** X 1 ☕

---

## **Example `.env` File**

Create a `.env` file in the root directory with the following structure:

```env
# Server
PORT=3000
NODE_ENV=dev
MONGO_URI=mongodb://root:example@mongo:27017/sandayemployee?authSource=admin
JWT_SECRET=superwierdsecret

# Frontend
VITE_API_BASE_URL=http://localhost:3000/api/v1

# MongoDB
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
```

---

## **Commands to Run the Project**

### **Step 1: Clone the Repository**
```bash
git clone <repository_url>
cd <repository_name>
```

### **Step 2: Start the Project with Docker Compose**
To build and run all services:
```bash
docker-compose up --build
```

To stop the services:
```bash
docker-compose down
```

---

## **Folder Structure Overview**

### **Backend**
The backend is an **Express.js** server written in **TypeScript**. It handles authentication, timesheet management, and role-based access.

- **`/config`**: Contains database connection settings and other configuration files.
- **`/constants`**: Stores constants like roles, timesheet statuses, and general utilities.
- **`/controllers`**: Defines route handlers for authentication, timesheets, and users.
- **`/dal`**: Data Access Layer, managing all database interactions using **Mongoose**.
- **`/dto`**: Data Transfer Objects for validating and structuring incoming requests.
- **`/errors`**: Custom error classes and centralized error handling utilities.
- **`/middleware`**: Middleware for authentication, authorization, and error handling.
- **`/models`**: Defines **Mongoose schemas** for Users, Timesheets, and Archived Timesheets.
- **`/routes`**: Maps API endpoints to their respective controllers.
- **`/services`**: Implements business logic for authentication and timesheet operations.
- **`/tests`**: Unit and integration tests to ensure code quality and reliability.

---

### **Frontend**
The frontend is built using **React.js** with **Vite** for development and bundling.

- **`/public`**: Contains static assets like icons, favicons, and the `_redirects` file for SPA routing.
- **`/src`**: Main source directory containing:
  - **`components`**: Modular and reusable React components.
  - **`pages`**: Page-level components like `Dashboard`, `Login`, and `Register`.
  - **`hooks`**: Custom React hooks for form handling, API calls, etc.
  - **`services`**: API service files for interacting with the backend.
  - **`dto`**: Data Transfer Objects for structuring requests/responses.
  - **`utils`**: Helper functions for data transformation and formatting.
  - **`router`**: React Router configuration for navigation.
  - **`context`**: Context providers for managing global state like authentication.

---

## **Features**

### **Backend**
1. **Authentication**:
   - User registration and login with JWT-based authentication.
2. **Role-Based Access**:
   - Permissions for `EMPLOYEE` and `MANAGER` roles.
3. **Timesheet Management**:
   - Clock in/out, manage timesheets, and approve/reject operations.
4. **Database Persistence**:
   - Persistent data storage using **MongoDB**.

### **Frontend**
1. **User-Friendly Interface**:
   - Clean and responsive UI for employees and managers.
2. **Role-Specific Features**:
   - Employees can clock in/out.
   - Managers can view, approve, or reject timesheets.

---

## **Sample API Documentation**

### **Authentication Routes**
| Method | Endpoint           | Description                   |
|--------|--------------------|-------------------------------|
| POST   | `/api/v1/auth/register` | Register a new user.         |
| POST   | `/api/v1/auth/login`    | Log in an existing user.     |

### **Timesheet Routes**
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| POST   | `/api/v1/timesheets/clockin`      | Clock in the authenticated user.     |
| PUT    | `/api/v1/timesheets/clockout`     | Clock out the authenticated user.    |
| GET    | `/api/v1/timesheets/status`       | Get clock-in status for a user.      |
| GET    | `/api/v1/timesheets/manager/pending` | View pending timesheets (Manager).  |

---

## **Screenshots**

<br>

![plot](./readme_images/screenshot1.png)

<br>

![plot](./readme_images/screenshot2.png)

<br>

![plot](./readme_images/screenshot3.png)

<br>

![plot](./readme_images/screenshot4.png)

<br>

![plot](./readme_images/screenshot5.png)

<br>

![plot](./readme_images/screenshot6.png)

<br>

## **Conclusion**
This project provides a scalable and modular solution for managing employee timesheets, leveraging modern technologies like **React**, **Express.js**, and **MongoDB**. Its containerized architecture ensures easy deployment and extensibility.

---

## **Contact**

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest new features or improvements.


## Feel free to contact me:
[![Linkedin Badge](https://img.shields.io/badge/-Elad%20Harel-blue?style=flat-square&logo=Linkedin&logoColor=white&link&=https://www.linkedin.com/in/elad-harel-06ab61183/)](https://www.linkedin.com/in/elad-harel-06ab61183/)
[![Gmail Badge](https://img.shields.io/badge/-Eladjmc88@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:Eladjmc88@gmail.com)](mailto:benben95939@gmail.com)
