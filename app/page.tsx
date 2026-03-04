import Hero from '@/components/hero/hero';
import Services from '@/components/services/services';
import Experience from '@/components/experience/experience';
import Portfolio from "@/components/portfolio/portfolio";
import Contact from '@/components/contact/contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Experience />
      <Portfolio />
      <Contact />
    </main>
  );
}
