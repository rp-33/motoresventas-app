export const firstLetterCapitalize = (word) => {
    const letter = word.charAt(0).toUpperCase();
    return `${letter}${word.slice(1)}`;
}