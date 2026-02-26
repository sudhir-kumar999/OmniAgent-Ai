import { ai } from "../config/gemini.js";
import { toolDeclarations } from "./toolDeclaration.js";
import { toolFunctions } from "./toolRegistry.js";

export async function runAgent(history,user) {
  if (!history || history.length === 0) {
    throw new Error("History is empty");
  }
  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history,
      config: {
        tools: [{ functionDeclarations: toolDeclarations }],
      },
    });
    if (response.functionCalls?.length > 0) {
      console.log("Function called");

      const functionCall = response.functionCalls[0];
      const { name, args } = functionCall;

      // const result = await toolFunctions[name](args);
      const result = await toolFunctions[name]({
  ...args,
  userId: user?._id,
});

// const result=await toolFunctions[name](args, {
//   userId: user?._id,
// });


      // Push model's function call
      history.push({
        role: "model",
        parts: [{ functionCall }],
      });

      // ✅ Normalize result — Gemini needs a plain object, never an array
      const safeResult = Array.isArray(result)
        ? { data: result } // wrap arrays
        : typeof result === "object" && result !== null
        ? result // plain object is fine
        : { value: result }; // wrap primitives (string, number, etc.)

      history.push({
        role: "user",
        parts: [
          {
            functionResponse: {
              name,
              response: safeResult, // ✅ always a plain object now
            },
          },
        ],
      });
      // Push tool result back as user

      // ✅ Let the loop continue — Gemini will now generate final answer
      continue;
    }

    // ✅ No function call = Gemini gave us the final text response
    const reply = response.text;

    history.push({
      role: "model",
      parts: [{ text: reply }],
    });

    return {
      reply,
      updatedHistory: history,
    };
  }
}
