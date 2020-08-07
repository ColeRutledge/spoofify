import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext'
import { useHistory } from 'react-router-dom'
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
    padding: '30px 0 0 50px',
    display: 'flex',
    flexDirection: 'column',
  }

  const cardStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr .5fr',
    justifyItems: 'end',
    color: '#FFF',
    margin: '3px 3px',
    padding: '25px 10px',
    borderRadius: '5px',
    backgroundColor: '#282828',
    boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
  }

  const headerStyles = {
    padding: '50px 0 0 53px',
    margin: '0 3px',
    // color: '#FFF',
    fontSize: '24px',
    lineHeight: '28px',
    color: 'hsla(0,0%,100%,1)',
    // padding: '25px 10px',
  }

  return (
    <>
      <div style={headerStyles}>Songs</div>
      {songs.length > 0 && <div style={{...headerStyles, fontSize: '19px' }}>{songs[0].artist}</div>}
      <div style={cardContainerStyle}>
        {songs.map((song, i) => (
          <>
            <a className='songCards' style={{ cursor: 'pointer' }} id={song.id} href={song.song_url} >
              <div style={cardStyles}>
                <div style={{ justifySelf: 'start' }}>{song.title}
                  <div style={{ marginTop: '5px', justifySelf: 'center', fontSize: '12px', color: '#b3b3b3' }}>{song.album}
                    <span style={{ marginLeft: '10px' }}>•</span>
                    <span style={{ marginLeft: '10px', justifySelf: 'center', color: '#b3b3b3', display: 'inline' }}>{song.artist}</span>
                  </div>
                </div>
                <div>{song.song_length}</div>
              </div>
            </a>
            {songs[i + 1] !== undefined && song.artist !== songs[i + 1].artist
              && <div style={{...headerStyles, fontSize: '19px', paddingLeft: '5px', marginBottom: '25px' }}
              >{songs[i + 1].artist}</div>}
          </>
        ))}
      </div>
    </>
  )
}

export default Songs


            // {/* <img
            //   style={{
            //     alignContent: 'end',
            //     borderRadius: '50%',
            //     marginBottom: '20px',
            //     boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)'
            //   }}
            //   src={song.image_url}
            //   height='160px'
            //   width='160px'
            //   alt='album.jpg'
            // /> */}
            // <div>{song.album}</div>
            // <div style={{ justifySelf: 'start', marginLeft: '10px' }}>
            //   <div style={{
            //     marginBottom: '7px',
            //     color: '#fff',
            //     fontSize: '16px',
            //     lineHeight: '24px',
            //     width: '173px',
            //     overflow: 'hidden',
            //     whiteSpace: 'nowrap',
            //     textOverflow: 'ellipsis' }}>{song.artist}</div>
            //   <div style={{
            //     color: '#b3b3b3',
            //     fontSize: '11px',
            //     lineHeight: '16px'}}>{song.title}</div>
            // </div>
