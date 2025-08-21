import Link from 'next/link';

// Configuration statique
const PROFILE = {
  name: "Axel Jacquin",
  website: "https://axel.jacquin.duckdns.org/"
} as const;

const FOOTER_LINKS = [
  { href: "/contact", label: "Contact", internal: true }
] as const;

// Classes CSS statiques
const STYLES = {
  footer: "w-full border-t bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200",
  container: "max-w-7xl mx-auto px-6 py-8 flex gap-6 flex-wrap items-center justify-center",
  link: "text-sm hover:underline transition-colors"
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={STYLES.footer}>
      <div className={STYLES.container}>
        {FOOTER_LINKS.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className={STYLES.link}
          >
            {link.label}
          </Link>
        ))}
        <a 
          href={PROFILE.website} 
          className={STYLES.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          © {currentYear} {PROFILE.name}
        </a>
      </div>
    </footer>
  );
}   