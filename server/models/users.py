from pydantic import BaseModel, ConfigDict
import typing as t


# for /add-preferred-source

class RequestAddPreferredSource(BaseModel):
    source: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "source": "https://www.example.com/rss-feed"
            }
        },
    )


# for /remove-preferred-source

class RequestRemovePreferredSource(BaseModel):
    source: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "source": "https://www.example.com/rss-feed"
            }
        },
    )


# for /get-preferred-sources

class ResponseGetPreferredSources(BaseModel):
    preferred_sources: t.List[t.Optional[str]]

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "preferred_sources": ["https://hashnode.com/recent", "http://feeds.foxnews.com/foxnews/scitech"]
            }
        },
    )


# for /add-user-interest

class RequestAddUserInterest(BaseModel):
    interest: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "interest": "Business"
            }
        },
    )


# for /remove-user-interest

class RequestRemoveUserInterest(BaseModel):
    interest: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "interest": "Business"
            }
        },
    )


# for /get-user-interests

class ResponseGetUserInterests(BaseModel):
    user_interests: t.List[t.Optional[str]]

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "user_interests": ["Business", "Science & Technology"]
            }
        },
   )

