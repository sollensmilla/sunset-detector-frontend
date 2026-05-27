export function formatSwedishTime(
    timestamp
) {

    return new Date(timestamp)
        .toLocaleTimeString(
            'sv-SE',
            {
                timeZone:
                    'Europe/Stockholm',

                hour: '2-digit',

                minute: '2-digit'
            }
        )
}

export function formatSwedishDate(
    timestamp
) {

    return new Date(timestamp)
        .toLocaleDateString(
            'sv-SE',
            {
                timeZone:
                    'Europe/Stockholm'
            }
        )
}

export function stockholmMinutes(
    timestamp
) {

    const formatter =
        new Intl.DateTimeFormat(
            'sv-SE',
            {
                timeZone:
                    'Europe/Stockholm',

                hour: '2-digit',

                minute: '2-digit',

                hour12: false
            }
        )

    const parts =
        formatter.formatToParts(
            new Date(timestamp)
        )

    const hour =
        Number(
            parts.find(
                part =>
                    part.type === 'hour'
            )?.value ?? 0
        )

    const minute =
        Number(
            parts.find(
                part =>
                    part.type === 'minute'
            )?.value ?? 0
        )

    return (
        hour * 60 + minute
    )
}

export function currentStockholmMinutes() {

    return stockholmMinutes(
        new Date().toISOString()
    )
}

export function stockholmDate(
    timestamp
) {

    return new Date(timestamp)
        .toLocaleDateString(
            'sv-SE',
            {
                timeZone:
                    'Europe/Stockholm'
            }
        )
}