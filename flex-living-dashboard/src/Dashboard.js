import React, { useState, useMemo } from "react";
import { Container, Typography, Box, CssBaseline } from "@mui/material";
import { useReviews } from "./hooks/useReviews";

import Filters from "./components/Dashboard/Filters";
import ListingSummary from "./components/Dashboard/ListingSummary";
import ReviewList from "./components/Dashboard/ReviewList";
import ApprovedReviews from "./components/ApprovedReviews";
import ListingRatingsChart from "./components/Dashboard/ListingRatingsChart";

export default function Dashboard() {
  const { reviews, loading, error } = useReviews();

  const [filters, setFilters] = useState({
    listingName: "",
    category: "",
    channel: "",
    minRating: "",
  });
  const [sortKey, setSortKey] = useState("submittedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        if (
          filters.listingName &&
          !r.listingName.toLowerCase().includes(filters.listingName.toLowerCase())
        )
          return false;
        if (
          filters.channel &&
          (!r.channel || r.channel.toLowerCase() !== filters.channel.toLowerCase())
        )
          return false;
        if (filters.minRating && r.ratingOverall < parseFloat(filters.minRating))
          return false;
        if (filters.category) {
          return (
            r.ratingCategories &&
            r.ratingCategories[filters.category] !== undefined
          );
        }
        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === "ratingOverall") {
          cmp = (a.ratingOverall || 0) - (b.ratingOverall || 0);
        } else if (sortKey === "submittedAt") {
          cmp =
            new Date(a.submittedAt || 0).getTime() -
            new Date(b.submittedAt || 0).getTime();
        }
        return sortOrder === "asc" ? cmp : -cmp;
      });
  }, [reviews, filters, sortKey, sortOrder]);

  const listings = useMemo(() => {
    const map = {};
    reviews.forEach((r) => {
      const name = r.listingName || "Unknown";
      if (!map[name]) {
        map[name] = { count: 0, sumRating: 0, reviews: [] };
      }
      map[name].count++;
      map[name].sumRating += r.ratingOverall || 0;
      map[name].reviews.push(r);
    });
    return map;
  }, [reviews]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h5">En cours ...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h5" color="error">
          Erreur: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Flex Living - Reviews Dashboard
        </Typography>

        <ListingSummary listings={listings} />

        <ListingRatingsChart listings={listings} />

        <Filters
          filters={filters}
          setFilters={setFilters}
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <Box mt={3}>
          <ReviewList reviews={filteredReviews} />
        </Box>

        <Box mt={4}>
          <ApprovedReviews reviews={reviews} />
        </Box>
      </Container>
    </>
  );
}
