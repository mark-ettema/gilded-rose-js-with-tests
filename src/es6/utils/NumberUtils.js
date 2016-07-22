/**
 * @param   {Number}    max
 * @param   {Number}    number
 * @returns {Boolean}
 */
export function isLowerThan(max, number) {
    return number < max;
}

/**
 * @param   {Number}    min
 * @param   {Number}    number
 * @returns {Boolean}
 */
export function isGreaterThan(min, number) {
    return number > min;
}

/**
 * @param   {Number}    min
 * @param   {Number}    max
 * @param   {Number}    number
 * @returns {Boolean}
 */
export function isBetween(min, max, number) {
    return isGreaterThan(min, number) && isLowerThan(max, number);
}