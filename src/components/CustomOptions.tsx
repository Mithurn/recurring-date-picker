'use client'

import { useRecurrenceStore } from '@/stores/useRecurrenceStore'

export default function CustomOptions() {
  const interval = useRecurrenceStore((s) => s.interval)
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType)
  const setRecurrence = useRecurrenceStore((s) => s.setRecurrence)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value || '1', 10)
    if (!isNaN(value) && value > 0) {
      setRecurrence({ interval: value })
    }
  }

  return (
    <div className="flex items-center gap-3 my-4">
      <label className="text-gray-700 text-sm">Repeat every</label>
      <input
        type="number"
        min={1}
        value={interval}
        onChange={handleChange}
        className="w-16 px-2 py-1 border rounded-md border-gray-300 text-sm focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-700 text-sm">
        {recurrenceType.replace('ly', 's')}
      </span>
    </div>
  )
}
