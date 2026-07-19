import API from "./api";

export const getTodos = () => API.get("/todos");

export const createTodo = (todo) => API.post("/todos", todo);

export const updateTodo = (id, todo) => API.put(`/todos/${id}`, todo);

export const deleteTodo = (id) => API.delete(`/todos/${id}`);