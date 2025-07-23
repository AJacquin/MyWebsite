import Image from "next/image";
import PageLayout from "@/components/PageLayout";

export default function Hub() {
  const services = [
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
  ];

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Titre */}
        <h2 className="text-center text-base/7 font-semibold">Mes sites</h2>
        
        {/* Sous-titre */}
        <p className="mx-auto mt-2 max-w-2xl text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Tous hébergés chez moi, accessibles depuis n'importe où
        </p>
        
        {/* Grille */}
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <a 
              key={service.name}
              href={service.url}
              className="group relative overflow-hidden rounded-lg border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
              bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-900 hover:shadow-slate-900/5
              dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:shadow-slate-200/5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={service.logo}
                    alt={`${service.name} logo`}
                    width={40}
                    height={40}
                    className="rounded transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-lg font-medium">
                    {service.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-foreground/80">
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
