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

    const labels =
        data.map(entry =>
            formatSwedishTime(
                entry.timestamp
            )
        )

    const chartData = {

        labels,

        datasets: [

            {
                label: 'Red',

                data: data.map(
                    entry => entry.r
                ),

                borderColor:
                    'rgba(255, 99, 132, 1)',

                backgroundColor:
                    'rgba(255, 99, 132, 0.15)',

                borderWidth: 2,

                tension: 0.35,

                pointRadius: 0
            },

            {
                label: 'Green',

                data: data.map(
                    entry => entry.g
                ),

                borderColor:
                    'rgba(75, 192, 92, 1)',

                backgroundColor:
                    'rgba(75, 192, 92, 0.15)',

                borderWidth: 2,

                tension: 0.35,

                pointRadius: 0
            },

            {
                label: 'Blue',

                data: data.map(
                    entry => entry.b
                ),

                borderColor:
                    'rgba(54, 162, 235, 1)',

                backgroundColor:
                    'rgba(54, 162, 235, 0.15)',

                borderWidth: 2,

                tension: 0.35,

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
            }
        },

        scales: {

            y: {

                min: 0,

                max: 255
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