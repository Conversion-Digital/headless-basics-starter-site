"use client"

// app/404/page.tsx
export default function ErrorPage() {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f2f2f2",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 Not Found</h1>
          <p>You hit an issue</p>
        </div>
      </div>
    )
  }
  