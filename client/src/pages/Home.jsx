import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  deleteTodo as deleteTodoApi,
  updateTodo,
} from "../api/todoApi";

import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import toast from "react-hot-toast";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const response = await getTodos();
      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  // CREATE TODO
  const addTodo = async (title) => {
    try {
      await createTodo({
        title,
      });

      toast.success("Todo added!");

      await fetchTodos();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add todo");
    }
  };

  // DELETE TODO
  const deleteTodo = async (id) => {
    try {
      await deleteTodoApi(id);

      toast.success("Todo deleted!");

      await fetchTodos();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo");
    }
  };

  // TOGGLE COMPLETE
  const toggleTodo = async (todo) => {
    try {
      await updateTodo(todo._id, {
        title: todo.title,
        completed: !todo.completed,
      });

      toast.success(
        todo.completed ? "Marked as pending" : "Marked as completed",
      );

      await fetchTodos();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update todo");
    }
  };

  // EDIT TODO
  const editTodo = async (id, title, completed) => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      await updateTodo(id, {
        title,
        completed,
      });

      toast.success("Todo updated!");

      await fetchTodos();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update todo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">📝 MERN Todo App</h1>

          <p className="text-gray-500 mt-2">
            Organize your daily tasks efficiently.
          </p>
        </div>

        <TodoForm addTodo={addTodo} />

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg animate-pulse">
              Loading todos...
            </p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 font-medium">Total Todos: {todos.length}</p>

        <p className="text-green-600 font-medium">
          Completed: {todos.filter((todo) => todo.completed).length}
        </p>
      </div>
    </div>
  );
}

export default Home;
