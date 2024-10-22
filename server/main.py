from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from database import DBConnection
from app import news, auth, users, subscription
from service.subscription import send_daily_emails, send_weekly_emails, send_monthly_emails
import dotenv
import os


dotenv.load_dotenv()
ORIGINS = ["*"]
MONGO_CONNECTION_URL = os.getenv("MONGO_CONNECTION_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

db_connection = DBConnection(MONGO_CONNECTION_URL, DATABASE_NAME)
scheduler = AsyncIOScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start Up Event
    db_connection.connect()

    scheduler.add_job(send_daily_emails, 'interval', days=1)
    scheduler.add_job(send_weekly_emails, 'interval', weeks=1)
    scheduler.add_job(send_monthly_emails, 'interval', weeks=4)
    scheduler.start()

    print("\nS E R V E R   S T A R T I N G . . . . . . . . . .\n")
    yield

    # Shut Down Event
    scheduler.shutdown()
    db_connection.disconnect()
    
    print("\nS E R V E R   S H U T D O W N . . . . . . . . . .\n")


app = FastAPI(
    title="Varta API",
    description="API for Varta",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#  I N C L U D E   R O U T E R S

app.include_router(news.router, prefix="/news", tags=["news"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(subscription.router, prefix="/subscription", tags=["subscription"])



