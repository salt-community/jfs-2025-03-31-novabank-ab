import React from 'react'
interface Props {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  error?: string
  placeholder?: string
}

export const LabeledInput: React.FC<Props> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  error,
  placeholder,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
        error ? 'border-red-500' : ''
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)
