import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 h-20 z-50 backdrop-blur border-b bg-slate-200/50 border-slate-300/50 text-slate-900 dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-slate-200">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="/" className="flex items-center gap-3">
          <Image src="/avatar.svg" alt="Axel-Jacquin-Logo" width={36} height={36} />
          <span className="font-bold text-lg tracking-tight hover:underline hover:underline-offset-4">Axel Jacquin</span>
        </a>
        <div className="flex gap-6">
          <a href="/projects" className="font-medium hover:underline hover:underline-offset-4">Projets</a>
          <a href="/hub" className="font-medium hover:underline hover:underline-offset-4">Serveurs</a>
        </div>
      </div>
    </nav>
  );
}
