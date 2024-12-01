import { URL_ICONS } from "@/config";
import { IFormData } from "@/interfaces";

export const generateReadmeMarkdown = (
  template: string,
  formData: IFormData,
  technologies: Array<{ name: string }>
): string => {
  if (!template) return "";

  let markdown = template;

  const aboutSection = formData.about ? `## Sobre Mí\n${formData.about}` : "";

  const linksUser =
    formData.website || formData.linkedin
      ? `
        ## Mis enlaces
        <div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
          ${
            formData.website
              ? `<a href="${formData.website}" target="_blank" style="text-decoration: none;">
                  <img alt="Website" src="https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white" style="height: 40px;" />
                </a>`
              : ""
          }
          ${
            formData.linkedin
              ? `<a href="${formData.linkedin}" target="_blank" style="text-decoration: none;">
                  <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" style="height: 40px;" />
                </a>`
              : ""
          }
        </div>
      `
      : "";

  const techList =
    technologies.length === 0
      ? ""
      : `# Tecnologías\n${technologies
          .map(
            (tech) =>
              `<img src="${URL_ICONS}/${tech.name}.svg" alt="${tech.name}" width="50" height="50" />`
          )
          .join("\n")}`;

  markdown = markdown.replace("{{user}}", `# ${formData.user}` || "");
  markdown = markdown.replace("{{profession}}", formData.profession || "");
  markdown = markdown.replace("{{about}}", aboutSection);
  markdown = markdown.replace("{{links_user}}", linksUser.trim());
  markdown = markdown.replace("{{custom_section}}", formData.customSection || "");
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
