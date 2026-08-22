<div align="center">

# ✍️ Woven Words

### A Modern, Full-Stack Literary & Tech Blog Built with Next.js 15, Clerk & MongoDB

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat&logo=clerk)](https://clerk.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=flat&logo=google)](https://ai.google.dev/)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?style=flat&logo=cloudinary)](https://cloudinary.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quickstart](#-quickstart) • [Environment Variables](#-environment-variables) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 📖 Overview

**Woven Words** is a full-stack blogging platform crafted for seamless content creation, responsive reading experiences, and intelligent workflows. Built on the Next.js App Router, it integrates modern authentication, rich-text editing, media hosting via Cloudinary, automated content generation with Google Gemini AI, and MongoDB persistence.

---

## ✨ Features

- 🔐 **Authentication & User Profiles:** Managed with [Clerk](https://clerk.com/) for seamless sign-in, OAuth, and user management.
- 📝 **Rich-Text Editor:** Interactive editing with rich formatting options powered by React Quill.
- 🤖 **AI Content Assistance:** Integrated Google Gemini AI for automated blog generation and drafting.
- 🖼️ **Media & Image Storage:** Fast, cloud-based image uploads integrated with Cloudinary.
- ⚡ **Full-Stack Next.js 15:** Server and client components, optimized rendering, and API routes.
- 🎨 **Modern Design & Dark Mode:** Styled with Tailwind CSS, Lucide icons, and `next-themes` dark/light mode toggle.
- 🗄️ **Database Persistence:** Scalable document storage using MongoDB and Mongoose ODM.
- 🛡️ **Security & Sanitization:** XSS protection with `isomorphic-dompurify` and webhook verification with Svix.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Frontend** | [React 18](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | Lucide React, React Icons, Shadcn UI / Radix primitives |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) |
| **Image Hosting** | [Cloudinary](https://cloudinary.com/) |
| **AI Integration** | [Google Generative AI (Gemini)](https://ai.google.dev/) |
| **Webhooks** | [Svix](https://www.svix.com/) |

---

## 🚀 Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- `npm`, `pnpm`, or `yarn`
- MongoDB Atlas database cluster or local MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/AdnanGhani07/nextjs-blog-website.git
cd nextjs-blog-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your respective API keys and credentials in `.env.local` (see [Environment Variables](#-environment-variables)).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the blog.

---

## 🔑 Environment Variables

The application requires the following environment variables configured in `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...

# MongoDB Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority

# Site Deployment URL (SEO, Sitemap & RSS feeds)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudinary Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Gemini AI (Blog Generation & Literary Analysis)
GEMINI_API_KEY=AIzaSy...

# Cron Job Secret Authorization
CRON_SECRET=your_cron_secret_key
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local development server on port 3000 |
| `npm run build` | Builds production-ready application bundle |
| `npm run start` | Runs the production build server |
| `npm run lint` | Runs ESLint to inspect code quality |

---

## 🤝 Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please check out our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) for detailed guidelines.

---

## 🔒 Security

For security vulnerabilities and disclosure instructions, please refer to our [Security Policy](SECURITY.md).

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
