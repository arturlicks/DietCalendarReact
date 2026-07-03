# Diet Calendar

A React app for planning and visualizing weekly meals on a calendar view, backed by **Supabase** for data storage and sync.

Built as a practical tool for organizing personal meal-planning workflows, with real persisted data rather than local-only state.

🔗 **Live demo:** _add your deployment link here_

## Features

- Weekly calendar view for planning meals
- Data persisted to a Supabase (PostgreSQL) backend, so plans are saved across sessions/devices
- Fast local dev loop powered by Vite

## Tech Stack

| Layer | Technology |
|---|---|
| Library | React 19 |
| Build tool | Vite |
| Backend / DB | Supabase (PostgreSQL, hosted) |
| Linting | ESLint |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project (free tier is enough)

### Installation

```bash
git clone https://github.com/arturlicks/DietCalendarReact.git
cd DietCalendarReact
npm install
```

Create a `.env` file with your Supabase project credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

## Author

**Artur Chiochetta Licks** — [LinkedIn](https://www.linkedin.com/in/artur-licks-03125620/) · [GitHub](https://github.com/arturlicks/)
