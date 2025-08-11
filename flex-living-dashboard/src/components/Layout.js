import React from "react";

export default function Layout({ children }) {
  return (
    <div
      style={{
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
        maxWidth: 1200,
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}
