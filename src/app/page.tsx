'use client'

import DatePicker from '@/components/DatePicker'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
             Recurring Date Picker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            reusable component for creating recurring events. 
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
        
        <DatePicker />
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Built for Pearl Thoughts Assignment</p>
          <p className="mt-1">Features: Daily, Weekly, Monthly, Yearly recurrence with custom patterns</p>
        </div>
      </div>
    </main>
  )
}
