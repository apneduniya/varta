import { getItem } from '@/utils/AsyncStorage';
import { REFRESH_TOKEN } from '@/utils/constants';
import { CommonAPIResponse } from '@/utils/types';
import axios from 'axios';


export async function postEmailSubscribeStatusAPI(subscribe: boolean): Promise<CommonAPIResponse> {
    /**
     * This function helps the user to update email subscription.
     * 
     * @param subscribe: boolean
     * 
     * @returns Promise<CommonAPIResponse>
     */

    try {

        const refreshToken = await getItem(REFRESH_TOKEN);

        const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/subscription/subscribe`,
            {
                "status": subscribe
            },
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

        return {
            status: 'success',
            message: 'Email subscription status updated successfully'
        }

    } catch (error) {
        console.log("Error while changing email subscription status: ", error);
        return { status: 'error', message: 'Error while updating email subscription status' };
    }
}








