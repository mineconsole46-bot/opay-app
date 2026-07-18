# OPay UI Clone

Pixel-accurate OPay mobile wallet UI clone built for UI redesign/development reference.

## Structure

```
├── frontend/   React + Vite app (mobile-first, dark theme)
└── backend/    Express API server (Flutterwave proxy)
```

## Frontend

Dark-themed mobile wallet with full transfer flows:
- **Transfer to Bank** — 10-digit account + bank picker + live name lookup
- **Transfer to OPay** — phone/account + amount + Face ID confirmation
- **Transaction History** — filterable list with month totals
- **Transaction Detail** — 3-step progress, receipt sharing

### Run locally

```bash
cd frontend
npm install
npm run dev
```

### Deploy to Vercel

1. Import repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** → `frontend`
3. Add environment variable: `Flutter` = your Flutterwave live secret key
4. Deploy

The `frontend/api/` folder contains Vercel serverless functions that proxy Flutterwave — no separate backend needed on Vercel.

## Backend (standalone Express)

Only needed if you want to run the API server separately (not required for Vercel).

```bash
cd backend
npm install
Flutter=FLWSECK_LIVE-xxx npm run dev
```

Runs on `http://localhost:8080`.
