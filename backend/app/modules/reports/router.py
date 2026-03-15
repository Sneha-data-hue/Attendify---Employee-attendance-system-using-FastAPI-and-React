from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.modules.reports.service import generate_monthly_report, export_monthly_report_excel
from fastapi.responses import FileResponse

from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter( tags=["Reports"])


# 📊 Monthly report (JSON)
@router.get("/monthly")
def monthly_report(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 🔒 Admin only
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    company_id = current_user.company_id  # ✅ AUTO

    return generate_monthly_report(db, company_id, year, month)


# 📁 Export Excel report
@router.get("/monthly/export")
def export_monthly(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 🔒 Admin only
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    company_id = current_user.company_id  # ✅ AUTO

    file_path = export_monthly_report_excel(db, company_id, year, month)

    return FileResponse(
        path=file_path,
        filename=f"attendance_report_{year}_{month}.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )