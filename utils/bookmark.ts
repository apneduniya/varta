import { getItem, setItem } from "./AsyncStorage";
import { BOOKMARKED_NEWS } from "./constants";
import { NewsListDataObject } from "./types";


async function bookmarkFunction(news: NewsListDataObject) {
    try {
        // Retrieve the existing list of bookmarks
        const existingBookmarks = await getItem(BOOKMARKED_NEWS);
        
        // Parse the retrieved data (if any) into an array
        let bookmarks = existingBookmarks ? existingBookmarks : [];
        bookmarks.push(news);

        // Save the updated list back to AsyncStorage
        await setItem(BOOKMARKED_NEWS, bookmarks);
        console.log('Bookmark added:', bookmarks);
    } catch (error) {
        console.error('Error adding bookmark:', error);
    }
}


async function unBookmarkFunction(news: NewsListDataObject) {
    try {
        // Retrieve the existing list of bookmarks
        const existingBookmarks = await getItem(BOOKMARKED_NEWS);
        
        // Parse the retrieved data (if any) into an array
        let bookmarks = existingBookmarks ? existingBookmarks : [];
        bookmarks = bookmarks.filter((item: NewsListDataObject) => item.link !== news.link); // Remove the news item from the list, identified by its link

        // Save the updated list back to AsyncStorage
        await setItem(BOOKMARKED_NEWS, bookmarks);
    } catch (error) {
        console.error('Error removing bookmark:', error);
    }
}


async function getBookmarksFunction(): Promise<NewsListDataObject[] | []> {
    try {
        // Retrieve the existing list of bookmarks
        const existingBookmarks = await getItem(BOOKMARKED_NEWS);
        
        // Parse the retrieved data (if any) into an array
        return existingBookmarks ? existingBookmarks : [];
    } catch (error) {
        console.error('Error retrieving bookmarks:', error);
        return [];
    }
}

async function isBookmarkedFunction(news: NewsListDataObject): Promise<boolean> {
    try {
        // Retrieve the existing list of bookmarks
        const existingBookmarks = await getItem(BOOKMARKED_NEWS);
        console.log(existingBookmarks);
        
        // Parse the retrieved data (if any) into an array
        let bookmarks = existingBookmarks? existingBookmarks : [];
        return bookmarks.some((item: NewsListDataObject) => item.link === news.link); // will return true if the news item is bookmarked
    } catch (error) {
        console.error('Error checking bookmark:', error);
        return false;
    }
}

export { bookmarkFunction, unBookmarkFunction, getBookmarksFunction, isBookmarkedFunction };





