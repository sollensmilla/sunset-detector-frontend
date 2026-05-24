import { useSensorData }
    from '../hooks/useSensorData'

import CurrentColor
    from '../components/CurrentColor'

import GradientTimeline
    from '../components/GradientTimeline'

import '../styles/dashboard.css'

export default function Dashboard() {

    const {
        data,
        loading
    } = useSensorData()

    if (loading) {

        return (

            <div className="loading">

                <p>
                    Loading sky colors...
                </p>

            </div>
        )
    }

    if (!data.length) {

        return (

            <div className="loading">

                <p>
                    No sky data available
                </p>

            </div>
        )
    }

    const latest =
        data[data.length - 1]

    return (

        <main className="dashboard">

            <div className="background-glow" />

            <header className="hero">

                <p className="eyebrow">
                    Live atmospheric sensing
                </p>

                <h1>
                    Sunset Dashboard
                </h1>

                <p className="subtitle">
                    Real-time light and sky
                    color analysis from
                    an ESP32 sensor.
                </p>

            </header>

            <CurrentColor
                latest={latest}
            />

            <GradientTimeline
                data={data}
            />

        </main>
    )
}