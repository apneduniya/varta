from pydantic import BaseModel, Field, BeforeValidator, EmailStr, ConfigDict
import typing as t
from datetime import datetime


# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = t.Annotated[str, BeforeValidator(str)]


class UserBase(BaseModel):
    id: t.Optional[PyObjectId] = Field(alias="_id", default=None) # This will be aliased to `_id` when sent to MongoDB, but provided as `id` in the API requests and responses.
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    role: t.Optional[str] = Field(default="user") # like admin, user
    created_at: t.Optional[datetime] = Field(default=datetime.now()) # The date and time the user was created

    preferred_sources: t.Optional[t.List[str]] = Field(default=[ "https://hashnode.com/recent", "http://feeds.foxnews.com/foxnews/scitech" ]) # List of preferred news sources (list of news outlet's links)
    user_interests: t.Optional[t.List[str]] = Field(default=[ "Business", "Science & Technology" ]) # List of user interests (list of keywords)

    subscription_status: t.Optional[bool] = Field(default=False) # Subscription status (True/False)
    subscription_frequency: t.Optional[str] = Field(default="weekly") # Subscription frequency (daily, weekly, monthly)

    model_config = ConfigDict(
        populate_by_name=True, # Populate the model with the values from the JSON by name (e.g. `{"name": "Jane Doe"}` will populate the `name` field)
        arbitrary_types_allowed=True, # Allow arbitrary types to be passed in the JSON (e.g. `datetime`, `ObjectId`, etc.)
        json_schema_extra={
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "password": "password",
                "role": "user",
                "preferred_sources": ["https://hashnode.com/recent", "http://feeds.foxnews.com/foxnews/scitech"],
                "user_interests": ["Business", "Science & Technology"],
                "subscription_status": True,
                "subscription_frequency": "daily"
            }
        },
    )



# AUTH MODELS

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    role: str

class TokenData(BaseModel):
    username: str = None

