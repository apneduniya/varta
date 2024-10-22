from pydantic import BaseModel, ConfigDict, Field
import typing as t


# for /subscribe

class RequestSubscription(BaseModel):
    status: bool

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "status": True
            }
        },
    )


# for /get-subscription-status

class ResponseGetSubscriptionStatus(BaseModel):
    status: bool

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "status": True
            }
        },
    )


# for /subscription-frequency

class RequestSubscriptionFrequency(BaseModel):
    frequency: str = Field(..., description="Subscription frequency like daily, weekly, monthly")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "frequency": "daily"
            }
        },
    )


# for /get-subscription-frequency

class ResponseGetSubscriptionFrequency(BaseModel):
    frequency: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "frequency": "daily"
            }
        },
    )

