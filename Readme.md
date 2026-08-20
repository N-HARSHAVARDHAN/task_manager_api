# Task Manager API

A backend REST API for managing personal tasks.

The API supports user registration and login, JWT authentication, task CRUD operations, validation, filtering, sorting, pagination, PostgreSQL database storage, Sequelize migrations, and Swagger API documentation.

---

## 1. Features

* User registration
* User login
* Password hashing using bcrypt
* JWT-based authentication
* Protected task APIs
* Create, read, update, and delete tasks
* Task ownership — users can only access their own tasks
* Task validation
* Filter tasks by:

  * Priority
  * Status
  * Due date range
* Sort tasks by:

  * Due date
  * Priority
* Pagination
* Unique username and email
* Global error handling
* PostgreSQL database
* Sequelize ORM
* Sequelize migrations
* Swagger/OpenAPI documentation
* API testing through Swagger UI or Postman

---

## 2. Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* Sequelize CLI
* bcrypt
* JSON Web Token (JWT)
* dotenv
* Swagger / OpenAPI
* Nodemon

---

## 3. Project Structure

```text
task-manager-api/
│
├── config/
│   ├── database.js
│   ├── swagger.js
│   └── config.js
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── authValidation.js
│   ├── taskValidation.js
│   └── errorMiddleware.js
│
├── migrations/
│   ├── create-users.js
│   └── create-tasks.js
│
├── models/
│   ├── index.js
│   ├── user.js
│   └── task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── package-lock.json
```

---

## 4. Prerequisites

Make sure the following are installed:

```bash
node --version
npm --version
psql --version
```

The project uses PostgreSQL as the database.

---

## 5. Create the Node.js Project

Create a project folder:

```bash
mkdir task-manager-api

cd task-manager-api
```

Initialize Node.js:

```bash
npm init -y
```

---

## 6. Install Dependencies

Install the main dependencies:

```bash
npm install express sequelize pg dotenv bcrypt jsonwebtoken
```

Install development dependencies:

```bash
npm install --save-dev nodemon sequelize-cli
```

Install Swagger dependencies:

```bash
npm install swagger-jsdoc swagger-ui-express
```

---

## 7. Package Scripts

The `package.json` contains these scripts:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

Run the application normally:

```bash
npm start
```

Run the application during development:

```bash
npm run dev
```

`nodemon` automatically restarts the server whenever files are changed.

---

## 8. PostgreSQL Setup

Check PostgreSQL:

```bash
psql --version
```

Connect to PostgreSQL:

```bash
sudo -u postgres psql
```

Create the database:

```sql
CREATE DATABASE task_manager;
```

Create a database user:

```sql
CREATE USER task_manager_user WITH PASSWORD 'your_password';
```

Grant access:

```sql
GRANT ALL PRIVILEGES ON DATABASE task_manager TO task_manager_user;
```

Connect to the database:

```bash
psql -U task_manager_user -d task_manager
```

---

## 9. Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=task_manager_user
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret
```

The `.env` file contains configuration that should not be hard-coded into the application.

Do not commit `.env` to Git.

Add it to `.gitignore`:

```text
.env
node_modules/
```

---

## 10. Sequelize Initialization

Initialize Sequelize:

```bash
npx sequelize-cli init
```

This creates the Sequelize folders such as:

```text
config/
models/
migrations/
seeders/
```

The project uses a custom `config/database.js` file for the Sequelize connection.

The connection uses the following environment variables:

```text
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
```

These values are loaded from `.env`.

---

## 11. Create Migrations

Generate the users migration:

```bash
npx sequelize-cli migration:generate --name create-users
```

Generate the tasks migration:

```bash
npx sequelize-cli migration:generate --name create-tasks
```

Migrations define the actual database table structure.

The `users` table contains:

```text
id
username
email
password
createdAt
updatedAt
```

The `tasks` table contains:

```text
id
title
description
priority
dueDate
status
userId
createdAt
updatedAt
```

The `userId` column references the `users` table.

---

## 12. Run Migrations

Run all pending migrations:

```bash
npx sequelize-cli db:migrate
```

Check migration status:

```bash
npx sequelize-cli db:migrate:status
```

Undo the most recent migration:

```bash
npx sequelize-cli db:migrate:undo
```

Run migrations again if required:

```bash
npx sequelize-cli db:migrate
```

---

## 13. Start the Server

Development:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The default server URL is:

```text
http://localhost:5000
```

Test the root endpoint:

```text
GET http://localhost:5000/
```

Expected response:

```json
{
  "message": "Task Manager API is running"
}
```

---

## 14. Authentication

Authentication uses JWT.

### Register

```text
POST /auth/register
```

Request body:

```json
{
  "username": "harsha",
  "email": "harsha@example.com",
  "password": "password123"
}
```

The password is hashed using bcrypt before being stored.

The password itself is never stored as plain text.

---

### Login

```text
POST /auth/login
```

Request body:

```json
{
  "email": "harsha@example.com",
  "password": "password123"
}
```

Successful login returns a JWT:

```json
{
  "message": "login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "username": "harsha",
    "email": "harsha@example.com"
  }
}
```

---

## 15. Task APIs

### Create Task

```text
POST /tasks
```

Requires authentication.

Request body:

```json
{
  "title": "Complete backend project",
  "description": "Finish API documentation",
  "priority": "high",
  "dueDate": "2026-08-25",
  "status": "pending"
}
```

---

### Get Tasks

```text
GET /tasks
```

Requires authentication.

Returns tasks belonging to the authenticated user.

---

### Get One Task

```text
GET /tasks/:id
```

Example:

```text
GET /tasks/1
```

---

### Update Task

```text
PUT /tasks/:id
```

Example:

```text
PUT /tasks/1
```

Request body:

```json
{
  "title": "Updated task",
  "description": "Updated description",
  "priority": "medium",
  "dueDate": "2026-08-30",
  "status": "completed"
}
```

---

### Delete Task

```text
DELETE /tasks/:id
```

Example:

```text
DELETE /tasks/1
```

---

## 16. Filtering

Tasks can be filtered using query parameters.

### Filter by Priority

```text
GET /tasks?priority=high
```

Allowed values:

```text
low
medium
high
```

---

### Filter by Status

```text
GET /tasks?status=pending
```

Allowed values:

```text
pending
completed
```

---

### Filter by Due Date

From a date:

```text
GET /tasks?dueDateFrom=2026-08-01
```

Until a date:

```text
GET /tasks?dueDateTo=2026-08-31
```

Both:

```text
GET /tasks?dueDateFrom=2026-08-01&dueDateTo=2026-08-31
```

---

## 17. Sorting

Sort by due date:

```text
GET /tasks?sortBy=dueDate
```

Descending:

```text
GET /tasks?sortBy=dueDate&order=DESC
```

Sort by priority:

```text
GET /tasks?sortBy=priority&order=ASC
```

Allowed sorting fields:

```text
dueDate
priority
```

Allowed order values:

```text
ASC
DESC
```

---

## 18. Pagination

Pagination is supported using:

```text
page
limit
```

Example:

```text
GET /tasks?page=1&limit=10
```

Second page:

```text
GET /tasks?page=2&limit=10
```

The API calculates the database offset using:

```text
offset = (page - 1) * limit
```

For example:

```text
page = 2
limit = 10

