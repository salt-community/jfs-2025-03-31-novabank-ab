import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Account } from '@/types'
import RecipientsModal from '@/components/transfer/RecipientsModal'
import DatePicker from '@/components/transfer/DatePicker'

type TransferPageProps = {
  bankAccounts: Array<Account>
}

export default function TransferPage({ bankAccounts }: TransferPageProps) {
  const [showRecipientsModal, setShowRecipientsModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [ocr, setOcr] = useState('')
  const [notes, setNotes] = useState('')
  const [fromAccount, setFromAccount] = useState<Account | null>(null)
  const [toAccount, setToAccount] = useState<Account | null>(null)
  const [newRecipient, setNewRecipient] = useState<string | null>(null)
  const [transferDate, setTransferDate] = useState<string | null>(null)

  const [errors, setErrors] = useState<{
    fromAccount?: string
    recipientError?: string
    amount?: string
    transferDate?: string
  }>({})

  const handleAccount = (account: Account | null | string) => {
    if (typeof account === 'string') {
      setNewRecipient(account)
      setToAccount(null) // clear previous selection
    } else {
      setToAccount(account)
      setNewRecipient(null) // clear new recipient string
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newErrors: typeof errors = {}

    if (!fromAccount) newErrors.fromAccount = 'Please select a sender account'
    const hasRecipient = !!toAccount || !!newRecipient
    if (!hasRecipient) {
      newErrors.recipientError = 'Please select a recipient account'
    }
    if (!amount || parseFloat(amount) <= 0)
      newErrors.amount = 'Please enter a valid amount'
    if (!transferDate) newErrors.transferDate = 'Transfer date is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // All validations passed
    // console.log({ fromAccount, toAccount, amount, ocr, notes, transferDate })
  }

  const handleClearRecipient = () => {
    setNewRecipient(null)
    setToAccount(null)
  }

  return (
    <>
      <h1 className="text-3xl mb-20">New transfer</h1>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
        {/* From account */}
        <div className="relative w-full">
          <select
            id="fromAccount"
            name="bankaccounts"
            value={fromAccount?.name || ''}
            onChange={(e) => {
              const selectedAccount = bankAccounts.find(
                (acc) => acc.name === e.target.value,
              )
              setFromAccount(selectedAccount || null)
            }}
            className={` peer hover:cursor-pointer rounded p-4 w-full outline outline-gray-500 focus:outline-2 focus:outline-black text-left bg-white
             ${errors.fromAccount ? 'outline outline-red-600 focus:outline-red-600 ' : ''}
              border-r-15 border-transparent 
              ${fromAccount ? ' text-black' : 'text-gray-400'}`}
          >
            <option value="" className="text-gray-400">
              Select an account
            </option>
            {bankAccounts.map((account) => {
              const isDisabled = toAccount?.number === account.number

              return (
                <option
                  key={account.number}
                  value={account.name}
                  disabled={isDisabled}
                  className={`text-black ${
                    isDisabled ? 'bg-gray-200 text-gray-400' : ''
                  }`}
                >
                  {account.name}
                  {isDisabled ? ' (Already selected as recipient)' : ''}
                </option>
              )
            })}
          </select>

          <label
            htmlFor="fromAccount"
            className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none
              ${
                fromAccount
                  ? '-top-2.5 font-semibold text-sm text-black'
                  : 'top-4 text-base text-gray-400 bg-transparent pr-20'
              }
              ${errors.fromAccount ? 'peer-focus:text-red-600 ' : 'peer-focus:text-black'}
              peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
              peer-focus:bg-white `}
          >
           Sender
          </label>
          {errors.fromAccount && (
            <p className="text-red-600 text-sm mt-1">{errors.fromAccount}</p>
          )}
        </div>

        {/* To account */}
        <div className="relative w-full">
          <button
            id="toAccount"
            type="button"
            onClick={() => setShowRecipientsModal(true)}
            className={`peer hover:cursor-pointer rounded p-4 w-full text-left outline outline-gray-500 focus:outline-2 focus:outline-black   bg-white
              ${toAccount || newRecipient ? 'text-black' : 'text-gray-400'}
              ${errors.recipientError ? 'outline-none border border-red-600 focus:ring-red-600 focus:border-2 ' : ''}`}
          >
            {toAccount
              ? toAccount.name
              : newRecipient
                ? newRecipient
                : 'Select an account'}
          </button>

          <label
            htmlFor="toAccount"
            className={`absolute hover:cursor-pointer left-4 px-1 transition-all duration-200 bg-white
              ${
                toAccount || newRecipient
                  ? '-top-2.5 font-semibold text-sm text-black'
                  : 'top-4 text-base text-gray-400 bg-transparent pr-15'
              }
              ${errors.recipientError ? ' peer-focus:text-red-600 ' : 'peer-focus:text-black'}
              
              peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:px-1 peer-focus:text-sm  
              peer-focus:bg-white`}
          >
            Recipient
          </label>
          {(toAccount || newRecipient) && (
            <button
              onClick={handleClearRecipient}
              type="button"
              aria-label="Clear recipient"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
            >
              &#10005;
            </button>
          )}
          {errors.recipientError && (
            <p className="text-red-600 text-sm mt-1">{errors.recipientError}</p>
          )}
        </div>

        {/* Amount */}
        <div className="relative w-full">
          <input
            min="0"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`peer rounded p-4 w-full border bg-white text-black
              ${errors.amount ? 'border-red-600 focus:ring-red-900 outline-none focus:border-2 ' : ' outline outline-gray-500 focus:outline-2 focus:outline-black'}`}
            
          />
          <label
            htmlFor="amount"
            className={`absolute left-4 px-1 bg-white transition-all duration-200
              ${amount ? '-top-2.5 font-semibold text-sm text-black' : 'top-4 text-base text-gray-400 bg-transparent'}
              ${errors.amount ? ' peer-focus:text-red-600 ' : 'peer-focus:text-black '}
              peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:text-sm peer-focus:bg-white`}
          >
            Amount
          </label>
          {errors.amount && (
            <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Transfer date */}
        <div className="relative w-full">
          <div
            className={`${errors.transferDate ? 'border border-red-500 rounded' : ''}`}
          >
            <DatePicker value={transferDate} onDateChange={setTransferDate} error={errors.transferDate}/>
          </div>
          {errors.transferDate && (
            <p className="text-red-600 text-sm mt-1">{errors.transferDate}</p>
          )}
        </div>

        {/* OCR */}
        <div className="relative w-full">
          <input
            type="text"
            id="ocr"
            value={ocr}
            onChange={(e) => setOcr(e.target.value)}
            className="peer text-black rounded px-5 py-4 outline outline-gray-500 focus:outline-2 focus:outline-black w-full placeholder-transparent bg-white"
            placeholder="OCR / Message"
          />
          <label
            htmlFor="ocr"
            className={`absolute left-4 px-1 bg-white transition-all duration-200
              ${ocr ? '-top-2.5 text-sm font-semibold text-black' : 'top-4 text-gray-400'}
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black`}
          >
            OCR <span className='text-xs'>(if applicable)</span>
          </label>
        </div>

        {/* Notes */}
        <div className="relative w-full">
          <textarea
            id="notes"
            value={notes}
            rows={4}
            className="peer text-black rounded px-5 pt-6 pb-2 bg-white outline outline-gray-500 focus:outline-2 focus:outline-black w-full placeholder-transparent resize-none"
            onChange={(e) => setNotes(e.target.value)}
          />
          <label
            htmlFor="notes"
            className={`absolute left-4 px-1 bg-white transition-all duration-200
              ${notes ? '-top-2.5 text-sm font-semibold text-black' : 'top-4 text-gray-400'}
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black`}
          >
            Notes <span className='text-xs'>(optional)</span>
          </label>
        </div>

        {/* Submit button */}
        <div className="relative w-full">
          <button
            type="submit"
            className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black font-semibold shadow-sm px-5 py-4 rounded hover:cursor-pointer transition-colors w-full"
          >
            Submit
          </button>
        </div>

        {/* Recipients modal */}
        {showRecipientsModal && (
          <RecipientsModal
            bankAccounts={bankAccounts}
            fromAccount={fromAccount}
            onSubmit={handleAccount}
            onClose={() => {
              setShowRecipientsModal(false)
            }}
          />
        )}
      </form>
    </>
  )
}
