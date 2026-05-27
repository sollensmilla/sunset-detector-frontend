/**
 * Formats a timestamp as a Swedish time string.
 * @param {string} timestamp - The timestamp to format.
 * @returns {string} The formatted time string.
 */
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

/**
 * Formats a timestamp as a Swedish date string.
 * @param {string} timestamp - The timestamp to format.
 * @returns {string} The formatted date string.
 */
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

/**
 * Calculates the number of minutes since midnight in Stockholm time.
 * @param {string} timestamp - The timestamp to calculate minutes for.
 * @returns {number} The number of minutes since midnight.
 */
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

/**
 * Gets the current number of minutes since midnight in Stockholm time.
 * @returns {number} The number of minutes since midnight.
 */
export function currentStockholmMinutes() {

    return stockholmMinutes(
        new Date().toISOString()
    )
}

/**
 * Gets the date for a timestamp in Stockholm time.
 * @param {string} timestamp - The timestamp to get the date for.
 * @returns {string} The date string.
 */
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