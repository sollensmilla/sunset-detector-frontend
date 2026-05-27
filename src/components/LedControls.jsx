export default function LedControls({
    toggleLed
}) {

    return (

        <section className="led-controls">

            <div className="led-header">

                <p className="card-label">
                    Device Control
                </p>

                <h2>
                    LED Controller
                </h2>

            </div>

            <div className="led-buttons">

                <button
                    className="led-button on"
                    onClick={() =>
                        toggleLed(true)
                    }
                >
                    Turn On
                </button>

                <button
                    className="led-button off"
                    onClick={() =>
                        toggleLed(false)
                    }
                >
                    Turn Off
                </button>

            </div>

        </section>
    )
}