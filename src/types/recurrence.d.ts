export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface RecurrenceConfig {
  recurrenceType: RecurrenceType
  interval: number
  weekdays: string[] 
  startDate: Date
  endDate?: Date
  monthlyPattern?: {
    nth: number 
    weekday: string 
}
}
