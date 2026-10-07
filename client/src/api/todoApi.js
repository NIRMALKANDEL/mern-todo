import API from "./api";

export const getTodos = () => API.get("/todos");

export const createTodo = (todo) => API.post("/todos", todo);

export const updateTodo = (id, updates) => API.patch(`/todos/${id}`, updates);

export const deleteTodo = (id) => API.delete(`/todos/${id}`);

export const clearCompleted = () => API.delete("/todos/completed");
