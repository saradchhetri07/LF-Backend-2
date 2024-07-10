# TODO CRUD API

A simple Express-based CRUD API for managing TODO items.

## Features

- Create, Read, Update, and Delete TODO items
- RESTful API endpoints
- JSON data format

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saradchhetri07/LF-Backend-2.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /auth/signUp`: signUp new user
- `GET /auth/login`: user login
- `POST /users`: get all users
- `GET /todos`: Retrieve all TODO items of logged in user
- `GET /todos/:id`: Retrieve a specific TODO item
- `POST /todos`: Create a new TODO item
- `PUT /todos/:id`: Update an existing TODO item
- `DELETE /todos/:id`: Delete a TODO item

## docker pull

docker pull saradchhetri7/authenticated-todo-app:1.0.0

## Docker Image

https://hub.docker.com/repository/docker/saradchhetri7/authenticated-todo-app/general

## Usage

Send HTTP requests to `http://localhost:3000/signUp` using your preferred method (e.g., cURL, Postman, or fetch API).
