"use client";

import { Input, Textarea, CustomSectionInput } from "@/components";
import { IFormData } from "@/interfaces";

interface Panel1Props {
  formData             : IFormData;
  handleInputChange    : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCustomSectionChange: (section: string) => void;
}

export const Panel1 = ({ formData, handleInputChange, onCustomSectionChange }: Panel1Props) => {
  return (
    <div className="space-y-7">
      <h2 className="text-white/90 text-3xl font-black uppercase text-center">
        Información
      </h2>

      <Input
        label="Título"
        name="user"
        value={formData.user}
        onChange={handleInputChange}
        placeholder="Ej: Hola, soy Rody"
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

      <CustomSectionInput onCustomSectionChange={onCustomSectionChange} />
    </div>
  );
};
