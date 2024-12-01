"use client";

/* Libraries */
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
/* Interfaces */
import { IFormData } from "@/interfaces";
/* Hooks */
import { useTemplateLoader } from "@/hooks";
/* Utils */
import { cn, generateReadmeMarkdown } from "@/utils";

type ReadmePreviewProps = {
  formData    : IFormData;
  technologies: Array<{ name: string }>;
};

export function ReadmePreview({ formData, technologies }: ReadmePreviewProps) {
  const template = useTemplateLoader("/template-readme.md");
  const markdownContent = generateReadmeMarkdown(template, formData, technologies);

  return (
    <div
      className={cn(
        "max-w-full min-w-full w-full bg-white/95 text-gray-800 p-6 rounded-lg overflow-auto prose prose-sm"
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="inline-block m-1"
              style={{ maxWidth: "40px", maxHeight: "40px" }}
            />
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
