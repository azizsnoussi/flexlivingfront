import { useState, useEffect } from "react";
import { fetchHostawayReviews } from "../api/reviewsApi";

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHostawayReviews();
        setReviews(data);
      } catch (err) {
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  return { reviews, setReviews, loading, error };
}
