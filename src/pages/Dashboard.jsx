import { useSensorData } from '../hooks/useSensorData'

import CurrentColor from '../components/CurrentColor'

import GradientTimeline from '../components/GradientTimeline'

export default function Dashboard() {

    const {
        data,
        loading
    } = useSensorData()

    if (loading) {

        return <p>Loading sky colors...</p>
    }

    if (!data.length) {

        return <p>No sky data available</p>
    }

    const latest =
        data[data.length - 1]

    return (

        <div>

            <h1>
                Sunset Dashboard
            </h1>

            <CurrentColor
                latest={latest}
            />

            <GradientTimeline
                data={data}
            />  

        </div>
    )
}