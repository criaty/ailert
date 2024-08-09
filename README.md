# Ailert

## Configure the application

### .env.local

Add your Firebase configuration:

```
VITE_FIREBASE_API_KEY="YOUR-APP-KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR-APP-KEY"
VITE_FIREBASE_PROJECT_ID="YOUR-PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR-STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR-MESSAGING_SENDER_ID"
```

## apps/ailert

Add your Firebase web app id:

```
VITE_FIREBASE_APP_ID="YOUR-APP-ID"
VITE_FIREBASE_MEASUREMENT_ID="YOUR-APP-MEASUREMENT_ID"
```

## apps/ailert-viewer

Add your Firebase web app id:

```
VITE_FIREBASE_APP_ID="YOUR-APP-ID"
VITE_FIREBASE_MEASUREMENT_ID="YOUR-APP-MEASUREMENT_ID"
```

## Start the application

Run `npx nx serve ailert` to start the development server. Happy coding!

## Build for production

Run `npm run build` to build the application. The build artifacts are stored in the output directory (e.g. `dist/`), ready to be deployed.

## Deploy

Run `npm run deploy`.
