'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { TechnologySearch } from '@/components/TechnologySearch'
import { ReadmePreview } from '@/components/ReadmePreview'
import { ReadmeCodeView } from '@/components/ReadmeCodeView'
import { cn } from '@/utils'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

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
  const [availableTechs, setAvailableTechs] = useState<Technology[]>([])
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/tandpfun/skill-icons/contents/icons',
        )
        const icons = response.data
          .filter((item: any) => item.name.endsWith('.svg'))
          .map((item: any) => ({
            name: item.name.replace('.svg', ''),
            icon: item.download_url,
          }))
        setAvailableTechs(icons)
      } catch (error) {
        console.error('Error fetching technologies', error)
      }
    }

    fetchTechnologies()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTechnologySelect = (tech: Technology) => {
    if (!technologies.some((t) => t.name === tech.name)) {
      setTechnologies([...technologies, tech])
    }
  }

  const removeTechnology = (techToRemove: Technology) => {
    setTechnologies(technologies.filter((tech) => tech !== techToRemove))
  }

  return (
    <div className="w-full grid grid-cols-2 gap-x-10 container mx-auto">
      <section className="space-y-7 p-10">
        <h2 className="text-4xl font-black text-gray-700 uppercase">
          Información
        </h2>

        <div className="space-y-5">
          <Input
            label="Nombre"
            placeholder="Rody"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
          />
          <Input
            label="Profesión"
            placeholder="Desarrollador Full Stack"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
          />
          <Textarea
            label="Descripción"
            placeholder="Ingrese una descripción"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
          />

          <TechnologySearch
            availableTechs={availableTechs}
            selectedTechs={technologies}
            onSelect={handleTechnologySelect}
          />
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center bg-gray-200 p-1 rounded',
                  'flex gap-2 items-center',
                )}
              >
                <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                <span>{tech.name}</span>
                <button
                  onClick={() => removeTechnology(tech)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

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
