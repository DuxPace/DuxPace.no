import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { translations, type Language } from "./data/content";

export const ogSize = { width: 1200, height: 630 };

// Social card: the Nordfjord image with the page promise set over a dark band.
export async function ogImage(lang: Language) {
  const img = await readFile(path.join(process.cwd(), "public/images/satellite/nordfjord-2025-07-16.jpg"));
  const src = `data:image/jpeg;base64,${img.toString("base64")}`;
  const sub = `${translations[lang].meta.description.split(". ")[0]}.`;
  const headline = lang === "no" ? "Vannet i merden, to døgn frem." : "The water in your pens, two days ahead.";

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: "#0A1B29" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1200} height={795} style={{ position: "absolute", top: -80, left: 0, width: 1200, height: 795, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            padding: "40px 56px",
            background: "rgba(10, 27, 41, 0.88)",
            color: "#E1E9ED",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700 }}>DuxPace</div>
          <div style={{ fontSize: 58, fontWeight: 800, color: "#F2F7F9", marginTop: 8 }}>{headline}</div>
          <div style={{ fontSize: 24, marginTop: 12, color: "#ACBAC3" }}>{sub}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
