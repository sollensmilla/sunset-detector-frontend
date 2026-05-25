import { useSensorData }
    from '../hooks/useSensorData'

import CurrentColor
    from '../components/CurrentColor'

import GradientTimeline
    from '../components/GradientTimeline'

import HistoricalChart
    from '../components/HistoricalChart'

import { groupByDay }
    from '../utils/groupByDay'

import '../styles/dashboard.css'

export default function Dashboard() {

    const {
        data: timelineData,
        loading
    } = useSensorData(48)

    const {
        data: chartData,
        loading: chartLoading
    } = useSensorData(12)
    
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

    const dates =
        Object.keys(grouped)
            .sort()

    const today =
        grouped[
            dates[
                dates.length - 1
            ]
        ]

    const yesterday =
        grouped[
            dates[
                dates.length - 2
            ]
        ]

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
                today && (

                    <GradientTimeline
                        title="Today's Sky"
                        data={today}
                        isToday={true}
                    />
                )
            }

            {
                yesterday && (

                    <GradientTimeline
                        title="Yesterday's Sky"
                        data={yesterday}
                    />
                )
            }
    
    <HistoricalChart
        data={chartData}
    />
        </main>
    )
}