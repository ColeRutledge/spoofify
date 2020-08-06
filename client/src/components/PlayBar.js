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
              // height: '100px',
              width: '100%',
              position: 'fixed',
              bottom: '0px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 250px'
            }}>
              <div>
                <audio id='song'>
                    <source src='https://endless-tumblr.s3-us-west-2.amazonaws.com/all-the-small-things.mp3' type='audio/mpeg' />
                </audio>
              </div>
              <div style={{ display: 'flex', }}>
                <img style={{ borderRadius: '15px', width: '75px', height: '75px', padding: '15px 15px' }} src='https://spotify-clone-app.s3-us-west-2.amazonaws.com/enema-of-the-state.jpg' />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ color: 'black', marginBottom: '10px', fontSize: '15px' }}>All The Small Things</p>
                    <p style={{ color: 'black', fontSize: '10px' }}>Enema of the State</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <PlayBarIcons />
                  <ProgressBar />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                  <VolumeUpRoundedIcon style={{ marginRight: '10px' }} />
                  <VolumeBar />
              </div >
            </div >
        </div>
    )
}

export default PlayBar;
