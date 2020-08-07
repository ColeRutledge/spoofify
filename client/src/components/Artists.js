import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

const Artists = () => {
    const { auth } = useContext(UserContext)
    const [artists, setArtists] = useState([])
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await fetch(`${apiUrl}/artist`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
                })

                if (res.ok) {
                    const data = await res.json()
                    console.log(data.artists)
                    setArtists([...data.artists])
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchArtists()
    }, [auth])

    const cardContainerStyle = {
        padding: '125px 0 50px 50px',
        display: 'grid',
        gridGap: '16px',
        gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
    }

    const cardStyles = {
        display: 'grid',
        margin: '0 8px',
        padding: '25px 18px',
        borderRadius: '10px',
        backgroundColor: '#282828',
        justifyItems: 'center',
        boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
    }

    return (
        <>
            <div style={cardContainerStyle}>
                {artists.map(artist => (
                    <div key={artist.id} style={cardStyles}>
                        <img
                            style={{
                                alignContent: 'end',
                                borderRadius: '50%',
                                marginBottom: '20px',
                                boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)'
                            }}
                            src={artist.image_url}
                            height='160px'
                            width='160px'
                            alt='artist.jpg'
                            draggable='false'
                        />
                        <div style={{ justifySelf: 'start', marginLeft: '10px' }}>
                            <div style={{
                                marginBottom: '7px',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '16px',
                                lineHeight: '24px'
                            }}>{artist.name}</div>
                            <div style={{
                                color: '#b3b3b3',
                                fontSize: '11px',
                                lineHeight: '16px'
                            }}>Artist</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Artists;
