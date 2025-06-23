import { useTranslation } from 'react-i18next'
import SectionCard from './SectionCard'
import { useApplications } from '@/hooks/useApplications'

export default function ApplicantStatusCards() {
  const { t } = useTranslation('adminApplicationStatusCards')

  const { data, isLoading, error } = useApplications()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }
  if (!data) {
    return <div>No data found.</div>
  }

  const now = new Date()
  const thisMonthNum = now.getMonth()
  const thisMonthYear = now.getFullYear()
  const lastMonthNum = thisMonthNum === 0 ? 11 : thisMonthNum - 1
  const lastMonthYear = thisMonthNum === 0 ? thisMonthYear - 1 : thisMonthYear

  const thisMonth = data.filter((d) => {
    const date = new Date(d.updatedAt)
    return (
      date.getMonth() === thisMonthNum && date.getFullYear() === thisMonthYear
    )
  })

  console.log('this month', thisMonth)

  const lastMonth = data.filter((d) => {
    const date = new Date(d.updatedAt)

    return (
      date.getMonth() === lastMonthNum && date.getFullYear() === lastMonthYear
    )
  })

  const approved = thisMonth.filter((a) => a.status === 'APPROVED')
  const pending = thisMonth.filter((a) => a.status === 'PENDING')
  const rejected = thisMonth.filter((a) => a.status === 'DISAPPROVED')

  const approvedLastMonth = lastMonth.filter((a) => a.status === 'APPROVED')
  const pendingLastMonth = lastMonth.filter((a) => a.status === 'PENDING')
  const rejectedLastMonth = lastMonth.filter((a) => a.status === 'DISAPPROVED')

  function getPercentChange(current: number, previous: number): string {
    if (previous === 0) {
      if (current === 0) return '0%'
      return '+100%'
    }
    const change = ((current - previous) / previous) * 100
    const sign = change > 0 ? '+' : ''
    return `${sign}${Math.round(change)}%`
  }

  const thisMonthData = {
    approvedCount: approved.length,
    pendingCount: pending.length,
    rejectedCount: rejected.length,
  }

  const lastMonthData = {
    approvedLastMonthCount: approvedLastMonth.length,
    pendingLastMonthCount: pendingLastMonth.length,
    rejectedLastMonthCount: rejectedLastMonth.length,
  }

  const approvedPercent = getPercentChange(
    thisMonthData.approvedCount,
    lastMonthData.approvedLastMonthCount,
  )
  const pendingPercent = getPercentChange(
    thisMonthData.pendingCount,
    lastMonthData.pendingLastMonthCount,
  )
  const rejectedPercent = getPercentChange(
    thisMonthData.rejectedCount,
    lastMonthData.rejectedLastMonthCount,
  )

  return (
    <div className="grid grid-cols-3 gap-4">
      <SectionCard
        badgeColor="green"
        label={t('label.approved')}
        value={approved.length.toString()}
        trajectory={approvedPercent}
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />
      <SectionCard
        badgeColor="yellow"
        label={t('label.pending')}
        value={pending.length.toString()}
        trajectory={pendingPercent}
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />

      <SectionCard
        badgeColor="red"
        label={t('label.rejected')}
        value={rejected.length.toString()}
        trajectory={rejectedPercent}
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />
    </div>
  )
}
