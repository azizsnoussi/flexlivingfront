// useReviews.js
import { useState, useEffect } from "react";
import axios from "axios";

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://flexliving.onrender.com/api/reviews/hostaway"
        );
        console.log("Fetched from API:", res.data);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return { reviews, loading, error };
}
