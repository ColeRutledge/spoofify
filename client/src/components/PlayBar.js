import React from 'react'
import PlayBarIcons from './PlayBarIcons'
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ProgressBar from './ProgressBar'
import VolumeBar from './VolumeBar'


const PlayBar = () => {
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
                <source
                  src='https://endless-tumblr.s3-us-west-2.amazonaws.com/all-the-small-things.mp3'
                  type='audio/mpeg'/>
              </audio>
              <div style={{ display: 'flex', }}>
                <img
                  style={{ borderRadius: '15px', width: '75px', height: '75px', padding: '15px 15px' }}
                  src='https://spotify-clone-app.s3-us-west-2.amazonaws.com/enema-of-the-state.jpg'
                  alt='img.jpg'
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#FFF' }}>
                    <p style={{ marginBottom: '0px', fontSize: '13px' }}>All The Small Things</p>
                    <p style={{ fontSize: '10px' }}>Enema of the State</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
