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
    const { isPlaying, setIsPlaying, pointer, setPointer, songs, currentTime } = useContext(UserContext);
    console.log(pointer)
    const playSong = (e) => {
        const audio = document.getElementById('song');
        if (isPlaying) {
            setIsPlaying(false)
            audio.pause()
        } else {
            setIsPlaying(true)
            audio.currentTime = currentTime
            audio.play()
        }
    }

    const nextSong = () => {
        if (songs.length > pointer) {
            setPointer(pointer + 1)
            localStorage.setItem('currentSongPointer', `${pointer + 1}`)
        }
    }

    const previousSong = () => {
        if (0 < pointer - 1) {
            setPointer(pointer - 1)
            localStorage.setItem('currentSongPointer', `${pointer - 1}`)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <BottomNavigationAction icon={<ShuffleRoundedIcon />} />
            <BottomNavigationAction onClick={previousSong} icon={<SkipPreviousIcon />} />
            <BottomNavigationAction onClick={playSong} icon={isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />} />
            <BottomNavigationAction onClick={nextSong} icon={<SkipNextIcon />} />
            <BottomNavigationAction icon={<RepeatRoundedIcon />} />
        </div>
    )
}

export default PlayBarIcons;
