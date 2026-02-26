import { cryptoCurrency } from "../tools/cryptoTools.js";
import { createTodo,  deleteTodo,  deleteTodoController, getTodos } from "../tools/todoTools.js";
import { get_weather } from "../tools/weatherTools.js";


export const toolFunctions={
    cryptoCurrency,
    get_weather,
    createTodo,
    getTodos,
    deleteTodo,
    deleteTodoController
}