from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password, verify_password
from app.models.invite import Invite


# 👤 CREATE USER (with invite logic)
def create_user(db: Session, user: UserCreate):

    hashed_pw = hash_password(user.password)

    # 🔎 Check if invited
    invite = db.query(Invite).filter(
        Invite.email == user.email
    ).first()

    if invite:
        # ✅ Invited user → use invite role
        role = invite.role
        company_id = invite.company_id

    else:
        # 🔎 Check if any admin exists
        existing_admin = db.query(User).filter(
            User.role == "admin"
        ).first()

        if existing_admin:
            # ✅ Admin already exists → employee
            role = "employee"
            company_id = existing_admin.company_id  # optional
        else:
            # 👑 FIRST USER → ADMIN
            role = "admin"
            company_id = None

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw,
        role=role,
        company_id=company_id
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# 🔐 AUTHENTICATE USER (LOGIN)
def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(
        (User.username == username) | (User.email == username)
    ).first()

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user