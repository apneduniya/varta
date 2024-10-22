from data.source import NEWS_SOURCES
import typing as t


def get_news_outlet() -> t.Dict[str, t.List[t.Dict[str, t.Optional[str]]]]:
    """Get list of news outlets"""
    return {"data": NEWS_SOURCES}


def get_news_outlet_by_url(url: str) -> t.Optional[t.Dict[str, t.Union[str, int]]]:
    """Get news outlet by URL"""
    for source in NEWS_SOURCES:
        if source.get("url") == url:
            return source
    return None



