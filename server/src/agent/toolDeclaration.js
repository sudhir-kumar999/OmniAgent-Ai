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
];
