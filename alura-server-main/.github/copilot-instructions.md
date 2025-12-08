# Alura GraphQL Server - AI Agent Instructions

## Project Overview

This is a **GraphQL Apollo Server** for managing fitness activities. It provides a REST-less API where clients query activity data and submit new activities. Data persists to `data/activities.json` as a simple file-based store.

### Core Architecture
- **Server**: Apollo Server (Node.js)
- **Data Layer**: JSON file (`data/activities.json`) - activities are loaded on startup and written synchronously on mutations
- **API Pattern**: Pure GraphQL (no REST endpoints)

## Key Patterns & Conventions

### Data Model
Activities represent fitness events with these required fields:
```javascript
{
  id: ID,
  time: String,
  type: String, // e.g., "Run", "Walk"
  distance: String,
  calories: String,
  bpm: String,
  user: String,
  userImage: String,
  imageUrl: String
}
```

Optional metadata: `likes`, `comments` (present in some records but not required by schema).

### Query/Mutation Pattern
- **Queries**: `mockActivities(user?: String)` - returns all activities or filtered by username
- **Mutations**: `addActivity(...)` - creates new activity, auto-assigns next ID, persists to JSON
- All resolver logging uses `console.log()` for debugging

### Data Persistence
- Activities loaded from file on server startup: `JSON.parse(fs.readFileSync('./data/activities.json'))`
- Mutations write back synchronously: `fs.writeFileSync('./data/activities.json', JSON.stringify(activities, null, 2))`
- No transaction safety; concurrent writes will corrupt data

## Developer Workflows

### Starting the Server
```bash
npm install
node index.js
```
Server runs on port 4000 by default (Apollo Server default).

### Testing Changes
- Use Apollo Sandbox (GraphQL IDE): `http://localhost:4000`
- Test queries with user filtering to verify resolver behavior
- Check `data/activities.json` after mutations to verify persistence

## Critical Implementation Notes

1. **Schema-Driven**: Always update `typeDefs` first when changing Activity structure; resolvers must match
2. **File I/O Synchronous**: Mutations use `writeFileSync` - suitable only for development/small scale
3. **ID Generation**: Simple `activities.length + 1` - not UUID; may conflict if data is manually edited
4. **User Filtering**: `mockActivities` filters by exact string match on `user` field
5. **No Validation**: Mutations accept any string value; malformed data can be added (see "dasdsad" entries in activities.json)

## Files to Reference
- `index.js` - entire server logic (schema, resolvers, startup)
- `data/activities.json` - data source and persistence target
- `package.json` - dependencies (apollo-server, graphql)

## Common Modifications

- **Adding Fields**: Update Activity type in `typeDefs`, add to `addActivity` mutation params, update resolver logic
- **Filtering Logic**: Modify Query resolver's `mockActivities` filter condition
- **Validation**: Wrap resolver logic with input validation before persistence
- **Scaling**: Replace file-based storage with a database; move ID generation to database layer
