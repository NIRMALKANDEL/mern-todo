require("dotenv").config();


const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("🚀 MERN Todo API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});