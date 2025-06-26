import { useTranslation } from 'react-i18next'
import Tick from './Tick'
import { useNavigate } from '@tanstack/react-router'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
const LoansPage = () => {
  const { t } = useTranslation('loans')
  const navigate = useNavigate()
  return (
    <div className="mx-auto px-4 sm:px-10">
      <div className="flex flex-col sm:flex-row items-start gap-8 justify-center mt-10 sm:mt-20">
        <div className="max-w-full sm:w-[40vw]">
          <h1 className="text-2xl sm:text-4xl mb-6 sm:mb-10">
            {t('loanTitle')}
          </h1>

          <div className="space-y-2">
            {[
              t('individualInterest'),
              t('personalAdvice'),
              t('increasedSecurity'),
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2 min-h-[48px]">
                <div className="flex-shrink-0">
                  <Tick width={30} />
                </div>
                <h3 className="text-base sm:text-xl">{text}</h3>
              </div>
            ))}
          </div>

          <div className="flex items-center mb-2 mt-6 sm:mt-10">
            <h3 className="text-lg sm:text-2xl">{t('justNow')}</h3>
          </div>

          <div className="flex justify-center sm:justify-start">
            <SignedIn>
              <button
                onClick={() => {
                  navigate({ to: '/loans/register' })
                }}
                type="submit"
                className="bg-[#FFB20F] mt-6 sm:mt-10 hover:bg-[#F5A700] text-black shadow-sm px-4 py-2 rounded-2xl hover:cursor-pointer transition-colors w-52 sm:w-60 text-sm sm:text-base"
              >
                {t('applyForLoanPromise')}
              </button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#FFB20F] mt-6 sm:mt-10 hover:bg-[#F5A700] text-black shadow-sm px-4 py-2 rounded-2xl hover:cursor-pointer transition-colors w-60 sm:w-70 text-sm sm:text-base">
                  {t('signInToApplyForALoan')}
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
        <img
          className="hidden sm:block mb-10"
          src="https://media.licdn.com/dms/image/v2/D5612AQGAAOf1Nw56eg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1685448947293?e=2147483647&v=beta&t=9L2m66BVXDt5TwLOpE8YSftzNVy5KrawxcTk5ryqSDE"
        ></img>
      </div>

      <hr className="mt-10 mx-4 sm:mx-10" />

      <div className="flex flex-col items-center justify-center w-full sm:w-[40vw] mx-auto text-center px-2">
        <p className="mt-6 sm:mt-10 text-base sm:text-2xl">
          {t('loanContextInfo')}
        </p>
        <p className="mt-4 sm:mt-5 text-base sm:text-2xl">
          {t('loanContextInfo2')}
        </p>
        <p className="mt-4 sm:mt-5 mb-6 sm:mb-5 text-base sm:text-2xl">
          {t('loanContextInfo3')}
        </p>
      </div>

      <hr className="mt-10 mx-4 sm:mx-10" />

      <div className="flex flex-col sm:flex-row justify-center items-center mb-10 gap-6 sm:gap-20 mt-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-bold">3,04 %</h1>
          <p className="text-sm sm:text-lg mt-2">{t('threeMonthsAgoInfo')} →</p>
        </div>
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-bold">4,04 %</h1>
          <p className="text-sm sm:text-lg mt-2">
            {t('threeMonthsListedRate')} →
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoansPage
