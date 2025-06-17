import { useTranslation } from 'react-i18next'
import SectionCard from './SectionCard'

export default function ApplicantStatusCards() {
  const { t } = useTranslation('adminApplicationStatusCards')

  return (
    <div className="grid grid-cols-3 gap-4">
      <SectionCard
        badgeColor="green"
        label={t('label.approved')}
        value="4440"
        trajectory="-13%"
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />
      <SectionCard
        badgeColor="yellow"
        label={t('label.pending')}
        value="4440"
        trajectory="-13%"
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />

      <SectionCard
        badgeColor="red"
        label={t('label.rejected')}
        value="4440"
        trajectory="-13%"
        fineText="Acqusition needs attention"
        redirectLink="admin/applications"
      />
    </div>
  )
}
