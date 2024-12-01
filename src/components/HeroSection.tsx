import { Button } from "@/components";
import { FaGithub } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

export const HeroSection = () => {
  return (
    <div className="max-w-3xl mx-auto text-center relative z-10 space-y-14">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
        Personaliza tu GitHub
        <span className="block">en Minutos</span>
      </h1>
      <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
        Crea un README personalizado y atractivo para tu perfil de GitHub en
        minutos. Destaca tus habilidades, proyectos y tecnologías favoritas de
        manera profesional y visualmente impactante.
      </p>
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
        <Button to="/generate">
          <FiFileText size={20} className="text-gray-900" />
          Generar Readme
        </Button>
        <Button
          href="https://github.com/rody-huancas/docuventus"
          className="bg-[#1B1B28] h-12 text-white text-sm"
        >
          <FaGithub size={20} />
          Ver en GitHub
        </Button>
      </div>
    </div>
  );
};
