# WhatsApp

A small WhatsApp-style React Native app built with the current bare workflow. The
sample keeps the original conversation, call, contact, and avatar assets while
using a restrained solid-color interface.

## Requirements

- Node.js 22.11 or newer
- Android Studio with an Android SDK/API 37 setup for Android builds
- Xcode and CocoaPods for iOS builds

## Run locally

```sh
npm install
npm start
```

In another terminal, launch a platform:

```sh
npm run android
# or
npm run ios
```

## Validation

```sh
npm run typecheck
npm run lint
npm test -- --runInBand
```

The app does not connect to external services. Messages are local sample data
and remain in memory for the current session.
