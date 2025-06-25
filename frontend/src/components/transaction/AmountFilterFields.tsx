import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type AmountFilterProps = {
  onApply: (min: string, max: string) => void
}

export default function AmountFilterFields({ onApply }: AmountFilterProps) {
  const { t } = useTranslation('accounts')

  const [localMin, setLocalMin] = useState('')
  const [localMax, setLocalMax] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleInput = (value: string) => /^[0-9]*\.?[0-9]*$/.test(value)

  const handleApply = () => {
    const min = parseFloat(localMin)
    const max = parseFloat(localMax)

    if (
      localMin !== '' &&
      localMax !== '' &&
      !isNaN(min) &&
      !isNaN(max) &&
      min > max
    ) {
      setError(t('minGreaterThanMax'))
      return
    }

    setError(null)
    onApply(localMin, localMax)
  }

  const handleClear = () => {
    setLocalMin('')
    setLocalMax('')
    setError(null)
    onApply('', '')
  }

  return (
    <div className="">
      <div className="flex flex-col w-40 gap-y-2">
        <div className="flex justify-center gap-2">
          {/* Min Amount */}
          <input
            type="text"
            value={localMin}
            onChange={(e) => {
              if (handleInput(e.target.value)) setLocalMin(e.target.value)
            }}
            placeholder={t('minAmount')}
            className="border border-black rounded-4xl px-2 h-8 w-[100%] text-sm bg-white placeholder-gray-400"
          />

          {/* Max Amount */}
          <input
            type="text"
            value={localMax}
            onChange={(e) => {
              if (handleInput(e.target.value)) setLocalMax(e.target.value)
            }}
            placeholder={t('maxAmount')}
            className="border border-black rounded-4xl px-2 h-8 w-[100%] text-sm bg-white placeholder-gray-400"
          />
        </div>

        <div className="flex justify-center gap-2">
          {/* Search Button */}
          <button
            onClick={handleApply}
            className="bg-[#FFB20F] w-[100%] hover:bg-[#F5A700] text-black cursor-pointer px-2 py-1 rounded-4xl text-sm h-8"
          >
            {t('search')}
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="text-sm hover:bg-red-200 w-[100%] bg-white shadow-sm text-red-600 font-semibold cursor-pointer rounded-4xl h-8 px-2"
          >
            {t('clear')}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="text-sm text-red-600 font-medium">{error}</div>}
    </div>
  )
}
