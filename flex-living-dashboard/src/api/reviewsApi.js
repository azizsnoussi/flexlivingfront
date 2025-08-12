import axios from "axios";

export async function fetchHostawayReviews() {
  try {
    const response = await axios.get("https://flexliving.onrender.com/api/reviews/hostaway");
    console.log("Full API response:", response);
    return response.data; 
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
