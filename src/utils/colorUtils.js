export function softenColor(rgbString) {

    const values =
        rgbString.match(/\d+/g)

    if (!values) {

        return rgbString
    }

    let [r, g, b] =
        values.map(Number)

    r = Math.min(255, r + 25)
    g = Math.min(255, g + 25)
    b = Math.min(255, b + 25)

    r = Math.round(r * 0.9)
    g = Math.round(g * 0.9)
    b = Math.round(b * 0.9)

    return `rgb(${r}, ${g}, ${b})`
}