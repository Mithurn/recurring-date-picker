'use client'

import { useRecurrenceStore } from '@/store/useRecurrenceStore'

export default function CustomOptions() {
  const interval = useRecurrenceStore((s) => s.interval)
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType)
  const setInterval = useRecurrenceStore((s) => s.setInterval)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value || '1', 10)
    if (!isNaN(value) && value > 0) {
      setInterval(value)
    }
  }

  // Convert "daily" → "days", "weekly" → "weeks", etc.
  const unitLabel =
    recurrenceType === 'daily'
      ? 'days'
      : recurrenceType === 'weekly'
      ? 'weeks'
      : recurrenceType === 'monthly'
      ? 'months'
      : 'times'

  return (
    <div className="flex items-center gap-3 my-6">
      <label className="text-gray-700 text-base font-semibold">Repeat every</label>
      <input
        type="number"
        min={1}
        value={interval}
        onChange={handleChange}
        className="w-20 px-3 py-2 border rounded-xl border-blue-300 text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
        placeholder="Interval"
      />
      <span className="text-gray-700 text-base font-medium">{unitLabel}</span>
    </div>
  )
}
