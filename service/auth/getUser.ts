import { getItem } from '@/utils/AsyncStorage';
import { REFRESH_TOKEN } from '@/utils/constants';
import { UserDetailsObject } from '@/utils/types';
import axios from 'axios';


interface UserDetailsAPIResponse {
    status: 'success' | 'error';
    data?: UserDetailsObject;
}

export async function getUserAPI(): Promise<UserDetailsAPIResponse> {
    /**
     * This function fetches the news list from the API.
     * 
     * @returns Promise<UserDetailsAPIResponse>
     */

    try {
        const refreshToken = await getItem(REFRESH_TOKEN);

        const response = await axios.get<UserDetailsObject>(`${process.env.EXPO_PUBLIC_API_URL}/auth/me`,{
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        return {
            status: 'success',
            data: response.data
        }
    } catch (error) {
        console.log("Error while fetching user details: ", error);
        return { status: 'error' };
    }
}








