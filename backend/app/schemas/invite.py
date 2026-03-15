from pydantic import BaseModel


class InviteCreate(BaseModel):
    email: str
    role: str   # admin or employee