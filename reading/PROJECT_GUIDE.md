# Project Guide

## Overview

Build The Right Ghana is a single-page React application with public pages and a robust, modular admin area.

Main areas:

- Public home page with mission, campaigns, blog preview, donation prompts, and contact section.
- Blog archive and individual blog post reader pages.
- Firebase-authenticated admin login.
- Admin dashboard for creating, editing, and deleting blog posts in Firestore.
- EmailJS-powered contact form for website inquiries.

## Main Features

### Public website

- Hero, mission, about, projects, blog preview, and footer sections.
- Dynamic donation details shown in `Mission` and `FooterCTA` (falls back to a sleek "Contact Support" social media block if no payment methods are active).
- Embedded Google Map and contact form.

### Contact form

- Uses `emailjs.sendForm(...)` in `src/Components/Contact.jsx`.
- Requires valid EmailJS service, template, and public key values.
- Sends these fields to EmailJS:
  - `company`
  - `user_name`
  - `user_phone`
  - `user_email`
  - `message`

### Admin/blog system

- Login uses Firebase Authentication (supports "Forgot Password" functionality).
- Advanced Role-Based Access Control (RBAC): Root Admin, Super Admins, and Regular Admins.
- Admin Directory to manage user roles, explicit account disabling, and tracking authorized emails.
- Admins have a "Panic Button" to safely disable their own accounts if compromised.
- Dynamic Payment Methods management for the frontend donation modals.
- Blog content is stored in a Firestore `posts` collection.
- Image uploads in the dashboard go through Cloudinary.
- Admin routes are protected by Firebase auth state, database-level disable toggles, and strict security rules.

## Important Files

- `src/App.jsx`: routes and shared layout decisions.
- `src/firebase.js`: Firebase initialization.
- `src/Components/Contact.jsx`: EmailJS form integration.
- `src/Login.jsx`: admin login.
- `src/Dashboard.jsx`: Main dashboard layout, access verification, and state management.
- `src/Components/Dashboard/`: Modular dashboard components (Sidebar, Header, PostList, PaymentSection, AdminsSection, Modals).
- `src/Pages/Blog/BlogArchive.jsx`: blog list page.
- `src/Pages/Blog/PostPage.jsx`: single post page.

## Dependencies Used

Runtime dependencies:

- `react`, `react-dom`
- `react-router-dom`
- `firebase`
- `@emailjs/browser`
- `framer-motion`
- `lucide-react`
- `react-simple-captcha` (installed, but not currently used by the contact form)

Development dependencies:

- `vite`
- `@vitejs/plugin-react`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `eslint`
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`

## How Data Flows

### Contact form submission

1. The user fills in the contact form.
2. The app validates the local captcha.
3. The form is sent with EmailJS using the configured service ID, template ID, and public key.
4. EmailJS renders the template with the submitted form values.

### Blog publishing

1. An admin signs in with Firebase Authentication.
2. The dashboard uploads the selected image to Cloudinary.
3. The blog post is saved to Firestore with a generated slug and timestamp.
4. Public blog pages read from Firestore and render the post content.

## Local Development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Fill in all required values from Firebase, EmailJS, Cloudinary, and donation settings.
4. Run `npm run dev`.
5. Open the local Vite URL in your browser.

## Production Checklist

- Add the real production Firebase web app config.
- Add the correct EmailJS service/template/public key values.
- Ensure the EmailJS template includes the exact expected variable names.
- Create or verify the Cloudinary unsigned upload preset used by the dashboard.
- Confirm Firestore security rules and Authentication settings are correct.
- Verify that admin login works before deploying.
