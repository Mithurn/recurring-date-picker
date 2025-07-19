'use client'

import { useRecurrenceStore } from '@/store/useRecurrenceStore'
import { Weekday } from '@/types/recurrence'
import { getNthName, getWeekdayName } from '@/lib/recurrence'

const nthOptions = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: 5, label: 'Fifth' },
]

const weekdayOptions: { value: Weekday; label: string }[] = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
]

export default function MonthlyPattern() {
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType)
  const monthlyPattern = useRecurrenceStore((s) => s.monthlyPattern)
  const setMonthlyPattern = useRecurrenceStore((s) => s.setMonthlyPattern)

  if (recurrenceType !== 'monthly') return null

  const handleNthChange = (nth: number) => {
    setMonthlyPattern({
      nth,
      weekday: monthlyPattern?.weekday || 'monday',
    })
  }

  const handleWeekdayChange = (weekday: Weekday) => {
    setMonthlyPattern({
      nth: monthlyPattern?.nth || 1,
      weekday,
    })
  }

  const handleSimpleMonthly = () => {
    setMonthlyPattern(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleSimpleMonthly}
          className={`px-5 py-3 rounded-xl text-base font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative overflow-hidden
            ${
              !monthlyPattern
                ? 'bg-blue-600 text-white shadow-md scale-105 active:scale-100 active:shadow-sm'
                : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:scale-105 hover:shadow-md active:scale-95'
            }
          `}
        >
          Simple Monthly
          {!monthlyPattern && (
            <span className="absolute inset-0 rounded-xl pointer-events-none animate-ripple bg-blue-200/40"></span>
          )}
        </button>
        <button
          onClick={() => handleNthChange(monthlyPattern?.nth || 1)}
          className={`px-5 py-3 rounded-xl text-base font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative overflow-hidden
            ${
              monthlyPattern
                ? 'bg-blue-600 text-white shadow-md scale-105 active:scale-100 active:shadow-sm'
                : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:scale-105 hover:shadow-md active:scale-95'
            }
          `}
        >
          Pattern (e.g., "Second Tuesday")
          {monthlyPattern && (
            <span className="absolute inset-0 rounded-xl pointer-events-none animate-ripple bg-blue-200/40"></span>
          )}
        </button>
      </div>

      {monthlyPattern && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <label className="block text-base font-semibold text-gray-700 mb-1">
            Monthly Pattern
          </label>
          <div className="flex items-center gap-3">
            <div className="relative w-32">
              <select
                value={monthlyPattern.nth}
                onChange={(e) => handleNthChange(Number(e.target.value))}
                className="w-full px-4 py-2 border border-blue-300 rounded-xl text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none bg-white pr-10"
              >
                {nthOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-400">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
            <span className="text-gray-600">of every month</span>
            <div className="relative w-36">
              <select
                value={monthlyPattern.weekday}
                onChange={(e) => handleWeekdayChange(e.target.value as Weekday)}
                className="w-full px-4 py-2 border border-blue-300 rounded-xl text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none bg-white pr-10"
              >
                {weekdayOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-400">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>
          <p className="text-base text-blue-700 mt-2">
            Example: {getNthName(monthlyPattern.nth)} {getWeekdayName(monthlyPattern.weekday)} of every month
          </p>
        </div>
      )}
    </div>
  )
}
