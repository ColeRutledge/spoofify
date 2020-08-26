import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import SongModal from './SongModal'

import demo_playlist from '../images/demo_playlist.jpg'
import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL



const PlaylistDetails = () => {
  const { auth, setAuth, setSongs, setPointer, setIsPlaying } = useContext(UserContext)
  const [ playlist, setPlaylist ] = useState({})
  const [ allSongs, setAllSongs ] = useState([])
  const history = useHistory()
  const { id } = useParams()
  const audio = document.getElementById('song')

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const playlistJson = await fetch(`${apiUrl}/api/playlist/${id}/songs`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token') || auth}`}
        })

        if (playlistJson.ok) {
          const playlist_data = await playlistJson.json()
          console.log(playlist_data.data)
          setPlaylist([...playlist_data.data])
          setAllSongs([...playlist_data.data[0].songs])

        } else throw playlistJson

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

    fetchPlaylist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const songContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
  }

  const detailContainerStyle = {
    display: 'grid',
    maxHeight: '605px',
    gridTemplateAreas: `
    'img name'
    'img desc'
    `,
    gridTemplateColumns: '.5fr 4fr',
    gridTemplateRows: '10fr 1fr'
  }

  const anchorCursorStyleNoSong = {
    cursor: 'not-allowed',
    width: '100%',
  }
  const anchorCursorStyle = {
    cursor: 'pointer',
    width: '100%',
  }

  return (
    <>
      {playlist.length > 0 &&
        <div style={detailContainerStyle}>
          <img height='280x' width='280px' style={{ gridArea: 'img', margin: '125px 20px 0 50px' }} src={demo_playlist} alt='album.jpg' />
          <div
            style={{
              lineHeight: '28px',
              color: 'hsla(0,0%,100%,1)',
              gridArea: 'name',
              fontSize: '36px',
              marginLeft: '20px',
              alignSelf: 'end' }}>{playlist[0].name}</div>
          <div
            style={{
              gridArea: 'desc',
              marginLeft: '20px',
              alignSelf: 'end',
              display: 'flex',
              justifyContent: 'flex-start',
              lineHeight: '28px',
              color: 'hsla(0,0%,100%,1)', }}>
            <div style={{ fontSize: '18px' }}>{`${playlist[0].created_by}`}</div>
            <div style={{ margin: '0 13px', pointerEvents: 'none', color: '#b3b3b3' }}>•</div>
            <div style={{ fontSize: '18px', color: '#b3b3b3' }}>{playlist[0].description}</div>
          </div>
        </div>
      }
      <>
        <div style={headerStyles}>Songs</div>
        <div style={songContainerStyle}>
          {allSongs.map((song, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', alignItems: 'center', justifyItems: 'center' }}>
              <SongModal songId={song.song_id}></SongModal>
                <a
                  className='songCards'
                  id={song.id}
                  href='/'
                  onClick={playSong}
                  style={song.id > 20 ? anchorCursorStyleNoSong : anchorCursorStyle}
                >
                  <div style={{ ...cardStyles, pointerEvents: 'none' }}>
                    <div style={{ justifySelf: 'start', pointerEvents: 'none' }}>{song.title}
                      <div
                        style={{
                          marginTop: '5px',
                          pointerEvents: 'none',
                          justifySelf: 'center',
                          fontSize: '15px',
                          color: '#b3b3b3' }}>{song.artist_name}
                        <span style={{ marginLeft: '13px', pointerEvents: 'none' }}>•</span>
                        <span
                          style={{
                            marginLeft: '13px',
                            justifySelf: 'center',
                            pointerEvents: 'none',
                            color: '#b3b3b3',
                            display: 'inline' }}>{song.album_title}</span>
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

export default PlaylistDetails
