# Sculpture Bermagui - Online Catalogue

Version 1.3.0

A modern web application for showcasing and managing the Sculpture Bermagui exhibition catalogue. This platform provides an interactive way to browse artwork submissions, view artist information, and explore the collection with advanced filtering and search capabilities.

## 🎯 Features

- **Interactive Catalogue**: Browse artwork submissions with detailed information
- **Advanced Search**: Filter artworks by title, artist, medium, and other criteria
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Image Optimization**: High-quality image display with performance optimization
- **Infinite Scroll**: Seamless browsing experience with progressive loading
- **Artist Management**: Comprehensive artist profiles and submission tracking

## 🛠️ Technology Stack

### Frontend

- **[SvelteKit](https://kit.svelte.dev/)** - Full-stack web framework with Svelte 5
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn-svelte](https://www.shadcn-svelte.com/)** - Beautiful, accessible UI components
- **[Lucide Svelte](https://lucide.dev/)** - Beautiful icon library

### Backend & Database

- **[Prisma](https://prisma.io/)** - Modern database toolkit and ORM
- **[PostgreSQL](https://postgresql.org/)** - Robust relational database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service platform

### Forms & Validation

- **[Superforms](https://superforms.rocks/)** - SvelteKit form handling
- **[Formsnap](https://formsnap.dev/)** - Form validation and type safety

### Development Tools

- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/westborn/SB-Catalogue-V2.git
   cd SB-Catalogue-V2
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your database and Supabase credentials.

4. **Set up the database**

   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm studio` - Open Prisma Studio for database management
- `pnpm lint` - Run ESLint and Prettier checks
- `pnpm format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/        # Reusable UI components
│   ├── server/           # Server-side utilities
│   ├── hooks/            # SvelteKit hooks
│   └── utils.ts          # Utility functions
├── routes/               # SvelteKit routes
└── app.html             # Main HTML template

prisma/
└── schema.prisma        # Database schema

static/                  # Static assets
```

## 🔧 Key Components

- **CatalogueCard**: Interactive artwork display component
- **EnlargeableImage**: Optimized image viewer with zoom capabilities
- **UI Components**: shadcn-svelte based design system

## 🌐 Deployment

The application is configured for deployment on Netlify with automatic Prisma client generation:

```bash
pnpm run netlify-build
```

## 📄 License

This project is part of the Sculpture Bermagui exhibition and is maintained by the exhibition organizing committee.

## 🤝 Contributing

This is a community project for the Sculpture Bermagui exhibition. Please reach out to the maintainers for contribution guidelines.
