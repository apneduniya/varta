import { getItem } from '@/utils/AsyncStorage';
import { REFRESH_TOKEN } from '@/utils/constants';
import { CommonAPIResponse } from '@/utils/types';
import axios from 'axios';


export async function postEmailSubscriptionFrequencyAPI(frequency: 'daily' | 'weekly' | 'monthly'): Promise<CommonAPIResponse> {
    /**
     * This function helps the user to update email subscription frequency.
     * 
     * @param frequency: string
     * 
     * @returns Promise<CommonAPIResponse>
     */

    try {

        const refreshToken = await getItem(REFRESH_TOKEN);

        const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/subscription/subscription-frequency`,
            {
                "frequency": frequency
            },
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

        return {
            status: 'success',
            message: 'Email subscription frequency updated successfully'
        }

    } catch (error) {
        console.log("Error while changing email subscription frequency: ", error);
        return { status: 'error', message: 'Error while updating email subscription frequency' };
    }
}








