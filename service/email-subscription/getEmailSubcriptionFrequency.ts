import { getItem } from '@/utils/AsyncStorage';
import { REFRESH_TOKEN } from '@/utils/constants';
import axios from 'axios';


interface EmailSubcriptionFrequencyAPIResponse {
    status: 'success' | 'error';
    frequency: 'daily' | 'weekly' | 'monthly';
}


export async function getgetEmailSubcriptionFrequencyAPI(): Promise<EmailSubcriptionFrequencyAPIResponse> {
    /**
     * This function fetches the email subscription frequency from the API.
     * 
     * @returns Promise<EmailSubcriptionFrequencyAPIResponse>
     */

    try {
        const refreshToken = await getItem(REFRESH_TOKEN);

        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/subscription/get-subscription-frequency`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        return {
            status: 'success',
            frequency: response.data.frequency
        }
        
    } catch (error) {
        console.log("Error while fetching user details: ", error);
        return { status: 'error', frequency: 'daily' };
    }
}








