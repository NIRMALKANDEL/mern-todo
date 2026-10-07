import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as api from "../api/todoApi";

// All todo state + API calls. Updates are optimistic and roll back on failure.
export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State is only set inside promise callbacks, so this is safe to call from an effect
  const loadTodos = useCallback(
    () =>
      api
        .getTodos()
        .then(({ data }) => {
          setTodos(data.data);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const fetchTodos = () => {
    setLoading(true);
    loadTodos();
  };

  const addTodo = async (todo) => {
    try {
      const { data } = await api.createTodo(todo);
      setTodos((prev) => [data.data, ...prev]);
      toast.success("Task added");
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const updateTodo = async (id, updates, successMsg) => {
    const previous = todos;
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, ...updates } : t)));
    try {
      const { data } = await api.updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? data.data : t)));
      if (successMsg) toast.success(successMsg);
      return true;
    } catch (err) {
      setTodos(previous);
      toast.error(err.message);
      return false;
    }
  };

  const toggleTodo = (todo) => updateTodo(todo._id, { completed: !todo.completed });

  const deleteTodo = async (id) => {
    const previous = todos;
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.deleteTodo(id);
      toast.success("Task deleted");
    } catch (err) {
      setTodos(previous);
      toast.error(err.message);
    }
  };

  const clearCompleted = async () => {
    const previous = todos;
    setTodos((prev) => prev.filter((t) => !t.completed));
    try {
      const { data } = await api.clearCompleted();
      toast.success(data.message);
    } catch (err) {
      setTodos(previous);
      toast.error(err.message);
    }
  };

  return { todos, loading, error, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted };
}
