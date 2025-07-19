'use client'

import FrequencySelector from '@/components/FrequencySelector'
import CustomOptions from '@/components/CustomOptions'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Recurring Date Picker</h1>

        <FrequencySelector />
        <CustomOptions />

        {/* Next: Add WeekdaySelector, DateRangePicker, PreviewCalendar here */}
      </div>
    </main>
  )
}
