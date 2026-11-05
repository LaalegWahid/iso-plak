# constructionsite

Next.js 14 + Tailwind site for a plastering / insulation contractor.

    npm install
    npm run dev      # http://localhost:3000

1. Company details: `lib/site.ts`
2. Brand colors: the CSS variables at the top of `app/globals.css`
3. Logo -> `public/logo.png`, favicon -> `public/favicon.png`, photos -> `public/images/` (see README there)
4. Contact form currently opens the visitor's mail app; wire it to Resend/Formspree in `components/ContactForm.tsx`
