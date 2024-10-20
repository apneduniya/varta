import axios from 'axios';


interface NewsInterestsAPIResponse {
    status: string;
    data: Array<string>;
}

export async function getNewsInterestsAPI(): Promise<NewsInterestsAPIResponse> {
    /**
     * This function fetches the news interests list from the API.
     * 
     * @returns Promise<NewsInterestsAPIResponse>
     */

    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/news/get-news-interests`, {
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








