from sqlalchemy.orm import Session
from .model import Leave


# ================= APPLY LEAVE =================

def apply_leave(db: Session, user_id: int, leave):

    new_leave = Leave(
        user_id=user_id,
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason
    )

    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)

    return new_leave


# ================= MY LEAVES =================

def get_my_leaves(db: Session, user_id: int):

    return db.query(Leave)\
        .filter(Leave.user_id == user_id)\
        .all()


# ================= ADMIN: ALL LEAVES =================

def get_all_leaves(db: Session):

    return db.query(Leave).all()