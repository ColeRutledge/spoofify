import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext'
import { useHistory } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'
import SongModal from './SongModal'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Songs = () => {
  const { auth, setAuth, setSongs, setPointer, setIsPlaying } = useContext(UserContext)
  const [allSongs, setAllSongs] = useState([])
  const history = useHistory()
  const audio = document.getElementById('song')


  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/song`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
        })

        if (res.ok) {
          const data = await res.json()
          // console.log(data)
          setAllSongs([...data])
        } else throw res

      } catch (err) {
        if (err.status === 401) {
          localStorage.removeItem('token')
          setAuth('')
          history.push('/login')
        }
        // console.dir(err)
        console.error(err)
      }
    }

    fetchSongs()
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
        // console.log(data)
        localStorage.setItem('currentSongPointer', 1);
        localStorage.setItem('currentSong', data)
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



  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
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
    padding: '50px 0 20px 53px',
    margin: '0 10px',
    fontSize: '24px',
    lineHeight: '28px',
    color: 'hsla(0,0%,100%,1)',
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
      <div style={{ paddingTop: '75px' }}></div>
      <div style={headerStyles}>Songs</div>
      {allSongs.length > 0 && <div style={{ ...headerStyles, fontSize: '19px', color: '#b3b3b3' }}>{allSongs[0].artist}</div>}
      <div style={cardContainerStyle}>
        {allSongs.map((song, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', alignItems: 'center', justifyItems: 'center' }}>
              <SongModal songId={song.song_id}></SongModal>
              <a
                className='songCards'
                id={song.song_id}
                href='/'
                onClick={playSong}
                style={song.song_url === 'this is the song url' ? anchorCursorStyleNoSong : anchorCursorStyle}
              >
                <div style={{ ...cardStyles, pointerEvents: 'none' }}>
                  <div style={{ justifySelf: 'start', pointerEvents: 'none' }}>{song.title}
                    <div style={{ marginTop: '5px', pointerEvents: 'none', justifySelf: 'center', fontSize: '15px', color: '#b3b3b3' }}>{song.artist}
                      <span style={{ marginLeft: '13px', pointerEvents: 'none' }}>•</span>
                      <span style={{ marginLeft: '13px', justifySelf: 'center', pointerEvents: 'none', color: '#b3b3b3', display: 'inline' }}>{song.album}</span>
                    </div>
                  </div>
                  <div style={{ alignSelf: 'center' }}>{song.song_length}</div>
                </div>
              </a>
            </div>
            {allSongs[i + 1] !== undefined && song.artist !== allSongs[i + 1].artist
              && <div style={{ ...headerStyles, fontSize: '19px', paddingLeft: '50px', color: '#b3b3b3', justifySelf: 'start' }}
              >{allSongs[i + 1].artist}</div>}
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default Songs
