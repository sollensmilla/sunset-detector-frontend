import {
    useMemo,
    useRef
} from 'react'

import { gradientStops }
    from '../utils/gradientStops'

export default function GradientTimeline({
    data,
    title,
    isToday = false
}) {

    const initialGradient =
        useRef(null)

    const colors = useMemo(

        () => gradientStops(
            data,
            14
        ),

        isToday
            ? [data]
            : []
    )

    const gradient =
        colors.length

            ? colors.join(', ')

            : `
                rgb(255,255,255),
                rgb(240,240,240)
              `

    if (
        !isToday &&
        !initialGradient.current
    ) {

        initialGradient.current =
            gradient
    }

    const finalGradient =

        isToday

            ? gradient

            : initialGradient.current

    const currentTime = useMemo(

        () => new Date()
            .toLocaleTimeString(
                'sv-SE',
                {
                    timeZone:
                        'Europe/Stockholm',

                    hour: '2-digit',

                    minute: '2-digit'
                }
            ),

        []
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

            <div
                className="gradient-wrapper"
            >

                <div
                    className="gradient-bar"

                    style={{

                        background:
                            `linear-gradient(
                                to right,
                                ${finalGradient}
                            )`,

                        transition:
                            isToday
                                ? 'background 2s ease-in-out'
                                : 'none',

                        willChange:
                            'background'
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