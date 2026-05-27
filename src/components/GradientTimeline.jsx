import {
    useMemo
} from 'react'

import {
    gradientStops
} from '../utils/gradientStops'

import {
    stockholmDate
} from '../utils/timeUtils'

export default function GradientTimeline({
    data,
    title,
    isToday = false
}) {

    const filteredData = useMemo(() => {

        if (!isToday) {

            return data
        }

        const today =
            stockholmDate(
                new Date().toISOString()
            )

        return data.filter(
            item =>

                stockholmDate(
                    item.timestamp
                ) === today
        )

    }, [data, isToday])

    const colors = useMemo(

        () => gradientStops(

            filteredData,

            isToday
                ? 60
                : 40,

            isToday
        ),

        [filteredData, isToday]
    )

    const gradient =
        colors.length

            ? colors.join(', ')

            : `
                rgb(255,255,255),
                rgb(240,240,240)
              `

    const currentTime =
        new Date()
            .toLocaleTimeString(
                'sv-SE',
                {
                    timeZone:
                        'Europe/Stockholm',

                    hour: '2-digit',

                    minute: '2-digit'
                }
            )

    const labels = {

        start: '00:00',

        middle: '12:00',

        end:
            isToday
                ? currentTime
                : '23:59'
    }

    return (

        <section className="timeline-card">

            <div className="timeline-header">

                <div>

                    <p className="card-label">
                        Timeline
                    </p>

                    <h2>
                        {title}
                    </h2>

                </div>

            </div>

            <div className="gradient-wrapper">

                <div
                    className="gradient-bar"

                    style={{

                        background:
                            `linear-gradient(
                                to right,
                                ${gradient}
                            )`,

                        transition:
                            'background 2s ease-in-out'
                    }}
                />

            </div>

            <div className="timeline-labels">

                <span>
                    {labels.start}
                </span>

                <span>
                    {labels.middle}
                </span>

                <span>
                    {labels.end}
                </span>

            </div>

        </section>
    )
}