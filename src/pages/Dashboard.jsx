import { useEffect, useState } from 'react'

export default function Dashboard() {

    const [data, setData] = useState([])

    const [loading, setLoading] =
        useState(true)

    useEffect(() => {

        fetch(
            'https://sky-api-production-9cec.up.railway.app/api/data/'
        )
            .then(res => res.json())
            .then(data => {

                setData(data)

                setLoading(false)
            })

    }, [])

    if (loading) {

        return <p>Loading...</p>
    }

    return (

        <div>

            <h1>
                Sunset Dashboard
            </h1>

            <pre>
                {
                    JSON.stringify(
                        data[0],
                        null,
                        2
                    )
                }
            </pre>

        </div>
    )
}