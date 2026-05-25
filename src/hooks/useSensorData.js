import {
    useEffect,
    useState
} from 'react'

import mqtt from 'mqtt'

export function useSensorData(
    hours = 48
) {

    const [data, setData] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    useEffect(() => {

        fetch(
            `https://sky-api-production-9cec.up.railway.app/api/data?hours=${hours}`
        )
            .then(res => res.json())

            .then(initialData => {

                const normalized =
                    initialData.map(item => {

                        const skyColor =

                            item.skyColor

                            ?? item.rgb

                            ?? (

                                item.rgb?.r !== undefined

                                    ? `rgb(
                                        ${item.rgb.r},
                                        ${item.rgb.g},
                                        ${item.rgb.b}
                                      )`

                                    : 'rgb(255,255,255)'
                            )

                        return {

                            ...item,

                            skyColor,

                            rgb:
                                skyColor,

                            isSunset:
                                item.isSunset
                                ?? (
                                    item.cct ?? 0
                                ) < 4000
                        }
                    })

                setData(normalized)

                setLoading(false)
            })

            .catch(error => {

                console.error(
                    'Fetch error:',
                    error
                )

                setLoading(false)
            })

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

                    err => {

                        if (err) {

                            console.error(
                                'Subscribe error:',
                                err
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

                    console.log(
                        'MQTT message:',
                        parsed
                    )

                    const skyColor =
                        parsed.rgb

                            ? `rgb(
                                ${parsed.rgb.r},
                                ${parsed.rgb.g},
                                ${parsed.rgb.b}
                              )`

                            : 'rgb(255,255,255)'

                    const realtimeEntry = {

                        timestamp:
                            parsed.timestamp
                                ? new Date(parsed.timestamp.replace(' ', 'T')).toISOString()
                                : new Date().toISOString(),

                        lux:
                            parsed.lux ?? 0,

                        cct:
                            parsed.cct ?? 0,

                        rgb:
                            skyColor,

                        skyColor,

                        isSunset:
                            (parsed.cct ?? 0) < 4000
                    }

                    setData(prev => [

                        ...prev.slice(-500),

                        realtimeEntry
                    ])

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