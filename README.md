# Build The Right Ghana

Build The Right Ghana is a React + Vite web application for the Build The Right Ghana initiative. It includes a public-facing website, a contact form powered by EmailJS, a robust Firebase-backed admin dashboard with Role-Based Access Control (RBAC), and dynamic donation details shown in the public UI.

## Stack

- React 19
- Vite 7
- Tailwind CSS 3
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Analytics
- EmailJS browser SDK
- Framer Motion
- Lucide React

## Quick Start

1. Install dependencies:

```powershell
npm install
```

2. Create your local environment file:

```powershell
Copy-Item .env.example .env
```

3. Fill in the values in `.env`.

4. Start the development server:

```powershell
npm run dev
```

5. Build for production:

```powershell
npm run build
```

## Environment Variables

The app currently uses these variables:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_MOMO_NUMBER=
VITE_MOMO_NAME=
VITE_BANK_NAME=
VITE_BANK_ACCOUNT_NUMBER=
```

`VITE_MOMO_*` and `VITE_BANK_*` drive donation details in the UI (which fall back to a "Contact Support" view if no methods are present in the database). `VITE_CLOUDINARY_*` powers image uploads in the admin dashboard.

## Project Docs

See the `reading` folder for the full project guide:

- [Project Overview](./reading/PROJECT_GUIDE.md)
- [Environment and Service Setup](./reading/ENVIRONMENT_SETUP.md)
- [EmailJS Contact Template](./reading/emailjs-contact-template.html)

## Notes

- Firebase config values for web apps are project identifiers, not server secrets, but they should still be managed carefully.
- EmailJS must use the expected field names from the contact form: `company`, `user_name`, `user_phone`, `user_email`, and `message`.
- The admin dashboard depends on a Cloudinary unsigned upload preset for image uploads (defaults are provided in the code if environment variables are missing).
- The Admin system relies on specific Firestore Security Rules to prevent lockouts. Ensure the Root Admin email is hardcoded into the Firestore Rules.
