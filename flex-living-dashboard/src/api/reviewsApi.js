import axios from "axios";

export async function fetchHostawayReviews() {
  
  const response = await axios.get("https://flexliving.onrender.com/api/reviews/hostaway");
  
  return response.data.reviews;
}
