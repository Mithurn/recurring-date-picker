import { RecurrenceType, Weekday, MonthlyPattern } from '@/types/recurrence'

interface RecurrenceOptions {
  recurrenceType: RecurrenceType
  interval: number
  startDate: Date
  endDate?: Date
  weekdays?: Weekday[]
  monthlyPattern?: MonthlyPattern
  maxOccurrences?: number
}

const WEEKDAY_MAP: Record<Weekday, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
}

const WEEKDAY_NAMES: Record<Weekday, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

export function getWeekdayName(weekday: Weekday): string {
  return WEEKDAY_NAMES[weekday]
}

export function getNthName(nth: number): string {
  const names = ['', 'first', 'second', 'third', 'fourth', 'fifth']
  return names[nth] || `${nth}th`
}

function getNextWeekday(date: Date, weekday: Weekday): Date {
  const currentDay = date.getDay()
  const targetDay = WEEKDAY_MAP[weekday]
  const daysToAdd = (targetDay - currentDay + 7) % 7
  const nextDate = new Date(date)
  nextDate.setDate(date.getDate() + daysToAdd)
  return nextDate
}

function getNthWeekdayOfMonth(year: number, month: number, nth: number, weekday: Weekday): Date {
  const firstDay = new Date(year, month, 1)
  const firstWeekday = getNextWeekday(firstDay, weekday)
  
  if (nth === 1) return firstWeekday
  
  const nthWeekday = new Date(firstWeekday)
  nthWeekday.setDate(firstWeekday.getDate() + (nth - 1) * 7)
  
  // Check if we're still in the same month
  if (nthWeekday.getMonth() !== month) {
    return new Date(year, month + 1, 0) // Return last day of month
  }
  
  return nthWeekday
}

export function generateRecurringDates({
  recurrenceType,
  interval,
  startDate,
  endDate,
  weekdays = ['monday'],
  monthlyPattern,
  maxOccurrences = 100,
}: RecurrenceOptions): Date[] {
  const dates: Date[] = []
  let current = new Date(startDate)
  let count = 0

  // Check if end date is before start date
  if (endDate && endDate < startDate) {
    return []
  }

  while (true) {
    if (endDate && current > endDate) break
    if (!endDate && count >= maxOccurrences) break

    dates.push(new Date(current))

    switch (recurrenceType) {
      case 'daily':
        current.setDate(current.getDate() + interval)
        break
        
      case 'weekly':
        if (weekdays.length === 0) {
          // Simple weekly recurrence
          current.setDate(current.getDate() + interval * 7)
        } else {
          // Find next weekday in the list
          const currentWeekday = current.getDay()
          const currentWeekdayName = Object.keys(WEEKDAY_MAP).find(
            key => WEEKDAY_MAP[key as Weekday] === currentWeekday
          ) as Weekday
          
          const currentIndex = weekdays.indexOf(currentWeekdayName)
          const nextIndex = (currentIndex + 1) % weekdays.length
          const nextWeekday = weekdays[nextIndex]
          
          if (nextIndex === 0) {
            // Move to next week
            current.setDate(current.getDate() + interval * 7)
          }
          
          current = getNextWeekday(current, nextWeekday)
        }
        break
        
      case 'monthly':
        if (monthlyPattern) {
          // Handle "second Tuesday" pattern
          const nextMonth = new Date(current)
          nextMonth.setMonth(current.getMonth() + interval)
          current = getNthWeekdayOfMonth(
            nextMonth.getFullYear(),
            nextMonth.getMonth(),
            monthlyPattern.nth,
            monthlyPattern.weekday
          )
        } else {
          // Simple monthly recurrence
          current.setMonth(current.getMonth() + interval)
        }
        break
        
      case 'yearly':
        current.setFullYear(current.getFullYear() + interval)
        break
        
      default:
        throw new Error(`Unsupported recurrence type: ${recurrenceType}`)
    }

    count++
  }

  return dates
}
