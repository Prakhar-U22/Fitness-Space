# Fitness-Space

Simple MERN demo app (frontend built with Vite/React, backend with Express + MongoDB) demonstrating JWT authentication and a small patient dashboard.

## Repository structure

- `backend/` - Express API, MongoDB models, auth routes (signup/login) and middleware.
- `src/` - React frontend (Vite).
- `public/`, `index.html`, `vite.config.js` - frontend assets and config

## Quick start (developer)

Prerequisites:
- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

1. Install dependencies

```powershell
# frontend (project root)
npm install

# backend
cd backend
npm install
cd ..
```

2. Configure environment

- Create `backend/.env` (or set environment variables) with:

```
MONGO_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your-very-secret-key
PORT=5000
```

3. Start backend and frontend

```powershell
# Start backend (in one terminal)
cd backend
npm run dev

# Start frontend (in another terminal, project root)
npm run dev
```

Frontend will open at `http://localhost:5173` (Vite). Backend API runs on port configured in `backend/.env` (default `5000`).

## Notes
- The frontend expects the backend base URL at `http://localhost:5000` unless you set `REACT_APP_API_BASE` in your frontend env.
- After signing up or logging in the server returns a JWT token which the frontend stores in `localStorage` and uses to call the protected route.

If you want, I can also add a `frontend/README.md`, CI workflows, or a Docker setup.
# Fitness-Space