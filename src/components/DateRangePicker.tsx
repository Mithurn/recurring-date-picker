'use client'

import { useRecurrenceStore } from '@/store/useRecurrenceStore'

export default function DateRangePicker() {
  const startDate = useRecurrenceStore((s) => s.startDate)
  const endDate = useRecurrenceStore((s) => s.endDate)
  const setStartDate = useRecurrenceStore((s) => s.setStartDate)
  const setEndDate = useRecurrenceStore((s) => s.setEndDate)

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    setStartDate(date)
    
    // If end date is before start date, clear it
    if (endDate && endDate < date) {
      setEndDate(null)
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null
    setEndDate(date)
  }

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-700 mb-2">Date Range</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-base font-semibold text-gray-700">
            Start Date *
          </label>
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={handleStartDateChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-xl text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            required
            placeholder="Select start date"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-base font-semibold text-gray-700">
            End Date (Optional)
          </label>
          <input
            type="date"
            value={formatDateForInput(endDate)}
            onChange={handleEndDateChange}
            min={startDate ? formatDateForInput(startDate) : undefined}
            className="w-full px-4 py-2 border border-blue-300 rounded-xl text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="Select end date"
          />
          <p className="text-xs text-gray-500">
            Leave empty for unlimited recurrence
          </p>
        </div>
      </div>

      {startDate && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-base text-blue-800">
            <span className="font-semibold">Start:</span> {startDate.toLocaleDateString()}
            {endDate && (
              <>
                <br />
                <span className="font-semibold">End:</span> {endDate.toLocaleDateString()}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
