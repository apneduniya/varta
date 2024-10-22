from fastapi import APIRouter, Depends
from models.common import CommonResponse
from models.users import RequestAddPreferredSource, RequestRemovePreferredSource, ResponseGetPreferredSources, RequestAddUserInterest, RequestRemoveUserInterest, ResponseGetUserInterests
from models.auth import UserBase
from database.users import UserDB
from utils.auth import get_current_active_user


router = APIRouter()
users_db = UserDB()


# preferred sources

@router.put("/add-preferred-source", description="Add a new preferred source to a user's profile.")
async def add_preferred_source(request_data: RequestAddPreferredSource, current_user: UserBase = Depends(get_current_active_user)) -> CommonResponse:
    try:
        await users_db.add_new_preferred_source(current_user["_id"], request_data.source)
    except Exception as e:
        print("Error: ", e)
        return CommonResponse(success=False, message="Failed to add preferred source. \nError: " + str(e))

    return CommonResponse(success=True, message="Preferred source added successfully.")


@router.put("/remove-preferred-source", description="Remove a preferred source from a user's profile.")
async def remove_preferred_source(request_data: RequestRemovePreferredSource, current_user: UserBase = Depends(get_current_active_user)) -> CommonResponse:
    try:
        await users_db.remove_preferred_source(current_user["_id"], request_data.source)
    except Exception as e:
        print("Error: ", e)
        return CommonResponse(success=False, message="Failed to remove preferred source. \nError: " + str(e))

    return CommonResponse(success=True, message="Preferred source removed successfully.")


@router.get("/get-preferred-sources", description="Get a user's preferred sources.")
async def get_preferred_sources(current_user: UserBase = Depends(get_current_active_user)) -> ResponseGetPreferredSources:
    preferred_sources = await users_db.get_preferred_sources(current_user["_id"])
    return ResponseGetPreferredSources(preferred_sources=preferred_sources)


# user interests

@router.put("/add-user-interest", description="Add a new interest to a user's profile.")
async def add_user_interest(request_data: RequestAddUserInterest, current_user: UserBase = Depends(get_current_active_user)) -> CommonResponse:
    try:
        await users_db.add_new_user_interest(current_user["_id"], request_data.interest)
    except Exception as e:
        print("Error: ", e)
        return CommonResponse(success=False, message="Failed to add user interest. \nError: " + str(e))

    return CommonResponse(success=True, message="User interest added successfully.")


@router.put("/remove-user-interest", description="Remove an interest from a user's profile.")
async def remove_user_interest(request_data: RequestRemoveUserInterest, current_user: UserBase = Depends(get_current_active_user)) -> CommonResponse:
    try:
        await users_db.remove_user_interest(current_user["_id"], request_data.interest)
    except Exception as e:
        print("Error: ", e)
        return CommonResponse(success=False, message="Failed to remove user interest. \nError: " + str(e))

    return CommonResponse(success=True, message="User interest removed successfully.")


@router.get("/get-user-interests", description="Get a user's interests.")
async def get_user_interests(current_user: UserBase = Depends(get_current_active_user)) -> ResponseGetUserInterests:
    user_interests = await users_db.get_user_interests(current_user["_id"])
    return ResponseGetUserInterests(user_interests=user_interests)
