import React from "react";
import { Box, Typography } from "@mui/material";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }) {
  if (!reviews.length) return <Typography>No reviews found</Typography>;

  return (
    <Box>
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </Box>
  );
}
