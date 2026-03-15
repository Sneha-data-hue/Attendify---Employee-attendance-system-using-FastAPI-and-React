from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.invite import InviteCreate
from app.modules.invite.service import create_invite

from app.dependencies.auth import get_current_user
from app.models.user import User
from app.models.invite import Invite

router = APIRouter(tags=["Invite"])


@router.post("/send")
def send_invite(
    invite: InviteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # 🔒 Only admin can invite
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    new_invite = create_invite(
        db,
        invite.email,
        invite.role,
        current_user.company_id
    )

    return {"message": "Invite created", "invite_id": new_invite.id}


# ✅ NEW API
@router.get("/verify/{token}")
def verify_invite(token: str, db: Session = Depends(get_db)):

    invite = db.query(Invite).filter(Invite.token == token).first()

    if not invite:
        raise HTTPException(status_code=404, detail="Invalid invite")

    return {
        "email": invite.email,
        "role": invite.role,
        "company_id": invite.company_id
    }