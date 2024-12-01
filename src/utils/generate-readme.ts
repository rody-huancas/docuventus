import { URL_ICONS } from "@/config";
import { IFormData } from "@/interfaces";

export const generateReadmeMarkdown = (
  template: string,
  formData: IFormData,
  technologies: Array<{ name: string }>
): string => {
  if (!template) return "";

  let markdown = template;
  markdown = markdown.replace("{{user}}", formData.user || "");
  markdown = markdown.replace("{{about}}", formData.about || "");
  markdown = markdown.replace("{{profession}}", formData.profession || "");
  markdown = markdown.replace("{{custom_section}}", formData.customSection || "");

  const techList =
    technologies.length === 0
      ? ""
      : `# Tecnologías\n${technologies
          .map(
            (tech) => `<img src="${URL_ICONS}/${tech.name}.svg" alt="${tech.name}" width="50" height="50" />`
          )
          .join("\n")}`;

  markdown = markdown.replace("{{technologies}}", techList);

  return markdown;
};

export const downloadMarkdownFile = (
  content: string,
  fileName: string = "README.md"
) => {
  const blob = new Blob([content], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

export const copyToClipboard = async (
  content: string,
  onSuccess: () => void,
  onError: () => void
) => {
  try {
    await navigator.clipboard.writeText(content);
    onSuccess();
  } catch {
    onError();
  }
};
