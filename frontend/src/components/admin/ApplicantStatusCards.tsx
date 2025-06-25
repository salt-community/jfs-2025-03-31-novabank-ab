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
    console.log('Percentages', { current: current, previous: previous })
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

  function getFineText(
    percentageDiff: string,
    cardType: 'approved' | 'pending' | 'rejected',
  ) {
    const isPositive = percentageDiff.charAt(0) === '+'
    const isNegative = percentageDiff.charAt(0) === '-'
    const isNeutral = !isNegative && !isPositive
    const absValue = parseInt(
      percentageDiff.replace('%', '').replace('+', '').replace('-', ''),
    )

    if (isNeutral || absValue === 0) {
      return 'No significant change from last month'
    }

    switch (cardType) {
      case 'approved':
        if (isPositive)
          return `Great! Approvals increased by ${percentageDiff} compared to last month.`
        if (isNegative)
          return `Warning: Approvals decreased by ${percentageDiff} compared to last month.`
        return ''
      case 'pending':
        if (isPositive)
          return `More pending applications (${percentageDiff}) than last month.`
        if (isNegative)
          return `Fewer pending applications (${percentageDiff}) than last month.`
        return ''
      case 'rejected':
        if (isPositive)
          return `Caution: Rejections increased by ${percentageDiff} compared to last month.`
        if (isNegative)
          return `Good news! Rejections decreased by ${percentageDiff} compared to last month.`
        return ''
      default:
        return ''
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <SectionCard
        badgeColor="green"
        label={t('label.approved')}
        value={approved.length.toString()}
        trajectory={approvedPercent}
        fineText={getFineText(approvedPercent, 'approved')}
        redirectLink="admin/applications"
      />
      <SectionCard
        badgeColor="yellow"
        label={t('label.pending')}
        value={pending.length.toString()}
        trajectory={pendingPercent}
        fineText={getFineText(pendingPercent, 'pending')}
        redirectLink="admin/applications"
      />

      <SectionCard
        badgeColor="red"
        label={t('label.rejected')}
        value={rejected.length.toString()}
        trajectory={rejectedPercent}
        fineText={getFineText(rejectedPercent, 'rejected')}
        redirectLink="admin/applications"
      />
    </div>
  )
}
