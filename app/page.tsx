import Hero from '@/components/hero';
import Experience from '@/components/experience';
import AuthoritySection from '@/components/authority';
import Contact from '@/components/contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Experience />
      <AuthoritySection />
      <Contact />
      {/* You can add a Footer and Navbar here later */}
    </main>
  );
}
