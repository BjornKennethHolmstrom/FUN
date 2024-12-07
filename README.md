# FUN(TIME) - Freedom & Unity Network

A digital platform connecting and nurturing transformative projects for positive social change.

## Overview
FUN(TIME) serves as both a directory for established initiatives and an incubator for new projects, fostering unity while preserving individual freedom. The platform connects change-makers with existing projects while providing resources and support for emerging initiatives.

## Recent Updates
- **Projects Hub**: New dual-purpose hub for discovering existing projects and launching new ones
- **Project Verification**: System for verified existing project listings
- **Enhanced Navigation**: Seamless integration of project discovery features
- **Stage Tracking**: Visual progression through project development stages

## Core Features
- **Movement Growth**: Track progress through evolutionary stages (egg → larvae → pupa → butterfly)
- **User Journeys**: Multiple paths for different types of engagement
- **Authentication**: Secure, multi-step registration process
- **Campaign Management**: Organize and participate in meaningful campaigns
- **Project Collaboration**: Turn ideas into reality through coordinated effort
- **Resource Sharing**: Access and contribute to a growing knowledge base

## Tech Stack
- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Backend**: Node.js with tRPC
- **Database**: PostgreSQL with Prisma
- **Cache**: Redis
- **PWA Support**: Offline-first capabilities

## Environment Setup
```bash
# Required environment variables
DATABASE_URL="postgresql://user:password@localhost:5432/funtime"
JWT_SECRET="your-secure-jwt-secret"
```

## Development Setup
```bash
# Clone the repository
git clone [repository-url]
cd funtime

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

## Project Structure
```
src/
├── components/     # React components
│   ├── auth
│   ├── common/    # Shared components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Navigation.tsx
│   │   ├── OrganicButton.tsx
│   │   ├── OrganicCard.tsx
│   │   ├── OrganicSymbols.tsx
│   │   └── SvgSprite.tsx
│   ├── home/      # Home page components
│   │   ├── HighlightsFeed.tsx
│   │   ├── QuickActions.tsx
│   │   └── WelcomeBanner.tsx
│   └── layout/    # Layout components
│       └── MainLayout.tsx
├── docs
├── lib
│   └── trpc.ts
├── pages/         # Next.js pages
│   ├── api
│   │   └── trpc
│   │       └── [trpc].ts
│   ├── _app.tsx
│   ├── index.tsx
│   └── test-db.tsx
├── server/        # Backend logic
│   ├── context.ts
│   ├── db.ts
│   ├── routers
│   │   ├── index.ts
│   │   ├── post.ts
│   │   └── user.ts
│   └── trpc.ts
├── styles/        # Global styles
│   └── globals.css
├── types/         # TypeScript definitions
│   └── index.ts
└── utils
```

## Design System
The platform uses an organic, nature-inspired design system reflecting its transformative approach:
- **Colors**: Earth tones and natural gradients
- **Animations**: Smooth, organic transitions
- **Icons**: Custom SVG symbols representing growth and change
- **Components**: Interactive elements with natural behavior

## Contributing
Contributions are welcome! Please read our contributing guidelines for details on our code of conduct and development process.

## License
[License Type] - see LICENSE file for details
