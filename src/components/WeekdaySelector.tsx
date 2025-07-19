'use client'

import { useRecurrenceStore } from '@/store/useRecurrenceStore'
import { Weekday } from '@/types/recurrence'

const weekdaysConst: { value: Weekday; label: string; short: string }[] = [
  { value: 'monday', label: 'Monday', short: 'Mon' },
  { value: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { value: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { value: 'thursday', label: 'Thursday', short: 'Thu' },
  { value: 'friday', label: 'Friday', short: 'Fri' },
  { value: 'saturday', label: 'Saturday', short: 'Sat' },
  { value: 'sunday', label: 'Sunday', short: 'Sun' },
]

export default function WeekdaySelector() {
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType)
  const weekdays = useRecurrenceStore((s) => s.weekdays)
  const setWeekdays = useRecurrenceStore((s) => s.setWeekdays)

  if (recurrenceType !== 'weekly') return null

  const handleWeekdayToggle = (weekday: Weekday) => {
    const newWeekdays = weekdays.includes(weekday)
      ? weekdays.filter(w => w !== weekday)
      : [...weekdays, weekday]
    
    // Ensure at least one weekday is selected
    if (newWeekdays.length > 0) {
      setWeekdays(newWeekdays)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-base font-semibold text-gray-700 mb-1">
        Select Days of the Week
      </label>
      <div className="grid grid-cols-7 gap-2">
        {weekdaysConst.map(({ value, short }) => (
          <button
            key={value}
            onClick={() => handleWeekdayToggle(value)}
            disabled={weekdays.length === 1 && weekdays.includes(value)}
            className={`p-2 rounded-xl text-base font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative overflow-hidden
              ${
              weekdays.includes(value)
                  ? 'bg-blue-600 text-white shadow-md scale-105 active:scale-100 active:shadow-sm'
                  : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:scale-105 hover:shadow-md active:scale-95'
              }
              ${
              weekdays.length === 1 && weekdays.includes(value)
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
              }
            `}
          >
            {short}
            {weekdays.includes(value) && (
              <span className="absolute inset-0 rounded-xl pointer-events-none animate-ripple bg-blue-200/40"></span>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Select the days when this event should occur
      </p>
    </div>
  )
} 