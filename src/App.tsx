import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Abstract } from "./components/Abstract";
import { Overview } from "./components/Overview";
import { Dimensions } from "./components/Dimensions";
import { TaskGallery } from "./components/TaskGallery";
import { ResultsSection } from "./components/results/ResultsSection";
import { Citation } from "./components/Citation";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Abstract />
        <Overview />
        <Dimensions />
        <TaskGallery />
        <ResultsSection />
        <Citation />
      </main>
      <Footer />
    </>
  );
}
