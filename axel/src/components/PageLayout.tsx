import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full h-20 bg-slate-100 dark:bg-slate-900"></div>
			<main className="z-1 flex-1 items-center bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-200">
				{children}
			</main>
      <Footer />
    </div>
  );
} 