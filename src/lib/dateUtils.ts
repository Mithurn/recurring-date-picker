import { Weekday } from '@/types/recurrence'

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export function isSelected(date: Date, selectedDates: Date[]): boolean {
  return selectedDates.some(selectedDate => isSameDay(date, selectedDate))
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[month]
}

export function getWeekdayNames(): string[] {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  const newMonth = result.getMonth() + months
  result.setMonth(newMonth)
  
  // Handle edge case where day doesn't exist in new month
  if (result.getMonth() !== (newMonth % 12)) {
    result.setDate(0) // Last day of previous month
  }
  
  return result
}

export function addYears(date: Date, years: number): Date {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)
  return result
}

export function getWeekdayFromDate(date: Date): Weekday {
  const weekdays: Weekday[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return weekdays[date.getDay()]
}

export function getCalendarDays(year: number, month: number): Date[] {
  const days: Date[] = []
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  
  // Add days from previous month
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)
  
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push(new Date(prevYear, prevMonth, daysInPrevMonth - i))
  }
  
  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day))
  }
  
  // Add days from next month to complete the grid
  const remainingDays = 42 - days.length // 6 rows * 7 days
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  
  for (let day = 1; day <= remainingDays; day++) {
    days.push(new Date(nextYear, nextMonth, day))
  }
  
  return days
}
