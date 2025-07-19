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
      <div className="flex items-center justify-between mt-2 mb-6">
        <h3 className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">Calendar Preview</h3>
        <button
          onClick={goToToday}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow"
        >
          Today
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 animate-fade-in">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-blue-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous Month"
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
            className="p-2 hover:bg-blue-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next Month"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {weekdayNames.map((day) => (
            <div key={day} className="p-2 text-center text-xs font-semibold text-blue-700 tracking-wide">
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
                tabIndex={isCurrentMonth ? 0 : -1}
                className={`
                  relative p-2 text-center text-sm border-r border-b border-gray-100 min-h-[40px] flex items-center justify-center
                  transition-all duration-150
                  ${!isCurrentMonth ? 'text-gray-300 bg-gray-50' : 'text-gray-700'}
                  ${isTodayDate ? 'font-bold bg-blue-200 ring-2 ring-blue-500 ring-inset z-10' : ''}
                  ${isRecurring && isCurrentMonth ? 'font-semibold animate-pulse-on-hover' : ''}
                  ${isPast ? 'bg-green-50 text-green-800' : ''}
                  ${isFuture ? 'bg-blue-50 text-blue-800' : ''}
                  ${isRecurring && isCurrentMonth ? 'hover:scale-110 hover:shadow-lg cursor-pointer hover:shadow-blue-200 focus:shadow-blue-300' : ''}
                  ${isRecurring && isCurrentMonth ? 'transition-transform' : ''}
                `}
                aria-label={
                  isRecurring
                    ? `Recurring date: ${date.toDateString()}`
                    : date.toDateString()
                }
              >
                <span className="relative z-10">{date.getDate()}</span>
                {isRecurring && isCurrentMonth && (
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full
                    ${isTodayDate ? 'bg-blue-700' : isPast ? 'bg-green-500' : 'bg-blue-500'}
                    animate-pulse-on-hover-dot
                  `}></span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 text-xs mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full border border-green-300"></span>
          <span className="text-green-900 font-medium">Past occurrences</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full border border-blue-300"></span>
          <span className="text-blue-900 font-medium">Future occurrences</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-blue-700 rounded-full border-2 border-white"></span>
          <span className="text-blue-900 font-medium">Today</span>
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
