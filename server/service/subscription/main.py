from database.users import UserDB
from utils import email
from utils.news_outlet import get_news_outlet_by_url
from service.news import get_news_list, get_news_data
from data.email_template import EMAIL_TEMPLATE
import typing as t
import random


user_db = UserDB()


async def common_send_email_function(interval: str):
    """A common function which is responsible for sending presonalized emails to users on different intervals"""
    
    print(f"Sending emails for {interval} interval...")

    # Get all users on the basis of the interval
    users: t.List = []
    if interval == "daily":
        users = await user_db.get_daily_subscribed_users()
    elif interval == "weekly":
        users = await user_db.get_weekly_subscribed_users()
    elif interval == "monthly":
        users = await user_db.get_monthly_subscribed_users()

    if not users:
        print(f"No users found for {interval} interval.")
        return
    
    email_sent_count = 0

    for user in users:
        user_email = user.get("email")
        user_preferred_sources: t.List[str] = user.get("preferred_sources")
        user_interests: t.List[str] = user.get("user_interests")
        if not user_preferred_sources or not user_interests:
            continue

        random_source = random.choice(user_preferred_sources) # get a single random news oulet from the user's list of preferred sources [its a url]
        print(random_source)

        news_outlet = get_news_outlet_by_url(random_source)
        if not news_outlet:
            continue

        # Get the news list based on the user's preferred sources and interests
        print(f"Getting news list for {user_email}...")
        news_list = await get_news_list([news_outlet.get("id")], user_interests)
        if not news_list:
            continue

        random_news = random.choice(news_list) # get a single random news article from the list of news articles

        # Get the summary of the news
        print(f"Preparing news summary for {user_email}...")
        news_data = await get_news_data(random_news.get("link"), "quick")
        if not news_data:
            continue


        # Get the email template based on the user's interests
        email_template = EMAIL_TEMPLATE.format(
            title=random_news.get("title"),
            img=random_news.get("preview_image"),
            description=news_data.get("summary"),
        )

        # Send the email
        print(f"Sending newsletter to {user_email}...")
        subject = f"{interval.capitalize()} Newsletter from Varta - {random_news.get('title')}"
        await email.send_mail(user_email, subject, email_template)
        email_sent_count += 1

    
    print(f"{email_sent_count} email(s) sent for {interval} interval.")
    


async def send_daily_emails():
    await common_send_email_function("daily")


async def send_weekly_emails():
    await common_send_email_function("weekly")


async def send_monthly_emails():
    await common_send_email_function("monthly")
