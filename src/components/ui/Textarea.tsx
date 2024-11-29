interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export const Textarea = (props: Props) => {
  const { label, placeholder } = props
  return (
    <div className="space-y-2">
      <label className="text-base font-medium text-gray-700">{label}</label>
      <textarea
        placeholder={placeholder}
        className="w-full bg-transparent rounded-md border border-stroke py-2.5 px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
      ></textarea>
    </div>
  )
}
