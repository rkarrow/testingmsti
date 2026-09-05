# MSTI Maritime Academy — MERN Stack Website

A full-stack MERN (MongoDB, Express, React, Node.js) website with Tailwind CSS for the **Maritime Skills & Training Institute (MSTI)** — Sri Lanka's premier maritime academy.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS v3 |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Icons | React Icons |

## 📁 Project Structure

```
rashmikawebsite/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Navbar, Footer, CourseCard, NewsCard, etc.
│   │   ├── pages/        # Home, About, Courses, News, Contact
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/               # Node.js + Express backend
│   ├── config/           # MongoDB connection
│   ├── controllers/      # Business logic
│   ├── middleware/        # Error handler
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── seed.js           # Database seeder
│   ├── server.js         # Entry point
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- [Node.js v18+](https://nodejs.org/en/download/) — **REQUIRED**
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) — or use MongoDB Atlas (cloud)

### Step 1: Install Node.js
Download and install Node.js from https://nodejs.org/en/download/
> After installing, restart your terminal/PowerShell

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 3: Configure Environment
The `.env` file is already created at `server/.env`:
```
MONGO_URI=mongodb://localhost:27017/msti_maritime
PORT=5000
NODE_ENV=development
```
> If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### Step 4: Seed the Database
```bash
cd server
npm run seed
```

### Step 5: Start the Backend Server
```bash
cd server
npm run dev
```
> Server runs on http://localhost:5000

### Step 6: Install Frontend Dependencies
```bash
cd client
npm install
```

### Step 7: Start the Frontend
```bash
cd client
npm run dev
```
> Frontend runs on http://localhost:5173

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses?featured=true` | Get featured courses |
| GET | `/api/courses/:id` | Get single course |
| POST | `/api/courses` | Create course |
| PUT | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |
| GET | `/api/news` | Get all news |
| GET | `/api/news?category=News` | Filter by category |
| GET | `/api/news/:id` | Get single news |
| POST | `/api/news` | Create news |
| POST | `/api/contact` | Submit enquiry form |
| GET | `/api/contact` | Get all enquiries |

## 🎨 Color Palette

| Name | Hex | Usage |
|---|---|---|
| Navy 950 | `#0d1b35` | Primary background |
| Navy 900 | `#132040` | Section background |
| Navy 800 | `#1a2f55` | Card background |
| Blue 600 | `#2563eb` | Primary accent |
| Blue 400 | `#60a5fa` | Links & highlights |
| White | `#ffffff` | Headings |
| Navy 400 | `#94a3b8` | Body text |

## 📄 Pages

1. **Home** — Hero banner, stats, featured courses, facilities preview, news, CTA
2. **About** — Academy story, mission & vision, leadership team, facilities
3. **Courses** — All courses with category filter, pathway to command, enrollment info
4. **News** — Featured article, news grid with search & filter, bulletins, events
5. **Contact** — Enquiry form, contact info, Google Maps, campus gallery, FAQ accordion

## 🔧 Build for Production

```bash
# Frontend
cd client
npm run build

# The built files will be in client/dist/
# Serve with any static server or configure Express to serve them
```
