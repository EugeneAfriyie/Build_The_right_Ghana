# Environment and Service Setup

## Environment Variables Used By This Project

| Variable | Used for | Where it is used |
| --- | --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier | `src/Components/Contact.jsx` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template identifier | `src/Components/Contact.jsx` |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | `src/Components/Contact.jsx` |
| `VITE_FIREBASE_API_KEY` | Firebase web config | `src/firebase.js` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase web config | `src/firebase.js` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase web config | `src/firebase.js` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase web config | `src/firebase.js` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase web config | `src/firebase.js` |
| `VITE_FIREBASE_APP_ID` | Firebase web config | `src/firebase.js` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase Analytics config | `src/firebase.js` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary upload target | `src/Dashboard.jsx` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset | `src/Dashboard.jsx` |
| `VITE_MOMO_NUMBER` | Donation UI | `src/Components/Mission.jsx`, `src/Components/FooterCTA.jsx` |
| `VITE_MOMO_NAME` | Donation UI | `src/Components/Mission.jsx`, `src/Components/FooterCTA.jsx` |
| `VITE_BANK_NAME` | Donation UI | `src/Components/Mission.jsx`, `src/Components/FooterCTA.jsx` |
| `VITE_BANK_ACCOUNT_NUMBER` | Donation UI | `src/Components/Mission.jsx`, `src/Components/FooterCTA.jsx` |

## Firebase Setup

Official references:

- https://firebase.google.com/docs/web/setup
- https://firebase.google.com/docs/web/learn-more
- https://firebase.google.com/docs/analytics/get-started

### How to get the Firebase values

1. Open the Firebase console.
2. Create a project, or open the existing Build The Right Ghana project.
3. In Project Overview, add or open the registered web app.
4. Go to Project settings.
5. In the Your apps section, open the web app config snippet.
6. Copy the values from the Firebase config object into `.env`.

Map them like this:

| Firebase config field | `.env` key |
| --- | --- |
| `apiKey` | `VITE_FIREBASE_API_KEY` |
| `authDomain` | `VITE_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `VITE_FIREBASE_PROJECT_ID` |
| `storageBucket` | `VITE_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `VITE_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `VITE_FIREBASE_APP_ID` |
| `measurementId` | `VITE_FIREBASE_MEASUREMENT_ID` |

### Firebase services this app expects

- Authentication
  - Enable Email/Password sign-in if admin login should work.
- Firestore Database
  - Create a `posts` collection for blog entries.
- Storage
  - Required by config, even though current dashboard image uploads go to Cloudinary.
- Analytics
  - Optional but supported. If Analytics is enabled, keep `VITE_FIREBASE_MEASUREMENT_ID` in sync.

## EmailJS Setup

Official references:

- https://www.emailjs.com/docs/
- https://www.emailjs.com/docs/tutorial/adding-email-service/
- https://www.emailjs.com/docs/user-guide/creating-email-templates/
- https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/
- https://www.emailjs.com/docs/sdk/options/
- https://www.emailjs.com/docs/rest-api/send-form/

### How to get `VITE_EMAILJS_SERVICE_ID`

1. Sign in to the EmailJS dashboard.
2. Open Email Services.
3. Add or open the connected service you want the website to use.
4. Copy the Service ID shown for that service.
5. Paste it into `.env` as `VITE_EMAILJS_SERVICE_ID`.

### How to get `VITE_EMAILJS_TEMPLATE_ID`

1. Open Email Templates in EmailJS.
2. Create a new template, or open the existing contact template.
3. Set the template content using the HTML file in `reading/emailjs-contact-template.html`.
4. Copy the Template ID from the template settings.
5. Paste it into `.env` as `VITE_EMAILJS_TEMPLATE_ID`.

### How to get `VITE_EMAILJS_PUBLIC_KEY`

1. Open the EmailJS dashboard.
2. Go to Account.
3. Copy the Public Key.
4. Paste it into `.env` as `VITE_EMAILJS_PUBLIC_KEY`.

## Required EmailJS Template Variables

The contact form sends these exact field names:

- `company`
- `user_name`
- `user_phone`
- `user_email`
- `message`

If the EmailJS template uses different variable names, emails may send with blank values.

## Recommended EmailJS Template Settings

Use the provided HTML file in `reading/emailjs-contact-template.html` as the message body.

Recommended field mapping:

- To Email: your admin inbox
- From Name: `{{user_name}}`
- Reply-To: `{{user_email}}`
- Subject: `New Contact Inquiry - {{user_name}}`

## Cloudinary Setup

This project also uses Cloudinary for blog image uploads in the admin dashboard.

### How to get `VITE_CLOUDINARY_CLOUD_NAME`

1. Sign in to Cloudinary.
2. Open the dashboard.
3. Copy the Cloud Name value.
4. Paste it into `.env` as `VITE_CLOUDINARY_CLOUD_NAME`.

### How to get `VITE_CLOUDINARY_UPLOAD_PRESET`

1. Open Cloudinary Settings.
2. Go to Upload.
3. Create an unsigned upload preset, or open the existing one.
4. Copy the preset name.
5. Paste it into `.env` as `VITE_CLOUDINARY_UPLOAD_PRESET`.

## Donation Settings

These values are purely for display in the donation modal:

- `VITE_MOMO_NUMBER`
- `VITE_MOMO_NAME`
- `VITE_BANK_NAME`
- `VITE_BANK_ACCOUNT_NUMBER`

## Final `.env` Example

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFG123
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
VITE_MOMO_NUMBER=0244271160
VITE_MOMO_NAME=Build The Right Ghana
VITE_BANK_NAME=Your Bank Name
VITE_BANK_ACCOUNT_NUMBER=1234567890123
```
