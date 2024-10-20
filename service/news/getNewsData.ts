import { NewsDataObject } from '@/utils/types';
import axios from 'axios';


interface NewsDataAPIResponse {
    status: string;
    summary: string;
}

export async function getNewsDataAPI(url: string, user_summary_choice: string = "quick"): Promise<NewsDataAPIResponse> {
    /**
     * This function fetches the news list from the API.
     * 
     * @param url: string
     * @param user_summary_choice: string
     * 
     * @returns Promise<NewsDataAPIResponse>
     */

    try {
        const response = await axios.post<NewsDataObject>(`${process.env.EXPO_PUBLIC_API_URL}/news/get-news-data`, {
            url: url,
            user_summary_choice: user_summary_choice,
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return {
            status: 'success',
            summary: response.data.summary
        }
    } catch (error) {
        console.log("Error while fetching news list", error);
        return { status: 'error', summary: "Something went wrong! \nContact the developer: **@thatsmeadarsh**" }
    }
}








