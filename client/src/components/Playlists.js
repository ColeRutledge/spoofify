import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext'
import { useHistory, NavLink } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Playlists = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ playlists, setPlaylists ] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/playlist`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token') || auth}`}
        })

        if (res.ok) {
          const data = await res.json()
          console.log(data)
          setPlaylists([...data.Playlists])
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
    padding: '30px 0 50px 50px',
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
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
    padding: '125px 0 0 53px',
    margin: '0 3px',
    fontSize: '24px',
    lineHeight: '28px',
    color: 'hsla(0,0%,100%,1)',
  }

  return (
    <>
      <div style={headerStyles}>Playlists</div>
      <div style={cardContainerStyle}>
        {playlists.map(playlist => (
          <NavLink
            style={{ padding: '2px 0', borderRadius: '10px', cursor: 'pointer' }}
            className='songCards'
            to={`/library/playlists/${playlist.id}`}
            id={playlist.id}
            key={playlist.id}
          >
            <div key={playlist.id} style={cardStyles}>
              <div style={{ justifySelf: 'start', marginLeft: '10px' }}>
                <div style={{
                  marginBottom: '7px',
                  color: '#fff',
                  fontSize: '16px',
                  lineHeight: '24px',
                  width: '173px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis' }}>{playlist.name}</div>
                <div style={{
                  color: '#b3b3b3',
                  fontSize: '11px',
                lineHeight: '16px'}}>{`${playlist.created_by}'s playlist`}</div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  )
}

export default Playlists
