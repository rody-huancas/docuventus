import { useState, useEffect } from "react";
import { IFormData } from "@/interfaces";
import { FaCopy, FaDownload } from "react-icons/fa";

type Props = {
  formData: IFormData;
  technologies: Array<{ name: string }>;
};

export function ReadmeCodeView({ formData, technologies }: Props) {
  const [copyStatus, setCopyStatus] = useState("Copiar");
  const [template, setTemplate] = useState<string>("");

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const response = await fetch("/template-readme.md");
        const text = await response.text();
        setTemplate(text);
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
      }
    };

    loadTemplate();
  }, []);

  const generateReadmeMarkdown = () => {
    if (!template) return "";

    let markdown = template;
    markdown = markdown.replace("{{user}}", formData.user || "");
    markdown = markdown.replace("{{about}}", formData.about || "");
    markdown = markdown.replace("{{profession}}", formData.profession || "");
    markdown = markdown.replace("{{custom_section}}", formData.customSection || "");

    const techList = technologies.length === 0 
    ? "" 
    : technologies.map((tech) => {
        const techImageUrl = `https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/${tech.name}.svg`;
        return `<img src="${techImageUrl}" alt="${tech.name}" width="50" height="50" />`;
      }).join("\n");

    markdown = markdown.replace("{{technologies}}", techList);

    return markdown;
  };

  const handleDownloadReadme = () => {
    const markdownContent = generateReadmeMarkdown();
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
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
    <div className="p-4 rounded overflow-auto bg-white/95 text-gray-800 text-sm relative">
      <pre className="font-mono mt-5 whitespace-pre-wrap">
        {generateReadmeMarkdown()}
      </pre>

      <div className="absolute top-3 right-3 inline-flex gap-2 ">
        <button
          onClick={handleCopyToClipboard}
          className="bg-slate-600 text-white py-1 px-4 rounded flex items-center gap-1"
        >
          {copyStatus}
          <FaCopy />
        </button>
        <button
          onClick={handleDownloadReadme}
          className="bg-blue-600 text-white py-1 px-4 rounded flex items-center gap-1"
        >
          Descargar
          <FaDownload />
        </button>
      </div>
    </div>
  );
}
