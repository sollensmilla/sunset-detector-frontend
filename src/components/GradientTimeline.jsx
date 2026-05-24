import { softenColor }
    from '../utils/colorUtils'

import {
    formatSwedishTime
}
from '../utils/timeUtils'

export default function GradientTimeline({
    data
}) {

    const sampled =
        data.filter(
            (_, index) =>
                index % 4 === 0
        )

    const gradient =
        sampled
            .map(item =>
                softenColor(
                    item.skyColor
                )
            )
            .join(', ')

    const first =
        sampled[0]

    const middle =
        sampled[
            Math.floor(
                sampled.length / 2
            )
        ]

    const last =
        sampled[
            sampled.length - 1
        ]

    return (

        <section
            className="timeline-card"
        >

            <h2>
                Today's Sky
            </h2>

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