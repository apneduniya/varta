import { getNewsOutletAPI } from "@/service/news/getNewsOutlet";
import { getItem, setItem } from "./AsyncStorage";
import { PREFERRED_SOURCES } from "./constants";
import { NewsOutletDataObject } from "./types";


async function getPreferredSourcesFunction(): Promise<string[] | []> {
    try {
        // Retrieve the existing list of preferred sources
        const existingPreferredSources = await getItem(PREFERRED_SOURCES);
        
        // Parse the retrieved data (if any) into an array
        return existingPreferredSources ? existingPreferredSources : [];
    } catch (error) {
        console.error('Error retrieving preferred sources:', error);
        return [];
    }
}


async function getIndexOfPreferredSourcesFunction(): Promise<number[] | []> {
    try {
        // Retrieve the existing list of preferred sources
        const existingPreferredSources: string[] = await getItem(PREFERRED_SOURCES);
        
        // Get list of news outlets
        const response = await getNewsOutletAPI();
        const newsOutlet = response.data;

        // Parse the retrieved data (if any) into an array
        return existingPreferredSources ? existingPreferredSources.map((url) => {
            const item = newsOutlet.find((item) => item.url === url);
            return item ? item.id : -1; // Return item.id if found, otherwise return -1
        }) : [];

    } catch (error) {
        console.error('Error retrieving preferred sources:', error);
        return [];
    }
}


async function addPreferredSourceFunction(url: string) {
    try {
        // Retrieve the existing list of preferred sources
        const existingPreferredSources = await getItem(PREFERRED_SOURCES);
        
        // Parse the retrieved data (if any) into an array
        let preferredSources = existingPreferredSources ? existingPreferredSources : [];
        preferredSources.push(url);

        // Save the updated list back to AsyncStorage
        await setItem(PREFERRED_SOURCES, preferredSources);
        console.log('Preferred source added:', preferredSources);
    } catch (error) {
        console.error('Error adding preferred source:', error);
    }
}


async function removePreferredSourceFunction(url: string) {
    try {
        // Retrieve the existing list of preferred sources
        const existingPreferredSources = await getItem(PREFERRED_SOURCES);
        
        // Parse the retrieved data (if any) into an array
        let preferredSources = existingPreferredSources ? existingPreferredSources : [];
        preferredSources = preferredSources.filter((item: string) => item !== url); // Remove the source from the list

        // Save the updated list back to AsyncStorage
        await setItem(PREFERRED_SOURCES, preferredSources);
    } catch (error) {
        console.error('Error removing preferred source:', error);
    }
}


async function isPreferredSourceFunction(url: string): Promise<boolean> {
    try {
        // Retrieve the existing list of preferred sources
        const existingPreferredSources = await getItem(PREFERRED_SOURCES);
        
        // Parse the retrieved data (if any) into an array
        return existingPreferredSources ? existingPreferredSources.includes(url) : false;
    } catch (error) {
        console.error('Error checking preferred source:', error);
        return false;
    }
}

// Utility to compare arrays of URLs
function areURLsEqualFunction(
    oldSourcesURL: string[],
    newSourcesURL: string[]
): boolean {
    if (oldSourcesURL.length !== newSourcesURL.length) return false;

    // Compare URLs in each object
    for (let i = 0; i < oldSourcesURL.length; i++) {
        if (oldSourcesURL[i] !== newSourcesURL[i]) {
            return false; // If any URL differs, return false
        }
    }
    return true; // All URLs match
}




export { getPreferredSourcesFunction, getIndexOfPreferredSourcesFunction, addPreferredSourceFunction, removePreferredSourceFunction, isPreferredSourceFunction, areURLsEqualFunction };

