import { Type } from "@google/genai";

export const toolDeclarations = [
  {
    name: "cryptoCurrency",
    description:
      "we can give you the current price or other information related to crypto currency",
    parameters: {
      type: Type.OBJECT,
      properties: {
        coin: {
          type: Type.STRING,
          description: "Name of crypto like bitcoin , ethereum ...etc",
        },
      },
      required: ["coin"],
    },
  },

  {
    name: "get_weather",
    description:
      "you can get the current weather information of any city like london, goa, delhi, noida....etc",
    parameters: {
      type: Type.OBJECT,
      properties: {
        city: {
          type: Type.STRING,
          description: "City name like Delhi, London",
        },
      },
      required: ["city"],
    },
  },





  {
        name: "createTodo",
        description: "Create a new todo item",
        parameters: {
          type: Type.OBJECT,
          properties: {
            text: { type: "STRING" }
          },
          required: ["text"]
        }
      },
      {
        name: "getTodos",
        description: "Get all todos"
      },
      {
  name: "deleteTodo",
  description: "Delete a todo using id or text",
  parameters: {
    type: "OBJECT",
    properties: {
      id: {
        type: "STRING",
        description: "Todo id (optional)"
      },
      text: {
        type: "STRING",
        description: "Part of todo text to delete"
      }
    }
  }
}

];
