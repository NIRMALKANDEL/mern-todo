<div align="center">

# MERN Todo

**A full-stack task manager built with MongoDB, Express, React and Node.js.**

Create, organize and track tasks with priorities, due dates, filters and search. The UI is responsive, works on desktop and mobile, and has a dark mode.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)

![MERN Todo – dark mode](docs/screenshots/dark-mode.png)

</div>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [What I Learned](#what-i-learned)
- [Author](#author)

## Overview

I built MERN Todo as my first full-stack project to learn the MERN stack end to end. The project covers:

- Designing a REST API in Express
- Modelling and validating data with Mongoose
- Building a React frontend from small reusable components and custom hooks

The app does a few things well rather than many things partially. Every action gives instant feedback, errors are handled on both the client and the server, and the layout works on any screen size.

## Features

### Task management
- **Create, edit, complete and delete** tasks, all saved in MongoDB
- **Priority levels** (High / Medium / Low), shown as color-coded badges
- **Optional due dates** with labels such as *Today*, *Tomorrow* or a date, plus a red **Overdue** warning
- **Inline editing**: double-click a task, then press `Enter` to save or `Esc` to cancel
- **Clear completed**: remove all finished tasks in one click

### Finding tasks
- **Filter tabs** (All / Active / Completed), each with a live count
- **Instant search** by title
- **Sort** by newest, due date or priority

### User experience
- **Progress dashboard** with total, active and done counts and a completion bar
- **Optimistic updates**: the UI changes immediately and rolls back if the server request fails
- **Dark / light theme** that follows your system setting and is saved between visits, without a flash of the wrong theme on load
- **Responsive layout**, from 375px phones up to desktop
- Loading skeletons, empty states, an error state with retry, and toast notifications
- Accessible controls: ARIA labels, keyboard support and visible focus states

### Backend
- RESTful API with consistent JSON responses
- Schema validation: title is required and at most 120 characters, and priority must be one of the allowed values
- Centralized error handling for invalid IDs, validation errors and unknown routes
- Request body whitelisting, so clients can only set allowed fields
- Configurable CORS and a health check endpoint

## Screenshots

| Light mode | Dark mode |
|:---:|:---:|
| ![Light mode](docs/screenshots/light-mode.png) | ![Dark mode](docs/screenshots/dark-mode.png) |

| Inline editing | Mobile view |
|:---:|:---:|
| ![Inline editing](docs/screenshots/inline-edit.png) | <img src="docs/screenshots/mobile.png" alt="Mobile view" width="300" /> |

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Axios, lucide-react (icons), react-hot-toast |
| **Backend** | Node.js, Express 5, Mongoose, CORS, dotenv |
| **Database** | MongoDB (Atlas or local) |
| **Tooling** | ESLint, Nodemon |

## Architecture

```
┌────────────────────────┐   HTTP/JSON (Axios)    ┌────────────────────────┐   Mongoose   ┌───────────┐
│   React client (Vite)  │ ─────────────────────▶ │   Express REST API     │ ───────────▶ │  MongoDB  │
│                        │ ◀───────────────────── │                        │ ◀─────────── │           │
│  components → hooks →  │                        │  routes → controllers  │              │  todos    │
│  api layer             │                        │  → models + error mw   │              │           │
└────────────────────────┘                        └────────────────────────┘              └───────────┘
```

- **`useTodos` hook**: holds all task state and API calls, and handles optimistic updates with rollback. Components only receive data and callbacks.
- **API layer**: one Axios instance with a response interceptor that turns server error messages into readable toasts.
- **Express 5**: rejected promises in async route handlers are forwarded to the central error middleware, so controllers don't need repeated `try/catch` blocks.

## Project Structure

```
mern-todo/
├── client/                     # React frontend
│   ├── src/
│   │   ├── api/                # Axios instance + todo API functions
│   │   ├── components/         # Header, StatsBar, TodoForm, Toolbar, TodoList, TodoItem
│   │   ├── hooks/              # useTodos (data + optimistic updates), useTheme
│   │   ├── pages/              # Home page
│   │   ├── utils/              # Priority config, date helpers, sort functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env.example
├── server/                     # Express API
│   ├── config/db.js            # MongoDB connection
│   ├── controllers/            # Route handlers
│   ├── middleware/             # 404 + centralized error handler
│   ├── models/Todo.js          # Mongoose schema
│   ├── routes/todoRoutes.js    # /api/todos routes
│   ├── server.js               # App entry point
│   └── .env.example
└── docs/screenshots/           # README images
```

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/health` | Health check | – |
| `GET` | `/todos` | Get all todos (newest first) | – |
| `POST` | `/todos` | Create a todo | `{ title, priority?, dueDate? }` |
| `PATCH` | `/todos/:id` | Update a todo (partial) | any of `{ title, completed, priority, dueDate }` |
| `DELETE` | `/todos/:id` | Delete a todo | – |
| `DELETE` | `/todos/completed` | Delete all completed todos | – |

**Todo model**

```js
{
  _id: ObjectId,
  title: String,          // required, trimmed, max 120 chars
  completed: Boolean,     // default: false
  priority: "low" | "medium" | "high",   // default: "medium"
  dueDate: Date | null,
  createdAt: Date,
  updatedAt: Date
}
```

**Response format**

```json
// 201 Created
{ "success": true, "message": "Todo created successfully", "data": { "...": "..." } }

// 400 Bad Request
{ "success": false, "message": "Priority must be low, medium or high" }
```

| Status | When |
|--------|------|
| `200` / `201` | Success |
| `400` | Validation error or invalid ID |
| `404` | Todo or route not found |
| `500` | Unexpected server error |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A MongoDB database: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local `mongod`

### 1. Clone the repository

```bash
git clone https://github.com/NIRMALKANDEL/mern-todo.git
cd mern-todo
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env     # then add your MONGO_URI
npm run dev              # starts the API on http://localhost:5000
```

### 3. Set up the frontend

In a new terminal:

```bash
cd client
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm run dev              # opens on http://localhost:5173
```

### Environment variables

| File | Variable | Description | Example |
|------|----------|-------------|---------|
| `server/.env` | `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/mern-todo` |
| `server/.env` | `PORT` | API port | `5000` |
| `server/.env` | `CLIENT_URL` | Allowed frontend origin(s), comma-separated. Optional; if unset, all origins are allowed | `https://your-app.vercel.app` |
| `client/.env` | `VITE_API_URL` | Base URL of the API | `http://localhost:5000/api` |

### Available scripts

| Location | Command | Description |
|----------|---------|-------------|
| `server/` | `npm run dev` | Start the API with auto-reload (nodemon) |
| `server/` | `npm start` | Start the API in production mode |
| `client/` | `npm run dev` | Start the Vite dev server |
| `client/` | `npm run build` | Build the production bundle into `dist/` |
| `client/` | `npm run lint` | Run ESLint |

## Deployment

| Part | Platform | Settings |
|------|----------|----------|
| Backend | Render / Railway | Root directory: `server`<br>Start command: `npm start`<br>Environment variables: `MONGO_URI`, `CLIENT_URL` |
| Frontend | Vercel / Netlify | Root directory: `client`<br>Build command: `npm run build`<br>Output directory: `dist`<br>Environment variable: `VITE_API_URL` (your deployed API URL plus `/api`) |

## What I Learned

- Designing a **RESTful API** with sensible routes, status codes and a consistent response shape
- **Data modelling and validation** with Mongoose schemas, enums and custom error messages
- **Centralized error handling** in Express 5 instead of repeating `try/catch` in every controller
- Splitting a React UI into **small, focused components** and moving data logic into **custom hooks**
- **Optimistic UI updates** with rollback, which makes the app feel instant
- Styling with **Tailwind CSS v4**, including class-based dark mode and responsive layouts
- Managing **environment variables** and preparing separate frontend and backend deployments

## Author

**Nirmal Kandel**: [GitHub @NIRMALKANDEL](https://github.com/NIRMALKANDEL)

If you found this project useful, consider giving it a ⭐
