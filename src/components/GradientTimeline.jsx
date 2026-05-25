import { gradientStops }
    from '../utils/gradientStops'

export default function GradientTimeline({
    data,
    title,
    isToday = false
}) {

    const colors =
        gradientStops(
            data,
            14
        )

    const gradient =
        colors.join(', ')

    const now =
        new Date()

    const currentTime =
        now.toLocaleTimeString(
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

            <div
                className="gradient-wrapper"
            >

                <div
                    className="gradient-bar"
                    style={{
                        background:
                            `linear-gradient(
                                to right,
                                ${gradient}
                            )`
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