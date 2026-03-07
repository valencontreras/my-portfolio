import { Navbar } from "@/components/Navbar";
import { ProfileHeader } from "@/components/ProfileHeader";
import { HeroBento } from "@/components/HeroBento";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#000319] flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Navbar />
      <div className="max-w-7xl w-full">
        <ProfileHeader />
        <HeroBento />
        <TechStack />
        <Projects />
        <Experience />
        <Footer />
      </div>
    </main>
  );
}
