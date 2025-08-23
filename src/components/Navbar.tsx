import Image from "next/image";
import Link from "next/link";

// Configuration statique
const PROFILE = {
  name: "Axel Jacquin",
  avatar: "/avatar.svg"
} as const;

const NAV_LINKS = [
  { href: "/resume", label: "CV" },
  { href: "/hub", label: "Serveurs" }
] as const;

// Classes CSS statiques
const STYLES = {
  nav: "w-full fixed top-0 left-0 h-20 z-50 backdrop-blur border-b bg-slate-200/50 border-slate-300/50 text-slate-900 dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-slate-200",
  container: "max-w-4xl mx-auto flex items-center justify-between px-6 py-3",
  logo: "flex items-center gap-3 hover:opacity-80 transition-opacity",
  logoText: "font-bold text-lg tracking-tight",
  nav_links: "flex gap-6",
  link: "font-medium hover:underline hover:underline-offset-4 transition-colors"
} as const;

type NavbarProps = { hideOnPrint?: boolean };
export default function Navbar({ hideOnPrint }: NavbarProps) {
  return (
    <nav className={hideOnPrint ? `${STYLES.nav} print:hidden` : STYLES.nav}>
      <div className={STYLES.container}>
        <Link href="/" className={STYLES.logo}>
          <Image
            src={PROFILE.avatar}
            alt={`${PROFILE.name} Logo`}
            width={36}
            height={36}
          />
          <span className={STYLES.logoText}>{PROFILE.name}</span>
        </Link>
        <div className={STYLES.nav_links}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={STYLES.link}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
