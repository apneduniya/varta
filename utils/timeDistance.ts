import { formatDistanceToNow } from 'date-fns';


export function timeDistanceFunction(timestampString: string = "2024-10-13 00:36:55") {
    /**
     * This function takes a timestamp string and returns the time distance from now.
     * 
     * @param {string} timestampString - The timestamp string to convert to time distance.
     * @returns {string} - The time distance from now.
     */

    const date = new Date(timestampString);
    let timeAgo = formatDistanceToNow(date, { addSuffix: true });

    // Capitalize the first letter of timeAgo
    timeAgo = timeAgo.charAt(0).toUpperCase() + timeAgo.slice(1);

    return timeAgo;
}


