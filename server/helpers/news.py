import typing as t
from data.source import NEWS_SOURCES


def get_news_source_details(source_id: int) -> t.Optional[dict]:
    """Get necessary news source details based on source id"""
    for source in NEWS_SOURCES:
        if source["id"] == source_id:
            return {
                "type": source.get("type"),
                "url": source.get("url"),
                "name": source.get("name")
            }
    return None
