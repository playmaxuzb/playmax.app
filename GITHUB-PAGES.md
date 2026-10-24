# PLAYMAX mobile app demo — GitHub Pages

This is the installable web-app demo. Publish the **contents of this folder as the repository root**. GitHub Pages serves it over HTTPS; Android browsers can offer Install and iPhone users can use Safari's Share → Add to Home Screen.

## Publish

1. Create a new GitHub repository for the app.
2. Upload every item in this folder, including `assets/`, `.nojekyll`, `manifest.webmanifest`, and `service-worker.js`.
3. In the repository, open **Settings → Pages**. Choose **Deploy from a branch**, select `main` (or `master`) and `/(root)`, then save.
4. Wait for the Pages deployment to finish. Open the published HTTPS address and install it from the browser menu.

The manifest and worker use relative paths, so the demo also works when GitHub Pages publishes under `https://ACCOUNT.github.io/REPOSITORY/`.

## Demo limits

The catalog, colors, bag and calculator work in the browser. Customers send their order themselves through WhatsApp or Telegram to +93 77 990 1111; there is no online payment. Accounts and marketplace posts are saved on the device only until a server/database is connected. The 3D viewer and web fonts need internet access. This is an installable PWA; it is not a signed Android APK or an App Store package.


## Live content
`content.json` is written by the separate **PLAYMAX Admin** app. The site reads it on every visit, so admin changes appear in about a minute without a new upload. Keep the file in the repository root.
