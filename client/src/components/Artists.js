import React, { useEffect, useContext, useState } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Artist = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [artists, setArtists] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/artist`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
        })

        if (res.ok) {
          const data = await res.json()
          // console.log(data.artists)
          setArtists([...data.artists])
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

    fetchArtists()
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
    margin: '0 3px',
    padding: '25px 10px',
    borderRadius: '10px',
    height: '257px',
    backgroundColor: '#282828',
    justifyItems: 'center',
    boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
  }

  const headerStyles = {
    padding: '125px 0 0 53px',
    margin: '0 3px',
    color: '#FFF',
    fontSize: '24px',
    lineHeight: '28px',
    // padding: '25px 10px',
  }

  return (
    <>
      <div style={headerStyles}>Artists</div>
      <div style={cardContainerStyle}>
        {artists.map((artist, idx) => (
          <React.Fragment key={idx}>
            <NavLink
              style={{ padding: '2px 0', borderRadius: '10px', cursor: 'pointer' }}
              className='songCards'
              to={`/library/artists/${artist.id}`}
              id={artist.id}
            >
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
                />
                <div style={{ justifySelf: 'start', marginLeft: '10px' }}>
                  <div
                    style={{
                      marginBottom: '7px',
                      color: '#fff',
                      fontSize: '16px',
                      lineHeight: '24px',
                      width: '173px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis'}}>{artist.name}</div>
                  <div style={{
                    color: '#b3b3b3',
                    fontSize: '11px',
                    lineHeight: '16px'
                  }}>Artist</div>
                </div>
              </div>
            </NavLink>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default Artist
