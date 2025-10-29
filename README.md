# Woven Words : A Full Stack Literary Blog

A modern, fast blog built with Next.js and JavaScript — focused on SEO, performance and a smooth writing experience.

## Tech Stack
- Next.js (React)
- React
- Tailwind CSS / PostCSS
- Clerk (authentication & UI themes)
- MongoDB (mongodb driver) + Mongoose (ODM)
- Firebase (optional integration)
- React Quill (rich text editor)
- react-icons
- Svix (webhook client)

## Features
- File-based routing with Next.js
- Authentication and user management with Clerk
- Rich-text post editing
- Image optimization and responsive UI
- MongoDB-backed persistence (Mongoose)
- Optional Firebase integration (if present in project code)

## Quickstart — run locally
1. Clone
   
   git clone https://github.com/AdnanGhani07/nextjs-blog-website.git
3. Install dependencies
   
   cd nextjs-blog-website
   npm install
   (or yarn / pnpm install)
   
5. Environment
   - Copy example if present:
     cp .env.example .env.local
   - Typical env variables you may need:
     - MONGODB_URI=your_mongodb_connection_string
     - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (Clerk)
     - CLERK_SECRET_KEY (server-side Clerk secret)
     - FIREBASE_* (if Firebase is used)
     - SVIX_API_KEY (if webhooks are used)
6. Run dev server
   npm run dev
   Open http://localhost:3000
7. Build & run production
   npm run build
   npm run start

## Scripts (from package.json)
- dev: next dev
- build: next build
- start: next start
- lint: next lint

## Project layout (typical)
- /app or /pages — routes
- /components — UI components
- /lib or /utils — helpers and API clients
- /styles — Tailwind / global CSS
- /public — static assets

## Notes
- Ensure Node.js version compatible with the Next.js version in this repo.
- Keep secret keys out of source control; use .env.local for local secrets.
