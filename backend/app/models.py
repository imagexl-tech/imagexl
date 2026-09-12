from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime, JSON
from .database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False, index=True)
    brand = Column(String(100), nullable=False, index=True)
    price = Column(Float, nullable=False, default=0)
    description = Column(Text, default="")
    warranty = Column(String(100), default="")
    image_url = Column(String(500), default="")
    images = Column(JSON, default=list)
    features = Column(JSON, default=list)
    variants = Column(JSON, default=list)
    in_stock = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    rating = Column(Integer, nullable=False, default=5)
    message = Column(Text, nullable=False)
    approved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(120), default="")
    interest = Column(String(100), default="")
    message = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
