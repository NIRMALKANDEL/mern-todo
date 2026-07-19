import { useState, useEffect } from "react";
import { Trash2, Pencil, Check, X } from "lucide-react";

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(todo.title);

  useEffect(() => {
    setTitle(todo.title);
  }, [todo.title]);

  const handleSave = async () => {
    if (!title.trim()) return;

    await editTodo(todo._id, title, todo.completed);

    setIsEditing(false);
  };

  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      border
      p-5
      flex
      items-center
      justify-between
      hover:shadow-lg
      transition
    "
    >
      {/* LEFT SECTION */}

      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo)}
          className="
            w-5
            h-5
            cursor-pointer
          "
        />

        <div className="flex flex-col">
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                border
                rounded-lg
                px-3
                py-2
                outline-none
              "
            />
          ) : (
            <h2
              className={`
                text-lg
                font-semibold
                ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }
              `}
            >
              {todo.title}
            </h2>
          )}

          <span
            className={`
              text-sm
              mt-1
              ${todo.completed ? "text-green-600" : "text-yellow-600"}
            `}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      {/* ACTION BUTTONS */}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="
                bg-green-600
                text-white
                p-2
                rounded-lg
                hover:bg-green-700
              "
            >
              <Check size={20} />
            </button>

            <button
              onClick={() => {
                setTitle(todo.title);
                setIsEditing(false);
              }}
              className="
                bg-gray-500
                text-white
                p-2
                rounded-lg
                hover:bg-gray-600
              "
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="
                bg-blue-600
                text-white
                p-2
                rounded-lg
                hover:bg-blue-700
              "
            >
              <Pencil size={20} />
            </button>

            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this todo?",
                );

                if (confirmDelete) {
                  deleteTodo(todo._id);
                }
              }}
              className="
                bg-red-600
                text-white
                p-2
                rounded-lg
                hover:bg-red-700
              "
            >
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
