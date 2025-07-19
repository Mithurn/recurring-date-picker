// components/FrequencySelector.tsx
'use client'

import { useRecurrenceStore } from '@/stores/useRecurrenceStore'
import { RecurrenceType } from '@/types/recurrence'

const options: RecurrenceType[] = ['daily', 'weekly', 'monthly', 'yearly']

export default function FrequencySelector() {
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType)
  const setRecurrence = useRecurrenceStore((s) => s.setRecurrence)

  return (
    <div className="flex gap-4 my-4">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setRecurrence({ recurrenceType: opt })}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            recurrenceType === opt
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  )
}
