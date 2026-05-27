import {
    softenColor
} from './colorUtils'

import {
    stockholmMinutes,
    currentStockholmMinutes
} from './timeUtils'

/**
 * Parses an RGB color string and returns an array of its component values.
 * @param {string} color - The RGB color string to parse.
 * @returns {number[] | null} An array of the RGB component values or null if parsing fails.
 */
function parseRgb(color) {

    return color
        .match(/\d+/g)
        ?.map(Number)
}

/**
 * Creates an RGB color string from its component values.
 * @param {number} r - The red component value.
 * @param {number} g - The green component value.
 * @param {number} b - The blue component value.
 * @returns {string} The RGB color string.
 */
function rgbString(r, g, b) {

    return `rgb(${r}, ${g}, ${b})`
}

/**
 * Mixes two RGB colors together.
 * @param {string} color1 - The first RGB color string.
 * @param {string} color2 - The second RGB color string.
 * @param {number} amount - The amount of the second color to mix in (0 to 1).
 * @returns {string} The mixed RGB color string.
 */
function mixColors(
    color1,
    color2,
    amount = 0.5
) {

    const rgb1 =
        parseRgb(color1)

    const rgb2 =
        parseRgb(color2)

    if (!rgb1 || !rgb2) {

        return color1
    }

    const mixed =
        rgb1.map((value, index) =>

            Math.round(
                value +
                (
                    (rgb2[index] - value)
                    * amount
                )
            )
        )

    return rgbString(...mixed)
}

/**
 * Calculates the average RGB color of a segment of data.
 * @param {Array} segmentData - The data for the segment.
 * @returns {string} The average RGB color string.
 */
function averageColor(segmentData) {

    const totals =
        segmentData.reduce(

            (acc, item) => ({

                r: acc.r + (item.r ?? 0),
                g: acc.g + (item.g ?? 0),
                b: acc.b + (item.b ?? 0)
            }),

            {
                r: 0,
                g: 0,
                b: 0
            }
        )

    const count =
        segmentData.length

    return rgbString(

        Math.round(totals.r / count),
        Math.round(totals.g / count),
        Math.round(totals.b / count)
    )
}

/**
 * Creates a smooth gradient by interpolating between color stops.
 * @param {string[]} stops - An array of RGB color strings.
 * @returns {string[]} An array of interpolated RGB color strings.
 */
function smoothGradient(stops) {

    const smoothStops = []

    for (
        let i = 0;
        i < stops.length - 1;
        i++
    ) {

        const current =
            stops[i]

        const next =
            stops[i + 1]

        smoothStops.push(
            current,

            mixColors(current, next, 0.25),

            mixColors(current, next, 0.5),

            mixColors(current, next, 0.75)
        )
    }

    smoothStops.push(
        stops[stops.length - 1]
    )

    return smoothStops
}

/**
 * Creates a gradient by generating color stops based on the provided data.
 * @param {Array} data - The data to use for generating the gradient.
 * @param {number} segments - The number of segments to divide the gradient into.
 * @param {boolean} isToday - Whether to consider only today's data.
 * @returns {string[]} An array of RGB color strings representing the gradient.
 */
export function gradientStops(
    data,
    segments = 14,
    isToday = false
) {

    if (!data?.length) {

        return []
    }

    const minutesList =
        data.map(item =>

            stockholmMinutes(
                item.timestamp
            )
        )

    const minMinutes =
        Math.min(...minutesList)

    const maxMinutes =
        isToday
            ? currentStockholmMinutes()
            : Math.max(...minutesList)

    const minutesPerSegment =
        (maxMinutes - minMinutes)
        / segments

    const stops = []

    for (
        let i = 0;
        i < segments;
        i++
    ) {

        const segmentStart =
            minMinutes +
            (i * minutesPerSegment)

        const segmentEnd =
            segmentStart +
            minutesPerSegment

        const segmentData =
            data.filter(item => {

                const minutes =
                    stockholmMinutes(
                        item.timestamp
                    )

                return (
                    minutes >= segmentStart &&
                    minutes < segmentEnd
                )
            })

        if (!segmentData.length) {

            const previous =
                stops[stops.length - 1]

            if (previous) {

                stops.push(previous)
            }

            continue
        }

        const color =
            averageColor(segmentData)

        stops.push(
            softenColor(color)
        )
    }

    return smoothGradient(stops)
}