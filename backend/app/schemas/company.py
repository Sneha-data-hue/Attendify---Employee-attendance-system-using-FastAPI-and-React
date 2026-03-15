from pydantic import BaseModel

class CompanyCreate(BaseModel):
    name: str
    address: str
    email: str
    phone: str
    company_type: str
    password: str


class CompanyOut(BaseModel):
    id: int
    name: str
    address: str
    email: str
    phone: str
    company_type: str
    password: str

    class Config:
        orm_mode = True