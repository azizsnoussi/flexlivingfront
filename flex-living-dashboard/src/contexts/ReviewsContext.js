import React, { createContext, useState } from "react";

export const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const [approvedIds, setApprovedIds] = useState(new Set());

  function toggleApprove(id) {
    setApprovedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <ReviewsContext.Provider value={{ approvedIds, toggleApprove }}>
      {children}
    </ReviewsContext.Provider>
  );
}
