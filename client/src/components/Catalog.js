import React from 'react'
import Artists from './Artists'
import Albums from './Albums'

const Catalog = () => {

    document.body.style.backgroundColor = '#121212'

    return (
        <div style={{ display: 'absolute' }}>
            <div>
                <h1 style={{ color: 'white' }}>Artists</h1>
                <Artists />
            </div>
            <div>
                <h1 style={{ color: 'white' }} >Albums</h1>
                <Albums />
            </div>
        </div>
    )
}

export default Catalog
