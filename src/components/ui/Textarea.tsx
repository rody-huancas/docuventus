interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea = (props: Props) => {
  const { label, placeholder, ...rest } = props;
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white tracking-wider">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 text-gray-700 bg-white/90 transition-all duration-300 placeholder:text-gray-600 max-h-28 min-h-20 h-full"
        {...rest}
      ></textarea>
    </div>
  );
};
