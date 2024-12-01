"use client";

import { useState, useEffect } from "react";
/* Components */
import { MultiForm, Panel2, Panel1 } from "@/components";
/* Interfaces */
import { IFormData, ITechnology } from "@/interfaces";
/* Hooks */
import { useTechnologies, useTechnologiesSelection } from "@/hooks";

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

  const [customSection, setCustomSection] = useState("");

  useEffect(() => {
    onFormDataChange((prevData) => ({ ...prevData, customSection }));
  }, [customSection, onFormDataChange]);

  useEffect(() => {
    onTechnologiesChange(technologies);
  }, [technologies, onTechnologiesChange]);

  const panel1 = {
    id: "panel1",
    title: "Información Básica",
    content: (
      <Panel1
        formData={formData}
        handleInputChange={handleInputChange}
        onCustomSectionChange={setCustomSection}
      />
    ),
  };

  const panel2 = {
    id: "panel2",
    title: "Tecnologías",
    content: (
      <Panel2
        formData={formData}
        handleInputChange={handleInputChange}
        technologies={technologies}
        handleTechnologySelect={handleTechnologySelect}
        removeTechnology={removeTechnology}
        availableTechs={availableTechs}
      />
    ),
  };
  
  const panels = [panel1, panel2];

  return <MultiForm panels={panels} />;
};
