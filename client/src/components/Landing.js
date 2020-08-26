import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import TopNav from './TopNav'
import BottomNav from './BottomNav'
import { Button } from '@material-ui/core'
import UserContext from '../context/UserContext'



const Landing = () => {
  const { auth } = useContext(UserContext);

  if (auth) {
    return <Redirect to='/library' />
  } else {
    return (
      <>
        <div className='splash-page'>
          <TopNav />
          <div style={{
            position: 'absolute',
            top: '75px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            backgroundImage: 'url("https://spotify-clone-app.s3-us-west-2.amazonaws.com/spotifysplash.png")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <p style={{ color: 'white', fontSize: '75px' }}>Music for everyone.</p>
            <p style={{ color: 'white', fontSize: '25px', marginTop: '20px' }} >Millions of songs. No credit card needed</p>
            <Button href='/register' style={{ cursor: 'pointer', backgroundColor: '#1DB954', borderRadius: '25px', color: 'white', fontSize: '15px', marginTop: '30px', padding: '10px 25px', fontFamily: 'inherit' }}>Register Now</Button>
          </div>
          <BottomNav />
        </div>
      </>
    )
  }
}

export default Landing;
