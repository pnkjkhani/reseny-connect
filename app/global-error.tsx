"use client";

/**
 * Last-resort boundary for errors in the root layout itself. It replaces the whole document,
 * so it carries its own <html>/<body> and plain inline styles (no dependency on the app CSS).
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#ffffff",
          color: "#120c2b",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>Something went wrong</h1>
          <p style={{ color: "#4f4a6e", lineHeight: 1.6 }}>
            Reseny Connect hit an unexpected problem. Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.25rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              border: 0,
              background: "#5c17e9",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
