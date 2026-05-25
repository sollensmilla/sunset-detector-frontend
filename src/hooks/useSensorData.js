import {
    useEffect,
    useState
} from 'react'

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
            .then(data => {

                setData(data)

                setLoading(false)
            })

    }, [hours])

    return {
        data,
        loading
    }
}