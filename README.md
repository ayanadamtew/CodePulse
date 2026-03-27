<div align="center">
  <img src="https://raw.githubusercontent.com/user/codepulse/main/client/public/logo.png" alt="CodePulse Logo" width="200" />

  # CodePulse
  <br/>
  
  **Master Algorithms, Ace Every Interview.**
  
  *Sharpen your skills with curated problems, AI-powered hints, and visual algorithm breakdowns. Land your dream tech role.*

  [![Website](https://img.shields.io/website?url=https%3A%2F%2Fcodeinfinitum.onrender.com&logo=vercel&label=Live%20Demo)](https://codeinfinitum.onrender.com)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

---

## 🚀 Overview

CodePulse (formerly CodeInfinitum) is a comprehensive, full-stack programming and algorithm learning platform trusted by 1,500+ developers. Designed to simulate top-tier coding interview environments, it offers a rich interactive code execution workspace, diverse algorithm challenges, and cutting-edge **AI-powered feedback** using Google's Gemini API to guide you when you get stuck.

## ✨ Features

- **Interactive Code Editor**: A robust Monaco-based editor supporting multiple languages (JavaScript, Python, C++, Java) with live execution.
- **AI-Powered Hints & Feedback**: Stuck on a problem? Our integrated AI assistant provides contextual hints, syntax corrections, and time/space complexity analysis to help you reach the $O(n)$ solution.
- **Comprehensive Topics & Problems**: Carefully curated DSA (Data Structures & Algorithms) topics ranging from Arrays and Trees to Dynamic Programming and Graphs.
- **Progress Tracking & Milestones**: Visual dashboards that track your 7-day streaks, completed challenges, and "First Solve" milestones.
- **Robust Admin Dashboard**: A separate Vercel-deployed admin panel for creating problems, managing users, and tracking platform metrics.

## 🛠️ Tech Stack

### Frontend (Client & Admin)
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Animations**: Framer Motion
- **Markdown Parsing**: Marked & DOMPurify
- **Icons**: React Icons & Lucide React

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Generative AI (`@google/generative-ai`)
- **Authentication**: JWT & bcryptjs
- **Email Delivery**: Nodemailer

## 📦 Local Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI
- A Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/codepulse.git
cd codepulse
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin_email_for_contact_form
```
Run the server:
```bash
npm run dev
```

### 3. Client Frontend Setup
Open a new terminal.
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Run the client frontend:
```bash
npm run dev
```

### 4. Admin Frontend Setup
Open another terminal.
```bash
cd admin
npm install
```
Create a `.env` file in the `admin` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Run the admin panel:
```bash
npm run dev
```

## 🗄️ Database Seeding (Optional)

To start with the default topics, problems (including LeetCode questions), and an admin user, run the seed scripts against your database:

```bash
cd server
node seed.js
node seedLeetcode.js
node seedTopics.js
node seedTopicsPart2.js
```
The default admin login created by `seed.js` is:
- **Email**: `admin@example.com`
- **Password**: `adminpassword123`

## ☁️ Deployment

The project is built to easily deploy on cloud hosting platforms.
- **Database**: MongoDB Atlas
- **Backend (Server)**: Render or Railway
- **Frontends (Client / Admin)**: Vercel or Netlify

> For detailed, step-by-step instructions on taking this full-stack application to production, please see our internal deployment guide.

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
