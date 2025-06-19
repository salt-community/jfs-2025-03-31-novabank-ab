import React from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
}) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
  />
)
