function TodoItem({ todo, deleteTodo }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg shadow p-4 border">

      <div>
        <h2
          className={`text-lg font-medium ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {todo.title}
        </h2>

        <p className="text-sm text-gray-500">
          {todo.completed ? "Completed" : "Pending"}
        </p>
      </div>

      <button
        onClick={() => deleteTodo(todo._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Delete
      </button>

    </div>
  );
}

export default TodoItem;