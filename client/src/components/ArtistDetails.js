import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'
import UserContext from '../context/UserContext'

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const ArtistDetails = () => {
  const { auth, setAuth, setSongs, setPointer, setIsPlaying } = useContext(UserContext)
  const [ artist, setArtist ] = useState({})
  const [ albums, setAlbums ] = useState([])
  const [ allSongs, setAllSongs ] = useState([])
  const history = useHistory()
  const { id } = useParams()

  const audio = document.getElementById('song')

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
          // console.log(artist_data)
          // console.log(albums_data.artist.albums)
          // console.log(songs_data)
          setArtist({...artist_data})
          setAlbums([...albums_data.artist.albums])
          setAllSongs([...songs_data.Data])
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

    fetchArtist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const playAlbum = async (e) => {
    const albumId = e.target.getAttribute('id')
    try {
        const res = await fetch(`${apiUrl}/api/album/${albumId}/songs`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
        })

        if (res.ok) {
            const data = await res.json();
            const songsData = data.songs
            setSongs(data.songs)
            localStorage.setItem('currentSongPointer', 1);
            setPointer(1)
            localStorage.setItem('currentTime', 0)
            audio.setAttribute('src', songsData[localStorage.getItem('currentSongPointer') - 1].song_url)
            audio.play()
            setIsPlaying(true)

        }
    } catch (err) {
        console.error(err)
    }
}


  const playSong = async (e) => {
    e.preventDefault()
    const songId = e.target.getAttribute('id')
    try {
      const res = await fetch(`${apiUrl}/api/album/song/${songId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
      })

      if (res.ok) {
        const data = await res.json();
        // console.log(data)
        localStorage.setItem('currentSongPointer', 1);
        setPointer(1)
        setSongs(data)
        localStorage.setItem('currentTime', 0)
        audio.setAttribute('src', data[localStorage.getItem('currentSongPointer') - 1].song_url)
        audio.play()
        setIsPlaying(true)

      }
    } catch (err) {
      console.error(err)
    }
  }

const cardStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr .5fr',
    justifyItems: 'end',
    alignItems: 'center',
    color: '#FFF',
    margin: '4px 3px',
    padding: '0 15px',
    minHeight: '55px',
    borderRadius: '5px',
    backgroundColor: '#282828',
    boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
  }


  const headerStyles = {
    padding: '130px 0 20px 53px',
    margin: '0 100px 0 10px',
    fontSize: '24px',
    lineHeight: '28px',
    color: 'hsla(0,0%,100%,1)',
  }

  const cardContainerStyle = {
    padding: '50px 0 0 50px',
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
  }

  const songContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
  }

  const detailContainerStyle = {
    display: 'grid',
    maxHeight: '605px',
    gridTemplateAreas: `
    'img name'
    'img bio'
    `,
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '1fr 1fr'
  }

  return (
    <>
      <div className='artistInfoContainer' style={detailContainerStyle}>
        <img height='480x' width='480px' style={{ gridArea: 'img', margin: '125px 25px 0 50px' }} src={artist.image_url} alt='album.jpg' />
        <div style={{...headerStyles, gridArea: 'name', fontSize: '36px', paddingLeft: '0' }}>{artist.name}</div>
        <div style={{ gridArea: 'bio', alignSelf: 'end' }}>
          <div style={{...headerStyles, fontSize: '21px', paddingLeft: '0', marginBottom: '10px', paddingBottom: '0' }}>Biography</div>
          <div style={{...headerStyles, alignSelf: 'end', padding: '5px 0 0 0', fontSize: '16px' }}>{artist.bio}</div>

        </div>
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
                              onClick={playAlbum}
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
      <>
      <div style={headerStyles}>Songs</div>
      <div style={songContainerStyle}>
        {allSongs.map((song, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', alignItems: 'center', justifyItems: 'center' }}>
              <Button id={song.song_id}><FavoriteIcon style={{ color: 'hsla(0,0%,100%,.3)', pointerEvents: 'none' }} /></Button>
              <a className='songCards' style={{ cursor: 'pointer', width: '100%' }} id={song.song_id} href='/' onClick={playSong} >
                <div style={{ ...cardStyles, pointerEvents: 'none' }}>
                  <div style={{ justifySelf: 'start', pointerEvents: 'none' }}>{song.song_title}
                    <div style={{ marginTop: '5px', pointerEvents: 'none', justifySelf: 'center', fontSize: '15px', color: '#b3b3b3' }}>{artist.name}
                      <span style={{ marginLeft: '13px', pointerEvents: 'none' }}>•</span>
                      <span style={{ marginLeft: '13px', justifySelf: 'center', pointerEvents: 'none', color: '#b3b3b3', display: 'inline' }}>{albums[0].title}</span>
                    </div>
                  </div>
                  <div style={{ alignSelf: 'center' }}>{song.song_length}</div>
                </div>
              </a>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
    </>
  )
}

export default ArtistDetails
