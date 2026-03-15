from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    address = Column(String)
    phone = Column(String)
    company_type = Column(String)
    password = Column(String, nullable=False)

    owner_id = Column(Integer, ForeignKey("users.id"))  # FIX

    users = relationship(
    "User",
    back_populates="company",
    foreign_keys="User.company_id"
)