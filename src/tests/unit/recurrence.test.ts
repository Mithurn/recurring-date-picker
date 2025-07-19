import { generateRecurringDates } from '@/lib/recurrence'

describe('generateRecurringDates - Daily', () => {
  it('generates dates every 2 days until end date', () => {
    const result = generateRecurringDates({
      recurrenceType: 'daily',
      interval: 2,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-07'),
    })

    const expected = [
      new Date('2025-07-01'),
      new Date('2025-07-03'),
      new Date('2025-07-05'),
      new Date('2025-07-07'),
    ]

    expect(result).toEqual(expected)
  })

  it('generates infinite dates if no end date (limit to 5)', () => {
    const result = generateRecurringDates({
      recurrenceType: 'daily',
      interval: 1,
      startDate: new Date('2025-07-01'),
      endDate: undefined,
    })

    // Slice to test only first 5 entries to prevent infinite loop
    expect(result.slice(0, 5)).toEqual([
      new Date('2025-07-01'),
      new Date('2025-07-02'),
      new Date('2025-07-03'),
      new Date('2025-07-04'),
      new Date('2025-07-05'),
    ])
  })
})

describe('generateRecurringDates - Weekly', () => {
  it('generates weekly dates with specific weekdays', () => {
    const result = generateRecurringDates({
      recurrenceType: 'weekly',
      interval: 1,
      startDate: new Date('2025-07-02'), // Wednesday (matches selected weekdays)
      endDate: new Date('2025-07-15'),
      weekdays: ['monday', 'wednesday', 'friday'],
    })

    // Should generate dates for the specified weekdays
    expect(result.length).toBeGreaterThan(0)
    result.forEach(date => {
      const day = date.getDay()
      expect([1, 3, 5]).toContain(day) // Monday, Wednesday, Friday
    })
  })

  it('generates simple weekly dates without weekday selection', () => {
    const result = generateRecurringDates({
      recurrenceType: 'weekly',
      interval: 1,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-22'),
      weekdays: [], // Empty array for simple weekly
    })

    expect(result).toEqual([
      new Date('2025-07-01'),
      new Date('2025-07-08'),
      new Date('2025-07-15'),
      new Date('2025-07-22'),
    ])
  })
})

describe('generateRecurringDates - Monthly', () => {
  it('generates simple monthly dates', () => {
    const result = generateRecurringDates({
      recurrenceType: 'monthly',
      interval: 1,
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-04-15'),
    })

    expect(result).toEqual([
      new Date('2025-01-15'),
      new Date('2025-02-15'),
      new Date('2025-03-15'),
      new Date('2025-04-15'),
    ])
  })

  it('generates monthly dates with pattern (second Tuesday)', () => {
    const result = generateRecurringDates({
      recurrenceType: 'monthly',
      interval: 1,
      startDate: new Date('2025-01-14'), // Second Tuesday of January 2025
      endDate: new Date('2025-04-14'),
      monthlyPattern: { nth: 2, weekday: 'tuesday' },
    })

    expect(result.length).toBeGreaterThan(0)
    // All dates should be Tuesdays
    result.forEach(date => {
      expect(date.getDay()).toBe(2) // Tuesday
    })
  })
})

describe('generateRecurringDates - Yearly', () => {
  it('generates yearly dates', () => {
    const result = generateRecurringDates({
      recurrenceType: 'yearly',
      interval: 1,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2028-07-01'),
    })

    expect(result).toEqual([
      new Date('2025-07-01'),
      new Date('2026-07-01'),
      new Date('2027-07-01'),
      new Date('2028-07-01'),
    ])
  })

  it('generates yearly dates with custom interval', () => {
    const result = generateRecurringDates({
      recurrenceType: 'yearly',
      interval: 2,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2031-07-01'),
    })

    expect(result).toEqual([
      new Date('2025-07-01'),
      new Date('2027-07-01'),
      new Date('2029-07-01'),
      new Date('2031-07-01'),
    ])
  })
})

describe('generateRecurringDates - Edge Cases', () => {
  it('handles end date before start date', () => {
    const result = generateRecurringDates({
      recurrenceType: 'daily',
      interval: 1,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-06-30'),
    })

    // Should return empty array when end date is before start date
    expect(result).toEqual([])
  })

  it('respects maxOccurrences limit', () => {
    const result = generateRecurringDates({
      recurrenceType: 'daily',
      interval: 1,
      startDate: new Date('2025-07-01'),
      endDate: undefined,
      maxOccurrences: 3,
    })

    expect(result).toHaveLength(3)
    expect(result).toEqual([
      new Date('2025-07-01'),
      new Date('2025-07-02'),
      new Date('2025-07-03'),
    ])
  })
})
