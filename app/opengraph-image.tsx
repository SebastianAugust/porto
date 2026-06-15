import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Applies to every route unless a child segment defines its own OG image.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A few decorative stars (x%, y%, size px, opacity). Hand-placed so the field
// reads as a sky, not noise. Satori supports flexbox + absolute positioning only.
const stars = [
  { x: 8, y: 16, s: 3, o: 0.7 },
  { x: 18, y: 70, s: 2, o: 0.5 },
  { x: 30, y: 28, s: 4, o: 0.9 },
  { x: 44, y: 80, s: 2, o: 0.5 },
  { x: 62, y: 18, s: 3, o: 0.7 },
  { x: 74, y: 62, s: 5, o: 0.95 },
  { x: 86, y: 30, s: 3, o: 0.7 },
  { x: 92, y: 78, s: 2, o: 0.5 },
  { x: 54, y: 46, s: 2, o: 0.45 },
  { x: 24, y: 48, s: 2, o: 0.5 },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          // Deep night blue matching the site, with two faint nebula glows.
          backgroundColor: "#070b18",
          backgroundImage:
            "radial-gradient(900px 700px at 88% -10%, rgba(50,70,140,0.45), transparent 60%), radial-gradient(800px 700px at 5% 110%, rgba(36,30,80,0.4), transparent 60%)",
          color: "#e8eaf2",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative stars */}
        {stars.map((st, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              opacity: st.o,
            }}
          />
        ))}

        {/* Availability pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            color: "#5ed6a4",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#5ed6a4",
            }}
          />
          Available for work
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>

        {/* Role */}
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 400,
            color: "#6ea8ff",
            marginTop: 18,
          }}
        >
          {site.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
