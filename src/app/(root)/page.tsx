'use client'

import { useState } from 'react'
import { cn } from '@/utils'
import InformationForm from '@/components/InformationForm'
import { ReadmePreview } from '@/components/ReadmePreview'
import { ReadmeCodeView } from '@/components/ReadmeCodeView'

type Technology = {
  name: string
  icon: string
}

export default function Home() {
  const [formData, setFormData] = useState({
    user: '',
    profession: '',
    about: '',
  })

  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  const handleFormDataChange = (newFormData: {
    user: string;
    profession: string;
    about: string;
  }) => {
    setFormData(newFormData)
  }

  const handleTechnologiesChange = (newTechnologies: Technology[]) => {
    setTechnologies(newTechnologies)
  }

  return (
    <div className="w-full grid grid-cols-2 gap-x-10 container mx-auto">
      <InformationForm 
        onFormDataChange={handleFormDataChange}
        onTechnologiesChange={handleTechnologiesChange}
      />

      <section className="p-10">
        <div className="mb-4 flex justify-end">
          <div className="inline-flex bg-slate-700 p-2 rounded-full gap-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={cn(
                'py-1 px-3 rounded-full text-sm',
                activeTab === 'preview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200',
              )}
            >
              Visualizar
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={cn(
                'py-1 px-3 rounded-full text-sm',
                activeTab === 'code' ? 'bg-blue-500 text-white' : 'bg-gray-200',
              )}
            >
              Código
            </button>
          </div>
        </div>

        {activeTab === 'preview' ? (
          <ReadmePreview formData={formData} technologies={technologies} />
        ) : (
          <ReadmeCodeView formData={formData} technologies={technologies} />
        )}
      </section>
    </div>
  )
}