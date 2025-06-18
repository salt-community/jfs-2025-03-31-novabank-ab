import { useTranslation } from 'react-i18next'

type OcrProps = {
  ocr: string
  setOcr: React.Dispatch<React.SetStateAction<string>>
  error?: string
}

export default function Ocr({ ocr, setOcr, error }: OcrProps) {
  const { t } = useTranslation('accounts')
  return (
    <>
      {/* OCR */}
      <div className="relative w-full">
        <input
          type="text"
          id="ocr"
          value={ocr}
          onChange={(e) => {
            setOcr(e.target.value)
          }}
          className={`peer rounded-md shadow-md p-4 w-full border bg-white text-black
                      ${error ? 'border-red-600 focus:ring-red-900 outline-none focus:border-2 ' : ' outline outline-gray-200 focus:outline-2 focus:outline-black'}`}
        />
        <label
          htmlFor="ocr"
          className={`absolute left-4 px-1 bg-white transition-all duration-200 rounded-lg
                      ${ocr ? '-top-2.5 font-semibold text-sm text-black' : 'top-4 text-base text-gray-400 bg-transparent'}
                      ${error ? 'peer-focus:text-red-600' : 'peer-focus:text-black '}
                      peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:text-sm peer-focus:bg-white`}
        >
          OCR <span className="text-xs">({t('ifApplicable')})</span>
        </label>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    </>
  )
}
