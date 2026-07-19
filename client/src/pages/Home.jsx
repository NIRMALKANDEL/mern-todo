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


  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch todos");
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
        todo.completed
          ? "Marked as pending"
          : "Marked as completed"
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


        <h1 className="text-4xl font-bold text-center mb-8">
          📝 MERN Todo
        </h1>


        <TodoForm 
          addTodo={addTodo}
        />


        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />


      </div>

    </div>
  );
}


export default Home;