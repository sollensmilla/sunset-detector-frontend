export default function CurrentColor({
    latest
}) {

    return (

        <section
            className="current-card"
        >

<div
    className="current-background"
    style={{
        background:
            latest.skyColor,

        transition:
            'background 1.8s ease-in-out'
    }}
/>

            <div className="glass-overlay" />

            <div className="current-content">

                <div>

                    <p className="card-label">
                        Current Color
                    </p>

                    <h2>
                        {
                            latest.isSunset
                                ? 'Sunset tones'
                                : 'Daylight tones'
                        }
                    </h2>

                </div>

                <div className="stats-grid">

                    <div className="stat">

                        <span>
                            Lux
                        </span>

                        <strong>
                            {
                                Math.round(
                                    latest.lux
                                )
                            }
                        </strong>

                    </div>

                    <div className="stat">

                        <span>
                            CCT
                        </span>

                        <strong>
                            {
                                latest.cct
                                ?? '—'
                            }
                        </strong>

                    </div>

                    <div className="stat">

                        <span>
                            Sunset
                        </span>

                        <strong>
                            {
                                latest.isSunset
                                    ? 'Yes'
                                    : 'No'
                            }
                        </strong>

                    </div>

                </div>

            </div>

        </section>
    )
}