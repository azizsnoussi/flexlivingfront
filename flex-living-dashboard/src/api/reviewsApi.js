import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://flexliving.onrender.com/api";

export async function fetchHostawayReviews() {
  const response = await axios.get(`${API_URL}/reviews/hostaway`);
  return response.data.reviews || [];
}
