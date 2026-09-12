from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas, auth as auth_utils
from ..database import get_db
from ..models import AdminUser

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(AdminUser).filter(AdminUser.username == payload.username).first()
    if not user or not auth_utils.verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = auth_utils.create_access_token(subject=user.username)
    return schemas.TokenResponse(access_token=token)


@router.get("/me")
def me(current_admin: str = Depends(auth_utils.get_current_admin)):
    return {"username": current_admin}
