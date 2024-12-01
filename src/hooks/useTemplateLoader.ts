import { useState, useEffect } from "react";

export const useTemplateLoader = (templatePath: string) => {
  const [template, setTemplate] = useState<string>("");

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const response = await fetch(templatePath);
        const text = await response.text();
        setTemplate(text);
      } catch (error) {
        console.error("Error al cargar la plantilla:", error);
      }
    };

    loadTemplate();
  }, [templatePath]);

  return template;
};
