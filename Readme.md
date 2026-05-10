# DevArena

Backend API service focused on authentication workflows, using Express, MongoDB (Mongoose), RabbitMQ, and Redis.

## What’s in the repo

The app lives under `backend/`. On startup it connects to MongoDB and RabbitMQ, then serves HTTP on `PORT`. Only the root route is registered today; validation helpers and Mongoose models are in place for upcoming auth, sessions, email verification, and outbox messaging.

### Features

- **HTTP**: Express 5 with JSON parsing, `helmet`, `cors`, and `morgan` logging.
- **MongoDB**: Mongoose connection via `database/db.js`.
- **Data models** (`backend/models/`):
  - **User** — username, email, hashed password (`bcryptjs`), `status` (`UNVERIFIED` | `ACTIVE`), `role` (`USER` | `ADMIN`), `lastLoginAt`.
  - **Session** — refresh token (hidden by default in queries), device/IP metadata, optional expiry, tied to `User`.
  - **VerificationToken** — one-time tokens for verification flows; TTL index on `expiredAt`.
  - **OutboxEvent** — transactional outbox–style records (`PENDING` → `PUBLISHED` / `FAILED`) for reliable messaging with RabbitMQ.
- **Messaging**: RabbitMQ bootstrap in `config/rabbitmq.js` (`connectRabbitMQ`, `getChannel`).
- **Redis**: Client factory in `config/redis.js` (localhost `127.0.0.1:6379`); imported on shutdown in `index.js`.
- **Validation**: Joi schemas and middleware for register/login in `validation/auth.validation.js`.

### Planned / incomplete

- `controllers/auth.controller.js` is a stub and imports `../models/User`; models are named `*.model.js` (e.g. `User.model.js`), so the controller needs to be finished and wired before auth works.
- No `routes/` module yet — auth endpoints are not mounted in `index.js`.

## Tech stack

| Area        | Packages / notes                          |
|------------|---------------------------------------------|
| Runtime    | Node.js (18+ recommended)                   |
| HTTP       | Express 5                                   |
| Database   | MongoDB + Mongoose 9                        |
| Messaging  | RabbitMQ (`amqplib`)                        |
| Cache      | Redis (`ioredis`)                           |
| Validation | Joi                                         |
| Passwords  | bcryptjs                                    |
| Config     | dotenv (`backend/example.env.js`)           |

## Project structure

```text
DevArena/
├── Readme.md
├── .gitignore
└── backend/
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
    ├── models/
    │   ├── User.model.js
    │   ├── Session.model.js
    │   ├── Verification.Token.model.js
    │   └── OutboxEvent.model.js
    └── validation/
        └── auth.validation.js
```

## Prerequisites

- Node.js 18 or newer
- MongoDB reachable from the machine running the app
- RabbitMQ at `amqp://127.0.0.1:5672` (hardcoded in `config/rabbitmq.js`)
- Redis at `127.0.0.1:6379` (hardcoded in `config/redis.js`)

## Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create `backend/.env`. `example.env.js` loads dotenv and **requires** `PORT` and `MONGODB_URI`, but **`database/db.js` connects using `mongoDb_uri`**. Until that is unified in code, set all three consistently:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/devarena
   mongoDb_uri=mongodb://127.0.0.1:27017/devarena
   ```

## Run

From `backend/`:

```bash
node index.js
```

`package.json` does not define `start` / `dev` scripts; use `node index.js` unless you add scripts locally.

Startup sequence:

1. Load env (throws if `PORT` or `MONGODB_URI` is missing).
2. Connect to MongoDB (`mongoDb_uri`).
3. Connect to RabbitMQ.
4. Listen on `PORT`.

On `SIGINT`, the process closes the HTTP server, MongoDB connection, and Redis client.

## API

### `GET /`

Health-style response:

```json
{
  "success": true,
  "message": "Api is running"
}
```

Any other path currently returns `400` with `{ "success": false, "message": "Route not found" }`.

## Next steps (for contributors)

- Complete `auth.controller.js`, fix the User model import path, and register routes with `validateRegister` / `validateLogin`.
- Optionally align Mongo configuration so a single env var (for example `MONGODB_URI`) drives both validation and `mongoose.connect`.
- Optionally move RabbitMQ and Redis connection URLs into `.env` for non-local deployments.
