# Legol
A web platform that consolidates fragmented legal documents across government agencies, universities, and foreign regulations into interactive knowledge graphs and timelines for international students.

## Features
- **Interactive Knowledge Graphs & Flowcharts:** Built modular frontend components to visualize dependencies between agency requirements.  
- **Timeline Planner:** Implemented backend logic to calculate deadlines and dependencies from structured legal data.  
- **Chat Interface:** Developed a real-time Q&A system connecting natural-language queries to structured document data.  
- **Conflict Detection Engine:** Automated identification of contradictory rules and suggested resolutions using backend graph algorithms.  
- **Secure Authentication & Deployment:** Google login via Firebase and full deployment on Vercel for production access.

## Tech Stack
- **Frontend:** React.js, Vite, CSS
- **Backend:** Python, Flask, Firebase for authentication
- **Database/Storage:** JSON-based document store, structured graph storage
- **Deployment:** Vercel

## Installation
1. Clone repo: `git clone https://github.com/appleorange/Legol.git`
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   npm run dev
3. Install backend dependencies:
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python app.py
4.	Open browser at http://localhost:5173 to run locally.
