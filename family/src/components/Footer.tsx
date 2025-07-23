import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-foreground">
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6 flex-wrap items-center justify-center">
        <Link href="/contact" className="text-sm hover:underline">Contact</Link>
        <a href="https://axel.jacquin.duckdns.org/" className="text-sm hover:underline">© {new Date().getFullYear()} Axel Jacquin</a>
      </div>
    </footer>
  );
}