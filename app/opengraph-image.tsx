import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Social preview card (Facebook, WhatsApp, LinkedIn, X...), generated at build time.
export const runtime = "edge";
export const alt = `${site.name} : ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1F1F1F", color: "#F5F4F0", padding: 80 }}>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
          <span style={{ color: "#EBB739" }}>{site.name.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Placo et isolation, posés au millimètre.</div>
          <div style={{ marginTop: 28, fontSize: 32, color: "rgba(245,244,240,0.75)" }}>Combles · Isolation des murs · Cloisons · Faux plafonds</div>
        </div>
        <div style={{ display: "flex", height: 10, width: 220, background: "#EBB739" }} />
      </div>
    ),
    size,
  );
}
