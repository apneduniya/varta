import { NewsListDataObject } from '@/utils/types';
import axios from 'axios';


interface NewsListAPIResponse {
    status: string;
    data: Array<NewsListDataObject>;
}

export async function getNewsListAPI(preferred_sources: Array<number> = [], user_interests: Array<string> = []): Promise<NewsListAPIResponse> {
    /**
     * This function fetches the news list from the API.
     * 
     * @param preferred_sources: Array<number>
     * @param user_interests: Array<string>
     * 
     * @returns Promise<NewsListAPIResponse>
     */

    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/news/get-news-list`, {
            preferred_sources: preferred_sources,
            user_interests: user_interests,
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return {
            status: 'success',
            data: response.data.data
        }
    } catch (error) {
        console.log("Error while fetching news list", error);
        return { status: 'error', data: [] };
    }
}








