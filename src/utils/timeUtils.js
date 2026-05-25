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