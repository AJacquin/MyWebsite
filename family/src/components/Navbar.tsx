import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-background/50 backdrop-blur border-b border-foreground shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="/" className="flex items-center gap-3">
          <Image src="/family.png" alt="Family-Jacquin-Logo" width={36} height={36} />
          <span className="font-bold text-lg tracking-tight hover:underline hover:underline-offset-4">Famille Jacquin</span>
        </a>
        <div className="flex gap-6">
        </div>
      </div>
    </nav>
  );
}