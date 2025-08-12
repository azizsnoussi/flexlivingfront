import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReviewsProvider } from "./contexts/ReviewsContext";

import Dashboard from "./Dashboard";

function App() {
  return (
    <ReviewsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ReviewsProvider>
  );
}

export default App;
