# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend (React + Vite)
Located in `/frontend` directory:
- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking without compilation
- `npm run test` - Run Vitest tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run preview` - Preview production build

### Backend (Spring Boot + Kotlin)
Located in `/backend` directory:
- `./gradlew bootRun` - Start Spring Boot application
- `./gradlew build` - Build application
- `./gradlew test` - Run tests
- `./gradlew clean` - Clean build directory

### Infrastructure
- `docker-compose up` - Start all services (SQL Server, Redis, Nginx)

## Architecture Overview

### Backend Architecture
- **Framework**: Spring Boot 3.2.0 with Kotlin 1.9.21
- **Database**: Microsoft SQL Server via Spring Data JDBC
- **Architecture Pattern**: Domain-driven design with layered architecture
  - `api/` - REST controllers (presentation layer)  
  - `domain/` - Domain entities and services (business logic)
  - `infrastructure/` - Data access and external adapters
- **Key Features**: Spring Security, OpenAPI documentation, stored procedure integration

### Frontend Architecture  
- **Framework**: React 18 with TypeScript and Vite
- **State Management**: Zustand for global state, Jotai for atomic state
- **Data Fetching**: TanStack Query (React Query) with Axios
- **UI Components**: Radix UI components with Tailwind CSS
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest framework

### Project Structure
```
smartbill-modernization/
├── backend/              # Spring Boot Kotlin application
│   └── src/main/kotlin/com/smartbill/
│       ├── api/          # REST controllers
│       ├── domain/       # Business logic and entities
│       └── infrastructure/ # Data access layer
├── frontend/             # React TypeScript application
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page components
│       ├── services/     # API service layer
│       ├── hooks/        # Custom React hooks
│       └── types/        # TypeScript type definitions
├── docker-compose.yml    # Multi-service container setup
└── nginx.conf           # Reverse proxy configuration
```

### Key Domain Concepts
- **DRC (전자세금계산서)**: Electronic tax invoice system
  - Main entity: `DrcMainUser` with user management functionality
  - CRUD operations through stored procedures
  - Search and pagination capabilities
- frontend에서 npm 안쓰고 yarn만 쓸꺼야. 해당 부분 적용할 것
- frontend에서 yarn등의 작업을 할때는 `source ./env-24.7.0/bin/activate`를 통해 가상환경 활성화 한 후 실행