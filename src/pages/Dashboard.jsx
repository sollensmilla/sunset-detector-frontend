import {
    useMemo
} from 'react'

import {
    useSensorData
} from '../hooks/useSensorData'

import CurrentColor
    from '../components/CurrentColor'

import GradientTimeline
    from '../components/GradientTimeline'

import HistoricalChart
    from '../components/HistoricalChart'

import RGBChart
    from '../components/RGBChart'

import LedControls
    from '../components/LedControls'

import {
    stockholmDate
} from '../utils/timeUtils'

import '../styles/dashboard.css'

export default function Dashboard() {

    const {
        data,
        loading,
        toggleLed
    } = useSensorData(48)

    const timelineData = data

    const chartData =
        data.slice(-720)

    const stockholmToday =
        stockholmDate(
            new Date()
        )

    const stockholmYesterday =
        useMemo(() => {

            const yesterday =
                new Date()

            yesterday.setDate(
                yesterday.getDate() - 1
            )

            return stockholmDate(
                yesterday
            )

        }, [])

    const today =
        timelineData.filter(item =>
            stockholmDate(
                item.timestamp
            ) === stockholmToday
        )

    const yesterday =
        useMemo(() => {

            return timelineData.filter(
                item =>
                    stockholmDate(
                        item.timestamp
                    ) === stockholmYesterday
            )

        }, [
            timelineData,
            stockholmYesterday
        ])

    const latest =
        timelineData[
            timelineData.length - 1
        ]

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
                        title="Todays Sky"
                        data={today}
                        isToday
                    />
                )
            }

            {
                yesterday.length > 0 && (
                    <GradientTimeline
                        title="Yesterdays Sky"
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

            <LedControls
                toggleLed={toggleLed}
            />

        </main>
    )
}