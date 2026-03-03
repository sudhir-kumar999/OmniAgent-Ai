import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function browserSearch(query,context) {
  try {
    console.log("browser query tool run")
    const response = await axios.get(
      "https://serpapi.com/search.json",
      {
        params: {
          q: query,
          api_key: process.env.SERP_API_KEY,
          engine: "google"
        }
      }
    );

    const results = response.data.organic_results || [];

    return results
      .slice(0, 5)
      .map((item, i) =>
        `${i + 1}. ${item.title}\n${item.snippet}\n${item.link}`
      )
      .join("\n\n");

  } catch (error) {
    console.error(error);
    return "Error fetching search results.";
  }
}