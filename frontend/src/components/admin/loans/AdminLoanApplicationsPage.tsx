// AdminLoanApplicationsPage.tsx
import { useState } from 'react'
import { useApproveLoanApplication } from '@/hooks/useLoans'
import { useRejectLoanApplication } from '@/hooks/useLoans'
import { useLoanApplications } from '@/hooks/useLoans'
import type { LoanApplicationResponseDto } from '@/types/loan/LoanApplicationResponseDto'
import { LoanApplicationTable } from './LoanApplicationTable'
import { LoanApplicationModal } from './LoanApplicationModal'

const STATUS_OPTIONS = ['ALL', 'PENDING', 'APPROVED', 'DISAPPROVED'] as const
type Filter = (typeof STATUS_OPTIONS)[number]

export default function AdminLoanApplicationsPage() {
  const [page] = useState(0)
  const [size] = useState(10)
  const { data, isLoading } = useLoanApplications(page, size)
  const approve = useApproveLoanApplication()
  const reject = useRejectLoanApplication()
  const [selected, setSelected] = useState<LoanApplicationResponseDto | null>(
    null,
  )
  const [filter, setFilter] = useState<Filter>('ALL')

  if (isLoading)
    return (
      <div className="p-20 flex justify-center text-5xl items-center">
        <span className="animate-spin rounded-full h-30 w-30 border-t-3 border-b-3 border-[#FFB20F]" />
      </div>
    )

  const list = data?.loanApplications ?? []
  const filtered = list.filter((app) =>
    filter === 'ALL' ? true : app.status === filter,
  )

  console.log('Filtered applications:', filtered)

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl mb-6">Loan Applications</h1>

        <div className="mb-4">
          <label className="mr-2 font-medium">Show:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
            className="px-2 py-1 border rounded"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <LoanApplicationTable applications={filtered} onReview={setSelected} />
      </div>

      {selected && (
        <LoanApplicationModal
          app={selected}
          onClose={() => setSelected(null)}
          onApprove={approve.mutate}
          onReject={reject.mutate}
          isLoadingApprove={approve.isPending}
          isLoadingReject={reject.isPending}
        />
      )}
    </>
  )
}
