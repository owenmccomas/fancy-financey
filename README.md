# Financial Management App

This is a comprehensive financial management application that allows users to track their income, expenses, savings, investments, assets, bills, and financial goals. With an intuitive interface and powerful features, you can easily manage your personal finances and work towards your financial objectives.

## Features

- Dashboard overview of your financial status
- Income tracking with detailed source information
- Expense management categorized by type
- Savings tracker with easy update functionality
- Investment portfolio management
- Asset tracking and valuation
- Bill management with due date reminders
- Goal setting and progress tracking
- Customizable categories for various financial entries
- Data visualization for better financial insights

## Getting Started

Follow these steps to set up the project on your local machine:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   .env.example .env
   ```
   Open the `.env` file and fill in the necessary variables.

4. **Create and set up the database**
   - Install PostgreSQL if not already installed
   - Create a new database with a database provider

5. **Run database migrations**
   ```bash
   npm prisma migrate
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The application should now be running at `http://localhost:3000`.

## Technologies

This project uses the T3 Stack:
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

Additional libraries:
- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/) for UI components

## Project Structure

- `components/`: Reusable React components
- `pages/`: Next.js pages and API routes
- `server/`: Server-side code, including tRPC routers
- `utils/`: Utility functions and helpers
- `types/`: TypeScript type definitions

## Key Components

- `Outline.tsx`: Main dashboard component
- `Nav.tsx`: Navigation component
- `IncomeCard.tsx`, `ExpenseCard.tsx`, etc.: Individual financial entry components
- `IncomeForm.tsx`, `ExpensesForm.tsx`, etc.: Forms for adding new financial entries

## API Routes

The application uses tRPC for type-safe API routes. Key routers include:
- `income.ts`
- `expenses.ts`
- `savings.ts`
- `investments.ts`
- `assets.ts`
- `bills.ts`
- `goals.ts`

## Database Schema

The database schema is defined in `prisma/schema.prisma` and includes models for User, Income, Expense, Savings, Investment, Asset, Bill, and Goal.

## Authentication

This app uses NextAuth.js for authentication, supporting the Google provider.

## Versioning

Project versioning follows Semantic Versioning and is tracked using GitHub Releases.

## Contributing

Please read our contributing guidelines before submitting pull requests.

For more detailed information about the project, please refer to the documentation or me.