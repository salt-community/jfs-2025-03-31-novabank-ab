import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Account } from '@/types'
import Sender from './Sender'
import Recipient from './Recipient'
import Amount from './Amount'
import TransactionDate from './TransactionDate'
import Notes from './Notes'
import Ocr from './Ocr'
import { useRandomDesc } from '@/hooks'
import { useCreateTransaction } from '@/hooks'

export default function TransactionForm() {
  const { t } = useTranslation('accounts')
  const [amount, setAmount] = useState('')
  const [sender, setSender] = useState<Account | null>(null)
  const [recipientAccount, setRecipientAccount] = useState<Account | null>(null)
  const [recipientClient, setRecipientClient] = useState<string | null>(null)
  const [transactionDate, setTransactionDate] = useState<string | null>(null)
  const [ocr, setOcr] = useState('')
  const [notes, setNotes] = useState('')
  const [accNoType, setAccNoType] = useState('')
  const randomDesc = useRandomDesc()
  const createTransaction = useCreateTransaction()

  const [errors, setErrors] = useState<{
    sender?: string
    recipientError?: string
    amount?: string
    transactionDate?: string
  }>({})

  const isFormValid = (): boolean => {
    const newErrors: typeof errors = {}

    if (!sender) newErrors.sender = t('pleaseSelectASenderAccount')
    const hasRecipient = !!recipientAccount || !!recipientClient
    if (!hasRecipient)
      newErrors.recipientError = t('pleaseSelectARecipientAccount')
    if (!amount || parseFloat(amount) <= 0)
      newErrors.amount = t('pleaseSelectAValidAmount')
    if (!transactionDate)
      newErrors.transactionDate = t('transactionDateIsRequired')

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setAmount('')
    setSender(null)
    setRecipientAccount(null)
    setRecipientClient(null)
    setTransactionDate(null)
    setOcr('')
    setNotes('')
    setAccNoType('')
    setErrors({})
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    if (!transactionDate || !sender) return

    const selectedDate = new Date(transactionDate)

    const accountTypeForBackend =
      accNoType === t('otherAccount')
        ? 'INTERNAL_TRANSFER'
        : accNoType.toUpperCase()

    const transactionPayload = {
      fromAccountNo: sender?.accountNumber,
      toAccountNo: recipientAccount?.accountNumber ?? recipientClient!,
      type: accountTypeForBackend,
      transactionDate: selectedDate.toISOString(), // scheduled transaction date
      amount: parseFloat(amount),
      description: randomDesc, //send random hardcoded desc data
      userNote: notes || '',
      ocrNumber: ocr || '',
    }

    // Send transactionPayload to API endpoint
    console.log(transactionPayload)

    createTransaction.mutate(transactionPayload, {
      onSuccess: () => {
        alert('Transaction created')
        resetForm()
      },
      onError: () => {
        alert('Failed to create transaction')
      },
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-3xl shadow-sm p-10"
      >
        <Sender
          sender={sender}
          setSender={setSender}
          recipient={recipientAccount}
          error={errors.sender}
        />

        <Recipient
          sender={sender}
          error={errors.recipientError}
          recipientAccount={recipientAccount}
          setRecipientAccount={setRecipientAccount}
          recipientClient={recipientClient}
          setRecipientClient={setRecipientClient}
          setAccNoType={setAccNoType}
        />

        <Amount amount={amount} setAmount={setAmount} error={errors.amount} />

        <TransactionDate
          transactionDate={transactionDate}
          setTransactionDate={setTransactionDate}
          error={errors.transactionDate}
        />

        <Ocr ocr={ocr} setOcr={setOcr} />

        <Notes notes={notes} setNotes={setNotes} />

        {/* Submit button */}
        <div className="relative w-full">
          <button
            type="submit"
            disabled={createTransaction.isPending}
            className={`bg-[#FFB20F] mt-5 text-black shadow-md px-5 py-4 rounded-lg w-full transition-colors
                        ${
                          createTransaction.isPending
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-[#F5A700] hover:cursor-pointer'
                        }`}
          >
            {createTransaction.isPending
              ? `${t('processing')}...`
              : t('submit')}
          </button>
        </div>
      </form>
    </>
  )
}
