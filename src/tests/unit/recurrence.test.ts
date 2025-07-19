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
