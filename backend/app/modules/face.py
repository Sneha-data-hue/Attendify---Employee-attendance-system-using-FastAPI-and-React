from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import face_recognition
import numpy as np
from app.database import get_db
from app.models.user import User
from app.core.dependencies import get_current_user
import io

router = APIRouter( tags=["attendance"])

@router.post("/register")
async def register_face(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    contents = await file.read()

    image = face_recognition.load_image_file(
        io.BytesIO(contents)
    )

    encodings = face_recognition.face_encodings(image)

    if not encodings:
        raise HTTPException(status_code=400, detail="No face detected")

    face_encoding = encodings[0].tolist()

    current_user.face_encoding = face_encoding
    db.commit()

    return {"message": "Face registered successfully"}

@router.post("/verify")
async def verify_face(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user.face_encoding:
        raise HTTPException(status_code=400, detail="Face not registered")

    contents = await file.read()

    image = face_recognition.load_image_file(
        io.BytesIO(contents)
    )

    encodings = face_recognition.face_encodings(image)

    if not encodings:
        raise HTTPException(status_code=400, detail="No face detected")

    uploaded_encoding = encodings[0]
    stored_encoding = np.array(current_user.face_encoding)

    match = face_recognition.compare_faces(
        [stored_encoding],
        uploaded_encoding,
        tolerance=0.5
    )

    distance = face_recognition.face_distance(
        [stored_encoding],
        uploaded_encoding
    )[0]

    if match[0]:
        return {
            "match": True,
            "confidence_score": float(1 - distance)
        }

    raise HTTPException(status_code=401, detail="Face does not match")