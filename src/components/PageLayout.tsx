import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Classes CSS statiques pour éviter la recompilation
const STYLES = {
  wrapper: "min-h-screen flex flex-col",
  spacer: "w-full h-20 bg-slate-100 dark:bg-slate-900",
  main: "z-1 flex-1 flex flex-col items-center bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-200"
} as const;


type PageLayoutProps = {
  children: React.ReactNode;
  hideOnPrint?: boolean;
};

export default function PageLayout({ children, hideOnPrint }: PageLayoutProps) {
  return (
    <div className={STYLES.wrapper}>
      <Navbar hideOnPrint={hideOnPrint} />
      <div className={hideOnPrint ? `${STYLES.spacer} print:hidden` : STYLES.spacer} />
      <main className={STYLES.main}>
        {children}
      </main>
      <Footer hideOnPrint={hideOnPrint} />
    </div>
  );
}
