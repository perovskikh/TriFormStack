from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: str
    price_per_sqm: float
    category: str
    image_url: str
    video_url: Optional[str] = None
    specifications: Optional[str] = None
    is_available: bool = True

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    product_id: int
    quantity_sqm: float
    message: Optional[str] = None
    source: str = "website"

class OrderCreate(OrderBase):
    pass

class OrderResponse(OrderBase):
    id: int
    total_price: float
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None