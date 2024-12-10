"use client";

/* Components */
import { TechnologySearch, Badge, Input } from "@/components";
/* Interfaces */
import { IFormData, ITechnology } from "@/interfaces";

interface Props {
  formData              : IFormData;
  handleInputChange     : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  technologies          : ITechnology[];
  handleTechnologySelect: (tech: ITechnology) => void;
  removeTechnology      : (tech: ITechnology) => void;
  availableTechs        : ITechnology[];
}

export const Panel2 = (props: Props) => {
  const { availableTechs, handleTechnologySelect, removeTechnology, technologies, formData, handleInputChange } = props;

  return (
    <div className="space-y-7">
      <h2 className="text-white/90 text-3xl font-black uppercase text-center">
        Stack
      </h2>

      {/* <Input
        label="Linkedin"
        name="linkedin"
        value={formData.linkedin}
        onChange={handleInputChange}
        placeholder="Ingrese la URL de su perfil"
      />

      <Input
        label="Website"
        name="website"
        value={formData.website}
        onChange={handleInputChange}
        placeholder="Ej: www.miweb.com"
      /> */}

      <TechnologySearch
        availableTechs={availableTechs}
        selectedTechs={technologies}
        onSelect={handleTechnologySelect}
      />
      <Badge technologies={technologies} removeTechnology={removeTechnology} />
    </div>
  );
};
