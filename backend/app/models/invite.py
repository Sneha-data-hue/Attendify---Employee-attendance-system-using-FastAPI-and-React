from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base
import uuid

class Invite(Base):
    __tablename__ = "invites"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, index=True)
    role = Column(String)  # admin / employee / manager
    company_id = Column(Integer, ForeignKey("companies.id"))

    token = Column(String, unique=True, default=lambda: str(uuid.uuid4()))