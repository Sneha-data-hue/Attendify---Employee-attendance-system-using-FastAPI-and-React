from sqlalchemy.orm import Session
from datetime import datetime, date
from .model import Attendance
from app.models.user import User


# =========================
# GET TODAY ATTENDANCE
# =========================

def get_today_attendance(db: Session, user_id: int):

    today = date.today()

    return db.query(Attendance).filter(
        Attendance.user_id == user_id,
        Attendance.check_in >= datetime(today.year, today.month, today.day)
    ).first()


# =========================
# CHECK IN
# =========================

def check_in(db: Session, user_id: int):

    today_record = get_today_attendance(db, user_id)

    if today_record:
        raise Exception("Already checked in today")

    attendance = Attendance(
        user_id=user_id,
        check_in=datetime.utcnow()
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


# =========================
# CHECK OUT
# =========================

def check_out(db: Session, user_id: int):

    today_record = get_today_attendance(db, user_id)

    if not today_record:
        raise Exception("You didn't check in today")

    if today_record.check_out:
        raise Exception("Already checked out today")

    today_record.check_out = datetime.utcnow()

    db.commit()
    db.refresh(today_record)

    return today_record


# =========================
# COMPANY TODAY ATTENDANCE
# =========================

def company_today_attendance(db: Session, company_id: int):

    users = db.query(User).filter(User.company_id == company_id).all()

    result = []

    for user in users:

        today_record = get_today_attendance(db, user.id)

        result.append({
            "user_id": user.id,
            "username": user.username,
            "checked_in": bool(today_record),
            "checked_out": bool(today_record and today_record.check_out)
        })

    return result


# =========================
# EMPLOYEE HISTORY
# =========================

def get_my_attendance(db: Session, user_id: int):

    records = db.query(Attendance)\
        .filter(Attendance.user_id == user_id)\
        .order_by(Attendance.check_in.desc())\
        .all()

    return records