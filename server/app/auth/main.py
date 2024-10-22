from fastapi import APIRouter, HTTPException, Depends, Body
from starlette import status
from fastapi.security import OAuth2PasswordRequestForm
from models.auth import TokenSchema, UserBase
from database.users import UserDB
from utils.auth import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password,
    get_current_active_user
)


router = APIRouter()
user_db = UserDB()


@router.post('/register', response_description="Create new user", status_code=status.HTTP_201_CREATED, response_model=TokenSchema)
async def create_user(user: UserBase = Body(...)):
    # querying database to check if user already exist
    entity = await user_db.get_user_email(user.email)
    if entity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exist"
        )

    # hashing the password
    user.password = get_hashed_password(user.password)

    # creating new user
    await user_db.create_user(user.model_dump(by_alias=True, exclude=["id"]))

    # creating access token
    access_token = create_access_token(user.email)
    refresh_token = create_refresh_token(user.email)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "role": user.role
    }


@router.post('/login', response_description="Create access token for user", status_code=status.HTTP_200_OK, response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # form_data.username is the email id of the user
    user = await user_db.get_user_email(form_data.username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )

    hashed_pass = user['password']
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )

    return {
        "access_token": create_access_token(user['email']),
        "refresh_token": create_refresh_token(user['email']),
        "role": user['role'],
    }


@router.get("/me")
async def read_users_me(
    current_user: UserBase = Depends(get_current_active_user)
):
    # del current_user["password"]
    # print(current_user)
    
    return UserBase(**current_user).model_dump(by_alias=True, exclude=["password"])
