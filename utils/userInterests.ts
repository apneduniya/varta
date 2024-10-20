import { getItem, setItem } from "./AsyncStorage";
import { USER_INTERESTS } from "./constants";


async function getUserInterestsFunction(): Promise<string[] | []> {
    try {
        // Retrieve the existing list of user interests
        const existingUserInterests = await getItem(USER_INTERESTS);
        
        // Parse the retrieved data (if any) into an array
        return existingUserInterests ? existingUserInterests : [];
    } catch (error) {
        console.error('Error retrieving user interests:', error);
        return [];
    }
}


async function addUserInterestFunction(interest: string) {
    try {
        // Retrieve the existing list of user interests
        const existingUserInterests = await getItem(USER_INTERESTS);
        
        // Parse the retrieved data (if any) into an array
        let userInterests = existingUserInterests ? existingUserInterests : [];
        userInterests.push(interest);

        // Save the updated list back to AsyncStorage
        await setItem(USER_INTERESTS, userInterests);
        console.log('Preferred interest added:', userInterests);
    } catch (error) {
        console.error('Error adding users interest:', error);
    }
}


async function removeUserInterestFunction(interest: string) {
    try {
        // Retrieve the existing list of user interests
        const existingUserInterests = await getItem(USER_INTERESTS);
        
        // Parse the retrieved data (if any) into an array
        let userInterests = existingUserInterests ? existingUserInterests : [];
        userInterests = userInterests.filter((item: string) => item !== interest); // Remove the interest from the list

        // Save the updated list back to AsyncStorage
        await setItem(USER_INTERESTS, userInterests);
    } catch (error) {
        console.error('Error removing users interest:', error);
    }
}


async function isUserInterestFunction(interest: string): Promise<boolean> {
    try {
        // Retrieve the existing list of user interests
        const existingUserInterests = await getItem(USER_INTERESTS);
        
        // Parse the retrieved data (if any) into an array
        return existingUserInterests ? existingUserInterests.includes(interest) : false;
    } catch (error) {
        console.error('Error checking users interest:', error);
        return false;
    }
}


export { getUserInterestsFunction, addUserInterestFunction, removeUserInterestFunction, isUserInterestFunction };

