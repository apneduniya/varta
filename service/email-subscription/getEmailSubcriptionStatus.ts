import { getItem } from '@/utils/AsyncStorage';
import { REFRESH_TOKEN } from '@/utils/constants';
import axios from 'axios';


interface EmailSubcriptionStatusAPIResponse {
    status: 'success' | 'error';
    isSubscribed: boolean;
}

export async function getEmailSubcriptionStatusAPI(): Promise<EmailSubcriptionStatusAPIResponse> {
    /**
     * This function fetches the email subscription status from the API.
     * 
     * @returns Promise<EmailSubcriptionStatusAPIResponse>
     */

    try {
        const refreshToken = await getItem(REFRESH_TOKEN);

        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/subscription/get-subscription-status`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        return {
            status: 'success',
            isSubscribed: response.data.status
        }
    } catch (error) {
        console.log("Error while fetching user details: ", error);
        return { status: 'error', isSubscribed: false };
    }
}








