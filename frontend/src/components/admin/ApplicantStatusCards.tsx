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

  const approved = data.filter((a) => a.status === 'APPROVED')
  const pending = data.filter((a) => a.status === 'PENDING')
  const rejected = data.filter((a) => a.status === 'DISAPPROVED')

  return (
    <div className="grid grid-cols-3 gap-4">
      <SectionCard
        badgeColor="green"
        label={t('label.approved')}
        value={approved.length.toString()}
        trajectory="-13%"
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />
      <SectionCard
        badgeColor="yellow"
        label={t('label.pending')}
        value={pending.length.toString()}
        trajectory="-13%"
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />

      <SectionCard
        badgeColor="red"
        label={t('label.rejected')}
        value={rejected.length.toString()}
        trajectory="-13%"
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />
    </div>
  )
}
