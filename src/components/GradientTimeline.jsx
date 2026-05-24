export default function GradientTimeline({
    data
}) {

    const gradient =
        data
            .map(item => item.skyColor)
            .join(',')

    return (

        <div>

            <h2>
                Today's Colors
            </h2>

            <div
                style={{
                    height: '100px',
                    borderRadius: '1rem',
                    background:
                        `linear-gradient(to right, ${gradient})`
                }}
            />

        </div>
    )
}