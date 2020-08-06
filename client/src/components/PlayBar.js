import React from 'react'
import PlayBarIcons from './PlayBarIcons'
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ProgressBar from './ProgressBar'
import VolumeBar from './VolumeBar'


const PlayBar = () => {
    return (
        <div>
            <div style={{ boxShadow: '30px 0 0 0 rgba(21,27,38,.15)', backgroundColor: '#282828', height: '100px', width: '100%', position: 'fixed', bottom: '0px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                <audio id='song'>
                    <source src='https://endless-tumblr.s3-us-west-2.amazonaws.com/all-the-small-things.mp3' type='audio/mpeg' />
                </audio>
                <div>
                    <h1>Hello</h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <PlayBarIcons />
                    <ProgressBar />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <VolumeUpRoundedIcon style={{ marginRight: '10px' }} />
                    <VolumeBar />
                </div >
            </div >
        </div>
    )
}

export default PlayBar;
