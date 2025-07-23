import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/avatar.png"
            alt="Axel Jacquin"
            width={160}
            height={160}
            priority
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">Axel Jacquin</h1>
            <h2 className="text-xl text-foreground/80">Ingénieur Logiciel & FPGA</h2>
          </div>
          <p className="max-w-2xl text-foreground/70 text-lg">
            Passionné par le développement embarqué et web. Je construis des solutions 
            innovantes en combinant hardware et software.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link 
            href="/hub" 
            className="rounded-full px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-slate-900 transition-colors"
          >
            Mes Services
          </Link>
          <Link 
            href="/projects" 
            className="rounded-full px-6 py-2 border bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200 transition-colors"
          >
            Projets
          </Link>
          <Link
            href="https://github.com/AJacquin"
            className="rounded-full px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 dark:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-900 transition-colors"
          >
            GitHub
          </Link>
          <a 
            href="/CV_Axel_Jacquin.pdf" 
            className="rounded-full px-6 py-2 border bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </div>

        {/* Technologies */}
        <div className="mt-12">
          <h3 className="text-center text-lg font-semibold mb-6">Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-3 py-1 rounded-full text-sm bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">Verilog</span>
            <span className="px-3 py-1 rounded-full text-sm bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">SystemVerilog</span>
            <span className="px-3 py-1 rounded-full text-sm bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">C++</span>
            <span className="px-3 py-1 rounded-full text-sm bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">Python</span>
            <span className="px-3 py-1 rounded-full text-sm bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">Next.js</span>
            <span className="px-3 py-1 rounded-full text-sm bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">TailwindCSS</span>
          </div>
        </div>
    </PageLayout>
  );
}