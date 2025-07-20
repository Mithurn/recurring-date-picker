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
  let count = 0

  // Check if end date is before start date
  if (endDate && endDate < startDate) {
    return []
  }

  if (recurrenceType === 'weekly' && weekdays.length > 0) {
    // Sort weekdays by their numeric value (Monday=1, ... Sunday=0)
    const sortedWeekdays = [...weekdays].sort((a, b) => WEEKDAY_MAP[a] - WEEKDAY_MAP[b])
    // Find the first week start (the Monday of the week containing startDate)
    const weekStart = new Date(startDate)
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7)) // Monday as week start
    while (true) {
      for (const wd of sortedWeekdays) {
        const dayOffset = (WEEKDAY_MAP[wd] - 1 + 7) % 7 // Monday=1, so offset from Monday
        const candidate = new Date(weekStart)
        candidate.setDate(weekStart.getDate() + dayOffset)
        if (candidate < startDate) continue
        if (endDate && candidate > endDate) continue
        if (!endDate && count >= maxOccurrences) break
        if (candidate >= startDate && (!endDate || candidate <= endDate)) {
          dates.push(new Date(candidate))
          count++
        }
        if (!endDate && count >= maxOccurrences) break
      }
      // Move to next week by interval
      weekStart.setDate(weekStart.getDate() + interval * 7)
      if (endDate && weekStart > endDate) break
      if (!endDate && count >= maxOccurrences) break
    }
    return dates.sort((a, b) => a.getTime() - b.getTime())
  }

  let current = new Date(startDate)
  while (true) {
    if (endDate && current > endDate) break
    if (!endDate && count >= maxOccurrences) break

    dates.push(new Date(current))

    switch (recurrenceType) {
      case 'daily':
        current.setDate(current.getDate() + interval)
        break
      case 'weekly':
        current.setDate(current.getDate() + interval * 7)
        break
      case 'monthly':
        if (monthlyPattern) {
          const nextMonth = new Date(current)
          nextMonth.setMonth(current.getMonth() + interval)
          current = getNthWeekdayOfMonth(
            nextMonth.getFullYear(),
            nextMonth.getMonth(),
            monthlyPattern.nth,
            monthlyPattern.weekday
          )
        } else {
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
