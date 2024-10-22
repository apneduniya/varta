from motor.motor_asyncio import AsyncIOMotorClient as MongoClient
from pymongo import DESCENDING
from bson import ObjectId
import dotenv
import os
from models.auth import UserBase
import typing as t


dotenv.load_dotenv()

MONGO_CONNECTION_URL = os.getenv("MONGO_CONNECTION_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")


# Replace this with your MongoDB collection name for users
USERS_COLLECTION_NAME = "users"

class UserDB:
    def __init__(self):
        self.client = MongoClient(MONGO_CONNECTION_URL)
        self.db = self.client[DATABASE_NAME]
        self.users_collection = self.db.get_collection(USERS_COLLECTION_NAME)

    # General user methods

    async def create_user(self, user_data : t.Dict) -> str:
        """
            This method creates a new user in the database. 
            See the UserBase model in models/users.py for the expected fields.
        """
        new_user = await self.users_collection.insert_one(user_data)
        new_user_id = str(new_user.inserted_id)
        return new_user_id
    
    def get_all_user(self, id: str, limit: int):
        """Get all users from the database with pagination"""
        if not id or id == "null":
            users_cursor = self.users_collection.find({}, {"password": False}).sort([("_id", DESCENDING)]).limit(limit) # Find the documents after the given id and get 'limit' number of rows
            users_list = list(users_cursor)
            return users_list
        user = self.users_collection.find_one({"_id": ObjectId(id)}) # Find the document with the given id
        if not user:
            return None
        
        users_cursor = self.users_collection.find({"_id": {"$lt": ObjectId(id)}}).sort([("_id", DESCENDING)]).limit(limit) # Find the documents after the given id and get 'limit' number of rows
        users_list = list(users_cursor)
        return users_list

    async def get_user(self, user_id: str):
        """Get a user from the database by its ID"""
        user = await self.users_collection.find_one({"_id": ObjectId(user_id)})
        return user
    
    async def get_user_email(self, email: str):
        """Get a user from the database by its email"""
        user = await self.users_collection.find_one({"email": email})
        return user
    
    # User's preferred sources

    async def add_new_preferred_source(self, user_id: str, source: str):
        """Add a new preferred source to a user's profile"""
        result = await self.users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"preferred_sources": source}} # Add the source to the list of preferred sources
        )
        return result.modified_count
    
    async def remove_preferred_source(self, user_id: str, source: str):
        """Remove a preferred source from a user's profile"""
        result = await self.users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"preferred_sources": source}} # Remove the source from the list of preferred sources
        )
        return result.modified_count
    
    async def get_preferred_sources(self, user_id: str):
        """Get a user's preferred sources"""
        user = await self.users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return None
        return user.get("preferred_sources", [])
    
    # User's news interests
    
    async def add_new_user_interest(self, user_id: str, interest: str):
        """Add a new interest to a user's profile"""
        result = await self.users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"user_interests": interest}} # Add the interest to the list of user interests
        )
        return result.modified_count
    
    async def remove_user_interest(self, user_id: str, interest: str):
        """Remove an interest from a user's profile"""
        result = await self.users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"user_interests": interest}} # Remove the interest from the list of user interests
        )
        return result.modified_count
    
    async def get_user_interests(self, user_id: str):
        """Get a user's interests"""
        user = await self.users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return None
        return user.get("user_interests", [])
    
    # User's subscription status

    async def update_subscription_status(self, user_id: str, status: bool):
        """Update a user's subscription status"""
        result = await self.users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"subscription_status": status}} # Update the subscription status
        )
        return result.modified_count
    
    async def get_subscription_status(self, user_id: str):
        """Get a user's subscription status"""
        user = await self.users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return None
        return user.get("subscription_status", False)
    
    # User's subscription frequency

    async def update_subscription_frequency(self, user_id: str, frequency: str):
        """Update a user's subscription frequency"""
        result = await self.users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"subscription_frequency": frequency}} # Update the subscription frequency
        )
        return result.modified_count
    
    async def get_subscription_frequency(self, user_id: str):
        """Get a user's subscription frequency"""
        user = await self.users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return None
        return user.get("subscription_frequency", "daily")
    
    # Aggregating users for sending emails based on subscription status and frequency

    async def get_daily_subscribed_users(self):
        """Get all users with subscription status as True and their frequency is daily"""
        users_list = []
        users = self.users_collection.find({"subscription_status": True, "subscription_frequency": "daily"})

        async for user in users:
            users_list.append(user)
        
        return users_list

    async def get_weekly_subscribed_users(self):
        """Get all users with subscription status as True and their frequency is weekly"""
        users_list = []
        users = self.users_collection.find({"subscription_status": True, "subscription_frequency": "weekly"})
                
        async for user in users:
            users_list.append(user)
        
        return users_list

    async def get_monthly_subscribed_users(self):
        """Get all users with subscription status as True and their frequency is monthly"""
        users_list = []
        users = self.users_collection.find({"subscription_status": True, "subscription_frequency": "monthly"})
                
        async for user in users:
            users_list.append(user)
        
        return users_list
    
    