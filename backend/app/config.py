from datetime import timedelta

SECRET_KEY = "change_this_secret_later"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

DATABASE_URL = "sqlite:///./attendify.db"
