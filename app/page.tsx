import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import WallSection from "@/components/WallSection";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

const services = [
  { title: "Aménagement de combles", text: "Isolation des rampants, plafonds et cloisons pour transformer des combles perdus en chambre, bureau ou salle de jeux.", photo: "hero-attic-insulation" },
  { title: "Isolation des murs", text: "Isolation par l’intérieur, avec ossature et plaques, pour gagner en confort l’hiver comme l’été et réduire le chauffage.", photo: "wall-insulation-boards" },
  { title: "Cloisons séparatives", text: "Cloisons sur ossature pour redécouper un logement ou des bureaux, avec le niveau d’isolation phonique adapté.", photo: "drywall-archway" },
  { title: "Faux plafonds", text: "Plafonds suspendus ou collés pour cacher les réseaux, intégrer des spots et obtenir une surface parfaitement plane.", photo: "ceiling-beams" },
];

const steps = [
  { title: "Visite et métrés", text: "Nous venons sur place, mesurons et vérifions le support." },
  { title: "Devis détaillé", text: "Matériaux, surfaces et délai écrits noir sur blanc, sans surprise." },
  { title: "Pose", text: "Ossature, isolant, plaques et joints, avec protection de vos sols et de vos meubles." },
  { title: "Finitions et remise", text: "Surfaces poncées, chantier nettoyé, tour du chantier avec vous." },
];

const projects = [
  { name: "Combles aménagés", photo: "hero-attic-insulation", span: "sm:col-span-2 sm:row-span-2" },
  { name: "Isolation de murs", photo: "wall-insulation-boards", span: "" },
  { name: "Rénovation complète", photo: "renovation-room", span: "" },
  { name: "Cloisons sur ossature", photo: "drywall-archway", span: "" },
  { name: "Enduits et finitions", photo: "plaster-walls", span: "" },
  { name: "Charpente et plafond", photo: "ceiling-beams", span: "sm:col-span-4" },
];

const faqs = [
  { q: "Combien de temps dure un aménagement de combles ?", a: "De quelques jours à plusieurs semaines, selon la surface, l’état de la charpente et le nombre de cloisons. Le devis indique un délai précis après la visite." },
  { q: "Faut-il isoler avant de poser les plaques de plâtre ?", a: "Oui. L’isolant se place entre les montants de l’ossature, puis les plaques referment le tout. C’est ce qui donne un mur à la fois droit et performant." },
  { q: "Intervenez-vous en neuf comme en rénovation ?", a: "Oui, chez les particuliers comme pour le collectif et le tertiaire." },
  { q: "Comment obtenir un devis ?", a: "Remplissez le formulaire ou appelez-nous. Nous fixons une visite et vous envoyons un devis détaillé." },
];

