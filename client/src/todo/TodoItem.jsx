export default function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-700 hover:border-gray-600 transition">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 accent-green-500"
        />

        <p
          className={`text-lg ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.text}
        </p>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  );
}
