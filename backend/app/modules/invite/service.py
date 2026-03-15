from sqlalchemy.orm import Session
from app.models.invite import Invite
from app.core.email import send_email


def create_invite(db: Session, email: str, role: str, company_id: int):

    # create invite record
    invite = Invite(
        email=email,
        role=role,
        company_id=company_id
    )

    db.add(invite)
    db.commit()
    db.refresh(invite)

    # registration link with token
    register_link = f"http://localhost:5173/signup?token={invite.token}"

    subject = "Invitation to Join Attendify"

    message = f"""
Dear User,

You have been invited to join a company on Attendify as {role.upper()}.

To accept the invitation and create your account, click the link below:

{register_link}

This link will automatically assign your role and company.

If you did not expect this invitation, please ignore this email.

Best regards,
Attendify Team
"""

    # send email (correct order)
    send_email(subject, message, email)

    print(f"Invite email sent to {email}")

    return invite