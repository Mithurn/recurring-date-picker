import { create } from 'zustand'
import { RecurrenceType, Weekday, MonthlyPattern, RecurrenceState } from '@/types/recurrence'

export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  startDate: null,
  endDate: null,
  recurrenceType: 'daily',
  interval: 1,
  weekdays: ['monday'],
  monthlyPattern: null,
  maxOccurrences: 100,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setInterval: (interval) => set({ interval }),
  setWeekdays: (weekdays) => set({ weekdays }),
  setMonthlyPattern: (pattern) => set({ monthlyPattern: pattern }),
  setMaxOccurrences: (max) => set({ maxOccurrences: max }),
  reset: () => set({
    startDate: null,
    endDate: null,
    recurrenceType: 'daily',
    interval: 1,
    weekdays: ['monday'],
    monthlyPattern: null,
    maxOccurrences: 100,
  }),
}))
