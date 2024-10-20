import { getItem, setItem } from '@/utils/AsyncStorage';
import { REFRESH_TOKEN } from '@/utils/constants';
import { CommonAPIResponse, UserDetailsObject } from '@/utils/types';
import axios from 'axios';


export async function loginUserAPI(email: string, password: string): Promise<CommonAPIResponse> {
    /**
     * This function helps the user to login.
     * 
     * @param email: string
     * @param password: string
     * 
     * @returns Promise<CommonAPIResponse>
     */

    try {

        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
            {
                "username": email,
                "password": password
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        await setItem(REFRESH_TOKEN, response.data.refresh_token);

        return {
            status: 'success',
            message: 'User logged in successfully'
        }
        
    } catch (error) {
        console.log("Error while fetching user details: ", error);
        return { status: 'error', message: 'Wrong email or password' };
    }
}








