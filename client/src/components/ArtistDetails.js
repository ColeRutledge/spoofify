import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const ArtistDetails = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ artist, setArtist ] = useState({})
  const [ albums, setAlbums ] = useState([])
  const [ songs, setSongs ] = useState([])
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistJson = await fetch(`${apiUrl}/api/artist/${id}`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token') || auth}`}
        })

        const albumsJson = await fetch(`${apiUrl}/api/artist/${id}/albums`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token') || auth}`}
        })

        const songsJson = await fetch(`${apiUrl}/api/artist/${id}/songs`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token') || auth}`}
        })



        if (artistJson.ok && albumsJson.ok && songsJson.ok) {
          const artist_data = await artistJson.json()
          const albums_data = await albumsJson.json()
          const songs_data = await songsJson.json()
          console.log(artist_data)
          console.log(albums_data.artist.albums)
          console.log(songs_data)
          setArtist({...artist_data})
          setAlbums([...albums_data.artist.albums])
          setSongs([...songs_data.Data])
        } else throw artistJson

      } catch (err) {
        if (err.status === 401) {
          localStorage.removeItem('token')
          setAuth('')
          history.push('/login')
        }
        console.dir(err)
        console.error(err)
      }
    }
    // https://i.scdn.co/image/d6aadd3f346ef8ceec2e0df25352498e4d53784e

    fetchArtist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const headerStyles = {
    padding: '125px 0 20px 53px',
    margin: '0 10px',
    fontSize: '24px',
    lineHeight: '28px',
    color: 'hsla(0,0%,100%,1)',
  }

  const cardContainerStyle = {
    padding: '50px 0 50px 50px',
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
  }

  const detailContainerStyle = {
    display: 'grid',
    gridTemplateAreas: `
    'img name'
    'bio bio'
    `,
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '2fr 1fr'
  }


  return (
    <>
      <div className='artistInfoContainer' style={detailContainerStyle}>
        <div style={{...headerStyles, gridArea: 'name', fontSize: '36px'}}>{artist.name}</div>
        <img height='480x' width='480px' style={{ gridArea: 'img', margin: '125px 0 0 50px' }} src={artist.image_url} />
        <div style={{...headerStyles, gridArea: 'bio', alignSelf: 'start', padding: '50px 0 0 0', fontSize: '20px' }}>{artist.bio}</div>
      </div>
      <>
        <div style={{...headerStyles, padding: '50px 0 20px 53px' }}>Albums</div>
        <div style={cardContainerStyle}>
            {albums.map(album => (
                <div key={album.id}>
                    <div className='image-container'>
                        <img
                            style={{
                                alignContent: 'end',
                                marginBottom: '20px',
                            }}
                            src={album.image_url}
                            height='200px'
                            width='200px'
                            alt='album.jpg'
                            draggable='false'
                        />
                        <div className='after'>
                            <button
                              // onClick={playAlbum}
                              id={album.id}
                              style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}>
                              <PlayCircleOutlineIcon
                                style={{ fontSize: '100px', pointerEvents: 'none' }} />
                            </button>
                        </div>
                    </div>
                    <div style={{ justifySelf: 'start', marginLeft: '10px' }}>
                        <div style={{
                            marginBottom: '7px',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '16px',
                            lineHeight: '24px'
                        }}>{album.title}</div>
                        <div style={{
                            color: '#b3b3b3',
                            fontSize: '11px',
                            lineHeight: '16px'
                        }}>Album</div>
                    </div>
                </div>
            ))}
        </div>
      </>
    </>
  )
}

export default ArtistDetails
