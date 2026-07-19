import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  deleteTodo as deleteTodoApi,
} from "../api/todoApi";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);
const fetchTodos = async () => {
  try {
    const response = await getTodos();
    setTodos(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
const addTodo = async (title) => {
  try {
    await createTodo({
      title,
    });



    fetchTodos();
  } catch (error) {
    console.error(error);
  }
};
const deleteTodo = async (id) => {
  try {
    await deleteTodoApi(id);

    fetchTodos();
  } catch (error) {
    console.error(error);
  }
};


return (
  <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        📝 MERN Todo
      </h1>
      <TodoForm addTodo={addTodo} />

      <TodoList todos={todos} 
      deleteTodo={deleteTodo}   />

    </div>
  </div>
);
}

export default Home;