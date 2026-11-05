// Background photo from /public/images/<name>.jpg with a gradient fallback,
// so the layout looks right before the real assets are added.
export default function Photo({ name, label, className = "" }: { name: string; label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(/images/${name}.jpg), linear-gradient(135deg, rgb(var(--board)), #c3c9c4)` }}
    />
  );
}
