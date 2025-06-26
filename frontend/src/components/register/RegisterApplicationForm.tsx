import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useRegisterApplication } from '@/hooks/useApplications'
import { PhoneInput } from './PhoneInput'
import { LabeledInput } from './LabeledInput'
import type { ApplicationRequestDto } from '@/types/ApplicationRequestDto'

export function RegisterApplicationForm() {
  const { t } = useTranslation('accounts')
  const { mutate, isPending } = useRegisterApplication()

  const [form, setForm] = useState<ApplicationRequestDto>({
    firstName: '',
    lastName: '',
    email: '',
    personalNumber: '',
    phoneNumber: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const resetForm = () =>
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      personalNumber: '',
      phoneNumber: '',
    })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(form, {
      onSuccess: () => {
        toast.success(t('userApplicationSubmitted'))
        resetForm()
      },
      onError: () => {
        toast.error(t('failedToSubmitUserApplication'))
      },
    })
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-sm">
      <h2 className="text-3xl mb-10">
        {t('applyForNovaBank') ?? 'Apply for Nova Bank'}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <LabeledInput
          id="firstName"
          label={t('firstName') ?? 'First Name'}
          value={form.firstName}
          onChange={onChange}
          required
        />
        <LabeledInput
          id="lastName"
          label={t('lastName') ?? 'Last Name'}
          value={form.lastName}
          onChange={onChange}
          required
        />
        <LabeledInput
          id="email"
          label={t('email') ?? 'Email'}
          type="email"
          value={form.email}
          onChange={onChange}
          required
        />
        <LabeledInput
          id="personalNumber"
          label={t('personalNumber') ?? 'Personal Number'}
          value={form.personalNumber}
          onChange={onChange}
          required
        />
        <PhoneInput
          value={form.phoneNumber}
          onChange={(v) => setForm((f) => ({ ...f, phoneNumber: v }))}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-3 bg-[#FFB20F] text-black rounded hover:opacity-70 transition disabled:opacity-50 hover:cursor-pointer"
        >
          {isPending
            ? `${t('processing') ?? 'Submitting'}…`
            : (t('submit') ?? 'Submit')}
        </button>
      </form>
    </div>
  )
}
