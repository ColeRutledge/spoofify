import React from 'react'
import { BottomNavigation } from '@material-ui/core'
import PlayBarIcons from './PlayBarIcons'
import ProgressBar from './ProgressBar'


const PlayBar = () => {
    return (
        <div style={{ height: '100px', width: '100%', position: 'fixed', bottom: '0px' }}>
            <BottomNavigation style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
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
                <div>
                    <h1>Other options</h1>
                </div >
            </BottomNavigation >
        </div>
    )
}

export default PlayBar;
