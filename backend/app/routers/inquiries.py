from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import schemas, models, auth as auth_utils
from ..database import get_db

router = APIRouter(prefix="/api/inquiries", tags=["inquiries"])


@router.post("", response_model=schemas.InquiryOut, status_code=201)
def submit_inquiry(payload: schemas.InquiryCreate, db: Session = Depends(get_db)):
    inquiry = models.Inquiry(**payload.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry


@router.get("", response_model=list[schemas.InquiryOut])
def list_inquiries(
    db: Session = Depends(get_db),
    _admin: str = Depends(auth_utils.get_current_admin),
):
    return db.query(models.Inquiry).order_by(models.Inquiry.created_at.desc()).all()


@router.delete("/{inquiry_id}", status_code=204)
def delete_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(auth_utils.get_current_admin),
):
    inquiry = db.query(models.Inquiry).filter(models.Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    db.delete(inquiry)
    db.commit()
    return None
