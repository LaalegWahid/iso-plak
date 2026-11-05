// Receives the quote form and emails it to the owner through Gmail SMTP.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD (and optionally RECIPIENT_EMAIL) in .env.local.
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { projectTypes, site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 3000; // a human takes longer than this to fill the form
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }; // per IP, best effort (resets on restart)
const hits = new Map<string, number[]>();

type Field = string | undefined;
const str = (v: unknown): Field => (typeof v === "string" ? v.trim() : undefined);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Requête invalide.");
  }

  // Spam traps: the hidden "website" field and a too-fast submit. Pretend success so bots move on.
  const startedAt = Number(body.startedAt);
  if (str(body.website) || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const phone = str(body.phone);
  const email = str(body.email) || undefined;
  const type = str(body.type);
  const message = str(body.message) ?? "";

  if (!name || name.length < 2 || name.length > 100) return fail(400, "Indiquez votre nom.");
  if (!phone || !/^[0-9+().\s-]{6,20}$/.test(phone)) return fail(400, "Indiquez un numéro de téléphone valide.");
  if (email && (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return fail(400, "L’adresse email n’est pas valide.");
  if (!type || !(projectTypes as readonly string[]).includes(type)) return fail(400, "Choisissez un type de projet.");
  if (message.length > 3000) return fail(400, "Le message est trop long (3000 caractères maximum).");

  // Count only well-formed requests, so someone fixing a typo is not blocked.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) return fail(429, "Trop de demandes. Réessayez dans quelques minutes ou appelez-nous.");

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const to = process.env.RECIPIENT_EMAIL || user;
  if (!user || !pass || !to) {
    console.error("[devis] GMAIL_USER / GMAIL_APP_PASSWORD missing in .env.local");
    return fail(503, "L’envoi est momentanément indisponible.");
  }

  const rows: [string, string][] = [
    ["Nom", name],
    ["Téléphone", phone],
    ["Email", email ?? "non renseigné"],
    ["Projet", type],
    ["Détails", message || "aucun détail"],
  ];
  const text = rows.map(([k, v]) => `${k} : ${v}`).join("\n");
  const html = `<h2 style="font-family:sans-serif">Nouvelle demande de devis</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
<p style="font-family:sans-serif;color:#666;font-size:13px">Envoyé depuis le formulaire du site ${escapeHtml(site.name)}.</p>`;

  try {
    const transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
    await transporter.sendMail({
      from: { name: `Site ${site.name}`, address: user },
      to,
      replyTo: email,
      subject: oneLine(`Demande de devis : ${type} – ${name}`),
      text,
      html,
    });
  } catch (err) {
    console.error("[devis] Gmail SMTP error:", err instanceof Error ? err.message : err);
    return fail(502, "L’envoi a échoué.");
  }

  return NextResponse.json({ ok: true });
}
