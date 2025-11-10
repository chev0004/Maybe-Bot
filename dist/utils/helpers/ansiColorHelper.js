/**
 * A map of color names to their ANSI escape codes.
 * The format is: `\u001b[<STYLE>;<COLOR>m`
 * Style Codes: 1=bold, 2=dim
 * Color Codes: 30-37
 */
const ansiColors = {
    // Dim/Faint Colors
    dimRed: "2;31m",
    dimGreen: "2;32m",
    dimYellow: "2;33m",
    dimBlue: "2;34m",
    dimMagenta: "2;35m",
    dimCyan: "2;36m",
    dimWhite: "2;37m",
    // Bold Colors
    boldRed: "1;31m",
    boldGreen: "1;32m",
    boldYellow: "1;33m",
    boldBlue: "1;34m",
    boldMagenta: "1;35m",
    boldCyan: "1;36m",
    boldWhite: "1;37m",
};
/**
 * Wraps a string in ANSI color codes for use in Discord embeds.
 * @param color The desired color from the ansiColors map.
 * @param text The text to colorize.
 * @returns The colorized text string.
 */
export const setColor = (color, text) => {
    const colorCode = ansiColors[color];
    if (!colorCode) {
        return text;
    }
    return `\u001b[${colorCode}${text}\u001b[0m`;
};
