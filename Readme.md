# DevArena

Node.js backend service for authentication-focused APIs, backed by MongoDB and integrated with RabbitMQ and Redis.

## Current Scope

This repository currently contains a backend app under `backend/` with:

- Express server with security and logging middleware (`helmet`, `cors`, `morgan`)
- MongoDB connection via Mongoose
- RabbitMQ connection bootstrap
- Redis client configuration
- User model with password hashing (`bcrypt`)
- Joi-based validation schemas for auth payloads

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- RabbitMQ (`amqplib`)
- Redis (`ioredis`)
- Joi
- bcrypt
- dotenv

## Project Structure

```text
DevArena/
├── backend/
│   ├── config/
│   │   ├── rabbitmq.js
│   │   └── redis.js
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── database/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── auth_flow.png
│   ├── validation/
│   │   └── auth.validation.js
│   ├── example.env.js
│   ├── index.js
│   └── package.json
└── Readme.md
```

## Prerequisites

- Node.js 18+ recommended
- MongoDB running locally or reachable remotely
- RabbitMQ running on `amqp://127.0.0.1:5672`
- Redis running on `127.0.0.1:6379`

## Setup

1. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create `backend/.env` with:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/devarena
   mongoDb_uri=mongodb://127.0.0.1:27017/devarena
   ```

   Note: The current code checks `MONGODB_URI` and also reads `mongoDb_uri`, so both are needed in the current implementation.

## Run

From `backend/`:

```bash
node index.js
```

Expected startup behavior:

- Connects to MongoDB
- Connects to RabbitMQ
- Starts HTTP server on `PORT`

## Available Endpoint

### `GET /`

Health-style endpoint to verify API availability.

Example response:

```json
{
  "success": true,
  "message": "Api is running"
}
```

## Notes

- `controllers/auth.controller.js` appears incomplete in the current codebase and may require implementation before auth routes are enabled.
- `package.json` currently does not define scripts (`start`, `dev`, etc.), so use `node index.js` to run the service.