import {
    useEffect,
    useRef,
    useState
} from 'react'

import mqtt from 'mqtt'

const API_URL =
    'https://sky-api-production-9cec.up.railway.app/api/data'

const MAX_ENTRIES = 1000

/**
 * Creates a sky color string from RGB values.
 * @param {Object} rgb - The RGB values.
 * @returns {string} The sky color string.
 */
function createSkyColor(rgb) {

    if (!rgb) {

        return 'rgb(255,255,255)'
    }

    return `rgb(${rgb.r ?? 0}, ${rgb.g ?? 0}, ${rgb.b ?? 0})`
}

/**
 * Normalizes sensor data by ensuring all required fields are present.
 * @param {Object} item - The sensor data item.
 * @returns {Object} The normalized sensor data item.
 */
function normalizeSensorData(item) {

    const rgbValues = item.rgb ?? {
        r: item.r ?? 0,
        g: item.g ?? 0,
        b: item.b ?? 0
    }

    const skyColor =
        item.skyColor ??
        createSkyColor(rgbValues)

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
            rgbValues.r,

        g:
            rgbValues.g,

        b:
            rgbValues.b,

        rgb: rgbValues,

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

    const clientRef =
        useRef(null)

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

        const mqttClient = mqtt.connect(

            import.meta.env.VITE_MQTT_WS_URL,

            {
                username:
                    import.meta.env.VITE_MQTT_USER,

                password:
                    import.meta.env.VITE_MQTT_PASSWORD
            }
        )

        clientRef.current =
            mqttClient

        mqttClient.on(
            'connect',
            () => {

                console.log(
                    'MQTT connected'
                )

                mqttClient.subscribe(

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

        mqttClient.on(
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

        mqttClient.on(
            'error',
            error => {

                console.error(
                    'MQTT error:',
                    error
                )
            }
        )

        return () => {

            mqttClient.end()
        }

    }, [hours])

    const toggleLed = state => {

        if (!clientRef.current) {

            return
        }

        clientRef.current.publish(

            'lnu/iot/ss226uk/command/led',

            JSON.stringify({
                state
            })
        )
    }

    return {

        data,
        loading,
        toggleLed
    }
}