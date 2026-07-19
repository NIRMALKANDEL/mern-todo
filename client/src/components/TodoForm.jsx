import { useState } from "react";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim()) return;

  await addTodo(title);

  setTitle("");
};

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Enter a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;