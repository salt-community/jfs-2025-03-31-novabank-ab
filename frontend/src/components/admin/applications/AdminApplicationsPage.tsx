import { useState } from 'react'
import {
  useApplications,
  useApproveApplication,
  useRejectApplication,
} from '@/hooks/useApplications'
import type { Application } from '@/types/Application'
import { ApplicationTable } from './ApplicationTable'
import { ApplicationModal } from './ApplicationModal'
import type { ApplicationStatus } from '@/types/Application'

const STATUS_OPTIONS: Array<ApplicationStatus | 'ALL'> = [
  'ALL',
  'PENDING',
  'APPROVED',
  'DISAPPROVED',
]

export default function AdminApplicationsPage() {
  const { data = [], isLoading } = useApplications()
  const approve = useApproveApplication()
  const reject = useRejectApplication()
  const [selected, setSelected] = useState<Application | null>(null)
  const [filter, setFilter] = useState<'ALL' | ApplicationStatus>('ALL')
  if (isLoading)
    return (
      <div className="p-20 flex justify-center text-5xl items-center">
        <span className="animate-spin rounded-full h-30 w-30 border-t-3 border-b-3 border-[#FFB20F]"></span>
      </div>
    )

  // apply filter
  const filtered = data.filter((app) =>
    filter === 'ALL' ? true : app.status === filter,
  ) as Application[]

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl mb-10">Applications</h1>

        {/* Filter control */}
        <div className="mb-4">
          <label className="mr-2 font-medium">Show:</label>
          <select
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilter(e.target.value as 'ALL' | ApplicationStatus)
            }
            className="px-2 py-1 border rounded"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <ApplicationTable applications={filtered} onReview={setSelected} />
      </div>

      {selected && (
        <ApplicationModal
          app={selected}
          onClose={() => setSelected(null)}
          approve={approve}
          reject={reject}
          isLoadingApprove={approve.isPending}
          isLoadingReject={reject.isPending}
        />
      )}
    </>
  )
}
