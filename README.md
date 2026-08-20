# CommunityHub

CommunityHub is a small full-stack community posting app. Users can create posts, view a single post, like posts, and delete posts. The React frontend communicates with an Express API, and posts are stored in MongoDB Atlas.

## Tech stack

- React + Vite + React Router
- Node.js + Express
- MongoDB Atlas + Mongoose
- Render for the API and Vercel for the frontend

## Run it locally

1. Copy `.env.example` to a new file named `.env`.
2. Set `MONGODB_URI` to your MongoDB Atlas connection string. If the password includes special characters such as `@`, encode them in the URI (for example, `@` becomes `%40`).
3. In one terminal, run `npm run server:dev`.
4. In a second terminal, run `npm run dev`.
5. Open the local Vite URL shown in the terminal, normally `http://localhost:5173`.

The frontend uses `VITE_API_URL` when it is set. Locally it falls back to `http://localhost:3000/api`.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/health` | API health check |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get one post |
| POST | `/api/posts` | Create a post |
| PATCH | `/api/posts/:id/like` | Add one like |
| DELETE | `/api/posts/:id` | Delete a post |

## Deploy to Render and Vercel

### 1. Prepare MongoDB Atlas

Create a database user and add `0.0.0.0/0` temporarily to the Atlas Network Access list. Render uses changing outbound IP addresses, so Atlas must permit its connection. Keep a strong database password and never commit the `.env` file.

### 2. Deploy the backend on Render

1. Push this project to GitHub.
2. In Render, choose **New +** → **Blueprint** and select the repository. The included `render.yaml` configures the service.
3. Add these secret environment variables in Render:
   - `MONGODB_URI`: your Atlas connection string
   - `CLIENT_ORIGIN`: leave blank for the moment; add the exact Vercel URL after the next step
4. Deploy. Check that `https://YOUR-RENDER-URL/api/health` returns `CommunityHub API is running`.

### 3. Deploy the frontend on Vercel

1. In Vercel, import the same GitHub repository.
2. Vercel should detect Vite. Use build command `npm run build` and output directory `dist` if it asks.
3. Add this environment variable before deploying:
   - `VITE_API_URL`: `https://YOUR-RENDER-URL/api`
4. Deploy and copy the resulting `https://YOUR-PROJECT.vercel.app` URL.

### 4. Finish CORS

Set Render's `CLIENT_ORIGIN` to the exact Vercel URL (without a trailing slash) and redeploy the Render service. Then test creating, liking, deleting, and opening a post from the live site.

## Production environment variables

| Service | Variable | Value |
| --- | --- | --- |
| Render | `MONGODB_URI` | MongoDB Atlas connection string |
| Render | `CLIENT_ORIGIN` | Exact Vercel site URL |
| Render | `NODE_ENV` | `production` (provided by `render.yaml`) |
| Vercel | `VITE_API_URL` | Render API URL ending in `/api` |

## Final demo checklist

- Open the live Vercel URL.
- Create a post and refresh the page to show it persisted in MongoDB.
- Like the post, then open its title to show the detail page.
- Delete a test post.
- Open the Render `/api/health` URL.
