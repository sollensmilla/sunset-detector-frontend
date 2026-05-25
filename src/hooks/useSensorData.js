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

                setData(initialData)

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
                    'lnu/iot/ss226uk/sensor'
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

                    const realtimeEntry = {

                        timestamp:
                            new Date(),

                        lux:
                            parsed.lux,

                        cct:
                            parsed.cct,

                        rgb:
                            parsed.rgb
                                ? `rgb(
            ${parsed.rgb.r},
            ${parsed.rgb.g},
            ${parsed.rgb.b}
          )`
                                : 'rgb(255,255,255)'
                    }

                    setData(prev => [

                        ...prev,
                        realtimeEntry
                    ])

                } catch (error) {

                    console.error(error)
                }
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