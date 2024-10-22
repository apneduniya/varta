import typing as t
from utils.rss_feeds import load_rss_data
from utils.scrape import scrape_webpage
from utils.predict import predict_news_list
from utils.summarize import quick_summarize, refined_summarize
from utils.link_details import generate_website_preview
from helpers.common import convert_relative_time
from helpers.news import get_news_source_details
from helpers.prompt import LIST_OF_ARTICLES_PAGE_SCRAPING_PROMPT


async def get_news_list(preferred_sources: t.List[int], user_interests: t.List[str]) -> t.Optional[t.List[t.Dict[str, str]]]:
    """Get news data based on preferred sources and user interests"""

    result = []

    for source_id in preferred_sources:  # from each news outlets
        source_details = get_news_source_details(source_id)
        type = source_details.get("type")
        if type == "rss":
            url = source_details.get("url")

            # Load RSS feed data
            print(source_id)
            loaded_data = await load_rss_data(url)
            if not loaded_data:
                continue
            print("loaded rss")

            # Check if the title contains any of the user interests using AI
            predicted_news_list = await predict_news_list(user_interests, loaded_data)
            print("predicted")
            # print(predicted_news_list)

            for news_data in loaded_data:  # from each news/articles of the news outlet
                if news_data:

                    # Check if the news article falls under the user interests
                    if int(news_data["id"]) not in predicted_news_list["selected_news"]:
                        continue

                    # Fetch metadata for the news article URL
                    url = news_data.get("link")
                    if url:
                        metadata = await generate_website_preview(url)
                        if metadata:
                            # Add metadata to the news data
                            # news_data["preview_title"] = metadata["title"]
                            # news_data["preview_description"] = metadata["description"]
                            news_data["preview_image"] = metadata["image"]
                        else:
                            continue
                    else:
                        continue

                    news_data.pop("id") # `id` is not needed in the response
                    news_data["source"] = source_details.get("name") # Add news source name to the response
                    result.append(news_data)
        
        # Support for web scraping from webpages
        elif type == "webpage":
            url = source_details.get("url")

            # Scrape the webpage
            print(source_id)
            scraped_data = await scrape_webpage(LIST_OF_ARTICLES_PAGE_SCRAPING_PROMPT, url)
            # print(scraped_data)
            print("scraped")

            scraped_data = convert_relative_time(scraped_data) # Relative time to absolute datetime
            scraped_data = scraped_data.get("data") # Get the list of articles

            if not scraped_data:
                continue

            # Add unique ID to each news article
            for i, news_data in enumerate(scraped_data):
                news_data["id"] = i + 1

            # Check if the title contains any of the user interests using AI
            predicted_news_list = await predict_news_list(user_interests, scraped_data)
            print("predicted")
            # print(predicted_news_list)

            for news_data in scraped_data: # from each news/articles of the news outlet
                if news_data:
                    
                    # Check if the news article falls under the user interests
                    if int(news_data["id"]) not in predicted_news_list["selected_news"]:
                        continue

                    # Fetch metadata for the news article URL
                    url = news_data.get("link")
                    if url:
                        metadata = await generate_website_preview(url)
                        if metadata:
                            # Add metadata to the news data
                            # news_data["preview_title"] = metadata["title"]
                            # news_data["preview_description"] = metadata["description"]
                            news_data["preview_image"] = metadata["image"]
                        else:
                            continue
                    else:
                        continue

                    news_data.pop("id") # `id` is not needed in the response
                    news_data["source"] = source_details.get("name") # Add news source name to the response
                    result.append(news_data)

    if not result:
        return None
    
    return result


async def get_news_data(url: str, user_summary_choice: str = "quick") -> t.Optional[t.Dict[str, str]]:
    """Get news data from the url"""

    result = {}

    # Getting the summary of the article
    if user_summary_choice == "quick":
        try:
            summary = await quick_summarize(url)
        except Exception as e:
            print(f"Quick summary didn't worked!\nError: {e} \n\nTrying refined summary.")
            summary = await refined_summarize(url)

        # if summary has `\n\n` then remove everything before that (only the first occurence) as it might contain `Here is a concise, precise, coherent, insightful, and comprehensive summary of the article`
        if "\n\n" in summary:
            summary = summary.split("\n\n", 1)[1]

        result["summary"] = summary

    elif user_summary_choice == "refined":
        summary = await refined_summarize(url)

        # if summary has `\n\n` then remove everything before that (only the first occurence) as it might contain `Here is a concise, precise, coherent, insightful, and comprehensive summary of the article`
        if "\n\n" in summary:
            summary = summary.split("\n\n", 1)[1]

        result["summary"] = summary

    else:
        return None

    return result


