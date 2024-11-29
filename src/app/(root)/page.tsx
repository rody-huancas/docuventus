'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { TechnologySearch } from '@/components/TechnologySearch'

type Technology = {
  name: string
  icon: string
}

type FormData = {
  title: string
  description: string
  about: string
  contact: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    about: '',
    contact: '',
  })

  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [searchTech, setSearchTech] = useState('')
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTechnologySearch = () => {
    const foundTech = availableTechs.find((tech) =>
      tech.name.toLowerCase().includes(searchTech.toLowerCase()),
    )

    if (foundTech && !technologies.some((t) => t.name === foundTech.name)) {
      setTechnologies([...technologies, foundTech])
      setSearchTech('')
    }
  }

  const removeTechnology = (techToRemove: Technology) => {
    setTechnologies(technologies.filter((tech) => tech !== techToRemove))
  }

  const generateReadmeMarkdown = () => {
    return `# ${formData.title}
      ## 👤 About Me
      ${formData.description}

      ${formData.about}

      ## 🚀 Technologies
      ${technologies.map((tech) => `![${tech.name}](${tech.icon})`).join(' ')}

      ## 📞 Contact
      ${formData.contact}
    `
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Profile Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded h-24"
        />
        <TechnologySearch availableTechs={availableTechs} onSelect={() => {}} />
        <textarea
          name="about"
          placeholder="More About Me"
          value={formData.about}
          onChange={handleInputChange}
          className="w-full p-2 border rounded h-24"
        />
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search Technologies"
            value={searchTech}
            onChange={(e) => setSearchTech(e.target.value)}
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={handleTechnologySearch}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 p-1 rounded"
            >
              <img src={tech.icon} alt={tech.name} className="w-6 h-6 mr-2" />
              <span>{tech.name}</span>
              <button
                onClick={() => removeTechnology(tech)}
                className="ml-2 text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          name="contact"
          placeholder="Contact Information"
          value={formData.contact}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={`p-2 ${
              activeTab === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`p-2 ${
              activeTab === 'code' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Code
          </button>
        </div>
        {activeTab === 'preview' ? (
          <div className="prose max-w-full">
            <div
              dangerouslySetInnerHTML={{
                __html: `<h1>${formData.title}</h1>
              <h2>👤 About Me</h2>
              <p>${formData.description}</p>
              <p>${formData.about}</p>
              <h2>🚀 Technologies</h2>
              ${technologies
                .map(
                  (tech) =>
                    `<img src="${tech.icon}" alt="${tech.name}" width="50" />`,
                )
                .join(' ')}
              <h2>📞 Contact</h2>
              <p>${formData.contact}</p>`,
              }}
            />
          </div>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {generateReadmeMarkdown()}
          </pre>
        )}
      </div>
    </div>
  )
}
