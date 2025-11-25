# 💰 FamFund

**FamFund** is a collaborative family finance platform that helps parents and children **plan, save, and celebrate financial goals together**.  
The system combines goal tracking, contribution simulation, and educational features to teach children financial responsibility in an interactive and engaging way.

---

## 🎯 Project Overview

FamFund empowers families to:
- **Set shared saving goals** (e.g., “Family Trip”, “New TV”)
- **Contribute** toward those goals with virtual savings
- **Celebrate milestones** when goals reach completion
- **Educate** children with financial tips written by parents
- **Motivate** children through a rewards system and progress tracking

This project aims to promote family collaboration and financial literacy through a user-friendly digital experience.

---

## 🌐 Deployed Application

You can view the live version of the app here: [FamFund](https://famfund-9a40.onrender.com)

---

## 🧩 Core Features

### 👨‍👩‍👧 Family Management
- Parents can create a family group and generate a unique **Family Code**.
- Children join using the code; parents can approve or decline requests.
- Each family has a private dashboard with its own data space.

### 🎯 Goal & Contribution System
- Parents create goals with titles, target amounts, and images.
- Children can add **virtual contributions** with short messages.
- Automatic progress bars visualize savings and completion percentage.
- When a goal reaches 100%, the system:
  - Marks it as completed.
  - Triggers a **reward** for the top contributor (5% bonus).
  - Sends a family-wide notification.

### 💡 Financial Tips (Educational Feature)
- Parents can create and post short financial lessons or motivational notes.
- Tips are viewable by all family members.
- Encourages children to develop budgeting and saving habits.

### 🔔 Notifications & Activity Feed
- Real-time updates for:
  - New contributions (“Sara added 10 BD to Family Trip 🎉”)
  - Goal completions (“Disney Trip reached 100%! 🎉”)
- Family members can stay informed about progress and activities.

### 🏅 Rewards System
- Short-term virtual rewards for children when goals are completed.
- Calculates 5% bonus for top contributors.
- Builds motivation and a sense of achievement.

---

## 📄 Attributions

This project uses the following open-source tools and libraries:

- **Node.js** – https://nodejs.org/  
- **Express.js** – https://expressjs.com/  
- **MongoDB / Mongoose** – https://mongoosejs.com/  
- **Bootstrap 5** – https://getbootstrap.com/  
- **Bootstrap Icons** – https://icons.getbootstrap.com/  
- **EJS** – https://ejs.co/  
- **Multer** – https://github.com/expressjs/multer  
- **OpenAI API** (optional) – https://openai.com/  
- **LangChain.js** – https://js.langchain.com/ 

---

## 👥 Team Roles & Collaboration

| Member | Role | Focus Area |
|---------|------|------------|
| **Abdulla** | Authentication & Family Management | User accounts, session handling, family creation/join system |
| **Batool** | Goals, Contributions & Rewards | Goal CRUD, contribution logic, progress tracking, reward calculation |

🧠 Team collaboration includes weekly technical sessions and biweekly client meetings to align with functional requirements and UX goals.

---

## 🧱 System Highlights

- **Authentication:** Secure login with role-based access (Parent / Child)  
- **Database:** MongoDB with Mongoose ORM  
- **Server:** Node.js with Express  
- **Templating:** EJS views for a lightweight front-end  
- **Session Storage:** Mongo-based express-session persistence  
- **File Handling:** Multer for user and goal image uploads  

---

## 🔗 Project References

| Resource | Description | Link |
|-----------|--------------|------|
| **ERD (Entity Relationship Diagram)** | Database design showing relationships between collections | _[Add link here]_ |
| **Figma** | high-fidelity design of the website | [FamFund Figma](https://www.figma.com/design/tmaUP2TxRMS8FUu7dWjCmr/FamFund?node-id=0-1&p=f&t=ui9maOi231FdrLT1-0) |
| **Logo*  | FamFund Logo |_[/public/images/logo.png]_ |

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)  
- npm (bundled with Node)  
- MongoDB instance (local or MongoDB Atlas)  
- (Optional) OpenAI API key if you wish to enable the AI coach module  

### Clone & Install
```bash
git clone https://github.com/BAlshowaikh/FamFund.git  
cd FamFund  
npm install
```
---

## 🚀 Next Steps (Planned Future Enhancements)

- **Per-child analytics** (charts, contribution history, streaks)  
- **Advanced reward system** (badges, levels, customizable rewards)  
- **Savings challenges** (weekly missions, monthly challenges)  
- **Push notifications** for reminders and goal progress
- **Tip System** Send daily financial tips automatically
- **Localization** (Arabic/English toggle) 
- **Enhanced AI coach** with financial games, guidance, and simulations  




