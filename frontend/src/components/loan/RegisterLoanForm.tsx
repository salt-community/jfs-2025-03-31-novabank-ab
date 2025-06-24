import React, { useState } from 'react'
import { useCreateLoanApplication } from '@/hooks/useLoans'
import { useAccounts } from '@/hooks/useAccounts'
import type { LoanApplicationRequestDto } from '@/types/loan/LoanApplicationRequestDto'
import { Feedback } from '../register/Feedback'
import { LabeledInput } from '../register/LabeledInput'
import Spinner from '../generic/Spinner'

export function RequestLoanForm() {
  const { mutate, isPending, isError, isSuccess, error } =
    useCreateLoanApplication()
  const { data: accounts = [], isLoading, isError: loadError } = useAccounts()

  const [form, setForm] = useState<LoanApplicationRequestDto>({
    accountId: '',
    amount: 0,
    note: '',
    requestedMonths: 12,
  })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setForm(
      (f) =>
        ({
          ...f,
          [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }) as Pick<LoanApplicationRequestDto, keyof LoanApplicationRequestDto>,
    )
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((f) => ({
      ...f,
      accountId: e.target.value,
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  if (isLoading) return <Spinner />
  if (loadError)
    return (
      <div className="p-8 text-red-500">
        Failed to load accounts—please try again later.
      </div>
    )

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl mb-8">Apply for a Loan</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Account */}
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
              — select account —
            </option>
            {accounts.map((acc) => (
              <option key={acc.accountNumber} value={acc.accountNumber}>
                {acc.type} — {acc.accountNumber} (bal. {acc.balance})
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <LabeledInput
          id="amount"
          label="Amount"
          type="number"
          value={form.amount.toString()}
          onChange={onInputChange}
          required
        />

        {/* Requested term */}
        <LabeledInput
          id="requestedMonths"
          label="Repayment Term (months)"
          type="number"
          value={form.requestedMonths.toString()}
          onChange={onInputChange}
          required
        />

        {/* Note */}
        <LabeledInput
          id="note"
          label="Note"
          type="text"
          value={form.note}
          onChange={onInputChange}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-3 bg-[#FFB20F] text-black rounded hover:opacity-70 transition disabled:opacity-50 hover:cursor-pointer"
        >
          {isPending ? 'Submitting…' : 'Send Application'}
        </button>
      </form>

      <Feedback
        isError={isError}
        errorMsg={error?.message}
        isSuccess={isSuccess}
        successMsg="Application submitted!"
      />
    </div>
  )
}
