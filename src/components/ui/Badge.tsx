import { cn } from "@/utils";
import { ITechnology } from "@/interfaces";
import { IoCloseCircle } from "react-icons/io5";

interface Props {
  technologies    : ITechnology[];
  removeTechnology: (tech: ITechnology) => void;
}

export const Badge: React.FC<Props> = ({ technologies, removeTechnology }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <div
          key={index}
          className={cn(
            "inline-flex items-center",
            "bg-gray-100 hover:bg-gray-200",
            "pl-2 pr-1 py-1",
            "rounded-full",
            "text-sm",
            "transition-colors duration-200",
            "group"
          )}
        >
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-5 h-5 mr-2 rounded-full"
          />
          <span className="mr-2 text-gray-800">{tech.name}</span>
          <button
            type="button"
            onClick={() => removeTechnology(tech)}
            className={cn(
              "text-gray-400 hover:text-red-500",
              "rounded-full hover:bg-red-50",
              "p-0.5",
              "transition-colors duration-200",
              "group-hover:bg-red-100",
              "flex items-center justify-center"
            )}
          >
            <IoCloseCircle size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
