function TodoItem({ todo }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow border">
      <h2 className="text-lg font-medium text-gray-800">
        {todo.title}
      </h2>

      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          todo.completed
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {todo.completed ? "Completed" : "Pending"}
      </span>
    </div>
  );
}

export default TodoItem;