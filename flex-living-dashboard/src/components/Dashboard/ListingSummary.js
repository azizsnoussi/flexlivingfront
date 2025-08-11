import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function ListingSummary({ listings }) {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Properties Summary
      </Typography>
      <Table aria-label="listing summary table">
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell>Number of Reviews</TableCell>
            <TableCell>Average Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(listings).map(([name, data]) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{data.count}</TableCell>
              <TableCell>
                {data.count ? (data.sumRating / data.count).toFixed(2) : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
