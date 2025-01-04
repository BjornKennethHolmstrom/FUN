# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2024-12-29 & 2025-01-04
### Added
- Comprehensive test suite for authentication system
- Redis-based token service for session management
- Password hashing and verification utilities
- Type-safe authentication endpoints:
  - Login with email/password
  - Token refresh
  - Session management
  - Single and multi-device logout
- Type-safe login form component matching signup design
- Shared authentication type definitions

### Enhanced
- Improved security with hybrid JWT/Redis authentication
- Added proper database cleanup for tests
- Type-safe user authentication interfaces
- Prisma schema mapping for authentication fields
- Refactored signup form to use shared type definitions
- Improved form validation with better error handling
- Streamlined multi-step registration process
- Better organization of authentication components

### Technical Details
- Implemented bcryptjs for password handling
- Created separate test database configuration
- Added systematic database cleanup in test environment
- Enhanced error handling in auth endpoints

## [0.3.0] - 2024-12-07
### Changed
- Reimagined platform focus to support both existing and new projects
- Transformed Explore Ideas into Projects Hub with dual functionality
- Updated navigation to reflect new platform direction

### Added
- Projects Hub with toggle between existing and new projects
- Verification system for established projects
- Enhanced project cards with stage indicators
- New filtering system for project types

## [0.2.0] - 2024-11-09
### Added
- User registration system with multi-step signup form
- Authentication utilities with JWT support
- Learn More page with mission and values presentation
- Join page with different path options
- Stage progression visualization component
- Custom butterfly-themed SVG icons for transformation stages

### Enhanced
- Improved OrganicButton component with proper Link integration
- Added type-safe API routes using tRPC
- Enhanced user model with stage progression fields
- Integrated prisma enums for user stages
- Fixed hydration issues in welcome banner

### Technical Details
- Set up JWT-based authentication system
- Created type-safe mutations for user signup
- Implemented multi-step form validation
- Enhanced database schema with new user fields
- Fixed server-side rendering compatibility

## [0.1.0] - 2024-11-02
### Added
- Initial project setup with Next.js 15
- Core components structure
- Database setup with Prisma and PostgreSQL
- Custom organic design system
- Basic home page layout
- Animated SVG symbols for main sections
- PWA configuration
- TailwindCSS integration
- tRPC setup for type-safe APIs

### Technical Details
- Implemented database models for users, campaigns, and content
- Created custom SVG symbol system for organic UI elements
- Set up development environment with hot reloading
- Configured TypeScript for type safety
- Integrated Prisma for database management

### Design
- Created initial color palette with earth tones
- Designed animated organic symbols
- Implemented responsive layout system
- Added stage-based visual treatments
