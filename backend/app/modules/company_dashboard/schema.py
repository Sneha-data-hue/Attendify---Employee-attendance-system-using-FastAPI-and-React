from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# 👤 Employee info
class EmployeeOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


# 🕒 Attendance info
class AttendanceOut(BaseModel):
    id: int
    user_id: int
    check_in: datetime
    check_out: Optional[datetime]

    class Config:
        from_attributes = True