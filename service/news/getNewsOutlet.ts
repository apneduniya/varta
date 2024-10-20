import { NewsOutletDataObject } from '@/utils/types';
import axios from 'axios';


interface NewsOutletAPIResponse {
    status: string;
    data: Array<NewsOutletDataObject>;
}

export async function getNewsOutletAPI(): Promise<NewsOutletAPIResponse> {
    /**
     * This function fetches the news outlet list from the API.
     * 
     * @returns Promise<NewsOutletAPIResponse>
     */

    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/news/get-news-outlet`, {
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








