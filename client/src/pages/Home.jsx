import { useEffect, useState } from "react";
import API from "../api/api";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await API.get("/todos");

      console.log(response.data);

      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>

      {todos.map((todo) => (
        <p key={todo._id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default Home;