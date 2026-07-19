import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo }) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No Todos Found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;