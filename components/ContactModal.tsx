"use client";
import { useRef, useState } from "react";
import ContactForm from "@/components/ContactForm";

// "Contactez-nous" button in the header. Opens the quote form in a modal dialog
// (native <dialog>: Esc closes it and focus stays inside while it is open).
export default function ContactModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  // Mount the form on first open (the map needs a visible container), then keep it so typed text survives closing.
  const [mounted, setMounted] = useState(false);

  const open = () => {
    dialog.current?.showModal();
    setMounted(true);
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className="rounded bg-wool px-4 py-2 text-sm font-bold text-steel">
        Contactez-nous
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="contact-modal-title"
        onClick={(e) => e.target === dialog.current && close()} // click on the backdrop
        className="contact-modal w-[calc(100%-2rem)] max-w-2xl rounded-md bg-paper p-0 text-ink backdrop:bg-steel/75"
      >
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 id="contact-modal-title" className="font-display text-3xl font-extrabold tracking-tight">Parlons de votre projet</h2>
              <p className="mt-2 leading-relaxed text-ink/80">Décrivez votre chantier : nous vous rappelons pour fixer une visite.</p>
            </div>
            <button type="button" onClick={close} aria-label="Fermer" className="-mr-2 -mt-2 rounded p-2 text-2xl leading-none hover:text-mark">
              ×
            </button>
          </div>
          {mounted && <ContactForm />}
        </div>
      </dialog>
    </>
  );
}
