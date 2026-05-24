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

            <div className="center">

                <p>
                    Loading sky colors...
                </p>

            </div>
        )
    }

    if (!data.length) {

        return (

            <div className="center">

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

            <h1 className="title">
                Sunset Dashboard
            </h1>

            <CurrentColor
                latest={latest}
            />

            <GradientTimeline
                data={data}
            />

        </main>
    )
}