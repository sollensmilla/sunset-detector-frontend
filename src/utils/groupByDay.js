export function groupByDay(data) {

    const groups = {}

    data.forEach(item => {

        const swedishDate =
            new Date(item.timestamp)
                .toLocaleDateString(
                    'sv-SE',
                    {
                        timeZone:
                            'Europe/Stockholm'
                    }
                )

        if (!groups[swedishDate]) {

            groups[swedishDate] = []
        }

        groups[swedishDate].push(item)
    })

    return groups
}