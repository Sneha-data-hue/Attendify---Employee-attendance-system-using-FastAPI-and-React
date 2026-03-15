from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import user, company

from app.routers import auth, users, companies
from app.modules.attendance.router import router as attendance_router
from app.modules.company_dashboard.router import router as dashboard_router
from app.modules.reports.router import router as reports_router
from app.modules.invite.router import router as invite_router
from app.modules import face
from app.modules.leave.router import router as leave_router


app = FastAPI()

origins = [
    "http://localhost:5173",  # React Vite frontend
]

# CORS (MUST be before routers)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # allow all during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(auth.router, prefix="/api/v1/auth")
app.include_router(users.router, prefix="/api/v1/users")
app.include_router(companies.router, prefix="/api/v1/companies")
app.include_router(attendance_router, prefix="/api/v1/attendance")
app.include_router(dashboard_router, prefix="/api/v1/dashboard")
app.include_router(reports_router, prefix="/api/v1/reports")
app.include_router(invite_router, prefix="/api/v1/invite")
app.include_router(face.router, prefix="/api/v1/face")
app.include_router(leave_router, prefix="/api/v1")


@app.get("/")
def home():
    return {"message": "Attendify Backend Running"}