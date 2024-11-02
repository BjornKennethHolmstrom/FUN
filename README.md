# FUN(TIME) - Freedom & Unity Network

A digital platform supporting transformative social change through individual meaningful effort.

## Overview
FUN(TIME) connects people and organizations working towards solving major global and local issues, fostering unity while preserving individual freedom. The platform facilitates knowledge sharing, campaign organization, and collaborative action.

## Core Features
- **Movement Growth**: Track progress through evolutionary stages (egg → larvae → pupa → butterfly)
- **Campaign Management**: Organize and participate in meaningful campaigns
- **Project Collaboration**: Turn ideas into reality through coordinated effort
- **Resource Sharing**: Access and contribute to a growing knowledge base

## Tech Stack
- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Backend**: Node.js with tRPC
- **Database**: PostgreSQL with Prisma
- **Cache**: Redis
- **PWA Support**: Offline-first capabilities

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
│   ├── common/    # Shared components
│   ├── home/      # Home page components
│   └── layout/    # Layout components
├── pages/         # Next.js pages
├── server/        # Backend logic
├── styles/        # Global styles
└── types/         # TypeScript definitions
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
