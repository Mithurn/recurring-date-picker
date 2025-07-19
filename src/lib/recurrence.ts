type RecurrenceType = 'daily' | 'weekly' | 'monthly'

interface RecurrenceOptions {
  recurrenceType: RecurrenceType
  interval: number
  startDate: Date
  endDate?: Date
  maxOccurrences?: number // 🆕 optional safety cap
}

export function generateRecurringDates({
  recurrenceType,
  interval,
  startDate,
  endDate,
  maxOccurrences = 100, // 🛡️ default safety cap
}: RecurrenceOptions): Date[] {
  const dates: Date[] = []
  const current = new Date(startDate)

  let count = 0

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
        current.setMonth(current.getMonth() + interval)
        break
      default:
        throw new Error(`Unsupported recurrence type: ${recurrenceType}`)
    }

    count++
  }

  return dates
}
