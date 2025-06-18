import React, { useState } from 'react'
import { LabeledInput } from './LabeledInput'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

interface Props {
  value: string
  onChange: (value: string) => void
}

export const PhoneInput: React.FC<Props> = ({ value, onChange }) => {
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    onChange(v)

    const phoneNumber = parsePhoneNumberFromString(v)
    if (!phoneNumber || !phoneNumber.isValid()) {
      setError('Must be a valid international phone number (E.164)')
    } else {
      setError('')
    }
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
