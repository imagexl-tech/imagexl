from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, EmailStr


# ---- Products ----
class ProductVariant(BaseModel):
    label: str
    price: float
    compare_at_price: Optional[float] = None


class ProductBase(BaseModel):
    name: str
    category: str
    brand: str
    price: float = 0
    description: str = ""
    warranty: str = ""
    image_url: str = ""
    images: list[str] = []
    features: list[str] = []
    variants: list[ProductVariant] = []
    in_stock: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    warranty: Optional[str] = None
    image_url: Optional[str] = None
    images: Optional[list[str]] = None
    features: Optional[list[str]] = None
    variants: Optional[list[ProductVariant]] = None
    in_stock: Optional[bool] = None


class ProductOut(ProductBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ---- Testimonials ----
class TestimonialCreate(BaseModel):
    name: str
    rating: int = Field(ge=1, le=5, default=5)
    message: str


class TestimonialOut(BaseModel):
    id: int
    name: str
    rating: int
    message: str
    approved: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ---- Inquiries ----
class InquiryCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    interest: Optional[str] = ""
    message: Optional[str] = ""


class InquiryOut(InquiryCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ---- Auth ----
class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---- Meta ----
class MetaOut(BaseModel):
    categories: list[str]
    brands: list[str]
    price_min: float
    price_max: float
