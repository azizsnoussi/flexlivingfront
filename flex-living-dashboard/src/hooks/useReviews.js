import { useState, useEffect } from "react";
import { fetchHostawayReviews } from "../api/reviewsApi";

export function useReviews() {
  const [reviews, setReviews] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    async function loadReviews() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchHostawayReviews();
        const reviewsData = response?.data?.reviews;
        if (Array.isArray(reviewsData)) {
          if (isMounted) setReviews(reviewsData);
        } else {
          if (isMounted) setReviews([]);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load reviews");
          setReviews([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return { reviews, loading, error };
}
