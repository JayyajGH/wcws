import Hero from '@/components/hero/hero';
import Features from '@/components/features/features';
import Experience from '@/components/experience/experience';
import Portfolio from "@/components/portfolio/portfolio";
import Contact from '@/components/contact/contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Experience />
      <Portfolio />
      <Contact />
    </main>
  );
}
