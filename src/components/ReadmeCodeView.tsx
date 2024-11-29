'use client'

import { cn } from '@/utils'

type Props = {
  formData: {
    user: string
    profession: string
    about: string
  }
  technologies: Array<{ name: string }>
} 

export function ReadmeCodeView({ formData, technologies }: Props) {
  const generateReadmeMarkdown = () => {
    return `# ${formData.user}
            ## 👤 About Me
            ${formData.profession}
            ${formData.about}
            ## 🚀 Technologies
            ${technologies.map((tech) => `![${tech.name}]()`).join('\n')}
          `
  }

  return (
    <pre
      className={cn(
        'bg-gray-100 p-4 rounded overflow-auto',
        'text-sm font-mono',
      )}
    >
      {generateReadmeMarkdown()}
    </pre>
  )
}
