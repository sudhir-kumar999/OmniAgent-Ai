import React, { useEffect, useState } from "react";
import { api } from "../services/api";

const TodoItem = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch todos
  const fetchTodos = async () => {
    try {
      const res = await api.get("/chat/todo", {
        withCredentials: true, // ⭐ cookie send karega
      });

      setTodos(res.data.todos || []);
    } catch (err) {
      console.log("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ DELETE TODO
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/chat/todo/${id}`, {
        withCredentials: true,
      });

      // instant UI update
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log("Delete error", err);
    }
  };

  if (loading) return <p className="p-4 pt-20">Loading todos...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-3 pt-30">
      <h2 className="text-xl font-semibold">My Todos</h2>

      {todos.length === 0 ? (
        <p className="text-gray-500">No todos yet</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <span
              className={`${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
            onClick={() => deleteTodo(todo._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoItem;
