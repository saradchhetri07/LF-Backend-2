# TODO CRUD API

A simple Express-based CRUD API for managing TODO items with user authentication and role-based access control.

## Features

- Create, Read, Update, and Delete TODO items
- Create, Read, Update, and Delete Users (restricted to super admin)
- RESTful API endpoints
- JSON data format
- Role-based access control (Super Admin and User roles)
- Error handling and appropriate HTTP status codes
- Logging for all routes using Winston

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saradchhetri07/LF-Backend-2.git
   
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   
# API Endpoints

## Authentication
### POST /auth/signUp: Sign up a new user

Request Body:
   ```json
   {
     "name": "string",
     "email": "string",
     "password": "string",
     "role": "string", // "user" or "superUser"
     "permissions": ["string"]
   }
   ```
GET /auth/login: User login

Request Body:
   ```json
   {
     "email": "string",
     "password": "string"
   }
   ```
POST /auth/refresh: Refresh user token

Request Body:
   ```json
   {
     "refreshToken": "string"
   }
   ```
## User Management (Super Admin only)
POST /users: Create a new user

Request Body:
   ```json
   {
     "name": "string",
     "email": "string",
     "password": "string",
     "role": "string", // "user" or "superUser"
     "permissions": ["string"]
   }
   ```
GET /users/:id: Retrieve a user by ID

PUT /users/:id: Update a user by ID

Request Body (partial update):
   ```json
   {
     "name": "string",
     "email": "string",
     "password": "string"
   }
```
DELETE /users/:id: Delete a user by ID

## TODO Management (Logged-in Users)
POST /todos: Create a new TODO item

Request Body:
   ```json
   {
     "title": "string",
     "completed": "boolean"
   }
   ```

GET /todos: Retrieve all TODO items of the logged-in user

GET /todos/:id: Retrieve a specific TODO item by ID

PUT /todos/:id: Update an existing TODO item by ID

Request Body (partial update):
   ```json
      {
        "title": "string",
        "completed": "boolean"
      }
   ```
      
DELETE /todos/:id: Delete a TODO item by ID

Docker

Pull the Docker image:
 ``` bash
   docker pull saradchhetri7/authenticated-todo-app:1.0.0
 ```

#Usage

Send HTTP requests to http://localhost:3000/todos using your preferred method (e.g., cURL, Postman, or fetch API).

##Features

### - default super admin user in the users array.
### - CRUD routes for users, accessible only by the super admin user.
### - Each new user should be able to perform CRUD operations on their own TODO items only.
### - Each response must have a proper HTTP status code.
### - Error handlers and appropriate errors for all cases.
### - Loggers for all routes.
