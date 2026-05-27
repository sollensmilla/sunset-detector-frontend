import { softenColor }
    from './colorUtils'

export function gradientStops(
    data,
    segments = 14
) {

    if (!data?.length) {

        return []
    }

    const stops = []

    const minutesPerSegment =
        1440 / segments

    for (
        let i = 0;
        i < segments;
        i++
    ) {

        const targetMinute =
            i * minutesPerSegment

        let closest = null
        let smallestDiff = Infinity

        data.forEach(item => {

            const date =
                new Date(item.timestamp)

            const stockholm =
                new Date(
                    date.toLocaleString(
                        'en-US',
                        {
                            timeZone:
                                'Europe/Stockholm'
                        }
                    )
                )

            const minutes =
                stockholm.getHours() * 60 +
                stockholm.getMinutes()

            const diff =
                Math.abs(
                    minutes - targetMinute
                )

            if (diff < smallestDiff) {

                smallestDiff = diff
                closest = item
            }
        })

        if (closest) {

            const color =
                closest.skyColor
                ?? closest.rgb
                ?? 'rgb(255,255,255)'

            stops.push(
                softenColor(color)
            )
        }
    }

    return stops
}