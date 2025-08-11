import React, { useContext } from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";
import { ReviewsContext } from "../../contexts/ReviewsContext";
import { format, parseISO } from "date-fns";

export default function ReviewCard({ review }) {
  const { approvedIds, toggleApprove } = useContext(ReviewsContext);
  const approved = approvedIds.has(review.id);

  return (
    <Card
      sx={{
        mb: 2,
        bgcolor: approved ? "success.light" : "background.paper",
        border: approved ? "2px solid" : "1px solid",
        borderColor: approved ? "success.main" : "grey.300",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            {review.guestName || "Anonymous"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {format(parseISO(review.submittedAt), "PPP")}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={1}>
          <em>{review.listingName}</em> — Rating:{" "}
          <strong>{review.ratingOverall?.toFixed(1) ?? "N/A"}</strong>
        </Typography>

        <Typography variant="body1" paragraph>
          {review.publicReview || "<No Review Text>"}
        </Typography>

        <Box mb={1}>
          {review.ratingCategories &&
            Object.entries(review.ratingCategories).map(([cat, rating]) => (
              <Chip
                key={cat}
                label={`${cat}: ${rating}`}
                size="small"
                sx={{ mr: 1, mb: 1 }}
                color="primary"
              />
            ))}
        </Box>

        <Button
          variant={approved ? "contained" : "outlined"}
          color={approved ? "success" : "primary"}
          onClick={() => toggleApprove(review.id)}
        >
          {approved ? "Unapprove" : "Approve for Website"}
        </Button>
      </CardContent>
    </Card>
  );
}
