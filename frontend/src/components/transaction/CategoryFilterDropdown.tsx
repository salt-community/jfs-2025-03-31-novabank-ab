import { useTranslation } from 'react-i18next'

type CategoryFilterProps = {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

const CATEGORY_OPTIONS = [
  'food',
  'leisure',
  'utilities',
  'rent',
  'salary',
  'travel',
  'other',
]

export default function CategoryFilterDropdown({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const { t } = useTranslation('accounts') // or 'transactions' if that's better scoped

  return (
    <div className="w-40">
      <select
        id="categoryFilter"
        value={selectedCategory || ''}
        onChange={(e) => {
          const value = e.target.value
          setSelectedCategory(value === '' ? null : value)
        }}
        className={`
          border-1 border-black cursor-pointer rounded-4xl px-2 w-full  
          text-left bg-white h-8
        `}
      >
        <option value="" className="text-gray-400 text-sm">
          {t('allCategories')}
        </option>
        {CATEGORY_OPTIONS.map((category) => (
          <option key={category} value={category} className="text-black">
            {t(category)}
          </option>
        ))}
      </select>

      <label
        htmlFor="categoryFilter"
        className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none rounded-lg
          peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:text-sm 
          peer-focus:text-black peer-focus:px-1 peer-focus:bg-white
        `}
      />
    </div>
  )
}