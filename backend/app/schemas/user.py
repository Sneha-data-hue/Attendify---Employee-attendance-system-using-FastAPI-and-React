from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


# 🔹 Used for invite registration
class Register(BaseModel):
    name: str
    email: EmailStr
    password: str
    token: Optional[str] = None


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True