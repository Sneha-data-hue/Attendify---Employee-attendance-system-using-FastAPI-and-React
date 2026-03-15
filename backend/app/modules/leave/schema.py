from pydantic import BaseModel
from datetime import date


class LeaveCreate(BaseModel):

    start_date: date
    end_date: date
    reason: str


class LeaveOut(BaseModel):

    id: int
    user_id: int
    start_date: date
    end_date: date
    reason: str
    status: str

    class Config:
        orm_mode = True