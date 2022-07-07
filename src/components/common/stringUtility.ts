export const strToNumber = (str: string): number => {
    if (/^[0-9\.]+$/.test(str) == false)
        return NaN;

    if (str.length > 5)
        throw new Error("Number must have 5 or less digits!")

    return parseFloat(str);
}