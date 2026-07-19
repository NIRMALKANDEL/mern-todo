import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No todos found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;