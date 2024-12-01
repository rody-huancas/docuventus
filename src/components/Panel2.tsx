"use client";

/* Components */
import { TechnologySearch, Badge } from "@/components";
/* Interfaces */
import { ITechnology } from "@/interfaces";

interface Props {
  technologies          : ITechnology[];
  handleTechnologySelect: (tech: ITechnology) => void;
  removeTechnology      : (tech: ITechnology) => void;
  availableTechs        : ITechnology[];
}

export const Panel2 = (props: Props) => {
  const { availableTechs, handleTechnologySelect, removeTechnology, technologies } = props;

  return (
    <div className="space-y-7">
      <TechnologySearch
        availableTechs={availableTechs}
        selectedTechs={technologies}
        onSelect={handleTechnologySelect}
      />
      <Badge technologies={technologies} removeTechnology={removeTechnology} />
    </div>
  );
};
