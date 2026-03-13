# Peko Capital — Full-Stack Prototype

A financial products platform built with React + Node.js.

## Setup

```bash
# Install all dependencies
npm run install:all

# Run dev (client + server concurrently)
npm run dev
```

Client runs on http://localhost:3000
Server runs on http://localhost:5001

## Folder Structure

```
peko-capital/
├── client/               # React frontend (Create React App)
│   └── src/
│       ├── components/   # Shared layout (Sidebar, Header)
│       ├── pages/        # Route-level page components
│       │   ├── capital/  # /capital routes
│       │   ├── postpaid/ # /postpaid routes
│       │   └── checkout/ # /checkout routes
│       └── styles/       # Global CSS
└── server/               # Node.js + Express backend
    ├── routes/           # API route handlers
    └── index.js          # Entry point
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/eligibility/check | Check capital eligibility |
| GET | /api/capital/dashboard | Capital dashboard data |
| GET | /api/postpaid/dashboard | PostPaid dashboard data |
| GET | /api/postpaid/bill | Monthly bill details |
| GET | /api/postpaid/statement | Monthly statement |
| POST | /api/postpaid/confirm-payment | Confirm postpaid payment |
| GET | /api/checkout/postpaid-status | PostPaid checkout eligibility |

## Developer Notes

- All data is in-memory mock data in `server/routes/`. Replace with real DB calls.
- To add a database: install mongoose/pg in server, update each route file.
- Auth: Add JWT middleware in `server/index.js` and protect routes.
- The `client/src/pages/` folder mirrors the URL structure exactly.
