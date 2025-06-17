import React from 'react'
import type { Application } from '@/types/Application'

interface Props {
  applications: Application[]
  onReview: (app: Application) => void
}

export const ApplicationTable: React.FC<Props> = ({
  applications,
  onReview,
}) => (
  <div className="overflow-x-auto shadow-sm">
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Name
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            PN
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Applied
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
              {app.firstName} {app.lastName}
            </td>
            <td className="px-4 py-2">{app.personalNumber}</td>
            <td className="px-4 py-2">
              {new Date(app.createdAt).toLocaleString()}
            </td>
            <td className="px-4 py-2">{app.status}</td>
            <td className="px-4 py-2 text-center">
              <button
                className="px-3 py-1 bg-[#FFB20F] text-black rounded hover:opacity-70 transition hover:cursor-pointer"
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
