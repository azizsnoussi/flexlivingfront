import React from "react";
import { Box, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

const categories = ["cleanliness", "communication", "respect_house_rules"];
const channels = ["google", "other"];

export default function Filters({ filters, setFilters, sortKey, setSortKey, sortOrder, setSortOrder }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2} my={3}>
      <TextField
        label="Listing Name"
        name="listingName"
        value={filters.listingName}
        onChange={handleChange}
        size="small"
        sx={{ minWidth: 180 }}
      />

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          name="category"
          value={filters.category}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem></MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Channel</InputLabel>
        <Select
          name="channel"
          value={filters.channel || ""}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {channels.map((ch) => (
            <MenuItem key={ch} value={ch}>
              {ch}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Min Rating"  name="minRating"  type="number"  inputProps={{ min: 1, max: 10, step: 1 }}
  value={filters.minRating} onChange={handleChange}  size="small"  sx={{ maxWidth: 100 }}/>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          label="Sort By"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <MenuItem value="submittedAt">Date</MenuItem>
          <MenuItem value="ratingOverall">Rating</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Order</InputLabel>
        <Select
          label="Order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="desc">Descending</MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
