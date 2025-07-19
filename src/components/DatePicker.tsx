'use client'

import { useRecurrenceStore } from '@/store/useRecurrenceStore'
import FrequencySelector from './FrequencySelector'
import CustomOptions from './CustomOptions'
import WeekdaySelector from './WeekdaySelector'
import MonthlyPattern from './MonthlyPattern'
import DateRangePicker from './DateRangePicker'
import PreviewCalendar from './PreviewCalendar'

export default function DatePicker() {
  const reset = useRecurrenceStore((s) => s.reset)

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Recurring Date Picker</h1>
            <p className="text-blue-100 text-sm mt-1">
              Create recurring events like in TickTick
            </p>
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Configuration Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Configuration
          </h2>
          
          {/* Frequency Selection */}
          <FrequencySelector />
          
          {/* Custom Options */}
          <CustomOptions />
          
          {/* Weekday Selection (for weekly) */}
          <WeekdaySelector />
          
          {/* Monthly Pattern (for monthly) */}
          <MonthlyPattern />
          
          {/* Date Range */}
          <DateRangePicker />
        </div>

        {/* Preview Section */}
        <div className="border-t pt-6">
          <PreviewCalendar />
        </div>
      </div>
    </div>
  )
}
