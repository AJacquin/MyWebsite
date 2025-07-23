import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6 flex-wrap items-center justify-center">
        <Link href="/contact" className="text-sm hover:underline">Contact</Link>
        <a href="https://axel.jacquin.duckdns.org/" className="text-sm hover:underline">© {new Date().getFullYear()} Axel Jacquin</a>
      </div>
    </footer>
  );
}   