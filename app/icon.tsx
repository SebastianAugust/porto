import { ImageResponse } from "next/og";

// Generated favicon — an "SA" monogram on the site's night-blue, with the cool
// blue accent. Coexists with the default favicon.ico; modern browsers prefer
// this PNG icon. (favicon.ico in /app remains the legacy fallback.)
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070b18",
          borderRadius: 7,
          color: "#6ea8ff",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
        }}
      >
        SA
      </div>
    ),
    { ...size }
  );
}
