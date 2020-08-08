import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext'
import { useHistory } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Songs = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ songs, setSongs ] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/song`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token') || auth}`}
        })

        if (res.ok) {
          const data = await res.json()
          console.log(data)
          setSongs([...data])
        } else throw res

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

    fetchSongs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



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

  return (
    <>
      <div style={{ paddingTop: '75px' }}></div>
      <div style={headerStyles}>Songs</div>
      {songs.length > 0 && <div style={{...headerStyles, fontSize: '19px', color: '#b3b3b3' }}>{songs[0].artist}</div>}
      <div style={cardContainerStyle}>
        {songs.map((song, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', alignItems: 'center', justifyItems: 'center' }}>
            <Button><FavoriteIcon style={{ color: 'hsla(0,0%,100%,.3)' }} /></Button>
            <a className='songCards' style={{ cursor: 'pointer', width: '100%' }} id={song.song_id} href={song.song_url} >
              <div style={cardStyles}>
                <div style={{ justifySelf: 'start' }}>{song.title}
                  <div style={{ marginTop: '5px', justifySelf: 'center', fontSize: '15px', color: '#b3b3b3' }}>{song.artist}
                    <span style={{ marginLeft: '13px' }}>•</span>
                    <span style={{ marginLeft: '13px', justifySelf: 'center', color: '#b3b3b3', display: 'inline' }}>{song.album}</span>
                  </div>
                </div>
                <div style={{ alignSelf: 'center' }}>{song.song_length}</div>
              </div>
            </a>
            <div />
            {songs[i + 1] !== undefined && song.artist !== songs[i + 1].artist
              && <div style={{...headerStyles, fontSize: '19px', paddingLeft: '5px', color: '#b3b3b3', justifySelf: 'start' }}
              >{songs[i + 1].artist}</div>}
              </div>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default Songs
