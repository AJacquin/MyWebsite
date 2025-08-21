import Image from "next/image";
import PageLayout from "@/components/PageLayout";

// Configuration statique des services
const SERVICES = [
  {
    name: "Home Assistant",
    description: "Centralise et automatise tous les objets connectés de la maison.",
    url: "https://ha.jacquin.duckdns.org",
    logo: "/homeassistant.svg"
  },
  {
    name: "Seafile",
    description: "Stocke et partage des fichiers en toute sécurité.",
    url: "https://seafile.jacquin.duckdns.org",
    logo: "/seafile.svg"
  },
  {
    name: "Portainer",
    description: "Gère facilement les conteneurs Docker via une interface web intuitive.",
    url: "https://portainer.jacquin.duckdns.org",
    logo: "/portainer.svg"
  },
  {
    name: "Jellyfin",
    description: "Diffuse films, séries et musiques sur tous les appareils.",
    url: "https://jellyfin.jacquin.duckdns.org",
    logo: "/jellyfin.svg"
  },
  {
    name: "qBittorrent",
    description: "Télécharge et gère les torrents rapidement et sans publicité.",
    url: "https://qbittorrent.jacquin.duckdns.org",
    logo: "/qbittorrent.svg"
  },
  {
    name: "Radarr",
    description: "Automatise le téléchargement des films en qualité optimale.",
    url: "https://radarr.jacquin.duckdns.org",
    logo: "/radarr.svg"
  },
  {
    name: "Sonarr",
    description: "Suit et télécharge automatiquement les séries préférées.",
    url: "https://sonarr.jacquin.duckdns.org",
    logo: "/sonarr.svg"
  },
  {
    name: "Lidarr",
    description: "Organise et télécharge toute la musique en quelques clics.",
    url: "https://lidarr.jacquin.duckdns.org",
    logo: "/lidarr.svg"
  },
  {
    name: "Prowlarr",
    description: "Centralise la gestion des indexers pour tous les outils de téléchargement.",
    url: "https://prowlarr.jacquin.duckdns.org",
    logo: "/prowlarr.svg"
  }
] as const;

// Contenu statique
const CONTENT = {
  title: "Mes sites",
  subtitle: "Tous hébergés chez moi, accessibles depuis n'importe où"
} as const;

// Classes CSS statiques
const STYLES = {
  container: "mx-auto max-w-7xl px-6 lg:px-8 space-y-8",
  title: "text-center text-base/7 font-semibold",
  subtitle: "mx-auto mt-2 max-w-2xl text-center text-3xl font-semibold tracking-tight sm:text-4xl",
  grid: "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  card: "group relative overflow-hidden rounded-lg border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-900 hover:shadow-slate-900/5 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:shadow-slate-200/5",
  cardContent: "p-6",
  cardHeader: "flex items-center gap-4",
  logo: "rounded transition-transform duration-300 group-hover:scale-110",
  serviceName: "text-lg font-medium",
  description: "mt-4 text-sm text-foreground/80"
} as const;

export default function Hub() {
  return (
    <PageLayout>
      <div className={STYLES.container}>
        <h2 className={STYLES.title}>{CONTENT.title}</h2>
        <p className={STYLES.subtitle}>{CONTENT.subtitle}</p>
        
        <div className={STYLES.grid}>
          {SERVICES.map((service) => (
            <a 
              key={service.name}
              href={service.url}
              className={STYLES.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={STYLES.cardContent}>
                <div className={STYLES.cardHeader}>
                  <Image
                    src={service.logo}
                    alt={`${service.name} logo`}
                    width={40}
                    height={40}
                    className={STYLES.logo}
                  />
                  <h3 className={STYLES.serviceName}>
                    {service.name}
                  </h3>
                </div>
                <p className={STYLES.description}>
                  {service.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
