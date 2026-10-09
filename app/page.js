import HeroExperience from '../components/HeroExperience';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main>
      <a className="skip-link" href="#services">Skip to content</a>
      <HeroExperience />
      <Services />
      <Footer />
    </main>
  );
}
