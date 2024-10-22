from langchain_community.document_loaders import RSSFeedLoader 
import typing as t


async def load_rss_data(url: str) -> t.Optional[t.List[t.Dict[str, str]]]:
    """Get title and link from the RSS feed data."""

    # Initialize RSSFeedLoader with the given URL
    loader = RSSFeedLoader(urls=[url])

    result = []
    
    # Unique ID for each news article. This will be helpful for prompting the LLM.
    id = 1 
    try:
        data = loader.alazy_load()
        if not data:
            return None # news source is either down or the URL is incorrect
        async for doc in data:
            title = doc.metadata["title"]
            link = doc.metadata["link"]
            publish_date = doc.metadata["publish_date"] # datetime.datetime(2021, 10, 18, 0, 0) in str format
            if not publish_date:
                publish_date = "Unknown"
            else:
                publish_date = str(publish_date.strftime("%Y-%m-%d %H:%M:%S")) # Convert datetime.datetime to str

            if not title or not link:
                continue
            
            result.append({
                "id": id,
                "title": title,
                "link": link,
                "publish_date": publish_date,
            })
            id += 1

        return result
    except Exception as e:
        print(f"Error loading data for {url}: {e}")
        return None # Something went wrong while loading the data

