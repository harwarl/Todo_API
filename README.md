
# Todo API

The Todo API is a RESTFUL API for managing a to-do list. It allows users to create, read, update and delete tasks, as well as mark tasks completed. This project was done using typescript.




## Installation
To install the Todo-API, clone this repository and run the following command:

```bash
  npm install
```

## Usage
To start the server, run the following command:

```
npm start
```

The server will be running on http://localhost:3000


## Endpoints
The Todo API exposes the following endpoints:

- `GET /todos`: Returns a list of all tasks in to-do lists.
- `GET /todos/:todoId`: Returns a specific task(task with todoId).
- `PATCH /todos/:todoId`: Updates a specific task.
- `POST /todos`: Creates a new task.
- `DELETE /todos/:todoId`: Delete a specific task
- `POST /todos/:todoId/completed`: Marks a specific task as completed
## Request and Responses
All endpoints accept and return JSON data. Here are the request and response formats for each endpoint:

GET /todos
Request

None
Responses

```json
[
  {
    "completed": false,
    "_id": "642a048916171830b1a0a6ae",
    "title": "Task 1",
    "description": "This is It",
    "createdAt": "2023-04-02T22:41:07.164Z",
    "updatedAt": "2023-04-03T00:02:21.573Z",
    "__v": 0
  }
]
```

GET /todos/:todoId
Request

None
Responses
```json
  {
    "completed": false,
    "_id": "642a048916171830b1a0a6ae",
    "title": "Task 1",
    "description": "This is It",
    "createdAt": "2023-04-02T22:41:07.164Z",
    "updatedAt": "2023-04-03T00:02:21.573Z",
    "__v": 0
  }
```

PATCH /todos/:todoId
Request
```
{
    "title" : "Get my Cards",
    "description": "I am to get my cards at the store"
}
```

Responses
```json
  {
    "completed": false,
    "_id": "642a048914531830b1a0a6ae",
    "title" : "Get my Cards",
    "description": "I am to get my cards at the store"
    "createdAt": "2023-04-02T22:41:07.164Z",
    "updatedAt": "2023-04-03T00:02:21.573Z",
    "__v": 0
  }
```

POST /todos
Request
```
{
    "title" : "add a new task",
    "description": "add a new task to the pending tasks"
}
```

Responses
```json
[
  {
    "completed": false,
    "_id": "642a048914531830b1a0a6ae",
    "title" : "add a new task",
    "description": "add a new task to the pending tasks"
    "createdAt": "2023-04-02T22:41:07.164Z",
    "updatedAt": "2023-04-03T00:02:21.573Z",
    "__v": 0
  }
]
```

DELETE /todos/:todoId
Request
None

Responses
```json
  {
    "status": true,
    "message": "Task removed"
  }
```

POST /todos/:todoId/completed
Request
None

Responses
```json
  {
    "completed": true,
    "_id": "642a048914531830b1a0a6ae",
    "title" : "add a new task",
    "description": "add a new task to the pending tasks",
    "createdAt": "2023-04-02T22:41:07.164Z",
    "updatedAt": "2023-04-03T00:02:21.573Z",
    "__v": 0
  }
```



