import Nav from './components/Nav';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Showcase from './components/Showcase';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="font-body">
      <Nav />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Showcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
