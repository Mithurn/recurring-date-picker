'use client'

import { useRecurrenceStore } from '@/store/useRecurrenceStore'
import { RecurrenceType } from '@/types/recurrence'

export default function RecurrenceForm() {
  const {
    recurrenceType,
    interval,
    setStartDate,
    setEndDate,
    setRecurrenceType,
    setInterval,
  } = useRecurrenceStore()

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Start Date</label>
        <input
          type="date"
          className="p-2 border rounded w-full"
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">End Date (optional)</label>
        <input
          type="date"
          className="p-2 border rounded w-full"
          onChange={(e) =>
            setEndDate(e.target.value ? new Date(e.target.value) : null)
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Recurrence Type</label>
        <select
          className="p-2 border rounded w-full"
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value as RecurrenceType)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Interval</label>
        <input
          type="number"
          className="p-2 border rounded w-full"
          min={1}
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
