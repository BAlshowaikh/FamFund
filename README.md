# 💰 FamFund

**FamFund** is a collaborative family finance platform that helps parents and children **plan, save, track, and celebrate financial goals together**.
It combines goal tracking, virtual contributions, educational tips, notifications, and rewards to teach children financial responsibility in an engaging way.

---

# 📑 Table of Contents

- [💰 FamFund](#-famfund)
- [📑 Table of Contents](#-table-of-contents)
  - [🌐 Deployed Application](#-deployed-application)
  - [🎯 Project Overview](#-project-overview)
  - [🧩 Core Features](#-core-features)
    - [👨‍👩‍👧 Family Management](#-family-management)
    - [🎯 Goal \& Contribution System](#-goal--contribution-system)
    - [🔔 Notifications](#-notifications)
    - [🤖 AI Financial Coach](#-ai-financial-coach)
  - [👥 Team Roles](#-team-roles)
  - [🧱 System Highlights](#-system-highlights)
  - [🗂️ Project Architecture](#️-project-architecture)
  - [Tech Stack](#tech-stack)
  - [⚙️ Environment Variables](#️-environment-variables)
  - [🧪 Getting Started](#-getting-started)
  - [🔗 Project References](#-project-references)
  - [📄 Attributions](#-attributions)
  - [🚀 Next Steps](#-next-steps)
  - [📷 Screenshots](#-screenshots)

## 🌐 Deployed Application

🔗 **Live App:** https://famfund-9a40.onrender.com

---

## 🎯 Project Overview

FamFund empowers families to:

- **Set shared saving goals** (e.g., “Family Trip”, “New TV”)
- **Contribute** virtual savings toward these goals
- **Track progress** with visual progress bars
- **Celebrate milestones** when goals reach completion
- **Educate children** with parent-created financial tips
- **Motivate consistency** through rewards

---

## 🧩 Core Features

### 👨‍👩‍👧 Family Management
- Parent creates a family group and receives a **Family Code**
- Children join using the code *(approval flow partially implemented)*
- All family data is isolated per household

### 🎯 Goal & Contribution System
- Goals include title, description, target amount, and optional image
- Users add **virtual contributions** with messages
- Progress updates in real time
- When a goal reaches 100%:
  - Goal marked **completed**
  - **5% bonus reward** for top contributor *(planned)*
  - Celebration + notification *(planned)*

### 🔔 Notifications
- Shows join requests.

### 🤖 AI Financial Coach
- LangChain + OpenAI integration
- Explains financial concepts
- Helps kids learn saving strategies

---

## 👥 Team Roles

| Member  | Role | Responsibilities |
|---------|------|------------------|
| Abdulla | Authentication & Family Management | Sessions, login, family creation/join |
| Batool  | Goals, Contributions & Rewards | Goal CRUD, contributions, bonus logic |

---

## 🧱 System Highlights

- Node.js + Express backend
- MongoDB + Mongoose
- EJS templating
- express-session + MongoStore
- Multer for file uploads
- LangChain + OpenAI

---

## 🗂️ Project Architecture

FamFund/
├─ public/
│  ├─ css/
│  ├─ js/
│  └─ images/
├─ services/langchain/
├─ src/
│  ├─ controllers/
│  ├─ routes/
│  ├─ models/
│  ├─ middleware/
│  └─ config/
├─ views/
├─ server.js
├─ package.json
└─ README.md

---
## Tech Stack

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- express-session with Mongo-backed session store
- Multer (file uploads for images)

**Frontend**

- EJS templates (`/views`)
- Vanilla JS + Bootstrap

**AI Service**

- LangChain-based service inside `/services/langchain` (for the financial coach)
- OpenAI (or other LLM provider) via API key in environment variables

---

## ⚙️ Environment Variables

PORT=3000  (or any other number)
MONGODB_URI=mongodb://localhost:27017/famfund
SESSION_SECRET=your-strong-secret
OPENAI_API_KEY=your-openai-api-key

---

## 🧪 Getting Started

```bash
git clone https://github.com/BAlshowaikh/FamFund.git
cd FamFund
npm install
npm start OR nodemon
```

Visit http://localhost:3000

---

## 🔗 Project References

| Resource | Description | Link |
|----------|-------------|------|
| ERD | Database design | [ERD](/public/images/erd.png) |
| Figma | UI design | [Design](https://www.figma.com/design/tmaUP2TxRMS8FUu7dWjCmr/FamFund) |
| Logo | App logo | [Logo](/public/images/logo.png) |

---

## 📄 Attributions

- Node.js — https://nodejs.org
- Express.js — https://expressjs.com
- MongoDB/Mongoose — https://mongoosejs.com
- Bootstrap 5 — https://getbootstrap.com
- Bootstrap Icons — https://icons.getbootstrap.com
- EJS — https://ejs.co
- Multer — https://github.com/expressjs/multer
- LangChain.js — https://js.langchain.com
- OpenAI — https://openai.com

---

## 🚀 Next Steps

- Per-child analytics
- Advanced rewards (badges, levels)
- Savings challenges
- Push notifications
- Daily automated financial tips
- Arabic/English localization + RTL

---

## 📷 Screenshots
- Homepage:
<br/>
<br/>
![Home page](https://i.postimg.cc/MpN3qFqq/Homepage.png)

- Signup page:
  <br/>
  <br/>
![Signup](https://i.postimg.cc/0yznr0Ng/Signup-page.png)

- Signup for Parent:
  <br/>
  <br/>
![Signup for parent](https://i.postimg.cc/NGbk4zyV/parent-signup-page.png)

- Signup for Child:
  <br/>
  <br/>
![Signup for child](https://i.postimg.cc/mrwPs0W0/child-signup-page.png)

- Dashboard:
  <br/>
  <br/>
![Dashboard](https://i.postimg.cc/QtzxND4S/dashboard.png)

- Goals:
  <br/>
  <br/>
![Goals](https://i.postimg.cc/pdGnjgc2/goalpage.png)

- Adding goals:
  <br/>
  <br/>
![Adding goals](https://i.postimg.cc/fRHbqYc6/adding-goals-for-parent.png)

- Editing goals:
  <br/>
  <br/>
![Editing goals](https://i.postimg.cc/jjwR8mdj/editing-goals-for-parents.png)

- Contributing:
  <br/>
  <br/>
![Contributing](https://i.postimg.cc/8kBNnhDw/Adding-a-contribution.png)

- Contributions:
  <br/>
  <br/>
![Contributions](https://i.postimg.cc/L5HKMbRc/contributions-page.png)

- Profile:
  <br/>
  <br/>
![Profile](https://i.postimg.cc/TYgmsNhx/profile.png)