export default function Home() {
  return (
    <>
      {/* HEADER + HERO */}
      <div className="dark-zone bg-steel text-paper">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" aria-label="Accueil"><Logo className="text-paper" /></a>
          <nav aria-label="Navigation principale" className="hidden gap-8 text-sm font-semibold md:flex">
            <a href="#services" className="hover:text-wool">Services</a>
            <a href="#methode" className="hover:text-wool">Méthode</a>
            <a href="#realisations" className="hover:text-wool">Réalisations</a>
            <a href="#contact" className="hover:text-wool">Contact</a>
          </nav>
          <a href={`tel:${site.phoneHref}`} className="rounded bg-wool px-4 py-2 text-sm font-bold text-steel">{site.phone}</a>
        </header>

        <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1fr_1.05fr] lg:pt-20">
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
              Placo et isolation, posés au millimètre.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-paper/80">
              Aménagement de combles, isolation des murs, cloisons et faux plafonds, en neuf comme en rénovation, pour les particuliers, le collectif et le tertiaire.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded bg-wool px-6 py-3 font-display font-bold text-steel transition-transform hover:-translate-y-0.5">Demander un devis gratuit</a>
              <a href="#realisations" className="rounded border border-paper/40 px-6 py-3 font-display font-bold hover:border-wool hover:text-wool">Voir nos réalisations</a>
            </div>
          </div>
          <WallSection />
        </section>
      </div>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-xl font-display text-4xl font-extrabold tracking-tight">Quatre métiers, un seul chantier propre.</h2>
        <div className="mt-12 border-t border-steel/25">
          {services.map((s) => (
            <article key={s.title} className="grid items-center gap-6 border-b border-steel/25 py-8 md:grid-cols-[1.1fr_1.4fr_0.9fr]">
              <h3 className="font-display text-2xl font-bold">{s.title}</h3>
              <p className="max-w-[34rem] leading-relaxed text-ink/80">{s.text}</p>
              <Photo name={s.photo} label={s.title} className="h-28 rounded md:h-32" />
            </article>
          ))}
        </div>
      </section>

      {/* METHOD */}
      <section id="methode" className="bg-board py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-4xl font-extrabold tracking-tight">Comment se déroule un chantier</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-mark pt-4">
                <span className="font-display text-sm font-bold text-mark">Étape {i + 1}</span>
                <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="realisations" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-4xl font-extrabold tracking-tight">Réalisations</h2>
        <p className="mt-3 max-w-xl text-ink/75">Quelques chantiers récents : combles, murs, cloisons et plafonds.</p>
        <div className="mt-10 grid auto-rows-[200px] gap-3 sm:grid-cols-4">
          {projects.map((p) => (
            <figure key={p.name} className={`relative overflow-hidden rounded ${p.span}`}>
              <Photo name={p.photo} label={p.name} className="absolute inset-0" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-steel/80 px-4 py-2 text-sm font-semibold text-paper">{p.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-board py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-4xl font-extrabold tracking-tight">Questions fréquentes</h2>
          <div className="mt-8 divide-y divide-steel/25 border-y border-steel/25">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="list-none font-display text-lg font-bold marker:hidden">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight">Parlons de votre projet</h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink/80">Décrivez votre chantier en quelques lignes. Nous vous rappelons pour fixer une visite et chiffrer le travail.</p>
          <dl className="mt-8 space-y-3 text-sm">
            <div><dt className="font-semibold">Téléphone</dt><dd><a className="text-mark underline" href={`tel:${site.phoneHref}`}>{site.phone}</a></dd></div>
            <div><dt className="font-semibold">Email</dt><dd><a className="text-mark underline" href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt className="font-semibold">Zone d’intervention</dt><dd>{site.area}</dd></div>
          </dl>
        </div>
        <ContactForm />
      </section>

      <footer className="dark-zone bg-steel py-10 text-sm text-paper/75">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5">
          <div className="flex flex-col gap-2">
            <Logo className="text-paper" />
            <p className="font-display font-bold text-paper">{site.tagline}</p>
          </div>
          <p>{site.name} · {site.siret} · © {new Date().getFullYear()}</p>
        </div>
        <p className="mx-auto mt-6 max-w-6xl border-t border-paper/15 px-5 pt-4 text-xs leading-relaxed text-paper/60">
          Crédits photos (Wikimedia Commons) :{" "}
          isolation des murs,{" "}
          <a className="underline hover:text-wool" href="https://commons.wikimedia.org/wiki/File:Doublage.jpg">Haldati</a>,{" "}
          <a className="underline hover:text-wool" href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr">CC BY-SA 4.0</a> ·{" "}
          faux plafonds,{" "}
          <a className="underline hover:text-wool" href="https://commons.wikimedia.org/wiki/File:Carpenters_installing_ceiling_panels_in_the_future_retail_area_of_the_LIRR_passenger_concourse._08-29-2019_(48647824007).jpg">MTA Capital Construction Mega Projects</a>,{" "}
          <a className="underline hover:text-wool" href="https://creativecommons.org/licenses/by/2.0/deed.fr">CC BY 2.0</a> ·{" "}
          rénovation complète,{" "}
          <a className="underline hover:text-wool" href="https://commons.wikimedia.org/wiki/File:California_Kitchen_Demo%2BReconstruction_12.jpg">Stilfehler</a>,{" "}
          <a className="underline hover:text-wool" href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr">CC BY-SA 4.0</a> ·{" "}
          combles, The EnergySmart Academy (CC0) · cloisons, U.S. Navy (domaine public) · enduits, Adrian Pingstone (domaine public).
        </p>
      </footer>
    </>
  );
}
