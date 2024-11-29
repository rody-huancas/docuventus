'use client'

import { cn } from '@/utils'
import React from 'react'

type ReadmePreviewProps = {
  formData: {
    user: string
    profession: string
    about: string
  }
  technologies: Array<{ name: string; icon: string }>
}

export function ReadmePreview({ formData, technologies }: ReadmePreviewProps) {
  return (
    <div className={cn(`prose max-w-full`)}>
      <h1>{formData.user}</h1>

      <h2>👤 About Me</h2>
      <p>{formData.profession}</p>
      <p>{formData.about}</p>

      <h2>🚀 Technologies</h2>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <img
            key={index}
            src={tech.icon}
            alt={tech.name}
            className="w-10 h-10"
          />
        ))}
      </div>
    </div>
  )
}
