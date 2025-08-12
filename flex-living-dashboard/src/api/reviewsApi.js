import axios from "axios";

export async function fetchHostawayReviews() {
  try {
    const response = await axios.get("https://flexliving.onrender.com/api/reviews/hostaway");
    return response.data; 
  } catch (error) {
    throw error;
  }
}
