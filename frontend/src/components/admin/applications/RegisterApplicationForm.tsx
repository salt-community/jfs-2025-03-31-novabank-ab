import React, { useState } from 'react'
import { useRegisterApplication } from '@/hooks/useApplications'
import type { ApplicationRequestDto } from '@/types/ApplicationRequestDto'

export function RegisterApplicationForm() {
  const { mutate, isPending, isError, isSuccess, error } =
    useRegisterApplication()
  const [form, setForm] = useState<ApplicationRequestDto>({
    firstName: '',
    lastName: '',
    email: '',
    personalNumber: '',
    phoneNumber: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl mb-10">Apply for Nova Bank</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {[
          'firstName',
          'lastName',
          'email',
          'personalNumber',
          'phoneNumber',
        ].map((name) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1" htmlFor={name}>
              {name
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (s) => s.toUpperCase())}
            </label>
            <input
              id={name}
              name={name}
              type={name === 'email' ? 'email' : 'text'}
              value={form[name as keyof ApplicationRequestDto]}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-3 bg-[#FFB20F] text-black rounded hover:opacity-70 transition hover:cursor-pointer"
        >
          {isPending ? 'Submitting…' : 'Submit'}
        </button>
      </form>
      {isError && <p className="mt-3 text-red-600">Error: {error.message}</p>}
      {isSuccess && (
        <p className="mt-3 text-green-600">Application submitted!</p>
      )}
    </div>
  )
}
