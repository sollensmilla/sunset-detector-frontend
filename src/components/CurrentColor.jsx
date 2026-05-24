export default function CurrentColor({
    latest
}) {

    return (

        <div
            style={{
                background:
                    latest.skyColor,

                padding: '2rem',
                borderRadius: '1rem',
                color: 'white'
            }}
        >

            <h2>
                Current Color
            </h2>

            <p>
                Lux: {latest.lux}
            </p>

            <p>
                CCT: {latest.cct}
            </p>

            <p>
                Sunset:
                {
                    latest.isSunset
                        ? ' Yes'
                        : ' No'
                }
            </p>

        </div>
    )
}