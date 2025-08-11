import React, { useContext } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { ReviewsContext } from "../contexts/ReviewsContext";

export default function ApprovedReviews({ reviews }) {
  const { approvedIds } = useContext(ReviewsContext);
  const approvedReviews = reviews.filter((r) => approvedIds.has(r.id));

  if (!approvedReviews.length)
    return <Typography>No reviews approved for website</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Approved Reviews (for Website)
      </Typography>

      {approvedReviews.map((r) => (
        <Card key={r.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">
              {r.guestName || "Anonymous"}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {r.listingName} — Rating: {r.ratingOverall?.toFixed(1) ?? "N/A"}
            </Typography>
            <Typography>{r.publicReview}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
