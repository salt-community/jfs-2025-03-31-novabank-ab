import { useTranslation } from 'react-i18next'
type NotesProps = {
  notes: string
  setNotes: React.Dispatch<React.SetStateAction<string>>
}

export default function Notes({ notes, setNotes }: NotesProps) {
  const { t } = useTranslation('accounts')
  return (
    <>
      {/* Notes */}
      <div className="relative w-full">
        <textarea
          id="notes"
          value={notes}
          rows={4}
          className="peer text-black rounded-md shadow-md px-5 pt-6 pb-2 bg-white outline outline-gray-200 focus:outline-2 focus:outline-black w-full placeholder-transparent resize-none"
          onChange={(e) => {
            setNotes(e.target.value)
          }}
        />
        <label
          htmlFor="notes"
          className={`absolute left-4 px-1 bg-white transition-all duration-200 rounded-lg
                      ${notes ? '-top-2.5 text-sm font-semibold text-black' : 'top-4 text-gray-400'}
                      peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black`}
        >
          {t('notes')} <span className="text-xs">({t('optional')})</span>
        </label>
      </div>
    </>
  )
}
