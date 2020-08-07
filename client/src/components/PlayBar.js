import React, { useContext, useEffect } from 'react'
import PlayBarIcons from './PlayBarIcons'
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ProgressBar from './ProgressBar'
import VolumeBar from './VolumeBar'
import UserContext from '../context/UserContext';


const PlayBar = () => {
    const { pointer, songs, setIsPlaying } = useContext(UserContext)
    let audio = document.getElementById('song')
    useEffect(() => {
        audio = document.getElementById('song');
        if (!isNaN(audio.duration)) {
            audio.setAttribute('src', songs[pointer - 1].song_url)
            audio.play()
            setIsPlaying(true)
            console.log('success')
        }
    }, [pointer, audio])

    return (
        <div>
            <div style={{
              boxShadow: '30px 0 0 0 rgba(21,27,38,.15)',
              backgroundColor: '#282828',
              width: '100%',
              position: 'fixed',
              bottom: '0px',
              left: '0px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr'
            }}>
              <audio id='song'>
                  <source src={songs[pointer - 1].song_url} type='audio/mpeg' />
              </audio>
              <div style={{ display: 'flex', }}>
                  <img style={{ borderRadius: '15px', width: '75px', height: '75px', padding: '15px 15px', alt='img.jpg' }} src='https://spotify-clone-app.s3-us-west-2.amazonaws.com/enema-of-the-state.jpg' />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#FFF' }}>
                      <p style={{ marginBottom: '10px', fontSize: '15px' }}>{songs[pointer - 1].title}</p>
                      <p style={{ fontSize: '10px' }}>Album Name</p>
                  </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '12px' }}>
                  <PlayBarIcons />
                  <ProgressBar />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '30px'  }}>
                  <VolumeUpRoundedIcon style={{ marginRight: '10px' }} />
                  <VolumeBar />
              </div >
          </div >
        </div>
    )
}

export default PlayBar;
