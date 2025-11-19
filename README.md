# FamFund

FamFund is a collaborative family finance web app that helps parents and children **plan, save, and celebrate financial goals together**.

It combines shared goals, progress tracking, a light rewards system, and optional AI-powered coaching to make financial literacy fun and practical at home.

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Deployed Link](#deployed-link)
- [Project References](#project-references)
- [Attributions](#attributions)
- [License](#license)

---

## Overview

FamFund promotes **financial awareness through family collaboration**:

- Parents & children agree on **shared saving goals** (e.g., *Family Trip*, *New TV*).
- Everyone contributes virtual amounts toward those goals.
- The system tracks **progress and activity** in one place

---

## Core Features

### 👨‍👩‍👧 Family Management

- Parents create a **family account** and generate a unique **Family Code**.
- Children request to join using the family code. (Not implemented fully yet)
- Parents can **approve / decline** join requests. (Not implemented fully yet)
- Each family sees **only its own data** (goals, members, contributions).

### 🎯 Goal & Contribution System

- Parents can create goals with:
  - Title
  - Target amount
  - Optional cover image
- Children (and parents) can:
  - Add **virtual contributions** with a short message.
  - Watch progress through **automatic progress bars** and percentage indicators.
- When a goal reaches 100%:
  - The goal is marked as **completed**.
  - A **5% bonus reward** is calculated for the top contributor. (Not implemented yet)
  - A celebration/notification is triggered for the family. (Not implemented yet)

### 💡 Financial Tips (Educational Module) (Not implemented yet)

- Parents can create short **financial tips**:
  - Mini-lessons (*“What is a budget?”*)
  - Motivational notes (*“Save a part of all gifts you receive”*)
- Tips are visible to all family members.
- Encourages **budgeting, saving, and delayed gratification**.


### 🏅 Reward Logic (Not implemented yet)

- On goal completion:
  - The child with the highest total contributions to that goal gets a **virtual 5% bonus**.
  - This can be interpreted by parents as extra pocket money, a treat, etc.
- Designed to **motivate consistent saving**, not just one-off contributions.

### 🤖 AI Financial Coach

> Powered by a custom LangChain service (see `/services/langchain`).

- Chat-style assistant to:
  - Explain simple financial concepts to kids.
  - Suggest saving plans for specific goals.
  - Encourage healthy financial habits in a friendly tone.

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

## Architecture

High-level folder structure:

```text
FamFund/
├─ public/               # Static assets (CSS, JS, images, icons)
│  ├─ css/
│  ├─ js/
│  └─ images/
├─ services/
│  └─ langchain/         # Financial coach / AI-related utilities
├─ src/  
|  └─ controllers/   
|   └─ routes/    
|   └─ models/  
|   └─ middlewars/ 
|   └─ config/           
├─ views/                # EJS templates (pages, partials, layouts)
├─ server.js             # Express app entry point
├─ package.json          # Dependencies & scripts
├─ README.md             # You are here
└─ STRUCTURE.md          # More detailed internal structure (dev notes)
```

## Environment Variables
PORT=OPEN_PORT
### MongoDB
MONGODB_URI=mongodb://localhost:27017/famfund OR your mongo connection
### Session
SESSION_SECRET=your-strong-random-secret
### (Optional) OpenAI / LLM provider
OPENAI_API_KEY=your-openai-api-key

## Deployed Link
https://famfund-9a40.onrender.com

## Project References
| Resource                | Description                                    | Link              |
| ----------------------- | ---------------------------------------------- | ----------------- |
| ERD                     | Collections and relationships (MongoDB schema) | *[Add link here]* |
| Figma                   | Screens and main user journeys                 | *https://www.figma.com/design/tmaUP2TxRMS8FUu7dWjCmr/FamFund?node-id=3-3&t=6hlVygeLGgvNt67c-0* |
| Trello / Board          | Task tracking & sprint planning                | *[Add link here]* |


## Attribution
FamFund is built using several open-source libraries and resources.

- *Bootstrap Icons* (icons used across the UI) | https://icons.getbootstrap.com/
- *Bootstrap 5* | https://getbootstrap.com/
- *EJS* – For views
- *Multer* - for file uploads
- *OpenAI* / *LangChain* | https://openai.com/ | https://js.langchain.com/

