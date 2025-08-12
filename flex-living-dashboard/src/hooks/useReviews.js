import { useState, useEffect } from "react";
import { fetchHostawayReviews } from "../api/reviewsApi";

export function useReviews() {
  const [reviews, setReviews] = useState(null);  // Start with null to detect "not loaded"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To avoid setting state if component unmounted

    async function loadReviews() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchHostawayReviews();

        console.log("Fetched from API:", response);

        // Defensive: make sure response.data.reviews is an array
        const reviewsData = response?.data?.reviews;
        if (Array.isArray(reviewsData)) {
          if (isMounted) setReviews(reviewsData);
        } else {
          if (isMounted) setReviews([]);
          console.warn("Warning: reviews data not an array", reviewsData);
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
      isMounted = false; // cleanup on unmount
    };
  }, []);

  return { reviews, loading, error };
}
