from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import schemas, models, auth as auth_utils
from ..database import get_db

router = APIRouter(prefix="/api/testimonials", tags=["testimonials"])


@router.get("", response_model=list[schemas.TestimonialOut])
def list_testimonials(
    approved_only: bool = True,
    db: Session = Depends(get_db),
):
    query = db.query(models.Testimonial)
    if approved_only:
        query = query.filter(models.Testimonial.approved == True)  # noqa: E712
    return query.order_by(models.Testimonial.created_at.desc()).all()


@router.post("", response_model=schemas.TestimonialOut, status_code=201)
def submit_testimonial(payload: schemas.TestimonialCreate, db: Session = Depends(get_db)):
    """Public endpoint: visitors can submit a review. It stays hidden until an admin approves it."""
    testimonial = models.Testimonial(**payload.model_dump(), approved=False)
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.patch("/{testimonial_id}/approve", response_model=schemas.TestimonialOut)
def approve_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(auth_utils.get_current_admin),
):
    testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    testimonial.approved = True
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.delete("/{testimonial_id}", status_code=204)
def delete_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(auth_utils.get_current_admin),
):
    testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(testimonial)
    db.commit()
    return None
