from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

from . import schema, service

router = APIRouter(
    prefix="/leave",
    tags=["Leave"]
)


# ================= APPLY LEAVE =================

@router.post("/apply", response_model=schema.LeaveOut)
def apply_leave(
    leave: schema.LeaveCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return service.apply_leave(db, current_user.id, leave)


# ================= MY LEAVES =================

@router.get("/my-leaves", response_model=list[schema.LeaveOut])
def my_leaves(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return service.get_my_leaves(db, current_user.id)


# ================= ADMIN: ALL LEAVES =================

@router.get("/all", response_model=list[schema.LeaveOut])
def get_all_leaves(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return service.get_all_leaves(db)