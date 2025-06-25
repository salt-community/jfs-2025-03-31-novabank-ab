import { AdminTransactionsTable } from '@/components/admin/TransactionsTable'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAdminTransactions } from '@/hooks/useAdminTransactions'
import type { Transaction } from '@/types'
import { useState } from 'react'

export default function AdminTransactions() {
  const { data, error, isLoading } = useAdminTransactions()
  const [modalData, setModalData] = useState<Transaction | undefined>(undefined)
  const [modalOpen, setModalOpen] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }
  if (!data) {
    return <div>No data found.</div>
  }
  return (
    <div>
      <h1 className="text-3xl m-6">All Transactions</h1>

      <AdminTransactionsTable
        setModalOpen={setModalOpen}
        setModalData={setModalData}
        data={data}
      />

      {modalData && (
        <Dialog
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open)
            if (!open) setModalData(undefined)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Id: {modalData.transactionId}</DialogTitle>
              <DialogDescription>
                <div>
                  <div>
                    <strong>From Account:</strong> {modalData.fromAccountId}
                  </div>
                  <div>
                    <strong>To Account:</strong> {modalData.toAccountId}
                  </div>
                  <div>
                    <strong>Date:</strong> {modalData.date}
                  </div>
                  <div>
                    <strong>Amount:</strong>{' '}
                    {modalData.amount.toLocaleString('sv-SE', {
                      style: 'currency',
                      currency: 'SEK',
                    })}
                  </div>
                  <div>
                    <strong>Description:</strong> {modalData.description}
                  </div>
                  <div>
                    <strong>User Note:</strong> {modalData.userNote}
                  </div>
                  <div>
                    <strong>OCR Number:</strong> {modalData.ocrNumber}
                  </div>
                  <div>
                    <strong>Type:</strong> {modalData.type}
                  </div>
                  <div>
                    <strong>Status:</strong> {modalData.status}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
