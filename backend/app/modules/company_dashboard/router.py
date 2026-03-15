from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from . import service

router = APIRouter(tags=["Company Dashboard"])


# 👥 All employees
@router.get("/employees")
def all_employees(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_company_employees(db, current_user.company_id)


# 🟢 Present today
@router.get("/present")
def present_today(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_present_today(db, current_user.company_id)


# 🔴 Absent today
@router.get("/absent")
def absent_today(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_absent_today(db, current_user.company_id)


# ⏰ Late employees
@router.get("/late")
def late_employees(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_late_employees(db, current_user.company_id)