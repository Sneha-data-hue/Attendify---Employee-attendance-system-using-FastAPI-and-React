from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from . import service, schema

router = APIRouter(tags=["Attendance"])


# ================= CHECK IN =================

@router.post("/check-in", response_model=schema.AttendanceOut)
def check_in(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if not current_user.face_encoding:
        raise HTTPException(status_code=400, detail="Face not registered")

    try:
        attendance = service.check_in(db, current_user.id)
        return attendance

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ================= CHECK OUT =================

@router.post("/check-out", response_model=schema.AttendanceOut)
def check_out(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:
        attendance = service.check_out(db, current_user.id)
        return attendance

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ================= COMPANY TODAY =================

@router.get("/company-today")
def company_today(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if not current_user.company_id:
        raise HTTPException(status_code=400, detail="User has no company")

    return service.company_today_attendance(db, current_user.company_id)


# ================= MY HISTORY =================

@router.get("/my-history", response_model=list[schema.AttendanceOut])
def my_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = service.get_my_attendance(db, current_user.id)

    return records