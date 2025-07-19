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
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            !monthlyPattern
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Simple Monthly
        </button>
        <button
          onClick={() => handleNthChange(monthlyPattern?.nth || 1)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            monthlyPattern
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pattern (e.g., &quot;Second Tuesday&quot;)
        </button>
      </div>

      {monthlyPattern && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700">
            Monthly Pattern
          </label>
          <div className="flex items-center gap-3">
            <select
              value={monthlyPattern.nth}
              onChange={(e) => handleNthChange(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {nthOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <span className="text-gray-600">of every month</span>
            <select
              value={monthlyPattern.weekday}
              onChange={(e) => handleWeekdayChange(e.target.value as Weekday)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {weekdayOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-600">
            Example: {getNthName(monthlyPattern.nth)} {getWeekdayName(monthlyPattern.weekday)} of every month
          </p>
        </div>
      )}
    </div>
  )
}
