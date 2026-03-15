from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.invite import Invite
from app.schemas.user import UserCreate
from app.schemas.token import Token
from app.services.auth_service import create_user, authenticate_user
from app.core.security import create_access_token

router = APIRouter(tags=["Auth"])


# ✅ REGISTER
@router.post("/register")
def register(user: UserCreate, token: str, db: Session = Depends(get_db)):

    # check invite token
    invite = db.query(Invite).filter(Invite.token == token).first()

    if not invite:
        raise HTTPException(
            status_code=400,
            detail="Invalid invite token"
        )

    # check email exists
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # override role and company from invite
    user.role = invite.role
    user.company_id = invite.company_id

    new_user = create_user(db, user)

    return {
        "message": "User registered successfully",
        "role": new_user.role
    }


# ✅ LOGIN
@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={"sub": str(user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user_id": user.id
    }