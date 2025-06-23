import { useTranslation } from 'react-i18next'
const LoansPage = () => {
  const { t } = useTranslation('loans')
  return (
    <div>
      <img src="https://media.licdn.com/dms/image/v2/D5612AQGAAOf1Nw56eg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1685448947293?e=2147483647&v=beta&t=9L2m66BVXDt5TwLOpE8YSftzNVy5KrawxcTk5ryqSDE"></img>
      {t('test')}
    </div>
  )
}

export default LoansPage
