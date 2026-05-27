import {
    useEffect,
    useState
} from 'react'

import mqtt from 'mqtt'

const API_URL =
    'https://sky-api-production-9cec.up.railway.app/api/data'

const MAX_ENTRIES = 5000

/**
 * Creates a sky color string from RGB values.
 * @param {Object} rgb - The RGB values.
 * @returns {string} The sky color string.
 */
function createSkyColor(rgb) {

    if (!rgb) {

        return 'rgb(255,255,255)'
    }

    return `rgb(
        ${rgb.r ?? 0},
        ${rgb.g ?? 0},
        ${rgb.b ?? 0}
    )`
}

/**
 * Normalizes sensor data by ensuring all required fields are present.
 * @param {Object} item - The sensor data item.
 * @returns {Object} The normalized sensor data item.
 */
function normalizeSensorData(item) {

    const skyColor =
        item.skyColor
        ?? item.rgb
        ?? createSkyColor(item.rgb)

    return {

        ...item,

        timestamp:
            item.timestamp
            ?? new Date().toISOString(),

        lux:
            item.lux ?? 0,

        cct:
            item.cct ?? 0,

        r:
            item.rgb?.r ?? 0,

        g:
            item.rgb?.g ?? 0,

        b:
            item.rgb?.b ?? 0,

        rgb: skyColor,

        skyColor,

        isSunset:
            item.isSunset
            ?? (item.cct ?? 0) < 4000
    }
}

/**
 * Fetches sensor data for the specified number of hours.
 * @param {number} hours - The number of hours to fetch data for.
 * @returns {Promise<Array>} A promise resolving to the fetched sensor data.
 */
async function fetchSensorData(hours) {

    const response =
        await fetch(
            `${API_URL}?hours=${hours}`
        )

    const json =
        await response.json()

    return json.map(
        normalizeSensorData
    )
}

/**
 * 
 * @param {number} hours - The number of hours to fetch data for.
 * @returns {Object} The sensor data and loading state.
 */
export function useSensorData(
    hours = 48
) {

    const [data, setData] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    useEffect(() => {

        async function loadData() {

            try {

                const initialData =
                    await fetchSensorData(hours)

                setData(initialData)

            } catch (error) {

                console.error(
                    'Fetch error:',
                    error
                )

            } finally {

                setLoading(false)
            }
        }

        loadData()

        const client = mqtt.connect(

            import.meta.env.VITE_MQTT_WS_URL,

            {
                username:
                    import.meta.env.VITE_MQTT_USER,

                password:
                    import.meta.env.VITE_MQTT_PASSWORD
            }
        )

        client.on(
            'connect',
            () => {

                console.log(
                    'MQTT connected'
                )

                client.subscribe(

                    import.meta.env.VITE_MQTT_TOPIC,

                    error => {

                        if (error) {

                            console.error(
                                'Subscribe error:',
                                error
                            )
                        }
                    }
                )
            }
        )

        client.on(
            'message',
            (_, message) => {

                try {

                    const parsed =
                        JSON.parse(
                            message.toString()
                        )

                    const realtimeEntry =
                        normalizeSensorData(parsed)

                    setData(prev => [

                        ...prev,
                        realtimeEntry

                    ].slice(-MAX_ENTRIES))

                } catch (error) {

                    console.error(
                        'MQTT parse error:',
                        error
                    )
                }
            }
        )

        client.on(
            'error',
            error => {

                console.error(
                    'MQTT error:',
                    error
                )
            }
        )

        return () => {

            client.end()
        }

    }, [hours])

    return {

        data,
        loading
    }
}