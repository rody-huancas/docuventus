'use client'

import { useState } from 'react'
/* Components */
import { ChipTabs, InformationForm, ReadmePreview, ReadmeCodeView } from '@/components'
/* Hooks */
import { useForm } from '@/hooks'
/* Interfaces */
import { IFormData, ITechnology } from '@/interfaces'

export default function Generate() {
  const [formData, setFormData] = useState<IFormData>({
    user         : '',
    profession   : '',
    about        : '',
    customSection: '',
    linkedin     : '',
    website      : ''
  })

  const [technologies, setTechnologies] = useState<ITechnology[]>([])

  const { handleInputChange } = useForm(setFormData)

  const handleTechnologiesChange = (tech: ITechnology[]) => setTechnologies(tech)

  const tabs = ['Visualizar', 'Código']
  const content = [
    <ReadmePreview key="preview" formData={formData} technologies={technologies}/>,
    <ReadmeCodeView key="code" formData={formData} technologies={technologies}/>
  ]

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-10 container mx-auto">
      <section className='py-10'>
        <InformationForm 
          formData={formData}
          onFormDataChange={setFormData}
          onTechnologiesChange={handleTechnologiesChange}
          handleInputChange={handleInputChange}
        />
      </section>

      <section className="py-10 w-full">
        <ChipTabs tabs={tabs} content={content}/>
      </section>
    </div>
  )
}