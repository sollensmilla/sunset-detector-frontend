import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import { Line }
    from 'react-chartjs-2'

import {
    formatSwedishTime
} from '../utils/timeUtils'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default function RGBChart({
    data
}) {

    // Sortera efter timestamp
    const sortedData = [...data].sort(
        (a, b) =>
            new Date(a.timestamp) -
            new Date(b.timestamp)
    )

    // Visa endast senaste 50 mätningarna
    const recentData =
        sortedData.slice(-50)

    const labels =
        recentData.map(entry =>
            formatSwedishTime(
                entry.timestamp
            )
        )

    const chartData = {

        labels,

        datasets: [

            {
                label: 'Red',

                data: recentData.map(
                    entry => entry.r
                ),

                borderColor:
                    'rgba(255, 99, 132, 1)',

                backgroundColor:
                    'rgba(255, 99, 132, 0.05)',

                borderWidth: 1.5,

                tension: 0.1,

                pointRadius: 0
            },

            {
                label: 'Green',

                data: recentData.map(
                    entry => entry.g
                ),

                borderColor:
                    'rgba(75, 192, 92, 1)',

                backgroundColor:
                    'rgba(75, 192, 92, 0.05)',

                borderWidth: 1.5,

                tension: 0.1,

                pointRadius: 0
            },

            {
                label: 'Blue',

                data: recentData.map(
                    entry => entry.b
                ),

                borderColor:
                    'rgba(54, 162, 235, 1)',

                backgroundColor:
                    'rgba(54, 162, 235, 0.05)',

                borderWidth: 1.5,

                tension: 0.1,

                pointRadius: 0
            }
        ]
    }

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        animation: false,

        interaction: {

            intersect: false,

            mode: 'index'
        },

        plugins: {

            legend: {

                position: 'top'
            },

            tooltip: {

                backgroundColor: '#fff',

                titleColor: '#111',

                bodyColor: '#111',

                borderColor: '#ddd',

                borderWidth: 1
            }
        },

        scales: {

            x: {

                ticks: {

                    maxTicksLimit: 10
                },

                grid: {

                    display: false
                }
            },

            y: {

                min: 0,

                max: 255,

                ticks: {

                    stepSize: 50
                }
            }
        }
    }

    return (

        <section className="chart-card">

            <h2>
                RGB Levels
            </h2>

            <div className="chart-wrapper">

                <Line
                    data={chartData}
                    options={options}
                />

            </div>

        </section>
    )
}