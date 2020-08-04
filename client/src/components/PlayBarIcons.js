import React, { useContext } from 'react';
import { BottomNavigationAction } from '@material-ui/core'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import UserContext from '../context/UserContext';

const PlayBarIcons = () => {
    const { isPlaying, setIsPlaying } = useContext(UserContext);
    const playSong = (e) => {
        const audio = document.getElementById('song');
        if (isPlaying) {
            setIsPlaying(false)
            audio.pause()
        } else {
            setIsPlaying(true)
            audio.play()
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <BottomNavigationAction icon={<ShuffleRoundedIcon />} />
            <BottomNavigationAction icon={<SkipPreviousIcon />} />
            <BottomNavigationAction onClick={playSong} icon={isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />} />
            <BottomNavigationAction icon={<SkipNextIcon />} />
            <BottomNavigationAction icon={<RepeatRoundedIcon />} />
        </div>
    )
}

export default PlayBarIcons;
