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

export default function HistoricalChart({
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
                label: 'Lux',

                yAxisID: 'y',

                data: data.map(
                    entry => entry.lux
                ),

                borderColor:
                    'rgba(255, 206, 86, 1)',

                backgroundColor:
                    'rgba(255, 206, 86, 0.15)',

                borderWidth: 3,

                tension: 0.35,

                pointRadius: 0
            },

            {
                label: 'CCT',

                yAxisID: 'y1',

data: data.map(
    entry => entry.cct 
),

                borderColor:
                    'rgba(120, 170, 255, 1)',

                backgroundColor:
                    'rgba(120, 170, 255, 0.15)',

                borderWidth: 3,

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

        x: {

            ticks: {

                maxTicksLimit: 6,

                autoSkip: true
            }
        },

        y: {

            type: 'linear',

            position: 'left',

            beginAtZero: true
        },

        y1: {

            type: 'linear',

            position: 'right',

            min: 1500,

            max: 10000,

            grid: {

                drawOnChartArea: false
            }
        }
    }
}

    return (

        <section className="chart-card">

            <h2>
                Historical Sensor Data
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