import {
    softenColor
} from './colorUtils'

import {
    stockholmMinutes,
    currentStockholmMinutes
} from './timeUtils'

export function gradientStops(
    data,
    segments = 14,
    isToday = false
) {

    if (!data?.length) {

        return []
    }

    const stops = []

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

            const previousColor =
                stops[stops.length - 1]

            if (previousColor) {

                stops.push(previousColor)
            }

            continue
        }

        const average =
            segmentData.reduce(

                (acc, item) => {

                    acc.r += item.r ?? 0
                    acc.g += item.g ?? 0
                    acc.b += item.b ?? 0

                    return acc
                },

                {
                    r: 0,
                    g: 0,
                    b: 0
                }
            )

        const count =
            segmentData.length

        const r =
            Math.round(
                average.r / count
            )

        const g =
            Math.round(
                average.g / count
            )

        const b =
            Math.round(
                average.b / count
            )

        const color =
            `rgb(${r}, ${g}, ${b})`

        stops.push(
            softenColor(color)
        )
    }

    return stops
}