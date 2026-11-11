import fs from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";

// Full-screen loading page shown until the photos, logo and fonts have loaded.
// It runs as a tiny inline script (no React), so it starts before the page hydrates.
// The bar shows real progress; it gives up after MAX_WAIT_MS so a slow image never blocks the site.
// The page content is still in the HTML underneath, so search engines see everything.

const MAX_WAIT_MS = 8000;

// Read at build time: every photo in /public/images plus the brand assets.
const assets = [
  ...fs.readdirSync(path.join(process.cwd(), "public", "images"))
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .map((f) => `/images/${f}`),
  "/logo-wordmark.png",
  "/cursor-hammer.svg",
  "/cursor-hammer-strike.svg",
];

const script = `(function () {
  var el = document.getElementById("preloader");
  if (!el) return;
  var bar = el.querySelector("[data-bar]");
  var srcs = ${JSON.stringify(assets)};
  var total = srcs.length + 2, done = 0, finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    if (bar) bar.style.transform = "scaleX(1)";
    setTimeout(function () { el.setAttribute("data-done", ""); }, 250);
  }
  function tick() {
    done++;
    if (bar) bar.style.transform = "scaleX(" + Math.min(done / total, 1) + ")";
    if (done >= total) finish();
  }
  srcs.forEach(function (s) { var i = new Image(); i.onload = i.onerror = tick; i.src = s; });
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(tick, tick);
  if (document.readyState === "complete") tick(); else window.addEventListener("load", tick);
  setTimeout(finish, ${MAX_WAIT_MS});
})();`;

export default function Preloader() {
  return (
    <>
      {/* suppressHydrationWarning: the script adds data-done before React hydrates. */}
      <div id="preloader" role="status" aria-label={`Chargement du site ${site.name}`} suppressHydrationWarning>
        <div className="flex flex-col items-center gap-8 px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-wordmark.png" alt="" width={909} height={190} className="h-12 w-auto sm:h-14" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cursor-hammer.svg" alt="" width={32} height={32} className="preloader-hammer h-14 w-14" />
          <div className="h-1.5 w-56 overflow-hidden rounded-full bg-paper/15">
            <div data-bar className="preloader-bar h-full w-full rounded-full bg-wool" />
          </div>
          <p className="font-display text-sm font-bold tracking-wide text-paper/70">{site.tagline}</p>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
