"use client";
import { useEffect, useRef, useState } from "react";
import { projectTypes, site } from "@/lib/site";

// Posts the quote request to /api/devis, which emails it to the owner (Gmail SMTP).
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "L’envoi a échoué.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "L’envoi a échoué.");
      setStatus("error");
    }
  }

  const field = "mt-1 w-full rounded border border-steel/30 bg-white px-3 py-2.5 text-base focus:border-mark";

  if (status === "sent") {
    return (
      <div role="status" className="rounded-md border-t-2 border-mark bg-board p-6">
        <p className="font-display text-xl font-bold">Merci, votre demande est envoyée.</p>
        <p className="mt-2 leading-relaxed text-ink/80">Nous vous rappelons pour fixer une visite et chiffrer le travail.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-semibold text-mark underline">
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-semibold">Nom
        <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-semibold">Téléphone
        <input name="phone" required type="tel" maxLength={20} autoComplete="tel" className={field} />
      </label>
      <label className="block text-sm font-semibold">Email <span className="font-normal text-ink/70">(facultatif, pour vous répondre par écrit)</span>
        <input name="email" type="email" maxLength={200} autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-semibold">Votre projet
        <select name="type" className={field} defaultValue={projectTypes[0]}>
          {projectTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold">Détails (surface, ville, délai)
        <textarea name="message" rows={4} maxLength={3000} className={field} />
      </label>

      {/* Spam trap: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-wool px-6 py-3 font-display font-bold text-steel transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
      >
        {status === "sending" ? "Envoi…" : "Envoyer ma demande de devis"}
      </button>
      <p role="alert" className="text-sm text-ink/80">
        {status === "error" && (
          <>
            {error} Réessayez ou appelez-nous au{" "}
            <a className="font-semibold text-mark underline" href={`tel:${site.phoneHref}`}>{site.phone}</a>.
          </>
        )}
      </p>
    </form>
  );
}
