import { useState } from "react";
/* Interfaces */
import { IFormData } from "@/interfaces";
/* Hooks */
import { useTemplateLoader } from "@/hooks";
/* Utils */
import { copyToClipboard, downloadMarkdownFile, generateReadmeMarkdown } from "@/utils";
/* Incos */
import { FaCopy, FaDownload } from "react-icons/fa";

type Props = {
  formData    : IFormData;
  technologies: Array<{ name: string }>;
};

export const ReadmeCodeView = ({ formData, technologies }: Props) => {
  const [copyStatus, setCopyStatus] = useState("Copiar");
  const template = useTemplateLoader("/template-readme.md");
  const markdown = generateReadmeMarkdown(template, formData, technologies);

  const handleDownloadReadme = () => downloadMarkdownFile(markdown);

  const handleCopyToClipboard = () => {
    copyToClipboard(
      markdown,
      () => {
        setCopyStatus("Copiado");
        setTimeout(() => setCopyStatus("Copiar"), 2000);
      },
      () => {
        setCopyStatus("Error");
        setTimeout(() => setCopyStatus("Copiar"), 2000);
      }
    );
  };

  return (
    <div className="p-4 rounded overflow-auto bg-white/95 text-gray-800 text-sm relative">
      <pre className="font-mono mt-5 whitespace-pre-wrap">{markdown}</pre>

      <div className="absolute top-3 right-3 inline-flex gap-2">
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
