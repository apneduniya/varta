from fastapi import APIRouter
from service.news import get_news_list, get_news_data
from models.news import RequestNewsList, ResponeNewsList, RequestNewsData, ResponseNewsData, ResponseNewsOutlet, ResponseNewsInterests
from utils.news_outlet import get_news_outlet
from utils.news_interests import get_news_interests


router = APIRouter()

@router.post("/get-news-list", description="Get list of news based on preferred sources and user interests.")
async def request_news_list(request_data: RequestNewsList) -> ResponeNewsList:
    try:
        result = await get_news_list(request_data.preferred_sources, request_data.user_interests)
    except Exception as e:
        print("Error: ", e)
        result = None

    if not result:
        return ResponeNewsList(data=[])

    return ResponeNewsList(data=result)


@router.post("/get-news-data", description="Get news data based on the selected news articles.")
async def request_news_data(request_data: RequestNewsData) -> ResponseNewsData:
    try:
        result = await get_news_data(request_data.url, "refined")
    except Exception as e:
        print("Error: ", e)
        result = None

    if not result:
        return ResponseNewsData(summary="Something went wrong! \nPlease contact the developer: **@thatsmeadarsh**")

    return ResponseNewsData(**result)


@router.get("/get-news-outlet", description="Get list of news outlets.")
async def request_news_outlet() -> ResponseNewsOutlet:
    result = get_news_outlet()

    return ResponseNewsOutlet(**result)


@router.get("/get-news-interests", description="Get list of news interests.")
async def request_news_interest() -> ResponseNewsInterests:
    result = get_news_interests()

    return ResponseNewsInterests(**result)
