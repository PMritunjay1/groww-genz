# Groww FirstStep: Product Intern Case Study

**Live Demo:** [https://groww-genz-two.vercel.app](https://groww-genz-two.vercel.app)

An independent product concept designed for Gen Z investors to learn about investing safely and understand their financial readiness before making real investments.

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM
- Recharts (for SIP simulator visualization)
- Vitest & React Testing Library (for automated testing)

## How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Run tests:**
   ```bash
   npx vitest run
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Architecture Overview
- `src/pages/` - Contains the primary user journey screens (Onboarding, Dashboard, Learn, Simulator, Goals, Portfolio, Settings).
- `src/components/` - Reusable UI elements (like the Layout navigation).
- `src/store/UserContext.tsx` - Handles all local state persistence (saving onboarding preferences, quiz scores, and goals to `localStorage`). No backend is required.

## Demo Data Disclosure
This is an educational prototype. No real transactions occur. All "holdings" in the Portfolio section are hypothetical, and returns shown in the SIP Simulator are purely illustrative and assume fixed compounding, which is not reflective of real market behavior. No sensitive financial information (like PAN or bank details) is ever asked or transmitted.

## Deployment
This app uses React Router for client-side routing. When deploying, ensure that your hosting provider redirects all requests to `index.html`.
- **Vercel:** A `vercel.json` file is included in the repository to handle rewrites automatically.
- **Netlify:** A `public/_redirects` file is included to handle routing fallbacks.
Build Command: `npm run build`
Publish Directory: `dist`
