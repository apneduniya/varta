import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
import typing as t
import dotenv
import os


dotenv.load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = os.getenv("SMTP_PORT")
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


async def send_mail(to: str, subject: str, html: str):
    """Send an email using SMTP"""
    # Prepare the email message
    message = MIMEMultipart("alternative")
    message["From"] = SMTP_USERNAME
    message["To"] = to
    message["Subject"] = subject

    html_part = MIMEText(html, "html")
    message.attach(html_part)

    # Connect and send email asynchronously with aiosmtplib
    await aiosmtplib.send(
        message,
        hostname=SMTP_SERVER,
        port=SMTP_PORT,
        start_tls=True,
        username=SMTP_USERNAME,
        password=SMTP_PASSWORD,
    )
