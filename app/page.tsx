import Hero from '@/components/hero';
import Services from '@/components/services';
import Experience from '@/components/experience';
import AuthoritySection from '@/components/authority';
import Portfolio from "@/components/portfolio";
import Contact from '@/components/contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Experience />
      <AuthoritySection />
      <Portfolio />
      <Contact />
    </main>
  );
}
