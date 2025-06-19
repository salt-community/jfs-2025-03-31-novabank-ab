import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

type AmountProps = {
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  error: string | undefined
}

export default function Amount({
  amount,
  setAmount,
  error,
}: AmountProps) {
  const { t } = useTranslation('accounts')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const inputEl = inputRef.current
    if (!inputEl) return

    function preventScroll(e: WheelEvent) {
      if (document.activeElement === inputEl) {
        e.preventDefault()
      }
    }

    inputEl.addEventListener('wheel', preventScroll, { passive: false })

    return () => {
      inputEl.removeEventListener('wheel', preventScroll)
    }
  }, [])

  return (
    <>
      {/* Amount */}
      <div className="relative w-full">
        <input
          ref={inputRef}
          min="0"
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
          className={`peer rounded-md shadow-md p-4 w-full border bg-white text-black
                      ${error ? 'border-red-600 focus:ring-red-900 outline-none focus:border-2 ' : ' outline outline-gray-200 focus:outline-2 focus:outline-black'}`}
        />
        <label
          htmlFor="amount"
          className={`absolute left-4 px-1 bg-white transition-all duration-200 rounded-lg
                      ${amount ? '-top-2.5 font-semibold text-sm text-black' : 'top-4 text-base text-gray-400 bg-transparent'}
                      ${error ? ' peer-focus:text-red-600 ' : 'peer-focus:text-black '}
                      peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:text-sm peer-focus:bg-white`}
        >
          {t('amount')}
        </label>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    </>
  )
}
