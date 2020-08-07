import React from 'react'
import { Switch, NavLink, BrowserRouter } from 'react-router-dom'
import Artists from './Artists'
import Albums from './Albums'
import Songs from './Songs'
import Playlists from './Playlists'
import ProtectedRoute from './ProtectedRoute'


const Library = () => {
  // const history = useHistory()
  document.body.style.backgroundColor = '#121212'

  // const sleep = async ms => await new Promise(resolve => setTimeout(resolve, ms))

  // useEffect(() => {
  //   const redir = async () => {
  //     await sleep(1000)
  //     history.push('/library/artists')
  //   }

  //   redir()
  // }, [])

  const topBarStyle = {
    height: '75px',
    width: '100%',
    backgroundColor: 'hsl(0deg, 0%, 0%)',
    display: 'grid',
    position: 'fixed',
    marginTop: '0',
    gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 5fr',
    justifyItems: 'center',
    alignItems: 'center',
  }



  return (
    <>
      <BrowserRouter>
        <div style={topBarStyle}>
          <div>
            {/* <button style={{ borderRadius: '50%', marginRight: '16px', color: '#FFF', backgroundColor: 'rgba(0,0,0,.7)', height: '32px', width: '32px', cursor: 'pointer' }}>
              <svg
                style={{ backgroundColor: 'rgba(0,0,0,.7)', color: '#FFF' }}
                role="img"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                class="Svg-sc-1usfroi-0 jNmUis _6be6d9f3103325b95e6d4c0f6b10b783-scss">
                <polyline points="16 4 7 12 16 20" fill="none" stroke="#181818" />
              </svg>
            </button>
            <button style={{ borderRadius: '50%', color: '#FFF', backgroundColor: 'rgba(0,0,0,.7)', height: '32px', width: '32px', cursor: 'pointer' }}>
              <svg
                role="img"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                class="Svg-sc-1usfroi-0 jNmUis _6be6d9f3103325b95e6d4c0f6b10b783-scss">
                <polyline points="8 4 17 12 8 20" fill="none" stroke="#181818" />
              </svg>
            </button> */}
          </div>
          <NavLink activeClassName='navbar--active2' to='/library/artists'>Artists</NavLink>
          <NavLink activeClassName='navbar--active2' to='/library/albums'>Albums</NavLink>
          <NavLink activeClassName='navbar--active2' to='/library/songs'>Songs</NavLink>
          <NavLink activeClassName='navbar--active2' to='/library/playlists'>Playlists</NavLink>
        </div>
        <Switch>
          <ProtectedRoute path='/library/artists' component={Artists} />
          <ProtectedRoute path='/library/albums' component={Albums} />
          <ProtectedRoute path='/library/songs' component={Songs} />
          <ProtectedRoute path='/library/playlists' component={Playlists} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default Library
