import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Account } from '@/types'
import Sender from './Sender'
import Recipient from './Recipient'
import Amount from './Amount'
import TransferDate from './TransferDate'
import Notes from './Notes'
import Ocr from './Ocr'

export default function TransferForm() {
  const [amount, setAmount] = useState('')
  const [sender, setSender] = useState<Account | null>(null)
  const [recipientAccount, setRecipientAccount] = useState<Account | null>(null)
  const [recipientClient, setRecipientClient] = useState<string | null>(null)
  const [transferDate, setTransferDate] = useState<string | null>(null)
  const [ocr, setOcr] = useState('')
  const [notes, setNotes] = useState('')
  const [accNoType, setAccNoType] = useState('')

  const [errors, setErrors] = useState<{
    sender?: string
    recipientError?: string
    amount?: string
    transferDate?: string
  }>({})

  const isFormValid = (): boolean => {
    const newErrors: typeof errors = {}

    if (!sender) newErrors.sender = 'Please select a sender account'
    const hasRecipient = !!recipientAccount || !!recipientClient
    if (!hasRecipient)
      newErrors.recipientError = 'Please select a recipient account'
    if (!amount || parseFloat(amount) <= 0)
      newErrors.amount = 'Please enter a valid amount'
    if (!transferDate) newErrors.transferDate = 'Transfer date is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    if (!transferDate) return // safety check

    const now = new Date()
    const selectedDate = new Date(transferDate)

    // Helper to check if selectedDate is the same day as now
    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()

    if (isSameDay(selectedDate, now)) {
      // Immediate transaction (transfer today)
      const transactionPayload = {
        toAccountNo: recipientAccount?.accountNumber ?? recipientClient,
        fromAccountNo: sender?.accountNumber ?? '',
        timestamp: new Date().toISOString(), // actual current timestamp for immediate transfer
        amount: parseFloat(amount),
        description: notes || '', //what is description???
        OCR: ocr || '',
        userNote: notes || '',
      }

      // Send transactionPayload to immediate transaction API endpoint
      //console.log('Send immediate transaction:', transactionPayload)
    } else {
      // Scheduled transaction (transfer future date)
      const scheduledPayload = {
        toAccountNo: recipientAccount?.accountNumber ?? recipientClient,
        fromAccountNo: sender?.accountNumber ?? '',
        scheduledTime: selectedDate.toISOString(), // scheduled transfer time
        amount: parseFloat(amount),
        description: notes || '',
        createdAt: new Date().toISOString(), // current timestamp for creation
        OCR: ocr || '',
        userNote: notes || '',
      }

      // Send scheduledPayload to scheduled transaction API endpoint
      //console.log('Send scheduled transaction:', scheduledPayload)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
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
          accNoType={accNoType}
          setAccNoType={setAccNoType}
        />

        <Amount amount={amount} setAmount={setAmount} error={errors.amount} />

        <TransferDate
          transferDate={transferDate}
          setTransferDate={setTransferDate}
          error={errors.transferDate}
        />

        <Ocr ocr={ocr} setOcr={setOcr} />

        <Notes notes={notes} setNotes={setNotes} />

        {/* Submit button */}
        <div className="relative w-full">
          <button
            type="submit"
            className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black font-semibold 
                       shadow-sm px-5 py-4 rounded hover:cursor-pointer transition-colors w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
