

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


export function randomNewsOutletTextColorFunction(): string {
    /**
     * This function returns a random color for the news outlet text.
     * 
     * @returns string
     */

    const colors = ["#54C8B1", "#EBAB15", "#9B8AE6", "#EF544F"];

    return colors[Math.floor(Math.random() * colors.length)];
}



