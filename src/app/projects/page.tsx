import Image from "next/image";
import PageLayout from "@/components/PageLayout";

export default function Projets() {
  // TODO: Remplacer par vos vrais services
  const services: { name: string; url: string; logo: string; description: string }[] = [];

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Titre */}
        <h2 className="text-center text-base/7 font-semibold">Projets</h2>

        {/* Sous-titre */}
        <p className="mx-auto mt-2 max-w-2xl text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Plus ou moins utiles, mais toujours passionnants !
        </p>
        
        {/* Grille */}
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <a 
              key={service.name}
              href={service.url}
              className="group relative overflow-hidden rounded-lg border border-foreground/10 bg-background/50 transition-all duration-300 hover:scale-[1.02] hover:border-foreground/20 hover:bg-background/80 hover:shadow-lg hover:shadow-foreground/5"
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
