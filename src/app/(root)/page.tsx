import { HeroSection } from "@/components";
import { FiBarChart2, FiCalendar, FiFileText, FiUsers, FiLayout, FiMessageSquare } from "react-icons/fi";

export default function Home() {
  return (
    <div className="height-screen flex items-center justify-center text-white">
      <div className="container mx-auto px-4 pt-20 pb-40 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 p-4 bg-white/15 backdrop-blur-lg rounded-xl floating-icon">
            <FiFileText className="w-6 h-6 text-zinc-200" />
          </div>
          <div className="absolute top-20 right-20 p-4 bg-white/15 backdrop-blur-lg rounded-xl floating-icon">
            <FiUsers className="w-6 h-6 text-zinc-200" />
          </div>
          <div className="absolute bottom-40 left-20 p-4 bg-white/15 backdrop-blur-lg rounded-xl floating-icon">
            <FiLayout className="w-6 h-6 text-zinc-200" />
          </div>
          <div className="absolute top-40 left-[25%] p-4 bg-white/15 backdrop-blur-lg rounded-xl floating-icon">
            <FiMessageSquare className="w-6 h-6 text-zinc-200" />
          </div>
          <div className="absolute bottom-60 right-[15%] p-4 bg-white/15 backdrop-blur-lg rounded-xl floating-icon">
            <FiCalendar className="w-6 h-6 text-zinc-200" />
          </div>
          <div className="absolute bottom-20 right-20 p-4 bg-white/15 backdrop-blur-lg rounded-xl floating-icon">
            <FiBarChart2 className="w-6 h-6 text-zinc-200" />
          </div>
        </div>

        <HeroSection />
      </div>
    </div>
  );
}
