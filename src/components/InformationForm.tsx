"use client";

import { useEffect, useState } from "react";
/* Components */
import { Input, Textarea, Badge, TechnologySearch } from "@/components";
/* Hooks */
import { useTechnologies, useTechnologiesSelection } from "@/hooks";
/* Interfaces */
import { IFormData, ITechnology } from "@/interfaces";
import { CustomSectionInput } from "./CustomSectionInput";

interface Props {
  formData            : IFormData;
  onFormDataChange    : React.Dispatch<React.SetStateAction<IFormData>>;
  onTechnologiesChange: (technologies: ITechnology[]) => void;
  handleInputChange   : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InformationForm = (props: Props) => {
  const { formData, onFormDataChange, onTechnologiesChange, handleInputChange } = props;
  const { technologies, handleTechnologySelect, removeTechnology } = useTechnologiesSelection();
  const availableTechs = useTechnologies();

  const [customSection, setCustomSection] = useState('');

  useEffect(() => {
    onFormDataChange(prevData => ({ ...prevData, customSection }));
  }, [customSection, onFormDataChange]);

  useEffect(() => {
    onTechnologiesChange(technologies);
  }, [technologies, onTechnologiesChange]);

  return (
    <section className="space-y-6 p-10">
      <h2 className="text-white/90 text-3xl font-black uppercase text-center">
        Información
      </h2>

      <Input
        label="Título"
        name="user"
        value={formData.user}
        onChange={handleInputChange}
        placeholder="Ejm: Hola, soy Rody"
      />
      <Input
        label="Profesión"
        name="profession"
        value={formData.profession}
        onChange={handleInputChange}
        placeholder="Profesión"
      />
      <Textarea
        label="Descripción"
        name="about"
        value={formData.about}
        onChange={handleInputChange}
        placeholder="Sobre ti"
      />

      <CustomSectionInput
        onCustomSectionChange={(section) => setCustomSection(section)}
      />

      <TechnologySearch
        availableTechs={availableTechs}
        selectedTechs={technologies}
        onSelect={handleTechnologySelect}
      />

      <Badge
        technologies={technologies}
        removeTechnology={removeTechnology}
      />
    </section>
  );
};