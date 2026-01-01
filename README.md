# AlonOS – IntelliAvatar Frontend

This repository contains the frontend application for IntelliAvatar.
It provides user interaction for job submission, monitoring, and downloading
generated avatar videos.

------------------------------------------------------------

TECH STACK

- React
- TypeScript
- Vite
- Tailwind CSS

------------------------------------------------------------

PREREQUISITES

- Node.js 18 or higher
- npm
- Backend running on localhost:8000

------------------------------------------------------------

INSTALLATION

1. Navigate to frontend folder

   cd frontend

2. Install dependencies

   npm install

------------------------------------------------------------

RUNNING THE FRONTEND

Start development server:

   npm run dev

Application runs at:
http://localhost:5173

------------------------------------------------------------

AUTHENTICATION

- Simple localStorage-based login
- Username acts as user_id
- No external authentication required

------------------------------------------------------------

FEATURE-1: AVATAR SYNC STUDIO

Steps:
1. Upload video file
2. Upload audio file
3. Submit job
4. Job appears in dashboard
5. Download video after completion

------------------------------------------------------------

FEATURE-2: TEXT TO AVATAR

Steps:
1. Enter text
2. Select voice
3. Upload base video
4. Submit
5. Audio generated automatically
6. Feature-1 job created internally

------------------------------------------------------------

JOB DASHBOARD

Displayed fields:
- Job ID
- Feature type
- Status
- Submitted time
- Started time
- Ended time
- Duration
- End-to-End time
- Download button

Time handling:
- Uses 24-hour format
- Duration = Ended - Started
- E2E Time = Ended - Submitted

------------------------------------------------------------

DOWNLOAD FLOW

- Download button calls backend:
  GET /feature1/download/{job_id}

- File downloaded:
  storage/outputs/{job_id}.mp4

------------------------------------------------------------

STATUS

Frontend is fully integrated with backend and stable.
