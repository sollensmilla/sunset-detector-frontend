export default function CurrentColor({
    latest
}) {

    return (

        <section
            className="current-card"
            style={{
                background:
                    latest.skyColor
            }}
        >

            <div className="overlay" />

            <div className="content">

                <h2>
                    Current Sky
                </h2>

                <div className="stats">

                    <div>

                        <span>
                            Lux
                        </span>

                        <strong>
                            {latest.lux}
                        </strong>

                    </div>

                    <div>

                        <span>
                            CCT
                        </span>

                        <strong>
                            {latest.cct ?? '—'}
                        </strong>

                    </div>

                    <div>

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