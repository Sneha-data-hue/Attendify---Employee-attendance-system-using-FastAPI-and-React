from pydantic import BaseModel

class MonthlyReportResponse(BaseModel):
    employee_id: int
    employee_name: str

    total_working_days: int
    present_days: int
    absent_days: int
    late_days: int
    total_work_hours: float