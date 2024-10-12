


export function textShorterFunction(text: string = "", char: number = 70): string {
    /**
     * This function shortens the text to the given character length without cutting off words.
     * 
     * @param text: string
     * @param char: number
     * 
     * @returns string
     */

    if (text.length > char) {
        let shortenedText = text.slice(0, char);
        const lastSpaceIndex = shortenedText.lastIndexOf(" ");
        if (lastSpaceIndex > -1) {
            shortenedText = shortenedText.slice(0, lastSpaceIndex);
        }
        return shortenedText + "...";
    } else {
        return text;
    }
}
