"use client";
import { useState } from "react";

const layers = [
  { id: "mur", name: "Mur existant", dim: "Brique, parpaing ou pierre", text: "Le support. On contrôle son état, son humidité et sa planéité avant toute pose." },
  { id: "isolant", name: "Isolant", dim: "100 à 200 mm selon le projet", text: "Laine minérale ou panneaux rigides entre les montants. C’est lui qui fait le confort et la facture de chauffage." },
  { id: "ossature", name: "Ossature métallique", dim: "Montants tous les 40 à 60 cm", text: "Rails et montants alignés au laser. Ils portent les plaques et gardent le mur droit." },
  { id: "plaque", name: "Plaque de plâtre", dim: "13 mm (BA13) ou plus", text: "Vissée sur l’ossature, joints bandés. Des plaques hydrofuges ou coupe-feu selon la pièce." },
  { id: "finition", name: "Enduit de finition", dim: "Prêt à peindre", text: "Bandes et enduit poncés pour une surface lisse, sans trace de joint." },
];

export default function WallSection() {
  const [active, setActive] = useState<string | null>(null);
  const dim = (id: string) => ({ opacity: active && active !== id ? 0.3 : 1, transition: "opacity .2s" });
  const current = layers.find((l) => l.id === active);

  return (
    <div className="rounded-md bg-paper p-5 text-ink sm:p-6">
      <p className="mb-4 text-sm font-semibold text-mark">Coupe d’un mur isolé, vue de dessus</p>
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <svg viewBox="0 0 352 340" className="w-full" role="img" aria-label="Coupe d’un mur : mur existant, isolant, ossature métallique, plaque de plâtre et enduit">
          <defs>
            <pattern id="stone" width="44" height="22" patternUnits="userSpaceOnUse">
              <rect width="44" height="22" fill="#8e9792" />
              <path d="M0 .5H44M0 11.5H44M22 0V11M0 11V22M44 11V22" stroke="#6f7873" strokeWidth="1.2" fill="none" />
            </pattern>
            <pattern id="wool" width="24" height="16" patternUnits="userSpaceOnUse">
              <rect width="24" height="16" style={{ fill: "rgb(var(--wool))" }} />
              <path d="M0 8c4-7 8-7 12 0s8 7 12 0" stroke="#c98f12" strokeWidth="1.4" fill="none" />
            </pattern>
          </defs>

          <g style={dim("mur")}><rect className="layer-in" style={{ animationDelay: "0.1s" }} x="0" y="0" width="120" height="340" fill="url(#stone)" /></g>
          <g style={dim("isolant")}><rect className="layer-in" style={{ animationDelay: "0.4s" }} x="120" y="0" width="180" height="340" fill="url(#wool)" /></g>
          <g style={dim("ossature")}>
            {[28, 145, 262].map((y, i) => (
              <g key={y} className="layer-in" style={{ animationDelay: `${0.7 + i * 0.08}s` }}>
                <rect x="296" y={y} width="4" height="50" fill="#5d6e7c" />
                <rect x="272" y={y} width="28" height="4" fill="#5d6e7c" />
                <rect x="272" y={y + 46} width="28" height="4" fill="#5d6e7c" />
              </g>
            ))}
          </g>
          <g style={dim("plaque")}>
            <rect className="layer-in" style={{ animationDelay: "0.95s" }} x="300" y="0" width="44" height="340" fill="#d9ddd8" stroke="#aab0aa" />
            <path d="M322 8V332" style={{ stroke: "rgb(var(--mark))" }} strokeWidth="1" strokeDasharray="5 5" opacity=".6" />
          </g>
          <g style={dim("finition")}><rect className="layer-in" style={{ animationDelay: "1.2s" }} x="344" y="0" width="8" height="340" fill="#ffffff" stroke="#aab0aa" /></g>
        </svg>

        <div>
          <ul className="space-y-1" onMouseLeave={() => setActive(null)}>
            {layers.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(l.id)}
                  onFocus={() => setActive(l.id)}
                  onBlur={() => setActive(null)}
                  className={`w-full rounded px-3 py-2 text-left text-sm font-semibold transition-colors ${active === l.id ? "bg-steel text-paper" : "hover:bg-board"}`}
                >
                  {l.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 min-h-[6.5rem] text-sm leading-relaxed text-ink/80" aria-live="polite">
            {current ? (
              <>
                <span className="mb-1 block font-semibold text-mark">{current.dim}</span>
                {current.text}
              </>
            ) : (
              "Survolez une couche pour voir ce qu’elle apporte."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
