from sqlalchemy.orm import Session
from datetime import datetime
from calendar import monthrange
from app.modules.attendance.model import Attendance
from app.models.user import User
import pandas as pd
from tempfile import NamedTemporaryFile


# 📊 JSON REPORT
def generate_monthly_report(db: Session, company_id: int, year: int, month: int):

    start_date = datetime(year, month, 1)
    end_date = datetime(year, month, monthrange(year, month)[1], 23, 59, 59)

    employees = db.query(User).filter(User.company_id == company_id).all()

    reports = []

    for emp in employees:

        attendance = db.query(Attendance).filter(
            Attendance.user_id == emp.id,
            Attendance.check_in >= start_date,
            Attendance.check_in <= end_date
        ).all()

        present_days = len(attendance)

        late_days = sum(
            1 for a in attendance
            if a.check_in.hour > 9
        )

        total_hours = sum(
            ((a.check_out - a.check_in).total_seconds() / 3600)
            for a in attendance if a.check_out
        )

        reports.append({
            "employee_id": emp.id,
            "employee_name": emp.username,
            "total_working_days": monthrange(year, month)[1],
            "present_days": present_days,
            "absent_days": monthrange(year, month)[1] - present_days,
            "late_days": late_days,
            "total_work_hours": round(total_hours, 2)
        })

    return reports


# 📁 EXCEL EXPORT
def export_monthly_report_excel(db: Session, company_id: int, year: int, month: int):

    data = generate_monthly_report(db, company_id, year, month)

    df = pd.DataFrame(data)

    temp = NamedTemporaryFile(delete=False, suffix=".xlsx")
    df.to_excel(temp.name, index=False)

    return temp.name