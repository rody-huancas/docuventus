'use client'

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { cn } from '@/utils'
import { IFormData } from '@/interfaces'

type ReadmePreviewProps = {
  formData: IFormData
  technologies: Array<{ name: string }>
}

export function ReadmePreview({ formData, technologies }: ReadmePreviewProps) {
  const [readmeContent, setReadmeContent] = useState<string>("");

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const response = await fetch("/template-readme.md");
        const text = await response.text();
        
        let markdown = text;
        markdown = markdown.replace("{{user}}", formData.user || "");
        markdown = markdown.replace("{{about}}", formData.about || "");
        markdown = markdown.replace("{{profession}}", formData.profession || "");
        markdown = markdown.replace("{{custom_section}}", formData.customSection || "");
        
        const techList = technologies.length === 0 
          ? "" 
          : technologies.map((tech) => {
              const techImageUrl = `https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/${tech.name}.svg`;
              return `<img src="${techImageUrl}" alt="${tech.name}" width="50" height="50" />`;
            }).join(" ");
        
        markdown = markdown.replace("{{technologies}}", techList);
        
        setReadmeContent(markdown);
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
      }
    };
    
    loadTemplate();
  }, [formData, technologies]);

  return (
    <div className={cn("max-w-full min-w-full w-full bg-white/95 text-gray-800 p-6 rounded-lg overflow-auto prose prose-sm")}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({node, ...props}) => (
            <img 
              {...props} 
              className="inline-block m-1"
              style={{ maxWidth: '40px', maxHeight: '40px' }}
            />
          )
        }}
      >
        {readmeContent}
      </ReactMarkdown>
    </div>
  )
}