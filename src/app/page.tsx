import Image from "next/image";
import PageLayout from "@/components/PageLayout";

// Configuration statique pour éviter la recompilation
const PROFILE = {
  name: "Axel Jacquin",
  title: "Ingénieur Logiciel & FPGA",
  description: "Passionné par le développement embarqué et web. Je construis des solutions innovantes en combinant hardware et software.",
  avatar: "/avatar.svg"
} as const;

const TECHNOLOGIES = [
  "Verilog", "SystemVerilog", "C++", "Python", "Next.js", "TailwindCSS"
] as const;

// Classes CSS statiques pour optimiser la compilation
const STYLES = {
  button: {
    base: "rounded-full px-6 py-2 transition-colors",
    primary: "bg-slate-900 hover:bg-slate-600 text-slate-200 dark:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-900",
    secondary: "border bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200"
  },
  tag: "px-3 py-1 rounded-full text-sm bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
} as const;

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-6">
        <Image
          src={PROFILE.avatar}
          alt={PROFILE.name}
          width={160}
          height={160}
          priority
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{PROFILE.name}</h1>
          <h2 className="text-xl text-foreground/80">{PROFILE.title}</h2>
        </div>
        <p className="max-w-2xl space-y-2 text-foreground/70 text-lg">
          {PROFILE.description}
        </p>
      </div>

      {/* Technologies */}
      <div className="mt-12 space-y-6">
        <h3 className="text-center text-lg font-semibold">Technologies</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {TECHNOLOGIES.map((tech) => (
            <span key={tech} className={STYLES.tag}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}