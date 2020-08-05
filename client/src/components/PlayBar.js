import React from 'react'
import { BottomNavigation, Grid } from '@material-ui/core'
import PlayBarIcons from './PlayBarIcons'
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ProgressBar from './ProgressBar'
import VolumeBar from './VolumeBar'


const PlayBar = () => {
    return (
        <div>
            <BottomNavigation style={{ height: '100px', width: '100%', position: 'fixed', bottom: '0px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <VolumeUpRoundedIcon style={{ marginRight: '10px' }} />
                    <VolumeBar />
                </div >
            </BottomNavigation >
        </div>
    )
}

export default PlayBar;
