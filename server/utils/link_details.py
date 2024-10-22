import httpx
import asyncio
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
import typing as t
import random


# Executor for offloading blocking operations like HTML parsing
executor = ThreadPoolExecutor()


async def fetch_webpage(url: str) -> t.Optional[str]:
    """Asynchronously fetch the webpage content with headers to look less suspicious"""
    headers = {"User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'}


    try:
        async with httpx.AsyncClient(headers=headers) as client:
            response = await client.get(url)
            if response.status_code == 200:
                return response.text
            return None
    except httpx.HTTPError as e:
        print(f"Error fetching {url}: {e}")
        return None


def parse_html(content: str) -> t.Optional[BeautifulSoup]:
    """Parse the HTML content"""
    soup = BeautifulSoup(content, 'lxml')
    return soup


def extract_metadata(soup: BeautifulSoup) -> t.Dict[str, str]:
    """Extract metadata from the webpage"""
    metadata = {}

    # Extract title
    title_tag = soup.find('title')
    if title_tag:
        metadata['title'] = title_tag.string

    # Extract description
    description_tag = soup.find('meta', attrs={'name': 'description'})
    if description_tag:
        metadata['description'] = description_tag['content']

    # Extract Open Graph metadata
    og_title_tag = soup.find('meta', property='og:title')
    if og_title_tag:
        metadata['og_title'] = og_title_tag['content']

    og_description_tag = soup.find('meta', property='og:description')
    if og_description_tag:
        metadata['og_description'] = og_description_tag['content']

    og_image_tag = soup.find('meta', property='og:image')
    if og_image_tag:
        metadata['og_image'] = og_image_tag['content']

    return metadata


async def generate_website_preview(url: str) -> t.Optional[t.Dict[str, str]]:
    """Generate a preview of the website"""
    try:
        content = await fetch_webpage(url)
        if not content:
            return None

        # Parse HTML asynchronously by using a threadpool for the blocking operation
        soup = await asyncio.get_event_loop().run_in_executor(executor, parse_html, content)
        metadata = extract_metadata(soup)

        # Fall back to non-Open Graph metadata if OG tags are not present
        title = metadata.get('og_title') or metadata.get(
            'title') or 'No title available'
        description = metadata.get('og_description') or metadata.get(
            'description') or 'No description available'
        image = metadata.get('og_image') or None

        if not image:
            # Extract the first image from the webpage
            image_tag = soup.find('img')
            if image_tag:
                image = image_tag['src']

        if not image:
            print(f"Skipping: No image found for {url}")
            return None

        return {
            'title': title,
            'description': description,
            'image': image
        }
    except Exception as e:
        print(f"Error generating website preview for {url}: {e}")
        return None
