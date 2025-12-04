# Backend (Express + MongoDB)

This folder contains the Express backend for the Fitness-Space demo. It handles user signup/login with bcrypt and JWT, and exposes a protected route for demonstration.

## Setup

1. Install dependencies

```powershell
cd backend
npm install
```

2. Environment

Create a `.env` file in `backend/` with the following values:

```
MONGO_URI=<your mongodb connection string>
JWT_SECRET=<a strong secret used to sign JWTs>
PORT=5000
```

3. Run the server

```powershell
# development with nodemon (auto-reload)
npm run dev

# or run directly
npm start
```

The server exposes:
- `POST /api/auth/signup` — create user, returns `{ token, user }`
- `POST /api/auth/login` — login, returns `{ token, user }`
- `GET /api/protected` — example protected route (requires `Authorization: Bearer <token>`)

## Important
- The app will exit on startup if `MONGO_URI` or `JWT_SECRET` is not provided — set them in `.env`.
- Keep `JWT_SECRET` safe; do not commit real secrets to source control.

## Troubleshooting
- If you see `Error: Cannot find module 'dotenv'`, run `npm install` in the `backend` folder.
- If Mongo connection fails, verify `MONGO_URI` and your network access to the DB.
