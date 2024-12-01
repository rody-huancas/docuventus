import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export const Header = () => {
  return (
    <header className="w-full fixed top-10 left-0">
      <div className="container mx-auto flex justify-between items-center py-4 px-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <div className="relative z-10 flex justify-between items-center w-full">
          <Link href="/" className="rounded-xl flex items-center gap-3 bg-[#1B1B28] p-3">
            <Image src="/logo.svg" alt="Logo Docuventus" width={40} height={40}/>
            <span className="text-white font-semibold">Docuventus</span>
          </Link>

          <div className="flex items-center gap-5 text-white">
            <a
              href="https://github.com/rody-huancas/docuventus"
              target="_blank"
            >
              <FaGithub size={25} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
