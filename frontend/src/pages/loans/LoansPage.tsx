import { useTranslation } from 'react-i18next'
import Tick from './Tick'
import { useNavigate } from '@tanstack/react-router'
const LoansPage = () => {
  const { t } = useTranslation('loans')
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex flex-row items-center justify-center mt-20">
        <div>
          <h1 className="text-4xl w-[30vw] mb-17">{t('loanTitle')}</h1>
          <div className="flex items-center">
            <Tick width={50} />
            <h3 className="text-xl">{t('individualInterest')}</h3>
          </div>

          <div className="flex items-center">
            <Tick width={50} />
            <h3 className="text-xl">{t('personalAdvice')}</h3>
          </div>
          <div className="flex items-center">
            <Tick width={50} />
            <h3 className="text-xl">{t('increasedSecurity')}</h3>
          </div>
          <div className="flex items-center mt-17">
            <h3 className="text-2xl font-bold">{t('justNow')}</h3>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                navigate({ to: '/loans/register' })
              }}
              type="submit"
              className="bg-[#FFB20F] mt-5 hover:bg-[#F5A700] text-black font-semibold shadow-sm px-5 py-2 rounded-2xl hover:cursor-pointer transition-colors w-60"
            >
              {t('applyForLoanPromise')}
            </button>
          </div>
        </div>
        <img src="https://media.licdn.com/dms/image/v2/D5612AQGAAOf1Nw56eg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1685448947293?e=2147483647&v=beta&t=9L2m66BVXDt5TwLOpE8YSftzNVy5KrawxcTk5ryqSDE"></img>
      </div>
      <hr className="mt-10 ml-50 mr-50" />
      <div className="flex flex-col items-center justify-center wrap-normal w-[40vw] mx-auto">
        <p className="mt-5 text-2xl">{t('loanContextInfo')}</p>
        <p className="mt-5 text-2xl">{t('loanContextInfo2')}</p>
        <p className="mt-5 text-2xl">{t('loanContextInfo3')}</p>
      </div>
      <hr className="mt-10 ml-50 mr-50" />
      <div className="flex justify-center gap-20 mt-5">
        <div>
          <h1 className="text-5xl font-bold">3,04 %</h1>
          <p className="text-lg mt-2">{t('threeMonthsAgoInfo')} →</p>
        </div>
        <div>
          <h1 className="text-5xl font-bold">4,04 %</h1>
          <p className="text-lg mt-2">{t('threeMonthsListedRate')} →</p>
        </div>
      </div>
    </div>
  )
}

export default LoansPage
