# Retail Demand Planning Studio

A Next.js MVP for retail demand planning with reproducible mock data, six baseline forecasting methods, demand-pattern simulation, model comparison, promotion scenarios, consensus planning, and Excel export.

## What's included

- 150 simulated SKUs across 10 categories with 156 weeks of patterned demand history.
- Interactive dashboard, SKU search/filter, historical demand view, forecast lab, promotion scenario builder, and consensus forecast view.
- Six baseline methods: Naive, Seasonal Naive, Moving Average, Weighted Moving Average, Exponential Smoothing, and Holt Trend.
- Holdout WMAPE and bias calculations for the selected SKU and method.
- Excel export using `xlsx` and a file-upload reader for CSV/XLSX (import mapping/persistence is not yet implemented).
- Responsive interface designed for desktop and mobile.

## Run locally

Requires Node.js 18.17+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Create a GitHub repository and upload/push this project.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the framework preset as Next.js. No environment variables are required for demo mode.
4. Deploy. Vercel will build the project and provide a hosted URL.

## Important MVP boundaries

- This version runs demo data in the browser; data changes are not persisted across sessions.
- Upload currently validates and reads a workbook but does not overwrite the demo dataset. Production import mapping is a next step.
- Forecast methods are educational baseline implementations. Seasonal Naive uses a 52-week lag when enough history is available; with the demo data, forecast horizons and holdout metrics are illustrative.
- ARIMA/SARIMA, Croston/SBA/TSB, rolling-origin backtesting, authentication, database persistence, approval workflows, and scheduled refreshes are not implemented in this MVP.
- Do not upload confidential business data until secure authentication, storage, and access controls are configured.

## Recommended next release

1. Add validated data mapping and persistence using PostgreSQL/Supabase.
2. Add a separate Python forecasting API for ARIMA/SARIMA and intermittent-demand methods.
3. Add rolling-origin backtesting, validation-based model selection, and forecast version history.
4. Add authentication, role-based permissions, audit logs, and approval workflows.

## Build check

```bash
npm run build
```
