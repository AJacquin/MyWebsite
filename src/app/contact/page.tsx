import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";

// Contenu statique
const CONTENT = {
  title: "Contact",
  subtitle: "N'hésitez pas à me contacter pour toute question ou collaboration."
} as const;

// Classes CSS statiques
const STYLES = {
  container: "w-full max-w-2xl mx-auto space-y-8",
  title: "text-center text-3xl font-bold",
  subtitle: "text-center text-lg text-foreground/70"
} as const;

export default function Contact() {
  return (
    <PageLayout>
      <div className={STYLES.container}>
        <div className="text-center space-y-4">
          <h1 className={STYLES.title}>{CONTENT.title}</h1>
          <p className={STYLES.subtitle}>{CONTENT.subtitle}</p>
        </div>
        <ContactForm />
      </div>
    </PageLayout>
  );
}
