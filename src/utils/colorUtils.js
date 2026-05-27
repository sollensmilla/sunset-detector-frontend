/**
 * Softens an RGB color string by blending it towards a neutral gray.
 * @param {*} rgbString 
 * @returns 
 */
export function softenColor(rgbString) {

    if (
        !rgbString ||
        typeof rgbString !== 'string'
    ) {

        return 'rgb(255,255,255)'
    }

    const values =
        rgbString.match(/\d+/g)

    if (!values) {

        return rgbString
    }

    let [r, g, b] =
        values.map(Number)

    const average =
        (r + g + b) / 3

    r = average + ((r - average) * 0.82)
    g = average + ((g - average) * 0.82)
    b = average + ((b - average) * 0.82)

    return `rgb(
        ${Math.round(r)},
        ${Math.round(g)},
        ${Math.round(b)}
    )`
}