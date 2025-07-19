'use client'

import { useRecurrenceStore } from '@/store/useRecurrenceStore'
import { generateRecurringDates } from '@/lib/recurrence'

export default function RecurrencePreview() {
  const { startDate, endDate, recurrenceType, interval } = useRecurrenceStore()

  if (!startDate) return null

  const dates = generateRecurringDates({
    startDate,
    endDate: endDate ?? undefined,
    recurrenceType,
    interval,
  })

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Generated Dates</h2>
      <ul className="list-disc list-inside">
        {dates.slice(0, 10).map((d, idx) => (
          <li key={idx}>{d.toDateString()}</li>
        ))}
        {dates.length > 10 && <li>...and {dates.length - 10} more</li>}
      </ul>
    </div>
  )
}
