'use client'

import { useState } from 'react'
import { ChipTabs, InformationForm, ReadmePreview, ReadmeCodeView } from '@/components'
import { IFormData, ITechnology } from '@/interfaces'
import { useForm } from '@/hooks'

export default function Home() {
  const [formData, setFormData] = useState<IFormData>({
    user      : '',
    profession: '',
    about     : '',
  })

  const [technologies, setTechnologies] = useState<ITechnology[]>([])

  const { handleInputChange } = useForm(setFormData)

  const handleFormDataChange = (data: IFormData) => setFormData(data)
  const handleTechnologiesChange = (tech: ITechnology[]) => setTechnologies(tech)

  const tabs = ['Visualizar', 'Código']
  const content = [
    <ReadmePreview key="preview" formData={formData} technologies={technologies}/>,
    <ReadmeCodeView key="code" formData={formData} technologies={technologies}/>
  ]

  return (
    <div className="w-full grid grid-cols-2 gap-x-10 container mx-auto">
      <section className='p-10'>
        <InformationForm 
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onTechnologiesChange={handleTechnologiesChange}
          handleInputChange={handleInputChange}
        />
      </section>

      <section className="py-10">
        <ChipTabs tabs={tabs} content={content}/>
      </section>
    </div>
  )
}
