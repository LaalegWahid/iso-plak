// Photo from /public/images/<name>.jpg. A real <img> (not a CSS background) so search
// engines index it; the gradient shows while it loads.
export default function Photo({ name, label, className = "" }: { name: string; label: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/${name}.jpg`}
      alt={label}
      loading="lazy"
      decoding="async"
      className={`w-full object-cover ${className}`}
      style={{ backgroundImage: "linear-gradient(135deg, rgb(var(--board)), #c3c9c4)" }}
    />
  );
}
