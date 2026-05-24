import { softenColor }
    from './colorUtils'

export function gradientStops(
    data,
    segments = 16
) {

    if (!data.length) {

        return []
    }

    const chunkSize =
        Math.ceil(
            data.length / segments
        )

    const stops = []

    for (
        let i = 0;
        i < data.length;
        i += chunkSize
    ) {

        const chunk =
            data.slice(
                i,
                i + chunkSize
            )

        const middle =
            chunk[
            Math.floor(
                chunk.length / 2
            )
            ]

        if (middle) {

            stops.push(
                softenColor(
                    middle.skyColor
                )
            )
        }
    }

    return stops
}