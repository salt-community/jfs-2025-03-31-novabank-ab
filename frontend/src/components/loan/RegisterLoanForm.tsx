import React, { useState } from 'react'
import { toast } from 'react-toastify' // + lagt till för toasts
import { useTranslation } from 'react-i18next' // + lagt till för i18n
import { useCreateLoanApplication } from '@/hooks/useLoans'
import { useAccounts } from '@/hooks/useAccounts'
import type { LoanApplicationRequestDto } from '@/types/loan/LoanApplicationRequestDto'
import { LabeledInput } from '../register/LabeledInput'
import Spinner from '../generic/Spinner'

export function RequestLoanForm() {
  const { t } = useTranslation('loans')
  const { mutate, isPending } = useCreateLoanApplication()
  const { data: accounts = [], isLoading, isError: loadError } = useAccounts()

  const [form, setForm] = useState<LoanApplicationRequestDto>({
    accountId: '',
    amount: 0,
    note: '',
    requestedMonths: 12,
  })

  const resetForm = () =>
    setForm({ accountId: '', amount: 0, note: '', requestedMonths: 12 })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setForm((f) => ({
      ...f,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }))
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm((f) => ({ ...f, accountId: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(form, {
      onSuccess: () => {
        toast.success(t('loanApplicationSubmitted'))
        resetForm()
      },
      onError: () => {
        toast.error(t('failedToSubmitLoanApplication'))
      },
    })
  }

  if (isLoading) return <Spinner />
  if (loadError)
    return (
      <div className="p-8 text-red-500">
        Failed to load accounts—please try again later.
      </div>
    )

  return (
    <div className="max-w-md p-6">
      <h2 className="text-3xl mb-8">{t('applyForLoanPromise')}</h2>

      <form
        onSubmit={onSubmit}
        className="space-y-12 max-w-3xl shadow-sm px-4 sm:px-8 py-6"
      >
        <div>
          <label htmlFor="accountId" className="block text-sm font-medium mb-1">
            Account
          </label>
          <select
            id="accountId"
            name="accountId"
            value={form.accountId}
            onChange={onSelectChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          >
            <option value="" disabled>
              — {t('selectAnAccount')} —
            </option>
            {accounts.map((acc) => (
              <option key={acc.accountNumber} value={acc.accountNumber}>
                {acc.type} — {acc.accountNumber} (bal. {acc.balance})
              </option>
            ))}
          </select>
        </div>

        <LabeledInput
          id="amount"
          label={t('amount')}
          type="number"
          value={form.amount.toString()}
          onChange={onInputChange}
          required
        />

        <LabeledInput
          id="requestedMonths"
          label="Repayment Term (months)"
          type="number"
          value={form.requestedMonths.toString()}
          onChange={onInputChange}
          required
        />

        <LabeledInput
          id="note"
          label={t('notes')}
          type="text"
          value={form.note}
          onChange={onInputChange}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-3 bg-[#FFB20F] text-black rounded-lg transition
                     disabled:opacity-50 hover:bg-[#F5A700]"
        >
          {isPending ? `${t('processing')}…` : t('submit')}
        </button>
      </form>
    </div>
  )
}
