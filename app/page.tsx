import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ExperienceLog from "./components/ExperienceLog";
import Qualifications from "./components/Qualifications";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <SmoothScroll>
        <Header />
        <main className="max-w-[1280px] mx-auto mt-24 px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <HeroSection />
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <ExperienceLog />
                <Qualifications />
              </div>
              <Projects />
              <TechStack />
            </div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
