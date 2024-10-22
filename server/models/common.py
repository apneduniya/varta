from pydantic import BaseModel, ConfigDict


class CommonResponse(BaseModel):
    message: str
    success: bool = True

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "message": "Success",
                "success": True
            }
        },
    )



