from ollama import AsyncClient
import os
import datetime
import dotenv
import typing as t
from helpers.common import parse_json_garbage_with_safety
from helpers.prompt import USER_PREFERED_NEWS_PROMPT


dotenv.load_dotenv() # Load environment variables from .env file

MAX_NEWS_ITEMS = 5  # Limit the number of news items


async def predict_news_list(user_interests: t.List[str], news_list: t.List[t.Dict[str, str]]) -> t.List[t.Dict[str, str]]:
    """Predict news list based on user interests using AI"""

    client = AsyncClient()

    user_interests = ", ".join(user_interests) # Convert list to string
    current_date_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") # Get current date and time (like 2021-10-18 00:00:00)

    # Truncate the news list to the maximum allowed items
    truncated_news_list = news_list[:MAX_NEWS_ITEMS]

    chat_completion = await client.chat(
        messages=[
            {
                "role": "user",
                "content": USER_PREFERED_NEWS_PROMPT.format(user_interests=user_interests, news_data=truncated_news_list, current_date_time=current_date_time),
            }
        ],
        model="llama3",
        stream=False,
    )

    result = chat_completion['message']['content']
    result_json = parse_json_garbage_with_safety(result)
    print(result_json)

    try:
        if not result_json or not result_json.get("selected_news"):
            return {"selected_news": []}
    except Exception as e:
        if isinstance(result_json, list): # if result_json is a list itself, then return it
            return {"selected_news": result_json}
        
        print("Error: ", e)
        return {"selected_news": []}

    return result_json