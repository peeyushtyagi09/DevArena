# DevArena

Authentication-first backend service built with Express, MongoDB (Mongoose), RabbitMQ, Redis, Joi, and JWT utilities.

## Overview

This repository currently contains a backend app under `backend/`. The server initializes environment config, connects to MongoDB and RabbitMQ, and starts HTTP on `PORT`.

Current HTTP surface is minimal (`GET /` plus a route-not-found fallback), but the project already includes core auth/session models, validation, token helpers, and shared error/response utilities.

## Current capabilities

- Express app with `helmet`, `cors`, JSON parsing, and `morgan` logging
- MongoDB connection via Mongoose
- RabbitMQ channel bootstrap (`connectRabbitMQ`, `getChannel`)
- Redis client setup (currently only disconnected on shutdown)
- Auth validation middleware for register/login requests
- JWT helpers for access/refresh token generation and verification
- Reusable API response helper and custom error classes
- Mongoose models for user lifecycle, sessions, verification tokens, and outbox events

## Data models

All models are in `backend/models/`.

- `User.model.js`
  - Fields: `username`, `email` (unique), `password` (hashed with `bcryptjs`), `status`, `role`, `lastLoginAt`
  - Includes `comparePassword()` and `toJSON()` password stripping
- `Session.model.js`
  - Tracks `userId`, `refreshToken` (not selected by default), device/IP metadata, and expiry
- `Verification.Token.model.js`
  - Stores verification token and expiry with a TTL index on `expiredAt`
- `OutboxEvent.model.js`
  - Stores event payload/status/retry metadata for an outbox publishing pattern

## Project structure

```text
DevArena/
├── .gitignore
├── Readme.md
└── backend/
    ├── .env
    ├── index.js
    ├── package.json
    ├── example.env.js
    ├── config/
    │   ├── rabbitmq.js
    │   └── redis.js
    ├── controllers/
    │   └── auth.controller.js
    ├── database/
    │   └── db.js
    ├── middlewares/
    │   └── error.middleware.js
    ├── models/
    │   ├── User.model.js
    │   ├── Session.model.js
    │   ├── Verification.Token.model.js
    │   └── OutboxEvent.model.js
    ├── utils/
    │   ├── apiResponse.js
    │   ├── error.js
    │   └── jwt.js
    └── validation/
        └── auth.validation.js
```

## Dependencies

From `backend/package.json`:

- `express`
- `mongoose`
- `amqplib`
- `ioredis`
- `joi`
- `jsonwebtoken`
- `bcryptjs`
- `dotenv`
- `helmet`
- `cors`
- `morgan`

## Environment variables

`backend/example.env.js` currently enforces:

- `PORT`
- `MONGODB_URI`

The app also reads these optional/runtime variables:

- `mongoDb_uri` (currently used by `db.js` to actually connect to MongoDB)
- `salt_value`
- `JWT_ACCESS_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_SECRET`
- `JWT_REHRESH_EXPIRES_IN` (note the current key spelling in code)

### Recommended `.env` template

Create `backend/.env`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/devarena
mongoDb_uri=mongodb://127.0.0.1:27017/devarena
salt_value=12
JWT_ACCESS_SECRET=replace_with_access_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=replace_with_refresh_secret
JWT_REHRESH_EXPIRES_IN=7d
```

Never commit real secrets to git.

## Prerequisites

- Node.js 18+
- MongoDB instance
- RabbitMQ available at `amqp://127.0.0.1:5672` (currently hardcoded)
- Redis available at `127.0.0.1:6379` (currently hardcoded)

## Setup and run

```bash
cd backend
npm install
node index.js
```

`package.json` currently has dependencies only and no `scripts`, so run with `node index.js`.

## Runtime behavior

Startup sequence in `backend/index.js`:

1. Load env through `example.env.js`
2. Connect to MongoDB
3. Connect to RabbitMQ
4. Start HTTP server

On `SIGINT`, the app attempts to close:

- HTTP server
- Mongoose connection
- Redis client

## API (current)

### `GET /`

```json
{
  "success": true,
  "message": "Api is running"
}
```

### Fallback for unknown routes

Returns `400`:

```json
{
  "success": false,
  "message": "Route not found"
}
```

## Known issues / in-progress areas

- `controllers/auth.controller.js` is incomplete.
- `controllers/auth.controller.js` imports `../models/User`, while actual file is `User.model.js`.
- `middlewares/error.middleware.js` imports `../utils/errors`, while current utility file is `utils/error.js`.
- `index.js` mounts `errorMiddleware` before routes; for Express error handlers this usually comes after routes/controllers.
- Redis client is configured but no explicit `connect()` call is made at startup.
- Mongo env naming is inconsistent (`MONGODB_URI` vs `mongoDb_uri`).
