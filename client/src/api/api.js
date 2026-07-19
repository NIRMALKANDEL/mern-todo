import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-todo-spiq.onrender.com/api",
});

export default API;