// LoanApplicationTable.tsx
import React from 'react'
import type { LoanApplicationResponseDto } from '@/types/loan/LoanApplicationResponseDto'

interface Props {
  applications: LoanApplicationResponseDto[]
  onReview: (app: LoanApplicationResponseDto) => void
}

export const LoanApplicationTable: React.FC<Props> = ({
  applications,
  onReview,
}) => (
  <div className="overflow-x-auto shadow-sm">
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Applicant
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Amount
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Term
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Status
          </th>
          <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id} className="border-t border-gray-200">
            <td className="px-4 py-2">
              {app.user.firstName} {app.user.lastName}
            </td>
            <td className="px-4 py-2">{app.amount.toLocaleString()}</td>
            <td className="px-4 py-2">{app.termMonths} mo</td>
            <td className="px-4 py-2">{app.status}</td>
            <td className="px-4 py-2 text-center">
              <button
                className="px-3 py-1 bg-[#FFB20F] text-black rounded hover:opacity-70 transition"
                onClick={() => onReview(app)}
              >
                Review
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
