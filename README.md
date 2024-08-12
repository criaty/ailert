# AILERT - AI-Powered Camera Surveillance Web App

AILERT is an open-source, AI-driven camera surveillance web application that allows users to create custom alerts based on real-time video feeds. Built with [Firebase](https://firebase.google.com/) and [Gemini](https://gemini.google.com/), AILERT is designed for flexibility and ease of use, enabling the monitoring of any camera connected to your computer or smartphone, including IP and drone cameras.

See the following YouTube vide for an overview:

[AILERT: AI-Powered Camera Surveillance Web App](https://youtu.be/Y6J42AcK2ZU)

## Key Features

### Custom Alerts

Create and configure alerts for any situation, leveraging AI to interpret camera feeds and trigger notifications.

### Real-Time Monitoring

Use any compatible camera to monitor your environment in real-time.

### Web-Based Interface

Accessible from any device with a web browser, no need for specialized hardware.

### Extensible

Configure webhooks to integrate AILERT with other systems or extend its functionality.

## Getting Started (Demonstration)

- Visit https://ailert.criaty.com and log in with your Google account.
- Add your [Google AI Studio API key](https://aistudio.google.com/app/apikey) in the settings to enable AI-powered alerts.
- In Settings, we recommend to set the AI update interval to 4 seconds for testing purposes. Note that the use of the Gemini API is free with restrictions. Check the Google AI Studio documentation for more information.
- Start creating custom alerts and monitoring your environment.

## Inspiration

AILERT was inspired by the need for a reliable monitoring system to ensure the safety of loved ones, particularly in situations where immediate alerts are crucial.

For more detailed instructions, examples, and contributions, please refer to the documentation provided in this repository.

## Pre-requisites

In order to properly run a copy of the application you will need to setup a Firebase project with Google Authentication, a Firestore Database and Functions. You may also add 2 Hosting sites in Firebase, to deploy the static web apps.

Adjust `.firebaserc` and `firebase.json` according to your Firebase configuration.

You will also need to have installed the following tools:

- Node.js 20+
- NX

## Configure the application

Once you have downloaded this repo you should install the npm packages. Run the command below on the repo root:

```
npm install
```

After that, change the following configurations according to your Firebase project:

### .env.local

Add your Firebase configuration:

```
VITE_FIREBASE_API_KEY="YOUR-APP-KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR-APP-KEY"
VITE_FIREBASE_PROJECT_ID="YOUR-PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR-STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR-MESSAGING_SENDER_ID"
```

### apps/ailert

Adjust the .env files, in particular your Firebase web app id:

`apps/ailert/.env.local`:

```
VITE_FIREBASE_APP_ID="YOUR-APP-ID"
VITE_FIREBASE_MEASUREMENT_ID="YOUR-APP-MEASUREMENT_ID"
```

### apps/ailert-viewer

Adjust the .env files, in particular your Firebase web app id:

`apps/ailert-viewer/.env.local`:

```
VITE_FIREBASE_APP_ID="YOUR-APP-ID"
VITE_FIREBASE_MEASUREMENT_ID="YOUR-APP-MEASUREMENT_ID"
```

## Start the Firebase Emulator

```
npm firebase emulate
```

## Start the applications

Run `npx nx serve ailert` and `npx nx serve ailert-viewer` to start the development servers. Happy coding!

## Build for production

Run `npm run build` to build the application. The build artifacts are stored in the output directory (e.g. `dist/`), ready to be deployed.

## Deploy

Run `npm run deploy`.
