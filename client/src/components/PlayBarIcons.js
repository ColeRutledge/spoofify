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
<<<<<<< HEAD
    const { isPlaying, setIsPlaying, pointer, setPointer, songs, currentTime, isLooping, setIsLooping, isShuffling, setIsShuffling } = useContext(UserContext);
=======
    const { isPlaying, setIsPlaying, pointer, setPointer, songs, currentTime } = useContext(UserContext);
    // console.log(pointer)
>>>>>>> master
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

    const loopSong = () => {
        if (isLooping === true) {
            setIsLooping(false);
        } else {
            setIsLooping(true);
        }
    }

    const shuffleSongs = () => {
        if (isShuffling === true) {
            setIsShuffling(false);
        } else {
            setIsShuffling(true);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <BottomNavigationAction onClick={shuffleSongs} icon={isShuffling ? <ShuffleRoundedIcon className='icon' /> : <ShuffleRoundedIcon />} />
            <BottomNavigationAction onClick={previousSong} icon={<SkipPreviousIcon />} />
            <BottomNavigationAction onClick={playSong} icon={isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />} />
            <BottomNavigationAction onClick={nextSong} icon={<SkipNextIcon />} />
            <BottomNavigationAction onClick={loopSong} icon={isLooping ? <RepeatRoundedIcon className='icon' /> : <RepeatRoundedIcon />} />
        </div>
    )
}

export default PlayBarIcons;
