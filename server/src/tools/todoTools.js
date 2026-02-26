import Todo from "../models/Todo.js";

export const createTodo = async ({ text, userId }) => {
  console.log(userId)
  const todo = await Todo.create({
    text,
    user: userId
  });

  return { message: "Todo created", todo };
};


export const getTodosController = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

export const getTodos = async({ userId }) => {
  try {
    const todos = await Todo.find({ user: userId });

    // res.json({ todos }); // ⭐ THIS WAS MISSING
    return { todos };
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// export const deleteTodo = async ({ id, userId }) => {


  export const deleteTodo = async ({ id, text, userId }) => {

  let todo;

  // ✅ delete by id
  if (id) {
    todo = await Todo.findOneAndDelete({
      _id: id,
      user: userId
    });
  }

  // ✅ delete by text (AI friendly)
  else if (text) {
    todo = await Todo.findOneAndDelete({
      user: userId,
      text: { $regex: text, $options: "i" } // partial match
    });
  }

  if (!todo) {
    return { message: "Todo not found" };
  }

  return { message: `"${todo.text}" deleted successfully` };
};


export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
}