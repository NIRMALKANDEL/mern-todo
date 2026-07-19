function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 border">

      <div className="flex items-center gap-4">

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo)}
          className="w-5 h-5 cursor-pointer"
        />

        <h2
          className={`text-lg font-medium ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {todo.title}
        </h2>

      </div>

      <button
        onClick={() => deleteTodo(todo._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Delete
      </button>

    </div>
  );
}

export default TodoItem;