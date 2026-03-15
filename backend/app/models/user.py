from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy import Column, Integer, String, JSON


class User(Base):
    __tablename__ = "users"

    face_encoding = Column(JSON, nullable=True)

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    role = Column(String, default="employee")
    is_active = Column(Boolean, default=True)

    company_id = Column(Integer, ForeignKey("companies.id"), nullable=True)
    company = relationship(
    "Company",
    back_populates="users",
    foreign_keys=[company_id]
)