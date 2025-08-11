import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export async function fetchHostawayReviews() {
  const response = await axios.get(`${API_URL}/reviews/hostaway`);
  return response.data.reviews || [];
}
