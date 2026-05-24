export function formatSwedishTime(
    timestamp
) {

    return new Date(timestamp)
        .toLocaleTimeString(
            'sv-SE',
            {
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
            'sv-SE'
        )
}