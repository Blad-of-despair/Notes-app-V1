# Notes App

A full-stack notes application built with Next.js, MongoDB, and Tailwind CSS. This app allows users to securely register, log in, and manage their personal notes.

## Features

- **User Authentication**
  - Register a new account
  - Log in securely
  - Authentication via JWT tokens
  - Protected routes for notes management

- **Notes Management**
  - Create new notes
  - View a list of your notes
  - View details of a single note
  - Edit existing notes
  - Delete notes

- **API Endpoints**
  - RESTful API for notes CRUD operations
  - Authentication endpoints for login, registration, and user info

- **Modern UI**
  - Responsive design using Tailwind CSS
  - Clean and intuitive user interface

## Folder Structure

- `app/` - Next.js app directory
  - `api/` - API routes for authentication and notes
  - `login/`, `register/`, `notes/` - UI pages for authentication and notes
- `components/` - Reusable React components
- `lib/` - Utility libraries (API, auth middleware, MongoDB connection)
- `models/` - Mongoose models for User and Note
- `public/` - Static assets

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up your MongoDB connection string in environment variables.
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Register for a new account or log in.
- Create, view, edit, and delete your notes.
- All note operations are private and require authentication.

## License

This project is open source and available under the MIT License.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
