"use client";

import { useState } from "react";
import { IFormData } from "@/interfaces";
import { cn } from "@/utils";
import { FaCopy } from "react-icons/fa";

type Props = {
  formData: IFormData;
  technologies: Array<{ name: string }>;
};

export function ReadmeCodeView({ formData, technologies }: Props) {
  const [copyStatus, setCopyStatus] = useState("Copiar");

  const generateReadmeMarkdown = () => {
    return `# ${formData.user}
## 👤 Sobre mí
${formData.about}

### Profesión
${formData.profession}

## 🚀 Tecnologías
${technologies.map((tech) => `- ${tech.name}`).join("\n")}
`;
  };

  const handleCopyToClipboard = () => {
    const markdown = generateReadmeMarkdown();
    navigator.clipboard
      .writeText(markdown)
      .then(() => {
        setCopyStatus("Copiado");
        setTimeout(() => setCopyStatus("Copiar"), 2000);
      })
      .catch(() => {
        setCopyStatus("Error");
        setTimeout(() => setCopyStatus("Copiar"), 2000);
      });
  };

  return (
    <div
      className={cn(
        "p-4 rounded overflow-auto bg-white/95 text-gray-800",
        "text-sm relative"
      )}
    >
      <pre className="font-mono mt-5 whitespace-pre-wrap">{generateReadmeMarkdown()}</pre>

      <button
        onClick={handleCopyToClipboard}
        className="absolute top-3 right-3 bg-slate-600 text-white py-1 px-4 rounded flex items-center gap-1"
      >
        {copyStatus}
        <FaCopy />
      </button>
    </div>
  );
}
