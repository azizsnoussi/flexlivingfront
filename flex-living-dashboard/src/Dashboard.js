import React, { useState, useMemo } from "react";
import { Container, Typography, Box, CssBaseline } from "@mui/material";
import { useReviews } from "./hooks/useReviews";

import Filters from "./components/Dashboard/Filters";
import ListingSummary from "./components/Dashboard/ListingSummary";
import ReviewList from "./components/Dashboard/ReviewList";
import ApprovedReviews from "./components/ApprovedReviews";
import ListingRatingsChart from "./components/Dashboard/ListingRatingsChart";

export default function Dashboard() {
  // Always call hooks at the top
  const { reviews = [], loading, error } = useReviews();

  const [filters, setFilters] = useState({
    listingName: "",
    category: "",
    channel: "",
    minRating: "",
  });
  const [sortKey, setSortKey] = useState("submittedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredReviews = useMemo(() => {
    if (!Array.isArray(reviews)) return [];

    return reviews
      .filter((r) => {
        if (!r) return false; // skip invalid entries

        // Match listing name
        if (
          filters.listingName &&
          !(r.listingName || "")
            .toLowerCase()
            .includes(filters.listingName.toLowerCase())
        ) {
          return false;
        }

        // Match channel
        if (
          filters.channel &&
          !(r.channel || "").toLowerCase().includes(filters.channel.toLowerCase())
        ) {
          return false;
        }

        // Match min rating
        if (filters.minRating && (r.ratingOverall || 0) < parseFloat(filters.minRating)) {
          return false;
        }

        // Match category
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
    if (!Array.isArray(reviews)) return map;

    reviews.forEach((r) => {
      if (!r) return;
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
        <Typography variant="h5">Chargement des données...</Typography>
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
          {filteredReviews.length > 0 ? (
            <ReviewList reviews={filteredReviews} />
          ) : (
            <Typography>Aucun avis trouvé.</Typography>
          )}
        </Box>

        <Box mt={4}>
          <ApprovedReviews reviews={reviews} />
        </Box>
      </Container>
    </>
  );
}
