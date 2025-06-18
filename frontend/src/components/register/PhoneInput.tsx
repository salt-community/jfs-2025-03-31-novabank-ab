import React, { useState } from 'react'
import { LabeledInput } from './LabeledInput'

const PHONE_REGEX = /^\+\d{7,15}$/

interface Props {
  value: string
  onChange: (value: string) => void
}

export const PhoneInput: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    onChange(v)
    setError(PHONE_REGEX.test(v) ? '' : 'Must be “+” plus 7–15 digits')
  }

  return (
    <LabeledInput
      id="phoneNumber"
      label="Phone Number"
      type="text"
      value={value}
      onChange={handle}
      required
      error={error}
      placeholder="+46701234567"
    />
  )
}
