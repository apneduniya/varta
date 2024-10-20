import { getItem, setItem } from '@/utils/AsyncStorage';
import { REFRESH_TOKEN } from '@/utils/constants';
import { CommonAPIResponse, UserDetailsObject } from '@/utils/types';
import axios from 'axios';


export async function registerUserAPI(name: string, email: string, password: string): Promise<CommonAPIResponse> {
    /**
     * This function helps the user to register.
     * 
     * @param name: string
     * @param email: string
     * @param password: string
     * 
     * @returns Promise<CommonAPIResponse>
     */

    try {

        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`,
            {
                name,
                email,
                password
            },
            {
                headers: {
                    'Accept': 'application/json',
                }
            });

        await setItem(REFRESH_TOKEN, response.data.refresh_token);

        return {
            status: 'success',
            message: 'User registered successfully'
        }
        
    } catch (error) {
        console.log("Error while fetching user details: ", error);
        return { status: 'error', message: 'Something went wrong' };
    }
}








