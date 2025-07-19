'use client'

import { useState } from 'react'
import { useRecurrence } from '@/hooks/useRecurrence'
import { 
  getCalendarDays, 
  getMonthName, 
  getWeekdayNames, 
  isSameDay, 
  isToday,
  addMonths
} from '@/lib/dateUtils'

export default function PreviewCalendar() {
  const { recurringDates, hasValidConfig } = useRecurrence()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  if (!hasValidConfig || recurringDates.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Calendar Preview</h3>
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Select a start date to see the calendar preview</p>
        </div>
      </div>
    )
  }

  const calendarDays = getCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth())
  const weekdayNames = getWeekdayNames()

  const goToPreviousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  const isDateInCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth() && 
           date.getFullYear() === currentMonth.getFullYear()
  }

  const isRecurringDate = (date: Date) => {
    return recurringDates.some(recurringDate => isSameDay(date, recurringDate))
  }

  const isPastRecurringDate = (date: Date) => {
    return isRecurringDate(date) && date < new Date()
  }

  const isFutureRecurringDate = (date: Date) => {
    return isRecurringDate(date) && date >= new Date()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">Calendar Preview</h3>
        <button
          onClick={goToToday}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Today
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h4 className="text-lg font-semibold text-gray-800">
            {getMonthName(currentMonth.getMonth())} {currentMonth.getFullYear()}
          </h4>
          
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {weekdayNames.map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => {
            const isCurrentMonth = isDateInCurrentMonth(date)
            const isTodayDate = isToday(date)
            const isRecurring = isRecurringDate(date)
            const isPast = isPastRecurringDate(date)
            const isFuture = isFutureRecurringDate(date)

            return (
              <div
                key={index}
                className={`
                  p-2 text-center text-sm border-r border-b border-gray-100 min-h-[40px] flex items-center justify-center
                  ${!isCurrentMonth ? 'text-gray-300 bg-gray-50' : 'text-gray-700'}
                  ${isTodayDate ? 'font-bold bg-blue-100' : ''}
                  ${isRecurring ? 'font-semibold' : ''}
                  ${isPast ? 'bg-green-100 text-green-800' : ''}
                  ${isFuture ? 'bg-blue-100 text-blue-800' : ''}
                  ${isRecurring && isCurrentMonth ? 'ring-2 ring-blue-500 ring-inset' : ''}
                `}
              >
                {date.getDate()}
                {isRecurring && (
                  <div className="absolute w-1 h-1 bg-blue-600 rounded-full bottom-1"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
          <span>Past occurrences</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
          <span>Future occurrences</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>Today</span>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-medium">{recurringDates.length}</span> total occurrences
          {recurringDates.length > 0 && (
            <>
              <br />
              <span className="text-xs text-gray-500">
                Next: {recurringDates.find(d => d >= new Date())?.toLocaleDateString() || 'No future dates'}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
