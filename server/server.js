require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    // Comma-separated list of allowed origins; allow all if not set
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : "*",
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 MERN Todo API is Running...");
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "ok", uptime: process.uptime() });
});

app.use("/api/todos", todoRoutes);

// Errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
