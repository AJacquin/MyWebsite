import PageLayout from "@/components/PageLayout";
import Image from "next/image";

const PROJECTS = [
	{
		name: "Geneadocs",
		url: "https://geneadocs.jacquin.duckdns.org/",
		github: "https://github.com/AJacquin/geneadocs",
		description: "Site d'hébergement de documents de généalogie.",
		logo: "/logos/geneadocs.png",
	},
];

const STYLES = {
	container: "mt-8 mx-auto max-w-3xl px-6 space-y-8",
	title: "text-center text-base/7 font-semibold",
	subtitle:
		"mx-auto mt-2 max-w-2xl text-center text-3xl font-semibold tracking-tight sm:text-4xl",
	list: "mt-8 flex flex-col gap-4",
	card:
		"group relative overflow-hidden rounded-lg border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-900 hover:shadow-slate-900/5 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:shadow-slate-200/5",
	cardContent: "p-6",
	cardHeader: "flex items-center gap-4",
	logo: "rounded transition-transform duration-300 group-hover:scale-110",
	projectName: "text-lg font-medium font-semibold hover:underline hover:underline-offset-4 transition-colors",
	description: "mt-4 text-sm text-foreground/80",
	links: "mt-4 flex gap-4",
	githubBtn:
		"absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition z-10",
};

export default function ProjectsPage() {
	return (
		<PageLayout>
			<div className={STYLES.container}>
				<h2 className={STYLES.title}>Mes projets</h2>
				<p className={STYLES.subtitle}>
					Des outils et sites personnels, développés pour apprendre et partager
				</p>
				<div className={STYLES.list}>
					{PROJECTS.map((project) => (
						<div key={project.url} className={STYLES.card}>
							<div className={STYLES.cardContent + " relative"}>
								<div className="flex justify-between items-center mb-2">
									<div className={STYLES.cardHeader}>
										<Image
											src={project.logo}
											alt={`${project.name} logo`}
											width={40}
											height={40}
											className={STYLES.logo}
										/>
										<a
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											className={STYLES.projectName + " text-slate-900 dark:text-slate-200"}
										>
											{project.name}
										</a>
									</div>
									<div className="flex gap-2">
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											className={STYLES.githubBtn}
											title="Voir le code sur GitHub"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-5 h-5 mr-1"
											>
												<path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.747-1.025 2.747-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.339-.012 2.421-.012 2.749 0 .268.18.579.688.481C19.138 20.174 22 16.426 22 12.012 22 6.484 17.523 2 12 2z" />
											</svg>
											GitHub
										</a>
									</div>
								</div>
								<p className={STYLES.description}>
									{project.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</PageLayout>
	);
}
