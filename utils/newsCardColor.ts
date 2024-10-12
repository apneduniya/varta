

export function newsCardColorFunction(index: number = 0): string {
    /**
     * This function returns the color for the news card. 
     * If the index exceeds the length of the colors array, it will start from the beginning.
     * 
     * @param index: number
     * 
     * @returns string
     */

    const colors = ["#FFF2C5", "#FBE4E1", "#E0F1FF", "#E8E1FB"];

    return colors[index % colors.length];
}




