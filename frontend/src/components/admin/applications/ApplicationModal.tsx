import React from 'react'
import type { Application } from '@/types/Application'
import type { UseMutationResult } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'

interface Props {
  app: Application
  onClose: () => void
  approve: UseMutationResult<void, Error, string, unknown>
  reject: UseMutationResult<void, Error, string, unknown>
  isLoadingApprove?: boolean
  isLoadingReject?: boolean
}

export const ApplicationModal: React.FC<Props> = ({
  app,
  onClose,
  approve,
  reject,
  isLoadingApprove = false,
  isLoadingReject = false,
}) => {
  const isFinal = app.status === 'APPROVED' || app.status === 'DISAPPROVED'

  function handleStatusChange(appId: string, type: 'reject' | 'approve') {
    switch (type) {
      case 'approve':
        approve.mutate(appId)
        break

      case 'reject':
        reject.mutate(appId)
        break

      default:
        break
    }
  }

  function handleClose() {
    approve.reset()
    reject.reset()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Application Details</h2>
        <div className="space-y-2 text-sm mb-6">
          {isLoadingApprove || isLoadingReject ? (
            <div className="p-20 flex justify-center text-5xl items-center">
              <span className="animate-spin rounded-full h-30 w-30 border-t-3 border-b-3 border-[#FFB20F]"></span>
            </div>
          ) : (
            <div>
              <p>
                <strong>ID:</strong> {app.id}
              </p>
              <p>
                <strong>Created At:</strong>{' '}
                {new Date(app.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>
              <p>
                <strong>First Name:</strong> {app.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {app.lastName}
              </p>
              <p>
                <strong>Personal Number:</strong> {app.personalNumber}
              </p>
              <p>
                <strong>Email:</strong> {app.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {app.phoneNumber}
              </p>
              {app.status === 'APPROVED' && (
                <Badge className="bg-green-500 text-white">Approved</Badge>
              )}
              {app.status === 'DISAPPROVED' && (
                <Badge className="bg-red-500 text-white">Rejected</Badge>
              )}
            </div>
          )}
        </div>

        {approve.isSuccess && (
          <Badge className="bg-green-500 text-white">Approved</Badge>
        )}
        {reject.isSuccess && (
          <Badge className="bg-red-500 text-white">Rejected</Badge>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:opacity-70 transition hover:cursor-pointer disabled:opacity-50"
          >
            Close
          </button>

          {!isFinal && !approve.isSuccess && !reject.isSuccess && (
            <>
              <button
                onClick={() => handleStatusChange(app.id, 'reject')}
                disabled={isLoadingReject}
                className="px-4 py-2 bg-red-500 text-white rounded hover:opacity-70 transition hover:cursor-pointer disabled:opacity-50"
              >
                Dissapprove
              </button>
              <button
                onClick={() => handleStatusChange(app.id, 'approve')}
                disabled={isLoadingApprove}
                className="px-4 py-2 bg-green-500 text-white rounded hover:opacity-70 transition hover:cursor-pointer disabled:opacity-50"
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
