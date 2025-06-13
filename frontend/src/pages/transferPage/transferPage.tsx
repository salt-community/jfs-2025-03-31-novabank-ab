import { useState, type FormEvent } from 'react'
import RecipientsModal from '@/components/transfer/RecipientsModal'
import DatePicker from '@/components/transfer/DatePicker'

type Account = {
  accountName: string
  accountNumber: string
  balance: number
}

type TransferPageProps = {
  bankAccounts: Array<Account>
}

export default function TransferPage({ bankAccounts }: TransferPageProps) {
  const [showRecipientsModal, setShowRecipientsModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [ocr, setOcr] = useState('')
  const [fromAccount, setFromAccount] = useState<Account | null>(null)
  const [toAccount, setToAccount] = useState<Account | null>(null)
  const [transferDate, setTransferDate] = useState<string | null>(null)
  const [dateError, setDateError] = useState('')

  const handleAccount = (account: Account | null) => {
    setToAccount(account)
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!transferDate) {
      setDateError('Transfer date is required')
      return
    }
    if (!toAccount) {
      alert('Please select a recipient account')
      return
    }
    setDateError('')
  }

  return (
    <>
      <h1 className="text-3xl">New transfer</h1>
      <form onSubmit={handleSubmit} className="space-y-5 mt-20 max-w-3xl">
        {/* From account */}
        <div className="relative w-full">
          <select
            required
            id="fromAccount"
            name="bankaccounts"
            value={fromAccount?.accountName}
            onChange={(e) => {
              const selectedAccount = bankAccounts.find(
                (acc) => acc.accountName === e.target.value,
              )
              setFromAccount(selectedAccount || null)
            }}
            className={`peer hover:cursor-pointer border border-gray-500 
              border-r-15 border-transparent outline outline-neutral-700 
              rounded p-4 focus:ring-1 focus:ring-black w-full bg-white
              ${fromAccount ? 'text-black' : 'text-gray-400'}`}
          >
            <option value="" className="text-gray-400">
              Select an account
            </option>
            {bankAccounts.map((account) => {
              const isDisabled =
                toAccount?.accountNumber === account.accountNumber

              return (
                <option
                  key={account.accountNumber}
                  value={account.accountName}
                  disabled={isDisabled}
                  className={`text-black ${
                    isDisabled ? 'bg-gray-200 text-gray-400' : ''
                  }`}
                >
                  {account.accountName}
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
                            ? '-top-2.5 text-sm text-black'
                            : 'top-4 text-base text-gray-400 bg-transparent pr-10'
                        }
                        peer-focus:-top-2.5 peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
                        peer-focus:bg-white `}
          >
            From account
          </label>
        </div>

        {/* To account */}
        <div className="relative w-full">
          <button
            id="toAccount"
            type="button"
            onClick={() => setShowRecipientsModal(true)}
            className={`peer hover:cursor-pointer border border-gray-500 text-black rounded 
                        p-4 w-full text-left focus:ring-1 focus:ring-black bg-white
                        ${toAccount ? 'text-black' : 'text-gray-400'}`}
          >
            {toAccount ? toAccount.accountName : 'Select an account'}
          </button>

          <label
            htmlFor="toAccount"
            className={`absolute hover:cursor-pointer left-4 px-1  transition-all duration-200 bg-white
                        ${
                          toAccount
                            ? '-top-2.5 text-sm text-black'
                            : 'top-4 text-base text-gray-400 bg-transparent pr-15'
                        }
                        peer-focus:-top-2.5 peer-focus:px-1 peer-focus:text-sm peer-focus:text-black 
                        peer-focus:bg-white`}
          >
            To account
          </label>
        </div>

        {/* Amount */}
        <div className="relative w-full">
          <input
            required
            min="0"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="peer border border-gray-500 text-black rounded p-4 focus:ring-1 focus:ring-black 
                        w-full placeholder-transparent bg-white"
            placeholder="Amount"
          />
          <label
            htmlFor="amount"
            className={`absolute hover:cursor-text left-4 px-1  bg-white transition-all duration-200
                        ${
                          amount
                            ? '-top-2.5 text-sm text-black'
                            : 'top-4 text-base text-gray-400 bg-transparent'
                        }
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white`}
          >
            Amount
          </label>
        </div>

        {/* Transfer date */}
        <div>
          <DatePicker value={transferDate} onDateChange={setTransferDate} />
          {dateError && (
            <p className="text-red-600 text-sm mt-1">{dateError}</p>
          )}
        </div>

        {/* OCR / Message */}
        <div className="relative w-full">
          <input
            type="text"
            id="ocr"
            value={ocr}
            onChange={(e) => setOcr(e.target.value)}
            className="peer border border-gray-500 text-black rounded px-5 py-4 focus:ring-1 focus:ring-black 
                        w-full placeholder-transparent bg-white"
            placeholder="OCR / Message"
          />
          <label
            htmlFor="ocr"
            className={`absolute hover:cursor-text left-4 px-1  bg-white transition-all duration-200
                        ${
                          ocr
                            ? '-top-2.5 text-sm text-black'
                            : 'top-4 text-base text-gray-400 bg-transparent'
                        }
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white`}
          >
            OCR / Message
          </label>
        </div>

        {/* Notes */}
        <div className="relative w-full">
          <textarea
            id="notes"
            rows={4}
            className="peer border border-gray-500 text-black rounded px-5 pt-6 pb-2 bg-white focus:outline-none 
                       focus:ring-1 focus:ring-black w-full placeholder-transparent resize-none"
            placeholder="Write anything important..."
          />
          <label
            htmlFor="notes"
            className="absolute hover:cursor-text left-4 px-1  bg-white transition-all duration-200 top-4 text-base 
                      text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white"
          >
            Notes
          </label>
        </div>

        {/* Submit button */}
        <div className="relative w-full">
          <button
            type="submit"
            className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black font-semibold shadow-sm px-5 py-2 rounded 
                       hover:cursor-pointer transition-colors w-full"
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
            onClose={() => setShowRecipientsModal(false)}
          />
        )}
      </form>
    </>
  )
}
