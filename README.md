# Image Marketing Agencies — Website

Full-stack site for a premium kitchen & home appliance showroom (Crompton, Bosch, Hafele,
Electrolux, Faber, Sujatha, Glen, Kaff, Hindware).

- **backend/** — FastAPI + SQLite (products, testimonials, enquiries, admin auth)
- **frontend/** — React + Vite + TypeScript + Tailwind CSS

## Features

- Elegant, responsive storefront (hero, brand strip, catalogue, about)
- ⭐ Customer reviews/testimonials — visitors submit a review, it goes live after admin approval
- 📍 Google Maps embed + showroom address/hours
- 💬 WhatsApp inquiry button (floating button + contact section CTA)
- 🔎 Product search, category/brand filters, price sorting
- 🛠️ Admin dashboard — add/edit/delete products, approve/delete reviews, view enquiries

## First-time setup

### Backend

```bash
cd backend
python -m venv venv
./venv/Scripts/activate      # Windows (PowerShell: venv\Scripts\Activate.ps1)
pip install -r requirements.txt
cp .env.example .env         # then edit .env: set a real SECRET_KEY and ADMIN_PASSWORD
uvicorn app.main:app --reload --port 8000
```

The database (`app.db`) and the admin user are created automatically on first run, using the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env`. It also seeds 16 demo products and 3 demo reviews
so the site isn't empty — edit or delete them from the admin dashboard.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173. The frontend expects the API at `http://localhost:8000` (see
`frontend/.env`, `VITE_API_URL`).

## Before you go live — things to edit

1. **`frontend/src/siteConfig.ts`** — replace the placeholder phone number, WhatsApp number,
   email, address and map query with your real details.
2. **`backend/.env`** — set a strong random `SECRET_KEY` and a real `ADMIN_PASSWORD` (don't ship
   the defaults).
3. **Product photos** — each product has an optional `image_url` field, editable from the admin
   dashboard. Without one, a placeholder image block is shown.
4. **Admin login** — go to `/admin/login` on the site to sign in and manage products/reviews/enquiries.

## Deployment note

This uses SQLite (a single file, `backend/app.db`). That's simple for a small business site running
on a normal server or VPS, but on a serverless host (e.g. Vercel, most "instant deploy" platforms)
the filesystem is not persistent between requests — your data would reset. If you deploy there,
swap `SQLALCHEMY_DATABASE_URL` in `backend/app/database.py` for a hosted Postgres/MySQL URL instead.
