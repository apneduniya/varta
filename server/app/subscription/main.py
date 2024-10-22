from fastapi import APIRouter, Depends
from models.common import CommonResponse
from models.subscription import RequestSubscription, ResponseGetSubscriptionStatus, RequestSubscriptionFrequency, ResponseGetSubscriptionFrequency
from models.auth import UserBase
from database.users import UserDB
from utils.auth import get_current_active_user


router = APIRouter()
users_db = UserDB()


# Methods for handling user's choice for the subscription

@router.put("/subscribe", description="Subscribe to email newsletter")
async def update_subscription(request_data: RequestSubscription, current_user: UserBase = Depends(get_current_active_user)) -> CommonResponse:
    """Subscribe to a source"""
    await users_db.update_subscription_status(current_user["_id"], request_data.status)
    return CommonResponse(success=True, message="Subscription status updated successfully.")


@router.get("/get-subscription-status", response_model=RequestSubscription)
async def get_subscription_status(current_user: UserBase = Depends(get_current_active_user)):
    """Get the subscription status"""
    status = await users_db.get_subscription_status(current_user["_id"])
    return ResponseGetSubscriptionStatus(status=status)


@router.put("/subscription-frequency", description="Update the subscription frequency like daily, weekly, monthly")
async def update_subscription_frequency(request_data: RequestSubscriptionFrequency, current_user: UserBase = Depends(get_current_active_user)) -> CommonResponse:
    """Update the subscription frequency"""
    # check if the frequency is valid
    if request_data.frequency not in ["daily", "weekly", "monthly"]:
        return CommonResponse(success=False, message="Invalid frequency. Please choose from daily, weekly, monthly.")

    await users_db.update_subscription_frequency(current_user["_id"], request_data.frequency)
    return CommonResponse(success=True, message="Subscription frequency updated successfully.")


@router.get("/get-subscription-frequency", description="Get the subscription frequency of the user")
async def get_subscription_frequency(current_user: UserBase = Depends(get_current_active_user)) -> ResponseGetSubscriptionFrequency:
    """Get the subscription frequency"""
    frequency = await users_db.get_subscription_frequency(current_user["_id"])
    return ResponseGetSubscriptionFrequency(frequency=frequency)

