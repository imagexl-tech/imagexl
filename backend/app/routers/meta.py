from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from .. import schemas, models
from ..database import get_db

router = APIRouter(prefix="/api/meta", tags=["meta"])


@router.get("", response_model=schemas.MetaOut)
def get_meta(db: Session = Depends(get_db)):
    categories = [
        row[0] for row in db.query(models.Product.category).distinct().order_by(models.Product.category)
    ]
    brands = [
        row[0] for row in db.query(models.Product.brand).distinct().order_by(models.Product.brand)
    ]
    price_min = db.query(func.min(models.Product.price)).scalar() or 0
    price_max = db.query(func.max(models.Product.price)).scalar() or 0
    return schemas.MetaOut(
        categories=categories, brands=brands, price_min=price_min, price_max=price_max
    )
