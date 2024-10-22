from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, Any, Tuple
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
import os
import dotenv
from database.users import UserDB
from models.auth import UserBase, TokenData


dotenv.load_dotenv()

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login") # Pass login route here

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))  # 1 hour by default
REFRESH_TOKEN_EXPIRE_MINUTES = int(eval(os.getenv("REFRESH_TOKEN_EXPIRE_MINUTES", "60 * 24 * 7")))  # 7 days by default
ALGORITHM = os.getenv("ALGORITHM", "HS256")

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY")


def get_hashed_password(password: str) -> str:
    """It will return the hashed password"""
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    """It will return True if password matches with the hashed"""
    return password_context.verify(password, hashed_pass)


def create_access_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    """It will return the access token with the subject and expiration time"""
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    """It will return the refresh token with the subject and expiration time"""
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt


user_db = UserDB()


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """It will return the current user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        except JWTError:
            payload = jwt.decode(token, JWT_REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            # print("username is None")
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        # print("JWTError")
        raise credentials_exception
    user = await user_db.get_user_email(email=token_data.username)
    if user is None:
        # print("user is None")
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: UserBase = Depends(get_current_user)
):
    """It will return the current active user (not disabled)"""
    if current_user["role"] == "disabled":
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def is_admin(
    current_user: UserBase = Depends(get_current_user)
):
    """It will return the current user if it is admin"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=400, detail="Not an admin")
    return current_user