// components/FrequencySelector.tsx
'use client'

import { useRecurrenceStore } from '@/store/useRecurrenceStore'
import { RecurrenceType } from '@/types/recurrence'

const options: RecurrenceType[] = ['daily', 'weekly', 'monthly', 'yearly']

export default function FrequencySelector() {
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType)
  const setRecurrenceType = useRecurrenceStore((s) => s.setRecurrenceType)

  return (
    <div className="space-y-3">
      <label className="block text-base font-semibold text-gray-700 mb-1">
        Recurrence Frequency
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setRecurrenceType(opt)}
            className={`px-5 py-3 rounded-xl text-base font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative overflow-hidden
              ${
              recurrenceType === opt
                  ? 'bg-blue-600 text-white shadow-md scale-105 active:scale-100 active:shadow-sm'
                  : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:scale-105 hover:shadow-md active:scale-95'
              }
            `}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
            {recurrenceType === opt && (
              <span className="absolute inset-0 rounded-xl pointer-events-none animate-ripple bg-blue-200/40"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
