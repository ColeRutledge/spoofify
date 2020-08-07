import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext'
import { useHistory } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Albums = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ albums, setAlbums ] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/album`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${localStorage.getItem('token') || auth}`}
        })

        if (res.ok) {
          const data = await res.json()
          console.log(data.albums)
          setAlbums([...data.albums])
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

    fetchAlbums()
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
    padding: '50px 0 0 53px',
    margin: '0 3px',
    color: '#FFF',
    fontSize: '24px',
    lineHeight: '28px',
    // padding: '25px 10px',
  }

  return (
    <>
      <div style={headerStyles}>Albums</div>
      <div style={cardContainerStyle}>
        {albums.map(album => (
          <div key={album.id} style={cardStyles}>
            <img
              style={{
                alignContent: 'end',
                borderRadius: '50%',
                marginBottom: '20px',
                boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)'
              }}
              src={album.image_url}
              height='160px'
              width='160px'
              alt='album.jpg'
            />
            <div style={{ justifySelf: 'start', marginLeft: '10px' }}>
              <div style={{
                marginBottom: '7px',
                color: '#fff',
                fontSize: '16px',
                lineHeight: '24px',
                width: '173px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis' }}>{album.title}</div>
              <div style={{
                color: '#b3b3b3',
                fontSize: '11px',
                lineHeight: '16px'}}>{album.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Albums
