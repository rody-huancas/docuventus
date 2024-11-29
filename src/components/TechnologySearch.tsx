"use client";

import { useState, useMemo } from "react";

import { cn } from "@/utils";
import { Input } from "./ui/Input";

type Technology = {
  name: string;
  icon: string;
};

type TechnologySearchProps = {
  availableTechs: Technology[];
  selectedTechs : Technology[];
  onSelect      : (tech: Technology) => void;
};

export function TechnologySearch(props: TechnologySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { availableTechs, onSelect, selectedTechs } = props;

  const filteredTechs = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
    return availableTechs.filter((tech) => {
      const techName = tech.name.toLowerCase();
      const isAlreadySelected = selectedTechs.some((selected) => selected.name.toLowerCase() === techName);
  
      return !isAlreadySelected && techName.includes(lowerCaseSearchTerm);
    });
  }, [availableTechs, searchTerm, selectedTechs]);
  

  return (
    <div>
      <Input
        label="Search Technologies"
        placeholder="Start typing to filter..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-4 xl:grid-cols-6 gap-2 mt-4 max-h-48 w-full overflow-y-auto">
        {filteredTechs.length > 0 ? (
          filteredTechs.map((tech) => (
            <button
              key={tech.name}
              onClick={() => onSelect(tech)}
              className={cn(
                "flex flex-col items-center p-2 border rounded",
                "hover:bg-blue-100 transition-colors"
              )}
            >
              <img src={tech.icon} alt={`${tech.name} icon`} className="w-10 h-10 mb-1" />
              <span className="text-xs">{tech.name}</span>
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">
            No technologies found.
          </p>
        )}
      </div>
    </div>
  );
}