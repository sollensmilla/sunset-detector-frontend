import { useEffect, useState } from 'react'

export function useSensorData() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        fetch(
            'https://sky-api-production-9cec.up.railway.app/api/data'
        )
            .then(res => res.json())
            .then(data => {

                setData(data)
                setLoading(false)
            })

    }, [])

    return {
        data,
        loading
    }
}