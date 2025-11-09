# 🏗️ FamFund – Project Structure Overview

## Root Files
- **server.js** – main entry point, initializes Express app
- **.env** – environment variables (DB URI, PORT, session secret, etc.)
- **dev.sh** – quick script to start development server
- **package.json** – dependencies and npm scripts
- **STRUCTURE.md** – this guide for team reference

---

## 📦 src/
Application logic (controllers, routes, database models, etc.)

| Folder | Description |
|---------|--------------|
| **config/** | Database connection, session, and environment setup |
| **models/** | Mongoose schemas: User, Family, Goal, Contribution, Tip, Notification |
| **controllers/** | Functions that handle each route (auth, goals, contributions...) |
| **routes/** | Express route definitions (`/auth`, `/family`, `/goal`, etc.) |
| **middleware/** | Auth checks, role-based access, and request preprocessing |
| **services/** | Reusable logic: notifications, rewards, goal progress |
| **utils/** | Helpers (validators, formatters, async handlers) |

---

## 🎨 views/
EJS templates organized by feature.

| Folder | Description |
|---------|--------------|
| **layouts/** | Base layout(s) shared across pages |
| **partials/** | Navbar, footer, flash messages, etc. |
| **auth/** | Sign in / sign up pages |
| **family/** | Family creation, join requests, approvals |
| **goals/** | Goal list, details, and progress views |
| **tips/** | Parent-created financial tips pages |
| **notifications/** | Family notifications feed |
| **dashboard/** | Main combined dashboard for each user |

---

## 🌐 public/
Static files served directly.

| Folder | Description |
|---------|--------------|
| **css/** | Stylesheets |
| **js/** | Frontend scripts |
| **images/** | Icons, goal images, default avatars |
