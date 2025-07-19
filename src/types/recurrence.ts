export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly'

export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface MonthlyPattern {
  nth: number // 1-5 (first, second, third, fourth, fifth)
  weekday: Weekday
}

export interface RecurrenceConfig {
  recurrenceType: RecurrenceType
  interval: number
  weekdays: Weekday[]
  startDate: Date
  endDate?: Date
  monthlyPattern?: MonthlyPattern
  maxOccurrences?: number
}

export interface RecurrenceState {
  startDate: Date | null
  endDate: Date | null
  recurrenceType: RecurrenceType
  interval: number
  weekdays: Weekday[]
  monthlyPattern: MonthlyPattern | null
  maxOccurrences: number
  setStartDate: (date: Date) => void
  setEndDate: (date: Date | null) => void
  setRecurrenceType: (type: RecurrenceType) => void
  setInterval: (interval: number) => void
  setWeekdays: (weekdays: Weekday[]) => void
  setMonthlyPattern: (pattern: MonthlyPattern | null) => void
  setMaxOccurrences: (max: number) => void
  reset: () => void
}
