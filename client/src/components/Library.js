import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Library = () => {
  const { auth } = useContext(UserContext)
  const [ artists, setArtists ] = useState([])

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch(`${apiUrl}/artist`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token') || auth}`}
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

  const containerStyles = {
    display: 'flex',
    padding: '100px',
  }

  const cardStyles = {
    display: 'grid',
    margin: '0 50px',
    padding: '25px',
    borderRadius: '10px',
    backgroundColor: 'hsla(0,0%,100%,.3)',

  }

  return (
    <>
      {!artists
        ? <div>No Artists</div>
        : <div style={containerStyles}>
            {artists.map(artist => (
              <div key={artist.id} style={cardStyles}>
                <img
                  style={{ borderRadius: '50%' }}
                  src='https://i.scdn.co/image/1a14aedebeca3d8624ee83bd714b486d0b243064'
                />
                <div>{artist.name}</div>
                <div>{artist.bio}</div>
              </div>
            ))}
          </div>
      }
    </>
  )
}

export default Library
