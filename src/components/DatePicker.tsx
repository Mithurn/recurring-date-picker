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
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-2xl rounded-3xl overflow-hidden border border-blue-200 transition-transform duration-200 hover:scale-[1.015]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 rounded-t-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">Recurring Date Picker</h1>
            <p className="text-blue-100 text-base mt-2 font-medium opacity-90">
              Create recurring events 
            </p>
          </div>
          <button
            onClick={reset}
            className="px-5 py-2 bg-white/30 text-white rounded-xl hover:bg-white/50 transition-colors text-base font-semibold shadow-sm border border-white/30 backdrop-blur"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-10 space-y-10">
        {/* Configuration Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-extrabold text-blue-700 border-b-2 border-blue-200 pb-3 tracking-tight drop-shadow-sm">
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
        <div className="border-t-2 border-blue-100 pt-12">
          <PreviewCalendar />
        </div>
      </div>
    </div>
  )
}
