from sqlalchemy.orm import Session
from datetime import date, datetime, time
from app.models.user import User
from app.modules.attendance.model import Attendance


# 👥 All employees in company
def get_company_employees(db: Session, company_id: int):
    return db.query(User).filter(User.company_id == company_id).all()


# 🟢 Present employees today
def get_present_today(db: Session, company_id: int):
    today = date.today()

    return (
        db.query(Attendance)
        .join(User)
        .filter(
            User.company_id == company_id,
            Attendance.check_in >= datetime.combine(today, time.min)
        )
        .all()
    )


# 🔴 Absent employees today
def get_absent_today(db: Session, company_id: int):
    employees = get_company_employees(db, company_id)
    present = get_present_today(db, company_id)

    present_user_ids = {a.user_id for a in present}

    return [emp for emp in employees if emp.id not in present_user_ids]


# ⏰ Late employees (after 9:30 AM)
def get_late_employees(db: Session, company_id: int):
    today = date.today()
    late_time = datetime.combine(today, time(9, 30))

    return (
        db.query(Attendance)
        .join(User)
        .filter(
            User.company_id == company_id,
            Attendance.check_in >= late_time
        )
        .all()
    )