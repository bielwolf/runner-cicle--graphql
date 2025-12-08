# Alura Runner Circle - AI Agent Instructions

## Project Overview
**Type**: React 18 + TypeScript + GraphQL social fitness app  
**Build Tool**: Vite  
**Key Libraries**: Apollo Client, styled-components, React Router, MUI, Phosphor icons

This is a social fitness tracking application where users share running/exercise activities in a feed format.

## Architecture

### Component Structure
```
src/
├── pages/          # Route components (Login, FeedGeral, Publicar)
├── components/     # Reusable UI (ActivityCard, Menu)
├── layouts/        # Route wrappers (DefaultLayout)
├── styles/         # Global styling & theme
└── @types/         # Custom TypeScript definitions
```

### Routing Pattern
- **Root routes**: `DefaultLayout` (Login) at `/`
- **Authenticated routes**: `Menu` wrapper with `/feed` and `/criar` nested routes
- Located in `src/Router.tsx` - modify to add new pages

### Styling Convention
- **Framework**: styled-components + Material-UI
- **Theme**: Centralized `src/styles/themes/default.ts` with predefined colors
  - Greens: `verde-limao` (#b6ff06), `verde-medio` (#DBFF81), `green-500` (#56ff02)
  - Blues: `azul` (#699CFF), `azul-baby` (#689cff)
  - Grays: `gray-500` through `gray-900` (dark theme)
- **Pattern**: Each component has `styles.ts` file exporting styled components
  - Example: `src/components/ActivityCard/styles.ts` exports `ActivityCardContainer`, `ActivityImage`, etc.
  - Access theme colors with `${(props) => props.theme['color-name']}`

### Data Models
**Activity Interface** (`src/components/ActivityCard/index.tsx`):
```typescript
{
  id, time, type, distance, calories, bpm, user, userImage, likes, comments, imageUrl
}
```

## Development Workflow

### Commands
```bash
npm run dev          # Start Vite dev server (HMR enabled)
npm run build        # TypeScript compile + Vite bundle
npm run lint-fix     # ESLint auto-fix
npm run preview      # Preview production build
```

### Code Quality
- **Linting**: ESLint with TypeScript parser
- **Strategy**: Run `npm run lint-fix` before commits for consistency
- **Note**: Type checking happens during `npm run build`

## Key Patterns & Conventions

### Component Creation
1. Create folder in `src/components/` or `src/pages/`
2. Add `index.tsx` with component logic
3. Create `styles.ts` with styled components using theme colors
4. Export component and styled components separately

### Apollo Client Integration
- **Pattern**: Use Apollo Client for GraphQL queries/mutations
- **Dependencies**: `@apollo/client`, `graphql`
- **Not yet configured** in visible code - expect Apollo setup in `main.tsx` or separate config file when implementing queries

### Icon Usage
- Library: phosphor-react (named imports, e.g., `PersonSimpleRun`, `Flame`, `Heartbeat`)
- Used in `ActivityCard` for visual indicators

## Important Notes
- **GraphQL Server**: `apollo-server` dependency present but server setup not visible in codebase
- **Material-UI Integration**: MUI components wrapped with styled-components (see `ActivityCard` pattern)
- **TypeScript**: Strict mode - type inference works but define interfaces for data structures
- **Theme Provider**: Wraps entire app in `App.tsx` - always use theme colors for consistency

## Common Tasks

### Add new page
1. Create `src/pages/NewPage/index.tsx`
2. Add route in `src/Router.tsx`
3. Create `src/pages/NewPage/styles.ts` with styled components

### Add new component
1. Create `src/components/NewComponent/index.tsx` with TypeScript interface
2. Create `src/components/NewComponent/styles.ts`
3. Export both from index files

### Styling a component
- Always wrap styled components with theme colors
- Reference theme via `${(props) => props.theme['color-name']}`
- Define all theme values in `src/styles/themes/default.ts` first
