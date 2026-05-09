# CoverCraft

A cover letter generator that takes a job description, a resume, and 2 short answers from the user and produces a tailored, human-sounding cover letter.

## Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key (or Groq API key as fallback)

## Setup

### 1. Clone the repository

```bash
cd covercraft
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory with the following variables:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `GROQ_API_KEY` | Your Groq API key (fallback) |

To get your **Gemini API key**:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key

To get your **Groq API key**:
1. Go to [console.groq.com](https://console.groq.com)
2. Create a new API key (used as automatic fallback)

### 3. Set up the client

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

#### Setting up Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and create a free account
2. Create a new application
3. Enable Google as a sign-in provider (one toggle)
4. Copy the Publishable Key from the Clerk dashboard
5. Add it to `client/.env` as `VITE_CLERK_PUBLISHABLE_KEY`

## Running the Application

### Start the server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`.

### Start the client

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`.

## Features

- **Job Description Input**: Paste or type the full job posting
- **Resume Upload**: Upload a PDF or paste resume text directly
- **Personalization**: Answer 2 quick questions to customize your letter
- **AI Generation**: Uses Gemini 2.5 Flash with Groq Llama 3.3 as automatic fallback
- **Copy to Clipboard**: One-click copy of the generated letter
- **MongoDB Storage**: All generated letters are saved for reference
- **Credit System**: Guest users get 2 free generations, signed-in users get unlimited

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, Axios, Clerk
- **Backend**: Node.js, Express.js, Multer, pdf-parse
- **Database**: MongoDB (Mongoose)
- **AI**: Google Gemini 2.5 Flash, Groq Llama 3.3
- **Auth**: Clerk (Google sign-in, credit system)

## Project Structure

```
covercraft/
├── client/                 # React Vite frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/         # API hooks
│   │   └── lib/           # Utilities
│   └── .env
├── server/                 # Express backend
│   ├── routes/            # API routes
│   ├── services/          # AI & PDF services
│   ├── models/            # Mongoose models
│   ├── middleware/        # Multer config
│   └── .env
└── README.md
```