import {
  formatDate,
  formatDateShort,
  isSameDay,
  isToday,
  isSelected,
  getDaysInMonth,
  getFirstDayOfMonth,
  getMonthName,
  getWeekdayNames,
  addDays,
  addMonths,
  addYears,
  getWeekdayFromDate,
  getCalendarDays,
} from '@/lib/dateUtils'

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2025-07-15')
      const formatted = formatDate(date)
      expect(formatted).toMatch(/Tue, Jul 15, 2025/)
    })
  })

  describe('formatDateShort', () => {
    it('formats date in short format', () => {
      const date = new Date('2025-07-15')
      const formatted = formatDateShort(date)
      expect(formatted).toBe('Jul 15')
    })
  })

  describe('isSameDay', () => {
    it('returns true for same day', () => {
      const date1 = new Date('2025-07-15T10:00:00')
      const date2 = new Date('2025-07-15T15:30:00')
      expect(isSameDay(date1, date2)).toBe(true)
    })

    it('returns false for different days', () => {
      const date1 = new Date('2025-07-15')
      const date2 = new Date('2025-07-16')
      expect(isSameDay(date1, date2)).toBe(false)
    })
  })

  describe('isToday', () => {
    it('returns true for today', () => {
      const today = new Date()
      expect(isToday(today)).toBe(true)
    })

    it('returns false for other days', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isToday(yesterday)).toBe(false)
    })
  })

  describe('isSelected', () => {
    it('returns true if date is in selected dates', () => {
      const date = new Date('2025-07-15')
      const selectedDates = [
        new Date('2025-07-14'),
        new Date('2025-07-15'),
        new Date('2025-07-16'),
      ]
      expect(isSelected(date, selectedDates)).toBe(true)
    })

    it('returns false if date is not in selected dates', () => {
      const date = new Date('2025-07-15')
      const selectedDates = [
        new Date('2025-07-14'),
        new Date('2025-07-16'),
      ]
      expect(isSelected(date, selectedDates)).toBe(false)
    })
  })

  describe('getDaysInMonth', () => {
    it('returns correct days for January', () => {
      expect(getDaysInMonth(2025, 0)).toBe(31)
    })

    it('returns correct days for February (leap year)', () => {
      expect(getDaysInMonth(2024, 1)).toBe(29)
    })

    it('returns correct days for February (non-leap year)', () => {
      expect(getDaysInMonth(2025, 1)).toBe(28)
    })

    it('returns correct days for April', () => {
      expect(getDaysInMonth(2025, 3)).toBe(30)
    })
  })

  describe('getFirstDayOfMonth', () => {
    it('returns correct first day of month', () => {
      // January 1, 2025 is a Wednesday (3)
      expect(getFirstDayOfMonth(2025, 0)).toBe(3)
    })
  })

  describe('getMonthName', () => {
    it('returns correct month names', () => {
      expect(getMonthName(0)).toBe('January')
      expect(getMonthName(6)).toBe('July')
      expect(getMonthName(11)).toBe('December')
    })
  })

  describe('getWeekdayNames', () => {
    it('returns weekday names in correct order', () => {
      const weekdays = getWeekdayNames()
      expect(weekdays).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    })
  })

  describe('addDays', () => {
    it('adds days correctly', () => {
      const date = new Date('2025-07-15')
      const result = addDays(date, 5)
      expect(result.getDate()).toBe(20)
    })

    it('handles month overflow', () => {
      const date = new Date('2025-07-30')
      const result = addDays(date, 5)
      expect(result.getMonth()).toBe(7) // August
      expect(result.getDate()).toBe(4)
    })
  })

  describe('addMonths', () => {
    it('adds months correctly', () => {
      const date = new Date('2025-07-15')
      const result = addMonths(date, 2)
      expect(result.getMonth()).toBe(8) // September (0-indexed)
      expect(result.getDate()).toBe(15)
    })

    it('handles year overflow', () => {
      const date = new Date('2025-11-15')
      const result = addMonths(date, 2)
      expect(result.getFullYear()).toBe(2026)
      expect(result.getMonth()).toBe(0) // January (0-indexed)
    })
  })

  describe('addYears', () => {
    it('adds years correctly', () => {
      const date = new Date('2025-07-15')
      const result = addYears(date, 3)
      expect(result.getFullYear()).toBe(2028)
      expect(result.getMonth()).toBe(6) // July
      expect(result.getDate()).toBe(15)
    })
  })

  describe('getWeekdayFromDate', () => {
    it('returns correct weekday', () => {
      const monday = new Date('2025-07-14') // Monday
      const tuesday = new Date('2025-07-15') // Tuesday
      
      expect(getWeekdayFromDate(monday)).toBe('monday')
      expect(getWeekdayFromDate(tuesday)).toBe('tuesday')
    })
  })

  describe('getCalendarDays', () => {
    it('returns correct number of days', () => {
      const days = getCalendarDays(2025, 0) // January 2025
      expect(days).toHaveLength(42) // 6 weeks * 7 days
    })

    it('includes days from previous month', () => {
      const days = getCalendarDays(2025, 0) // January 2025
      // January 1, 2025 is a Wednesday, so we need 3 days from December
      const firstDay = days[0]
      expect(firstDay.getMonth()).toBe(11) // December
    })

    it('includes days from next month', () => {
      const days = getCalendarDays(2025, 0) // January 2025
      const lastDay = days[days.length - 1]
      expect(lastDay.getMonth()).toBe(1) // February
    })

    it('has correct current month days', () => {
      const days = getCalendarDays(2025, 0) // January 2025
      const currentMonthDays = days.filter(day => day.getMonth() === 0)
      expect(currentMonthDays).toHaveLength(31)
    })
  })
}) 