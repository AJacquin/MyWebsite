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
  "Next.js", "TailwindCSS", "Git", "Github Actions"
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
      <div className="flex flex-col items-center text-center">
        <Image
          src={PROFILE.avatar}
          alt={PROFILE.name}
          width={160}
          height={160}
          priority
        />
        <div className="">
          <h1 className="text-4xl font-bold">{PROFILE.name}</h1>
          <h2 className="text-xl text-foreground/80">{PROFILE.title}</h2>
        </div>
        <p className="max-w-2xl mt-4 text-foreground/70 text-lg">
          {PROFILE.description}
        </p>
      </div>
      
      {/* Ce site */}
      <div className="mt-8 flex flex-col items-center">
        <h1 className="text-center text-4xl font-semibold">Ce site</h1>
        <p className="text-center mt-4 text-foreground/70">
          Ce site est voué à présenter mes projets, en me permettant d'explorer de nouvelles technologies et d'améliorer mes compétences.
        </p>
        {/* Technologies */}
        <div className="mt-4">
          <h3 className="text-center text-lg font-semibold">Technologies</h3>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            {TECHNOLOGIES.map((tech) => (
              <span key={tech} className={STYLES.tag}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        {/* GitHub Link */}
        <div className="mt-2 inline-flex">
          <a
            href="https://github.com/AJacquin/MyWebsite"
            target="_blank"
            rel="noopener noreferrer"
            className={STYLES.button.base + " " + STYLES.button.primary + " mt-2 text-sm flex items-center gap-2"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.747-1.025 2.747-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.339-.012 2.421-.012 2.749 0 .268.18.579.688.481C19.138 20.174 22 16.426 22 12.012 22 6.484 17.523 2 12 2z" />
            </svg>
            Code source sur GitHub
          </a>
        </div>
      </div>

      {/* GitHub Link */}
    </PageLayout>
  );
}