offset = (2 - 1) * 10
       = 10
```

So the second page starts after the first 10 records.

The maximum allowed `limit` is 100.

Example response:

```json
{
  "tasks": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalTasks": 25,
    "totalPages": 3
  }
}
```

---

## 19. Validation

Input validation is performed before the controller is executed.

For example, task validation checks the task input before allowing the request to reach:

```text
createTask
```

or:

```text
updateTask
```

Invalid client input returns a `400` response:

```text
400 Bad Request
```

Authentication errors return:

```text
401 Unauthorized
```

A task that does not exist returns:

```text
404 Not Found
```

Unexpected server/database errors are passed to the global error handler.

---

## 20. Global Error Handling

Controllers use:

```js
next(error);
```

when an unexpected error occurs.

The request then moves through Express middleware to the global error handler.

The global handler provides a consistent error response instead of writing separate server-error responses in every controller.

---

## 21. Swagger API Documentation

Swagger/OpenAPI is used to document and test the API.

Install:

```bash
npm install swagger-jsdoc swagger-ui-express
```

Swagger documentation is available at:

```text
http://localhost:5000/api-docs
```

The Swagger documentation includes:

```text
Authentication

POST /auth/register
POST /auth/login

Tasks

POST /tasks
GET /tasks
GET /tasks/{id}
PUT /tasks/{id}
DELETE /tasks/{id}
```

---

## 22. Testing Swagger

Start the server:

```bash
npm run dev
```

Open:

```text
http://localhost:5000/api-docs
```

First use:

```text
POST /auth/register
```

Then:

```text
POST /auth/login
```

Copy the JWT returned from login.

Click:

```text
Authorize
```

Enter the JWT.

Swagger will then send the token with protected task requests.

Protected requests use:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 23. Testing With Postman

The API can also be tested using Postman.

Basic testing flow:

```text
1. Register user
2. Login user
3. Copy JWT token
4. Add Bearer token to authorization
5. Create task
6. Get tasks
7. Filter tasks
8. Sort tasks
9. Test pagination
10. Get individual task
11. Update task
12. Delete task
```

For protected requests, use:

```text
Authorization → Bearer Token
```

and paste the JWT returned from login.

---

## 24. Useful Sequelize Commands

Initialize Sequelize:

```bash
npx sequelize-cli init
```

Create migration:

```bash
npx sequelize-cli migration:generate --name create-users
```

Create another migration:

```bash
npx sequelize-cli migration:generate --name create-tasks
```

Run migrations:

```bash
npx sequelize-cli db:migrate
```

Check migration status:

```bash
npx sequelize-cli db:migrate:status
```

Undo latest migration:

```bash
npx sequelize-cli db:migrate:undo
```

---

## 25. API Summary

| Method | Endpoint         | Authentication | Purpose          |
| ------ | ---------------- | -------------- | ---------------- |
| POST   | `/auth/register` | No             | Register user    |
| POST   | `/auth/login`    | No             | Login user       |
| POST   | `/tasks`         | JWT            | Create task      |
| GET    | `/tasks`         | JWT            | Get user's tasks |
| GET    | `/tasks/:id`     | JWT            | Get one task     |
| PUT    | `/tasks/:id`     | JWT            | Update task      |
| DELETE | `/tasks/:id`     | JWT            | Delete task      |

---

## 26. Running the Project From Scratch

After cloning the project:

```bash
git clone <repository-url>

cd task-manager-api
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=task_manager_user
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret
```

Make sure PostgreSQL is running.

Run migrations:

```bash
npx sequelize-cli db:migrate
```

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

Swagger documentation:

```text
http://localhost:5000/api-docs
```

---

## 27. API Request Flow

The overall flow of a protected task request is:

```text
Client
  ↓
Route
  ↓
JWT Authentication Middleware
  ↓
Task Validation Middleware
  ↓
Task Controller
  ↓
Sequelize ORM
  ↓
PostgreSQL
  ↓
Response
```

For an unexpected error:

```text
Controller
  ↓
next(error)
  ↓
Global Error Middleware
  ↓
Error Response
```

---
