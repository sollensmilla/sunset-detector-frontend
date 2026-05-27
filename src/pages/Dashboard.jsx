import { useSensorData }
    from '../hooks/useSensorData'

import CurrentColor
    from '../components/CurrentColor'

import GradientTimeline
    from '../components/GradientTimeline'

import HistoricalChart
    from '../components/HistoricalChart'

import RGBChart
    from '../components/RGBChart'

import { groupByDay }
    from '../utils/groupByDay'

import '../styles/dashboard.css'

export default function Dashboard() {

const {
    data,
    loading
} = useSensorData(48)

const timelineData = data

const chartData =
    data.slice(-720)

    if (loading) {

        return (

            <div className="loading">

                <p>
                    Loading sky colors...
                </p>

            </div>
        )
    }

    if (!timelineData.length) {

        return (

            <div className="loading">

                <p>
                    No sky data available
                </p>

            </div>
        )
    }

    const latest =
        timelineData[timelineData.length - 1]

    const grouped =
        groupByDay(timelineData)

    const todayKey =
        new Date()
            .toLocaleDateString('sv-SE', {
                timeZone: 'Europe/Stockholm'
            })

    const today =
        grouped[todayKey] ?? []

    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)

    const yesterdayKey =
        yesterdayDate.toLocaleDateString('sv-SE', {
            timeZone: 'Europe/Stockholm'
        })

    const yesterday =
        grouped[yesterdayKey] ?? []

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

            {
                today.length > 0 && (

                    <GradientTimeline
                        title="Today's Sky"
                        data={today}
                        isToday={true}
                    />
                )
            }

            {
                yesterday.length > 0 && (

                    <GradientTimeline
                        title="Yesterday's Sky"
                        data={yesterday}
                    />
                )
            }

            <HistoricalChart
                data={chartData}
            />

            <RGBChart
                data={chartData}
            />

        </main>
    )
}