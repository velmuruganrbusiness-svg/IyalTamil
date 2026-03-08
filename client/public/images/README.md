# Logo image

Place your VetriZen logo here as **logo.png**.

The logo is used in:
- Header (top navigation)
- Login modal

Supported format: PNG (with or without transparency).

## Removing the background

To use **only the logo** (no light/cream background):

1. Open **remove-logo-bg.html** in your browser (e.g. `file:///.../client/public/images/remove-logo-bg.html` or `/images/remove-logo-bg.html` when the dev server is running).
2. Choose your logo image, click **Remove background & download**.
3. Replace **logo.png** in this folder with the downloaded **logo-transparent.png**.

The header and login modal use a circular crop (`object-cover`) so only the logo circle is shown; a transparent PNG looks best.
