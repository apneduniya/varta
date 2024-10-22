import json
import typing as t
from datetime import datetime, timedelta
import re


def parse_json_garbage(s: str) -> t.Dict[str, t.Any]:
    """
    This function converts string containing json to a json object.

    @param s: str - The string to parse.
    @return: t.Dict[str, t.Any] - The parsed json garbage.
    """
    s = s[next(idx for idx, c in enumerate(s) if c in "{["):]
    try:
        return json.loads(s)
    except json.JSONDecodeError as e:
        return json.loads(s[:e.pos])
    

def parse_json_garbage_with_safety(s: str, retries: int = 3) -> t.Dict[str, t.Any]:
    """
    This function converts string containing json to a json object with retries.

    @param retries: int - The number of retries.
    @param s: str - The string to parse.
    @return: t.Dict[str, t.Any] - The parsed json garbage.
    """
    for _ in range(retries):
        try:
            return parse_json_garbage(s)
        except Exception as e:
            print(f"Error parsing JSON garbage: {e}")
            pass
    return {}


def convert_relative_time(data: t.Dict[str, t.Any]) -> t.Dict[str, t.Any]:
    """
    This function converts relative time to absolute datetime.

    @param data: t.Dict[str, t.Any] - The data to parse.
    @return: t.Dict[str, t.Any] - The parsed data.
    """

    # Current time (this is the reference point to subtract time from)
    current_time = datetime.now()

    # Define the regex pattern to capture the time and unit (e.g. '9 minutes ago', '2 hours ago')
    pattern = re.compile(r'(\d+)\s(\w+)\sago')

    # if it's `a minute ago` or `an hour ago` or similar patterns
    word_pattern = re.compile(r'(a|an)\s(\w+)\sago')

    # Loop through each item in the list
    for item in data["data"]:
        match = pattern.match(item["publish_date"])
        word_match = word_pattern.match(item["publish_date"])
        
        if match:
            value, unit = match.groups()
            value = int(value)
            # print(value, unit)

            # Map time units to timedelta arguments
            if 'minute' in unit or 'min' in unit:
                delta = timedelta(minutes=value)
            elif 'second' in unit or 'sec' in unit:
                delta = timedelta(seconds=value)
            elif 'hour' in unit:
                delta = timedelta(hours=value)
            elif 'day' in unit:
                delta = timedelta(days=value)
            elif 'week' in unit:
                delta = timedelta(weeks=value)
            elif 'month' in unit:
                # Approximate a month as 30 days
                delta = timedelta(days=30 * value)
            elif 'year' in unit:
                # Approximate a year as 365 days
                delta = timedelta(days=365 * value)
            else:
                # If no match, continue to the next item
                continue
            
            # Subtract the delta from the current time
            actual_time = current_time - delta

            # Convert to the desired format 'YYYY-MM-DD HH:MM:SS'
            item["publish_date"] = actual_time.strftime('%Y-%m-%d %H:%M:%S')

        elif word_match:
            value, unit = word_match.groups() # value is 'a' or 'an' and unit is the time unit
            # print(value, unit)

            # Map time units to timedelta arguments
            if 'minute' in unit or 'min' in unit:
                delta = timedelta(minutes=1)
            elif 'hour' in unit:
                delta = timedelta(hours=1)
            elif 'day' in unit:
                delta = timedelta(days=1)
            elif 'week' in unit:
                delta = timedelta(weeks=1)
            elif 'month' in unit:
                # Approximate a month as 30 days
                delta = timedelta(days=30)
            elif 'year' in unit:
                # Approximate a year as 365 days
                delta = timedelta(days=365)
            else:
                # If no match, continue to the next item
                continue
            
            # Subtract the delta from the current time
            actual_time = current_time - delta

            # Convert to the desired format 'YYYY-MM-DD HH:MM:SS'
            item["publish_date"] = actual_time.strftime('%Y-%m-%d %H:%M:%S')
    
    # print(data)
    return data

