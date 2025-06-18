import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DatePicker({
  onDateChange,
  value,
  error,
}: {
  onDateChange: (date: string | null) => void
  value: string | null
  error: string | undefined
}) {
  const { t } = useTranslation('accounts')
  const WEEK_DAYS = [
    t('mo'),
    t('tu'),
    t('we'),
    t('th'),
    t('fr'),
    t('sa'),
    t('su'),
  ]
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(value)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedDate(value)
  }, [value])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const prevMonthDays = Array(firstDayIndex)
    .fill(0)
    .map((_, i) => daysInPrevMonth - firstDayIndex + 1 + i)

  const totalCells = 42
  const nextMonthDaysCount = totalCells - (firstDayIndex + daysInMonth)
  const nextMonthDays = Array(nextMonthDaysCount)
    .fill(0)
    .map((_, i) => i + 1)

  const handlePrevMonth = () => {
    const d = new Date(currentDate)
    d.setMonth(d.getMonth() - 1)
    setCurrentDate(d)
  }

  const handleNextMonth = () => {
    const d = new Date(currentDate)
    d.setMonth(d.getMonth() + 1)
    setCurrentDate(d)
  }

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear()
    const mm = (date.getMonth() + 1).toString().padStart(2, '0')
    const dd = date.getDate().toString().padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`
    setSelectedDate(dateStr)
    onDateChange(dateStr)
    setIsCalendarOpen(false)
  }

  const handleTodayClick = () => {
    const today = new Date()
    const dateStr = formatDate(today)
    setSelectedDate(dateStr)
    onDateChange(dateStr)
    setCurrentDate(today)
    setIsCalendarOpen(false)
  }

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent toggling calendar open/close
    setSelectedDate(null)
    onDateChange(null)
  }

  const handleToggleCalendar = () => {
    setIsCalendarOpen((open) => !open)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Today's date in yyyy-mm-dd format
  const todayStr = formatDate(new Date())

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Fake input */}
      <div
        onClick={handleToggleCalendar}
        role="textbox"
        tabIndex={0}
        className={`peer flex items-center border text-black rounded-md shadow-md p-4 bg-white  w-full cursor-pointer relative
        ${
          error
            ? 'border-red-600 border-0 focus:ring-red-900 focus:border-2 '
            : 'border-gray-200 focus:ring-1 focus:ring-black'
        }`}
      >
        <span className={selectedDate ? 'text-black' : 'text-gray-400'}>
          {selectedDate || 'yyyy-mm-dd'}
        </span>

        {selectedDate && (
          <button
            onClick={handleClearDate}
            type="button"
            aria-label="Clear date"
            className="absolute right-4 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          >
            &#10005;
          </button>
        )}
      </div>

      {/* Floating Label */}
      <label
        className={`absolute left-4 px-1 transition-all duration-200 bg-white pointer-events-none
          ${
            selectedDate || isCalendarOpen
              ? '-top-2.5 text-sm text-black font-semibold'
              : 'top-4 text-base text-gray-400'
          }
          ${error ? ' peer-focus:text-red-600 ' : 'peer-focus:text-black'}
          peer-focus:-top-2.5 peer-focus:font-semibold peer-focus:text-sm peer-focus:bg-white
        `}
      >
        {t('transactionDate')}
      </label>

      {/* Calendar popup */}
      {isCalendarOpen && (
        <div className="absolute z-10 mt-2 left-0 rounded-lg border border-black bg-white p-4 shadow-lg w-[300px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrevMonth}
              type="button"
              className="rounded-full p-2 hover:bg-gray-100 cursor-pointer text-lg"
              aria-label="Previous month"
            >
              ←
            </button>
            <div className="font-medium text-black">
              {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <button
              onClick={handleNextMonth}
              type="button"
              className="rounded-full p-2 hover:bg-gray-100 cursor-pointer text-lg"
              aria-label="Next month"
            >
              →
            </button>
          </div>

          {/* Today clickable text */}
          <div className="mb-2 text-right">
            <button
              type="button"
              onClick={handleTodayClick}
              className="text-sm text-blue-600 hover:underline cursor-pointer"
            >
              {t('today')}
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-black">
            {WEEK_DAYS.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1 mt-1 text-center text-sm text-black">
            {/* Previous month trailing days */}
            {prevMonthDays.map((day) => (
              <div
                key={`prev-${day}`}
                className="flex items-center justify-center h-9 w-9 rounded-md text-gray-400 cursor-default"
              >
                {day}
              </div>
            ))}

            {/* Current month days */}
            {Array(daysInMonth)
              .fill(0)
              .map((_, i) => {
                const day = i + 1
                const formattedDate = `${year}-${(month + 1)
                  .toString()
                  .padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                const isSelected = selectedDate === formattedDate
                const isPastDate = formattedDate < todayStr // disable past dates

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => !isPastDate && handleDayClick(day, true)}
                    disabled={isPastDate}
                    className={`flex items-center justify-center h-9 w-9 rounded-md  ${
                      isSelected
                        ? 'bg-black text-white'
                        : isPastDate
                          ? 'text-gray-400 cursor-default hover:cursor-default'
                          : 'hover:bg-gray-200 text-black cursor-pointer'
                    }`}
                    aria-current={isSelected ? 'date' : undefined}
                  >
                    {day}
                  </button>
                )
              })}

            {/* Next month leading days */}
            {nextMonthDays.map((day) => (
              <div
                key={`next-${day}`}
                className="flex items-center justify-center h-9 w-9 rounded-md text-gray-400 cursor-default"
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
