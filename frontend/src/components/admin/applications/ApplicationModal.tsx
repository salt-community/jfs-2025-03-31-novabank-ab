import React from 'react'
import type { Application } from '@/types/Application'

interface Props {
  app: Application
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  isLoadingApprove?: boolean
  isLoadingReject?: boolean
}

export const ApplicationModal: React.FC<Props> = ({
  app,
  onClose,
  onApprove,
  onReject,
  isLoadingApprove = false,
  isLoadingReject = false,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
    <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-6">
      <h2 className="text-xl mb-6">Application Details</h2>
      <div className="space-y-2 text-sm mb-8">
        <p>
          <strong>ID:</strong> {app.id}
        </p>
        <p>
          <strong>Applied:</strong> {new Date(app.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong> {app.status}
        </p>
        <p>
          <strong>Name:</strong> {app.firstName} {app.lastName}
        </p>
        <p>
          <strong>Personal Number:</strong> {app.personalNumber}
        </p>
        <p>
          <strong>Email:</strong> {app.email}
        </p>
        <p>
          <strong>Phone:</strong> {app.phoneNumber}
        </p>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 hover:cursor-pointer hover:opacity-70"
        >
          Cancel
        </button>
        <button
          onClick={() => onReject(app.id)}
          disabled={isLoadingReject}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 hover:cursor-pointer hover:opacity-70"
        >
          Reject
        </button>
        <button
          onClick={() => onApprove(app.id)}
          disabled={isLoadingApprove}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 hover:cursor-pointer hover:opacity-70"
        >
          Approve
        </button>
      </div>
    </div>
  </div>
)
