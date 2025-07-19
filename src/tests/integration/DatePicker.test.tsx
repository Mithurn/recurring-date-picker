import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DatePicker from '@/components/DatePicker'

// Mock the store to reset state between tests
const mockReset = jest.fn()
const mockSetStartDate = jest.fn()
const mockSetEndDate = jest.fn()
const mockSetRecurrenceType = jest.fn()
const mockSetInterval = jest.fn()
const mockSetWeekdays = jest.fn()
const mockSetMonthlyPattern = jest.fn()
const mockSetMaxOccurrences = jest.fn()

jest.mock('@/store/useRecurrenceStore', () => ({
  useRecurrenceStore: jest.fn(),
}))

// Import after mocking
import { useRecurrenceStore } from '@/store/useRecurrenceStore'

describe('DatePicker Integration Tests', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()
    
    // Mock the store with default values
    ;(useRecurrenceStore as jest.Mock).mockImplementation((selector) => {
      const state = {
        startDate: null,
        endDate: null,
        recurrenceType: 'daily' as const,
        interval: 1,
        weekdays: ['monday'],
        monthlyPattern: null,
        maxOccurrences: 100,
        setStartDate: mockSetStartDate,
        setEndDate: mockSetEndDate,
        setRecurrenceType: mockSetRecurrenceType,
        setInterval: mockSetInterval,
        setWeekdays: mockSetWeekdays,
        setMonthlyPattern: mockSetMonthlyPattern,
        setMaxOccurrences: mockSetMaxOccurrences,
        reset: mockReset,
      }
      return selector ? selector(state) : state
    })
  })

  it('renders all main sections', () => {
    render(<DatePicker />)
    
    expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument()
    expect(screen.getByText('Configuration')).toBeInTheDocument()
    expect(screen.getByText('Calendar Preview')).toBeInTheDocument()
  })

  it('shows frequency selector options', () => {
    render(<DatePicker />)
    
    expect(screen.getByText('Daily')).toBeInTheDocument()
    expect(screen.getByText('Weekly')).toBeInTheDocument()
    expect(screen.getByText('Monthly')).toBeInTheDocument()
    expect(screen.getByText('Yearly')).toBeInTheDocument()
  })

  it('shows custom options for interval', () => {
    render(<DatePicker />)
    
    expect(screen.getByText('Repeat every')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
  })

  it('shows date range picker', () => {
    render(<DatePicker />)
    
    expect(screen.getByText('Start Date *')).toBeInTheDocument()
    expect(screen.getByText('End Date (Optional)')).toBeInTheDocument()
  })

  it('shows calendar preview section', () => {
    render(<DatePicker />)
    
    expect(screen.getByText('Calendar Preview')).toBeInTheDocument()
    expect(screen.getByText('Select a start date to see the calendar preview')).toBeInTheDocument()
  })

  it('has reset functionality', () => {
    render(<DatePicker />)
    
    const resetButton = screen.getByText('Reset')
    expect(resetButton).toBeInTheDocument()
    
    fireEvent.click(resetButton)
    expect(mockReset).toHaveBeenCalled()
  })

  it('shows weekday selector when weekly is selected', async () => {
    ;(useRecurrenceStore as jest.Mock).mockImplementation((selector) => {
      const state = {
        startDate: null,
        endDate: null,
        recurrenceType: 'weekly' as const,
        interval: 1,
        weekdays: ['monday'],
        monthlyPattern: null,
        maxOccurrences: 100,
        setStartDate: mockSetStartDate,
        setEndDate: mockSetEndDate,
        setRecurrenceType: mockSetRecurrenceType,
        setInterval: mockSetInterval,
        setWeekdays: mockSetWeekdays,
        setMonthlyPattern: mockSetMonthlyPattern,
        setMaxOccurrences: mockSetMaxOccurrences,
        reset: mockReset,
      }
      return selector ? selector(state) : state
    })

    render(<DatePicker />)
    
    expect(screen.getByText('Select Days of the Week')).toBeInTheDocument()
    expect(screen.getByText('Mon')).toBeInTheDocument()
    expect(screen.getByText('Tue')).toBeInTheDocument()
  })

  it('shows monthly pattern selector when monthly is selected', async () => {
    ;(useRecurrenceStore as jest.Mock).mockImplementation((selector) => {
      const state = {
        startDate: null,
        endDate: null,
        recurrenceType: 'monthly' as const,
        interval: 1,
        weekdays: ['monday'],
        monthlyPattern: null,
        maxOccurrences: 100,
        setStartDate: mockSetStartDate,
        setEndDate: mockSetEndDate,
        setRecurrenceType: mockSetRecurrenceType,
        setInterval: mockSetInterval,
        setWeekdays: mockSetWeekdays,
        setMonthlyPattern: mockSetMonthlyPattern,
        setMaxOccurrences: mockSetMaxOccurrences,
        reset: mockReset,
      }
      return selector ? selector(state) : state
    })

    render(<DatePicker />)
    
    expect(screen.getByText('Simple Monthly')).toBeInTheDocument()
    expect(screen.getByText('Pattern (e.g., "Second Tuesday")')).toBeInTheDocument()
  })
})

describe('DatePicker User Interactions', () => {
  it('allows user to select different recurrence types', async () => {
    render(<DatePicker />)
    
    const weeklyButton = screen.getByText('Weekly')
    fireEvent.click(weeklyButton)
    
    expect(mockSetRecurrenceType).toHaveBeenCalledWith('weekly')
  })

  it('allows user to change interval', async () => {
    render(<DatePicker />)
    
    const intervalInput = screen.getByDisplayValue('1')
    fireEvent.change(intervalInput, { target: { value: '3' } })
    
    expect(mockSetInterval).toHaveBeenCalledWith(3)
  })
}) 