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
      <label className="block text-sm font-medium text-gray-700">
        Recurrence Frequency
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setRecurrenceType(opt)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              recurrenceType === opt
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
