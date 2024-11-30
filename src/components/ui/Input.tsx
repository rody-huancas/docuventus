import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = (props: Props) => {
  const { label, placeholder, name, ...rest } = props;

  return (
    <div className="w-full max-w-full space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white tracking-wider"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 text-gray-700 bg-white/90 transition-all duration-300 placeholder:text-gray-600"
        {...rest}
      />
    </div>
  );
};

export default Input;
