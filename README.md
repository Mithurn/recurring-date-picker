# 🗓️ Recurring Date Picker — Pearl Thoughts Assignment

<<<<<<< HEAD
## 🚀 Tech Stack
- Next.js (App Router)
- Tailwind CSS
- Zustand
- TypeScript
- date-fns
- Jest + RTL

## ✨ Features
- Daily, Weekly, Monthly, Yearly recurrence
- Custom intervals (e.g., every 2 weeks)
- “Second Tuesday” pattern selection
- Optional end date
- Mini calendar preview of upcoming dates

## 📦 Folder Structure
recurring-date-picker/
├── src/
│   ├── app/
│   │   ├── (main)/               # Route group (optional)
│   │   │   ├── page.tsx          # Demo page for the component
│   │   ├── layout.tsx
│   ├── components/
│   │   ├── date-picker/
│   │   │   ├── DatePicker.tsx    # Main container component
│   │   │   ├── FrequencySelector.tsx
│   │   │   ├── CustomOptions.tsx
│   │   │   ├── DateRange.tsx
│   │   │   ├── PreviewCalendar.tsx
│   ├── hooks/
│   │   ├── useRecurrence.ts      # Custom hook for recurrence logic
│   ├── lib/
│   │   ├── recurrence.ts         # Utility functions
│   │   ├── dateUtils.ts          # Date manipulation helpers
│   ├── stores/
│   │   ├── dateStore.ts          # Zustand store
│   ├── styles/
│   │   ├── globals.css
├── public/
├── tests/
│   ├── unit/
│   │   ├── recurrence.test.ts
│   ├── integration/
│   │   ├── DatePicker.test.tsx
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json

## 🧪 Testing
Run all tests:
```bash
npm run test
=======
A comprehensive, reusable recurring date picker component built with Next.js, TypeScript, and Tailwind CSS. This component provides advanced recurrence functionality similar to popular task management apps like TickTick.

## 🚀 Tech Stack
- **Framework**: Next.js 15.4.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Testing**: Jest + React Testing Library
- **Development**: ESLint, PostCSS

## ✨ Features Implemented

### ✅ Core Recurrence Options
- **Daily**: Every X days
- **Weekly**: Every X weeks with specific weekday selection
- **Monthly**: Every X months with simple or pattern-based recurrence
- **Yearly**: Every X years

### ✅ Advanced Customization
- **Custom Intervals**: Every 2 days, 3 weeks, 6 months, etc.
- **Weekday Selection**: Choose specific days (Mon, Tue, Wed, etc.)
- **Monthly Patterns**: "Second Tuesday of every month" patterns
- **Flexible Date Ranges**: Start date + optional end date

### ✅ Visual Features
- **Mini Calendar Preview**: Interactive calendar showing recurring dates
- **Real-time Updates**: Calendar updates as you configure recurrence
- **Visual Indicators**: Past, future, and current occurrences
- **Responsive Design**: Works on desktop and mobile

### ✅ User Experience
- **Clean, Modern UI**: Professional design with smooth animations
- **Intuitive Controls**: Easy-to-use interface
- **Reset Functionality**: Quick reset to default settings
- **Validation**: Smart date validation and error handling

## 📦 Project Structure
```
recurring-date-picker/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main demo page
│   │   ├── layout.tsx            # Root layout
│   ├── components/
│   │   ├── DatePicker.tsx        # Main container component
│   │   ├── FrequencySelector.tsx # Recurrence type selection
│   │   ├── CustomOptions.tsx     # Interval configuration
│   │   ├── WeekdaySelector.tsx   # Weekly day selection
│   │   ├── MonthlyPattern.tsx    # Monthly pattern selection
│   │   ├── DateRangePicker.tsx   # Start/end date selection
│   │   ├── PreviewCalendar.tsx   # Mini calendar preview
│   ├── hooks/
│   │   ├── useRecurrence.ts      # Custom hook for recurrence logic
│   ├── lib/
│   │   ├── recurrence.ts         # Core recurrence algorithms
│   │   ├── dateUtils.ts          # Date manipulation utilities
│   ├── store/
│   │   ├── useRecurrenceStore.ts # Zustand state management
│   ├── types/
│   │   ├── recurrence.ts         # TypeScript type definitions
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── recurrence.test.ts
│   │   │   ├── dateUtils.test.ts
│   │   ├── integration/
│   │   │   ├── DatePicker.test.tsx
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── jest.config.js               # Testing configuration
└── README.md                    # This file
```

## 🧪 Testing

### Unit Tests
- **Recurrence Logic**: Tests for daily, weekly, monthly, and yearly patterns
- **Date Utilities**: Comprehensive date manipulation function tests
- **Edge Cases**: Boundary conditions and error handling

### Integration Tests
- **Component Integration**: Full component functionality tests
- **User Interactions**: Click events, form inputs, state changes
- **Store Integration**: Zustand store state management tests

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test -- --coverage

# Run tests in watch mode
npm run test -- --watch
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd recurring-date-picker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Run ESLint
```

## 🎯 Key Implementation Highlights

### 1. **Modular Architecture**
- Clean separation of concerns
- Reusable components
- Custom hooks for business logic
- Type-safe with TypeScript

### 2. **Advanced Recurrence Logic**
- Supports complex patterns like "second Tuesday"
- Handles edge cases (leap years, month boundaries)
- Efficient date generation algorithms
- Configurable limits and safety caps

### 3. **State Management**
- Zustand for lightweight, performant state
- Immutable updates
- Computed values with useMemo
- Clean action creators

### 4. **User Experience**
- Responsive design
- Smooth animations and transitions
- Intuitive visual feedback
- Accessibility considerations

### 5. **Testing Strategy**
- Unit tests for core logic
- Integration tests for components
- Mock strategies for external dependencies
- High test coverage

## 🔧 Customization

### Adding New Recurrence Types
1. Update `RecurrenceType` in `types/recurrence.ts`
2. Add logic in `lib/recurrence.ts`
3. Create UI component in `components/`
4. Add tests

### Styling Customization
- Tailwind CSS classes for easy theming
- CSS custom properties for colors
- Responsive breakpoints
- Dark mode support ready

## 📱 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing
This is an assignment submission, but the code follows best practices for maintainability and extensibility.

## 📄 License
This project is created for the Pearl Thoughts assignment.

---

**Built with ❤️ for Pearl Thoughts Assignment**
>>>>>>> 221079b (changes to save in local)
