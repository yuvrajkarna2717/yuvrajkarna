# Yuvraj Karna Portfolio

A modern portfolio website built with React, TypeScript, and Vite, designed to showcase work, projects, writing, and personal productivity tools in one place.

## Features

### Portfolio and personal branding
- Responsive landing page with a clean, modern design
- Hero section and polished navigation
- Sections for skills, experience, education, certifications, projects, and open-source work
- About section and storytelling-driven personal content
- Blog list and individual blog post pages
- SEO-friendly page metadata and sitemap generation

### Live developer metrics
- Real-time GitHub stats such as public repositories, stars, and followers
- Live LeetCode problem-solving metrics with solved counts by difficulty
- Cached data handling to reduce unnecessary network calls
- Error-safe fallback behavior when external APIs are unavailable

### Productivity tools
- Private personal area protected by password-based authentication
- Habit tracker with monthly calendar views
- Add, edit, and delete custom habits
- Toggle completion for each habit on any day
- Daily notes for journaling or reflections
- Monthly summary metrics for trend tracking
- Pomodoro timer with configurable work and break durations
- Session cycle tracking and completion state

### UX and interaction
- Dark mode and light mode toggle
- Keyboard shortcuts for quick navigation
- Command palette support
- Terminal-style interactive experience
- Cursor trail and celebratory confetti easter egg
- Lazy-loaded sections for better performance
- Page transitions and smooth user experience

### Technical foundation
- React + Vite frontend with TypeScript
- Tailwind CSS styling
- React Router for multi-page navigation
- FastAPI backend for external API integration and tracker data
- MongoDB-backed habit data persistence
- Clean code structure with reusable components and hooks

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: FastAPI, Python
- Data: MongoDB, GitHub REST API, LeetCode GraphQL
- Tools: React Router, Lucide icons, custom hooks, markdown blog rendering

## Project structure

```text
src/
  App.tsx
  Home/
  pages/
  components/
  context/
  lib/
  hooks/
backend/
  app/
  tests/
```

## Local development

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
python3 -m venv backend/.venv
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
uvicorn app.main:app --app-dir backend --reload --port 8000
```

You can visit the Swagger docs at:

```text
http://localhost:8000/docs
```

## Production notes

- Frontend is deployed on Cloudflare Pages
- Backend is hosted on Render
- The app uses environment variables to connect the frontend with the FastAPI API
- Private routes are gated for personal productivity tools

## Summary

This portfolio is not just a static resume site — it combines personal presentation, live coding metrics, content publishing, and practical productivity features into a single developer-focused experience.
