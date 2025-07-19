# 🗓️ Recurring Date Picker — Pearl Thoughts Assignment

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
