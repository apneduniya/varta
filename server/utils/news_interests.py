from data.interests import NEWS_INTERESTS
import typing as t

def get_news_interests() -> t.Dict[str, t.List[str]]:
    """Get list of news interests"""
    return {"data": NEWS_INTERESTS}




