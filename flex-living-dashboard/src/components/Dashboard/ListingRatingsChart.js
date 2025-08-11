import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ListingRatingsChart({ listings }) {
  const data = Object.entries(listings).map(([name, { count, sumRating }]) => ({
    name,
    avgRating: count > 0 ? sumRating / count : 0,
    reviews: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, bottom: 70, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={70} />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Bar dataKey="avgRating" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}
