import {
    formatSwedishTime
}
from '../utils/timeUtils'

import {
    gradientStops
}
from '../utils/gradientStops'

export default function GradientTimeline({
    data
}) {

    const colors =
        gradientStops(
            data,
            14
        )

    const gradient =
        colors.join(', ')

    const first =
        data[0]

    const middle =
        data[
            Math.floor(
                data.length / 2
            )
        ]

    const last =
        data[
            data.length - 1
        ]

    return (

        <section className="timeline-card">

            <div className="timeline-header">

                <div>

                    <p className="card-label">
                        Timeline
                    </p>

                    <h2>
                        Today's Sky
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
                    {
                        formatSwedishTime(
                            first.timestamp
                        )
                    }
                </span>

                <span>
                    {
                        formatSwedishTime(
                            middle.timestamp
                        )
                    }
                </span>

                <span>
                    {
                        formatSwedishTime(
                            last.timestamp
                        )
                    }
                </span>

            </div>

        </section>
    )
}