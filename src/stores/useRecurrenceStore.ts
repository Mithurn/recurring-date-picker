import { create } from 'zustand'
import { RecurrenceConfig, RecurrenceType } from '@/types/recurrence'

interface RecurrenceState extends RecurrenceConfig {
  setRecurrence: (data: Partial<RecurrenceConfig>) => void
  reset: () => void
}

export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  recurrenceType: 'daily',
  interval: 1,
  weekdays: [],
  startDate: new Date(),
  endDate: undefined,
  monthlyPattern: undefined,
  setRecurrence: (data) => set((state) => ({ ...state, ...data })),
  reset: () =>
    set({
      recurrenceType: 'daily',
      interval: 1,
      weekdays: [],
      startDate: new Date(),
      endDate: undefined,
      monthlyPattern: undefined,
    }),
}))
