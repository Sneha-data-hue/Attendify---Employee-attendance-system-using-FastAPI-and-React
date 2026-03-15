from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.company import Company
from app.models.user import User
from app.schemas.company import CompanyCreate, CompanyOut
from app.core.dependencies import get_current_user

router = APIRouter(tags=["Companies"])


# 🏢 CREATE COMPANY
@router.post("/", response_model=CompanyOut)
def create_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if user already belongs to a company
    if current_user.company_id:
        raise HTTPException(status_code=400, detail="User already has a company")

    new_company = Company(
        name=company.name,
        email=company.email,
        address=company.address,
        phone=company.phone,
        company_type=company.company_type,
        password=company.password
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    # 🔥 MAKE USER ADMIN + ASSIGN COMPANY
    current_user.company_id = new_company.id
    current_user.role = "admin"
    db.commit()

    # ✅ Return Pydantic schema instead of raw SQLAlchemy model
    return CompanyOut.from_orm(new_company)


# 🏢 GET MY COMPANY
@router.get("/my-company", response_model=CompanyOut)
def get_my_company(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user.company_id:
        raise HTTPException(status_code=404, detail="User has no company")

    company = db.query(Company).filter(
        Company.id == current_user.company_id
    ).first()

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    return CompanyOut.from_orm(company)