# Recurring Date Picker — Pearl Thoughts Assignment

<img width="1464" height="735" alt="Screenshot 2025-07-19 at 7 30 37 PM" src="https://github.com/user-attachments/assets/2ba27c3c-a97c-41f9-9ecd-f2f5e9e78f48" />


<img width="1465" height="742" alt="Screenshot 2025-07-19 at 7 30 54 PM" src="https://github.com/user-attachments/assets/0bf2e9b9-4e33-4ad8-af77-489e243ce668" />

Github: https://github.com/Mithurn/recurring-date-picker

Cloud IDE: https://grdsq7-3000.csb.app

in case of quick Demo:
Vercel: https://recurring-date-picker-qys28sz91-mithurns-projects.vercel.app

loom video link: https://www.loom.com/share/79f5710d86114de68543d42fb74e500b?sid=4d767150-6749-4e83-9314-5fcb800ee8fa



## Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Zustand for state management
* Jest & React Testing Library for testing


## Features Implemented

### Core Recurrence Logic

* Daily, Weekly, Monthly, and Yearly recurrence options
* Custom intervals: every X days/weeks/months/years
* Weekly: select specific days (e.g., Mon, Wed)
* Monthly: select by pattern (e.g., second Tuesday)
* Optional end date or limit by number of occurrences

### UI/UX Enhancements

* Interactive mini calendar to preview dates
* Real-time updates when changing recurrence settings
* Clean and responsive layout
* Date validation and error handling

## Folder Structure

```
recurring-date-picker/
├── src/
│   ├── app/                      # Next.js app router structure
│   │   ├── page.tsx              # Main demo page
│   │   ├── layout.tsx            # Root layout
│   ├── components/
│   │   ├── DatePicker.tsx        # Container component
│   │   ├── FrequencySelector.tsx # Select recurrence type
│   │   ├── CustomOptions.tsx     # Set interval (e.g., every X days)
│   │   ├── WeekdaySelector.tsx   # Pick weekdays for weekly recurrence
│   │   ├── MonthlyPattern.tsx    # Monthly pattern like "second Tuesday"
│   │   ├── DateRangePicker.tsx   # Start/end date inputs
│   │   ├── PreviewCalendar.tsx   # Calendar showing recurring dates
│   ├── hooks/
│   │   ├── useRecurrence.ts      # Hook managing recurrence logic
│   ├── lib/
│   │   ├── recurrence.ts         # Main recurrence generation logic
│   │   ├── dateUtils.ts          # Utilities for date parsing
│   ├── store/
│   │   ├── useRecurrenceStore.ts # Zustand store setup
│   ├── types/
│   │   ├── recurrence.ts         # TypeScript definitions
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── recurrence.test.ts
│   │   │   ├── dateUtils.test.ts
│   │   ├── integration/
│   │   │   ├── DatePicker.test.tsx
├── public/
├── README.md
```

## Testing

### Unit Tests

* Recurrence generation: daily, weekly, monthly, yearly
* Utilities for date manipulation
* Edge case coverage (e.g., leap year, end-of-month)

### Integration Tests

* Form interaction
* Zustand state changes
* Calendar preview behavior

### Commands

```bash
npm run test             # Run all tests
npm run test -- --watch  # Watch mode
npm run test -- --coverage  # Coverage report
```

## Getting Started

```bash
git clone <your-repo-url>
cd recurring-date-picker
npm install
npm run dev
```

## Contribution and Extensibility

* Modular component design allows for easy extension
* Add recurrence options by updating `RecurrenceType`, `recurrence.ts`, and UI components
* State can be extended with minimal impact
* All core logic is covered by tests

## Submission Info

* GitHub Repository: <insert link>
* Live Demo: \<insert CodeSandbox/StackBlitz link>
* Loom Video: <insert Loom recording link>

---

Built with care for the Pearl Thoughts frontend assignment.
