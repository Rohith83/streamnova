# StreamNova

A premium, cinematic OTT streaming platform frontend — frontend only, no backend, no real API. Built with React, Vite, Tailwind CSS, React Router, Framer Motion, and React Icons. All data is local (dummy movie catalog) and all user state (auth, watchlist, continue watching) is persisted to `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Demo accounts

There are no seeded accounts. Use **Sign Up** to create one — it's stored in your browser's `localStorage`, so it stays around between visits on the same browser. Login afterwards with the same email/password.

## What's inside

- **12 pages**: Home, Login, Signup, Browse, Movie Details, Watch (video player), Watchlist, Search, Subscription, Profile, Categories, 404
- **Protected routes**: Watch, Watchlist, and Profile require sign-in (fake auth via localStorage)
- **50 dummy movies** in `src/data/movies.js`
- Filtering by genre, year, rating, language; sorting by popularity, latest, top rated, A–Z
- Continue Watching is simulated by the fake video player reporting progress every second
- Toast notifications for watchlist actions, auth events, and disabled demo-only buttons (social login, trailers, settings)

## Notes

- Images are placeholder URLs (`picsum.photos`) seeded per-movie for consistency; every image has a graceful fallback if it fails to load.
- This is a portfolio/demo project. No real payments, emails, or video are involved.
