// components/LoanApplicationModal.tsx
import React from 'react'
import type { LoanApplicationResponseDto } from '@/types/loan/LoanApplicationResponseDto'

interface Props {
  app: LoanApplicationResponseDto
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  isLoadingApprove?: boolean
  isLoadingReject?: boolean
}

export const LoanApplicationModal: React.FC<Props> = ({
  app,
  onClose,
  onApprove,
  onReject,
  isLoadingApprove = false,
  isLoadingReject = false,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Application Details</h2>

        {isLoadingApprove || isLoadingReject ? (
          <div className="p-20 flex justify-center text-5xl items-center">
            <span className="animate-spin rounded-full h-30 w-30 border-t-3 border-b-3 border-[#FFB20F]" />
          </div>
        ) : (
          <div className="space-y-2 text-sm mb-6">
            <p>
              <strong>ID:</strong> {app.id}
            </p>
            <p>
              <strong>Applicant:</strong> {app.user.firstName}{' '}
              {app.user.lastName}
            </p>
            <p>
              <strong>Amount:</strong> {app.amount.toLocaleString()}
            </p>
            <p>
              <strong>Rate:</strong> {app.interestRate}%
            </p>
            <p>
              <strong>Status:</strong> {app.status}
            </p>
            <p>
              <strong>Submitted:</strong>{' '}
              {new Date(app.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Requested due date:</strong>{' '}
              {new Date(app.requestedDueDate).toLocaleString()}
            </p>
            <p>
              <strong>Note:</strong> {app.note}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:opacity-70 transition hover:cursor-pointer"
          >
            Close
          </button>

          {/* show buttons only when still pending */}
          {app.status === 'PENDING' && (
            <>
              <button
                onClick={() => onReject(app.id)}
                disabled={isLoadingReject}
                className="px-4 py-2 bg-red-500 text-white rounded hover:opacity-70 transition hover:cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => onApprove(app.id)}
                disabled={isLoadingApprove}
                className="px-4 py-2 bg-green-500 text-white rounded hover:opacity-70 transition hover:cursor-pointer"
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
