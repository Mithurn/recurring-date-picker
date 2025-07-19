import { useMemo } from 'react'
import { useRecurrenceStore } from '@/store/useRecurrenceStore'
import { generateRecurringDates } from '@/lib/recurrence'

export function useRecurrence() {
  const {
    startDate,
    endDate,
    recurrenceType,
    interval,
    weekdays,
    monthlyPattern,
    maxOccurrences,
  } = useRecurrenceStore()

  const recurringDates = useMemo(() => {
    if (!startDate) return []

    return generateRecurringDates({
      recurrenceType,
      interval,
      startDate,
      endDate: endDate || undefined,
      weekdays,
      monthlyPattern: monthlyPattern || undefined,
      maxOccurrences,
    })
  }, [startDate, endDate, recurrenceType, interval, weekdays, monthlyPattern, maxOccurrences])

  const nextOccurrence = useMemo(() => {
    if (recurringDates.length === 0) return null
    const now = new Date()
    return recurringDates.find(date => date > now) || recurringDates[0]
  }, [recurringDates])

  const totalOccurrences = recurringDates.length

  return {
    recurringDates,
    nextOccurrence,
    totalOccurrences,
    hasValidConfig: !!startDate,
  }
}
