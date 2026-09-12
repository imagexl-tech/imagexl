from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from . import seed
from .routers import products, testimonials, inquiries, auth, meta

app = FastAPI(title="Image Marketing Agencies API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(testimonials.router)
app.include_router(inquiries.router)
app.include_router(meta.router)


@app.on_event("startup")
def on_startup():
    seed.run()


@app.get("/api/health")
def health():
    return {"status": "ok"}
