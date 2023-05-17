export const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
}
export const isTwoArray = (arr) => {
    return arr.some(items => {
        return Array.isArray(items);
    });
}